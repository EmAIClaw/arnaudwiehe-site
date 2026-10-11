'use strict';
/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS install hook, shared with Expo. */
// Temporary, fail-closed patches. See SECURITY-PATCHES.md before updating dependencies.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const gym = JSON.parse(fs.readFileSync(path.join(root, 'package.json'))).name === 'gym-tracker';
const check = process.argv.includes('--check');
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
function patch(file, expected, from, to) {
  const target = path.join(root, 'node_modules', file);
  const current = fs.readFileSync(target, 'utf8');
  if (current.includes(to) && hash(current.replace(to, from)) === expected) return;
  if (hash(current) !== expected || current.split(from).length !== 2) {
    throw new Error(`Unreviewed dependency source: ${file}; review patch before continuing`);
  }
  if (check) throw new Error(`Missing security patch: ${file}; run npm run security:patch`);
  fs.writeFileSync(target, current.replace(from, to));
}
patch('braces/lib/parse.js', 'e572166565f15fa6ad9865ae49d678218e32aabfd1b3720f6d0d43d39800d310',
  '  while (index < length) {',
  "  while (index < length) {\n    if (stack.length > 128) throw new SyntaxError('Brace AST depth exceeds local security limit');");
// Guard direct AST entry points too; traverse only child nodes (not parent/prev cycles).
for (const [name, digest] of Object.entries({
  compile: 'dc98f22eee3d511785d92a00758d5f0d48efed5f5813bdecc2de430c529b5c9f',
  expand: '41ccc196ebfa7b7781a634e721eb744e4e7bcb54cba427a7e3d6806a1b9e58f7',
  stringify: '379f22d77bfa1478341ccd49c5e4267464aabcbba03558bab332aac23fc6f23a'
})) {
  const from = `module.exports = ${name};`;
  const to = `module.exports = (ast, options) => {
  const pending = [[ast, 0]];
  while (pending.length) {
    const [node, depth] = pending.pop();
    if (depth > 128) throw new SyntaxError('Brace AST depth exceeds local security limit');
    if (node && Array.isArray(node.nodes)) {
      for (const child of node.nodes) pending.push([child, depth + 1]);
    }
  }
  return ${name}(ast, options);
};`;
  if (name === 'stringify') {
    const header = 'module.exports = (ast, options = {}) => {';
    patch(`braces/lib/${name}.js`, digest, header,
      header + to.slice(to.indexOf('\n'), to.lastIndexOf(`  return ${name}`)));
  } else {
    patch(`braces/lib/${name}.js`, digest, from, to);
  }
}
if (gym) {
  // Backport reviewed upstream PR 1152 (still unmerged), exact nested sequence check.
  patch('node-forge/lib/rsa.js', 'fd4740238145ec26470eb3f06a627c72039538ce1307dbdce40521f94dfd0a50',
    '            obj.value.length !== 2) {',
    "            obj.value.length !== 2 ||\n            obj.value[0].value.length !== (('parameters' in capture) ? 2 : 1)) {");
  // image-size 2 removes path input and the callable CommonJS export; preserve Metro's API.
  patch('metro/src/Assets.js', '5614658f2f2e892736637a084b0425d2317d4d975ca468cea48d9ff21b83b34d',
    'var _imageSize = _interopRequireDefault(require("image-size"));',
    'var _imageSize = { default: input => require("image-size").imageSize(typeof input === "string" ? require("fs").readFileSync(input) : input) };');
}
console.log(`Security patches ${check ? 'verified' : 'applied/verified'}`);
