// build extensions

const {readFileSync, writeFileSync} = require('fs');
const {execSync} = require('child_process');

const {version} = require('../package.json');

const loadManifest = (folder) => {
  const txt = readFileSync(`./extensions/${folder}/manifest.json`, 'utf8');
  return JSON.parse(txt);
};

const writeManifest = (folder, content) => {
  const json = JSON.stringify(content, undefined, 2);
  return writeFileSync(`./extensions/${folder}/manifest.json`, json, 'utf8');
};

const webkitManifest = loadManifest('webkit');
const geckoManifest = loadManifest('gecko');
webkitManifest.version = version;
writeManifest('webkit', webkitManifest);
geckoManifest.version = version;
writeManifest('gecko', geckoManifest);

execSync('cp ./dist/vnikey.js ./extensions/webkit/js/vnikey.js');
execSync('cp ./dist/vnikey.js ./extensions/gecko/js/vnikey.js');

execSync(`zip -r ../../tmp/vnikey_v${version}_webkit.zip *`, {cwd: './extensions/webkit'});
execSync(`zip -r ../../tmp/vnikey_v${version}_gecko.zip *`, {cwd: './extensions/gecko'});
