import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => readFile(path.join(root, name), 'utf8');
const assets = {};
for (const file of (await readdir(path.join(root, 'public/images'))).filter(name => name.endsWith('.svg')).sort()) {
  assets[path.basename(file, '.svg')] = `data:image/svg+xml;base64,${(await readFile(path.join(root, 'public/images', file))).toString('base64')}`;
}
const legacyAssets = { ...assets };
for (const file of (await readdir(path.join(root, 'public/images'))).filter(name => /^clothing-\d+\.webp$/.test(name)).sort()) {
  assets[path.basename(file, '.webp')] = `data:image/webp;base64,${(await readFile(path.join(root, 'public/images', file))).toString('base64')}`;
}
const [template, styles, minimal, app, translations] = await Promise.all([
  read('standalone/template.html'), read('standalone/styles.css'), read('standalone/minimal.css'), read('standalone/app.js'), read('src/features/wardrobe/translations.json'),
]);
const script = `const ASSETS=${JSON.stringify(assets)};\nconst LEGACY_ASSETS=${JSON.stringify(legacyAssets)};\nconst TRANSLATIONS=${JSON.stringify(JSON.parse(translations))};\n${app}`;
const html = template.replace('{{STYLES}}', () => styles + '\n' + minimal).replace('{{SCRIPT}}', () => script.replace(/<\/script/gi, '<\\/script'));
await mkdir(path.join(root, 'deliverables'), { recursive: true });
await mkdir(path.join(root, 'netlify-dist'), { recursive: true });
for (const output of ['deliverables/我的电子衣橱.html', 'public/wardrobe.html', 'netlify-dist/index.html', 'netlify-dist/wardrobe.html']) {
  await writeFile(path.join(root, output), html);
}
console.log(`Generated standalone HTML with ${Object.keys(assets).length} embedded images.`);
