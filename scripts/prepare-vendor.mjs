import { mkdir, copyFile } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = process.cwd();
const out = resolve(root, 'public/vendor');
await mkdir(out, { recursive: true });

function packageMain(pkg) {
  return require.resolve(pkg);
}

const packages = [
  ['jszip', 'jszip.min.js', ['dist/jszip.min.js']],
  ['xlsx', 'xlsx.full.min.js', ['dist/xlsx.full.min.js']],
  ['pptxgenjs', 'pptxgen.min.js', ['dist/pptxgen.min.js']],
];

for (const [pkg, target, relativeCandidates] of packages) {
  const main = packageMain(pkg);
  const pkgDir = dirname(main);
  let copied = false;
  for (const relativePath of relativeCandidates) {
    const source = resolve(pkgDir, relativePath.replace(/^dist[\\/]/, ''));
    try {
      await copyFile(source, resolve(out, target));
      console.log(`vendor: ${target} <- ${source}`);
      copied = true;
      break;
    } catch {}
  }
  if (!copied) {
    // Fallback for packages whose main file is itself inside dist/.
    for (const relativePath of relativeCandidates) {
      const source = join(pkgDir, relativePath);
      try {
        await copyFile(source, resolve(out, target));
        console.log(`vendor: ${target} <- ${source}`);
        copied = true;
        break;
      } catch {}
    }
  }
  if (!copied) throw new Error(`Não foi possível localizar ${pkg}`);
}
