# GitHub Actions / npm

The current project does not include package-lock.json, so CI uses `npm install` instead of `npm ci` and does not enable npm cache in setup-node. Once a lockfile is committed, the workflow can be switched to `npm ci` with `cache: npm`.
