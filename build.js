/**
 * build.js
 * build the extension compatible with both Chrome and Firefox
 * usage: bun build.js
**/

import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = import.meta.dir;
const OUTDIR = join(ROOT, 'output', 'vnikey');

const pkg = await Bun.file(join(ROOT, 'package.json')).json();

const manifest = {
  manifest_version: 3,
  name: 'vnikey',
  description: 'Enables Vietnamese number key based',
  version: pkg.version,
  author: pkg.author,
  homepage_url: 'https://github.com/ndaidong/vnikey',
  browser_specific_settings: {
    gecko: {
      id: 'vnikey@ndaidong.github.io',
      strict_min_version: '109.0',
    },
  },
  icons: {
    '16': 'icons/vni-16x16.png',
    '32': 'icons/vni-32x32.png',
    '64': 'icons/vni-64x64.png',
    '128': 'icons/vni-128x128.png',
    '256': 'icons/vni-256x256.png',
  },
  content_scripts: [
    {
      matches: [
        'http://*/*',
        'https://*/*',
      ],
      all_frames: true,
      run_at: 'document_idle',
      js: [
        'js/vnikey.js',
      ],
    },
  ],
};

const buildJS = async () => {
  const result = await Bun.build({
    entrypoints: [join(ROOT, 'src', 'main.js')],
    target: 'browser',
    format: 'iife',
    minify: true,
    naming: 'js/vnikey.js',
    outdir: OUTDIR,
  });
  if (!result.success) {
    console.error(result.logs);
    process.exit(1);
  }
  return result.outputs.map((o) => o.path);
};

const writeManifest = async () => {
  const file = join(OUTDIR, 'manifest.json');
  const content = JSON.stringify(manifest, null, 2) + '\n';
  await Bun.write(file, content);
  return file;
};

const copyIcons = async () => {
  const from = join(ROOT, 'icons');
  const to = join(OUTDIR, 'icons');
  const names = await readdir(from);
  const copied = [];
  for (const name of names) {
    const src = Bun.file(join(from, name));
    const dst = join(to, name);
    await Bun.write(dst, src);
    copied.push(dst);
  }
  return copied;
};

await Bun.$`rm -rf ${OUTDIR}`.quiet();

const outputs = [
  ...await buildJS(),
  await writeManifest(),
  ...await copyIcons(),
];

console.log(`Built vnikey@${pkg.version} -> output/vnikey`);
outputs.forEach((file) => console.log(`  ${file.replace(ROOT + '/', '')}`));
