'use strict';
/* eslint-disable @typescript-eslint/no-require-imports -- Exercises the CommonJS dependency APIs used by build tooling. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const braces = require('braces');
const gym = require('../package.json').name === 'gym-tracker';

test('normal brace patterns retain compile/expand/stringify behavior', () => {
  assert.deepEqual(braces.expand('src/{a,b}.{js,ts}'), ['src/a.js','src/a.ts','src/b.js','src/b.ts']);
  assert.equal(braces.compile('a/{b,c}'), 'a/(b|c)');
  assert.equal(braces.stringify(braces.parse('a/{b,c}')), 'a/{b,c}');
});
test('deep and incomplete brace/parenthesis patterns reject before recursive walkers', () => {
  for (const [open, close] of [['{','}'], ['(',')']]) {
    for (const pattern of [open.repeat(4000)+'x'+close.repeat(4000), open.repeat(4000)+'x']) {
      for (const op of ['parse','compile','expand','stringify']) {
        assert.throws(() => braces[op](pattern), /Brace AST depth exceeds local security limit/);
      }
    }
  }
});
test('direct deep or cyclic AST input is bounded', () => {
  let ast = {type:'text',value:'x'};
  for (let i=0;i<1000;i++) ast = {type:'root',nodes:[ast]};
  for (const op of ['compile','expand','stringify']) {
    assert.throws(() => braces[op](ast), /Brace AST depth exceeds local security limit/);
    const cycle={type:'root',nodes:[]}; cycle.nodes.push(cycle);
    assert.throws(() => braces[op](cycle), /Brace AST depth exceeds local security limit/);
  }
});
if (gym) {
  test('Xcode UUID generation still works; unsafe buffer bounds rejected', () => {
    const xcode = require('xcode');
    const project=xcode.project('unused.pbxproj');
    project.hash={project:{objects:{}}};
    assert.match(project.generateUuid(), /^[0-9A-F]{24}$/);
    const uuid = createRequire(require.resolve('xcode'))('uuid');
    assert.throws(() => uuid.v5('test', uuid.v5.DNS, Buffer.alloc(1)), RangeError);
  });
  test('RSA valid SHA signatures verify; nested DigestAlgorithm garbage rejected', () => {
    const forge=require('node-forge');
    const {privateKey,publicKey}=forge.pki.rsa.generateKeyPair({bits:1024,e:0x10001});
    for (const name of ['sha1','sha256','sha384','sha512']) {
      const md=forge.md[name].create().update('security regression');
      assert.equal(publicKey.verify(md.digest().getBytes(),privateKey.sign(md)),true);
    }
    const a=forge.asn1;
    for (const withNull of [true,false]) {
      const md=forge.md.sha256.create().update('security regression');
      const alg=[a.create(a.Class.UNIVERSAL,a.Type.OID,false,a.oidToDer(forge.pki.oids.sha256).getBytes())];
      if(withNull) alg.push(a.create(a.Class.UNIVERSAL,a.Type.NULL,false,''));
      const make=() => a.toDer(a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,true,[
        a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,true,alg),
        a.create(a.Class.UNIVERSAL,a.Type.OCTETSTRING,false,md.digest().getBytes())
      ])).getBytes();
      const good=privateKey.sign(make(),'NONE');
      assert.equal(publicKey.verify(md.digest().getBytes(),good),true);
      alg.push(a.create(a.Class.UNIVERSAL,a.Type.OCTETSTRING,false,'unconsumed garbage'));
      const bad=privateKey.sign(make(),'NONE');
      assert.throws(()=>publicKey.verify(md.digest().getBytes(),bad),/DigestInfo/);
    }
  });
  test('Metro supports buffer and path images with patched image-size', async () => {
    const metroRequire=createRequire(require.resolve('metro/package.json'));
    const image=metroRequire('image-size');
    const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jS1sAAAAASUVORK5CYII=', 'base64');
    assert.equal(image.imageSize(png).width,1);
    const metro=require(path.join(path.dirname(require.resolve('metro/package.json')),'src/Assets.js'));
    assert.deepEqual(metro.getAssetSize('png',png,'probe.png'),{width:1,height:1});
    const dir=fs.mkdtempSync(path.join(process.env.TMPDIR || process.cwd(),'gym-image-test-'));
    try {
      const file=path.join(dir,'probe.png');fs.writeFileSync(file,png);
      const asset=await metro.getAssetData(file,'probe.png',[],null,'/assets');
      assert.equal(asset.width,1);assert.equal(asset.height,1);
    } finally {fs.rmSync(dir,{recursive:true,force:true});}
    const run=spawnSync(process.execPath,['-e',`const i=require(${JSON.stringify(metroRequire.resolve('image-size'))});const b=Buffer.alloc(16);b.write('icns');b.writeUInt32BE(16,4);b.write('ic07',8);try{i.imageSize(b);process.exit(2)}catch{process.exit(0)}`],{timeout:3000});
    assert.equal(run.status,0,`malformed ICNS must reject without hanging: ${run.error || run.stderr}`);
  });
}
