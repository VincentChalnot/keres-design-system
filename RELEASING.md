# Releasing `@vchalnot/keres-design-system`

1. Make sure `main` is clean, pushed, and `npm run build` passes. Add the user-visible changes to `CHANGELOG.md`
   (create it on first use: one `## X.Y.Z - date` section, bullets for added / changed / removed classes; a removed or
   renamed class is a **breaking** change, so a minor bump while `0.x`).
2. `npm version patch|minor|major` — bumps `package.json` + lock, commits and tags `vX.Y.Z`.
3. `git push --follow-tags` — the tag triggers `.github/workflows/publish.yaml`: checks tag == `version`, skips if that
   version is already on npm, `npm ci`, build, `npm publish --access public --provenance` through npm Trusted Publishing
   (OIDC, no token). Watch the run in the Actions tab.
4. In the platform: `docker compose exec node npm install @vchalnot/keres-design-system@^X.Y.Z`, then
   `npm run build`, `npm run check:front`, `npm run type-check`; commit `package.json` + `package-lock.json`
   (copy new files of `styleguide/fonts` to `public/fonts` if the DS ships fonts).

## If CI fails
Nothing was published unless the last step succeeded. Fix the problem, then move the tag:
`git tag -d vX.Y.Z && git push origin :refs/tags/vX.Y.Z`, commit the fix, `git tag -a vX.Y.Z -m vX.Y.Z`, push again.
**Never reuse a version that reached npm** (npm refuses it anyway): bump to the next patch instead.

## Trusted Publisher caveat
The Trusted Publisher (repo `VincentChalnot/keres-design-system`, workflow `publish.yaml`, no environment) stays
"pending validation" on npmjs.com until the first successful CI publish. The workflow file name, the repository URL in
`package.json` (`git+https://github.com/VincentChalnot/keres-design-system.git`) and the package name must stay exactly
as configured, otherwise the OIDC publish is rejected (E404/E403).
