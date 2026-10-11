# Temporary dependency security patches

## Scope and status

Local remediation, not deployment approval. Existing website UX/content changes remain pending separately. Do not report a clean npm audit: npm checks published versions, not these local source patches.

## Patches

- `braces` 3.0.3: GHSA-vfj7-8cjw-p6xm / CVE-2026-93687. Limit parser stack and validate AST child depth iteratively before compile, expand and stringify. Patterns/ASTs over the local limit of 128 levels throw a controlled SyntaxError rather than reaching recursive stack exhaustion. This intentionally rejects pathological patterns; it is a local mitigation, not an upstream release.
- Gym only: `node-forge` 1.4.0, GHSA-86w9-cpqp-85rv / CVE-2026-85393. Backport the nested DigestAlgorithm element-count check from https://github.com/digitalbazaar/forge/pull/1152 (reviewed patch commit ceba34402e329f0365134f23fe19898756527d65). The PR was open/unmerged at review. This is a temporary local backport, not an independently audited crypto implementation. Regression tests accept valid SHA signatures and reject signed malformed nested sequences, both with and without NULL parameters.
- Gym only: override `image-size` to published 2.0.4 for GHSA-5p2g-fcmc-qvqq and GHSA-w3rx-r6r6-pgpr. Metro 0.84.4 expects the older callable CommonJS and synchronous filename API; a narrow adapter calls `imageSize` with bytes and reads filename inputs first. Tests exercise Metro buffer/path APIs and malformed zero-length ICNS termination.
- Gym only: override Xcode's `uuid` to published 11.1.1 for GHSA-w5hq-g745-h8pq. Tests check Xcode UUID generation and v5 buffer bounds rejection. Native iOS/Android compilation is not verified.

## Reproducibility and safety

`scripts/security-patches.cjs` verifies original source SHA-256 before applying each patch. Reapplication is idempotent. Unknown source changes fail closed and require review; do not bypass by changing expected hashes without reviewing the source. Versions are not forged and advisories are not suppressed.

The root `postinstall` hook applies the reviewed patches. For controlled installs:

```sh
npm ci --ignore-scripts
npm run security:patch
npm run test:security
```

Using `--ignore-scripts` skips the automatic hook; explicitly apply patches before any other tooling. Website production build and verify scripts check patch integrity. Gym typecheck, start, web and `export:web` scripts also check patches. Direct `npx expo ...` can bypass these script guards: use the npm scripts or run `npm run test:security` first.

The tests were run against original dependencies and failed, then passed after remediation. Clean locked installs plus explicit patch application were verified. Replace temporary patches with compatible upstream fixes when published; retain regressions and remove obsolete overrides/adapters only after full verification.

## Verification commands

Website: `npm run verify` (security regressions, production build, unit tests, lint, browser tests).

Gym: `npm run typecheck` and `npm run export:web -- --clear --output-dir <scratch-path>`; browser-smoke-test the export with COOP/COEP and a fresh isolated browser context.

## Audit interpretation

At local verification, website audit still reports five high dependency entries rooted in the one braces advisory; Gym reports fifteen high entries rooted in braces and node-forge. These are version-based findings with locally tested mitigations/backport, not fifteen separate vulnerabilities. AlbumVault audit reports zero. No claim is made about vulnerabilities beyond the advisories reviewed or production activation.
