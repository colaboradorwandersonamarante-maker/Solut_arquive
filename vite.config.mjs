import { defineConfig } from 'vite';
import { execFileSync } from 'node:child_process';

export default defineConfig({
  base: './',
  publicDir: 'public',
  plugins: [{
    name: 'prepare-local-vendors',
    buildStart() {
      execFileSync(process.execPath, ['scripts/prepare-vendor.mjs'], { stdio: 'inherit' });
    }
  }],
});
