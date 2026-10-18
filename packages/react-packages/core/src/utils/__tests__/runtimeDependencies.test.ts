import fs from 'fs';
import path from 'path';

const packageRoot = path.resolve(__dirname, '../../..');

interface PackageManifest {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

const manifest: PackageManifest = JSON.parse(
  fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
);

const declared = new Set([
  ...Object.keys(manifest.dependencies ?? {}),
  ...Object.keys(manifest.peerDependencies ?? {}),
]);

const sourceFiles = [
  ...fs
    .readdirSync(path.join(packageRoot, 'src'), { recursive: true })
    .map(String)
    .filter(
      (file) => /\.tsx?$/.test(file) && !/\.(test|stories)\.tsx?$/.test(file)
    )
    .map((file) => path.join(packageRoot, 'src', file)),
  path.join(packageRoot, 'index.ts'),
];

const toPackageName = (specifier: string) => {
  const parts = specifier.split('/');

  return specifier.startsWith('@')
    ? parts.slice(0, 2).join('/')
    : parts[0] ?? specifier;
};

const importedPackages = new Set(
  sourceFiles.flatMap((file) =>
    [...fs.readFileSync(file, 'utf8').matchAll(/from '([^'.][^']*)'/g)].map(
      ([, specifier]) => toPackageName(specifier ?? '')
    )
  )
);

// Mirrors `external` in tsup.config.ts: keep both in sync.
const isTsupExternal = (name: string) =>
  /@emotion.*/.test(name) || name === 'react';

const externals = [...importedPackages].filter(isTsupExternal).sort();

describe('runtime dependencies', () => {
  it.each(externals)(
    'should declare %s, which the build keeps external',
    (name) => {
      expect([...declared]).toContain(name);
    }
  );
});
