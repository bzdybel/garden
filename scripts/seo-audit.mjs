// Audyt SEO zbudowanej strony (dist/). Użycie: npm run build && npm run seo:audit
// Sprawdza: title, meta description, canonical, H1, alt obrazów, poprawność JSON-LD i duplikaty.
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const pick = (html, re) => decode(html.match(re)?.[1] ?? '');

const seen = { title: new Map(), description: new Map() };
let problems = 0;
let pages = 0;

for await (const file of htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  const page = '/' + relative(DIST, file).replace(/index\.html$/, '');
  const issues = [];
  pages++;

  const title = pick(html, /<title>([^<]*)<\/title>/);
  const description = pick(html, /<meta name="description" content="([^"]*)"/);
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
  const noindex = /<meta name="robots" content="noindex/.test(html);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;

  if (!title) issues.push('brak <title>');
  else if (title.length > 65) issues.push(`title za długi (${title.length}): ${title}`);
  if (!description) issues.push('brak meta description');
  else if (description.length < 70 || description.length > 165) issues.push(`description ${description.length} znaków`);
  if (!canonical && !noindex) issues.push('brak canonical');
  if (h1 !== 1) issues.push(`liczba H1: ${h1}`);

  const alts = new Map();
  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    // Puste alt dozwolone tylko dla obrazów czysto dekoracyjnych (aria-hidden)
    const decorative = /\salt(="")?[\s>]/.test(img) && /\saria-hidden="true"/.test(img);
    const alt = pick(img, /\salt="([^"]+)"/);
    if (!decorative && !alt) issues.push(`obraz bez alt: ${img.slice(0, 80)}`);
    // Ten sam obraz może wystąpić kilka razy (np. karta + nagłówek), ale różne obrazy nie powinny dzielić altu
    const src = pick(img, /\ssrc="([^"]+)"/);
    if (alt && alts.has(alt) && alts.get(alt) !== src) issues.push(`zduplikowany alt: ${alt}`);
    if (alt) alts.set(alt, src);
    if (alt && alt.length > 140) issues.push(`alt za długi (${alt.length}): ${alt}`);
    if (!/\swidth=/.test(img) || !/\sheight=/.test(img)) issues.push(`obraz bez wymiarów (CLS): ${img.slice(0, 80)}`);
  }

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      JSON.parse(json);
    } catch (e) {
      issues.push(`niepoprawny JSON-LD: ${e.message}`);
    }
  }

  if (!noindex) {
    for (const [key, val] of [
      ['title', title],
      ['description', description],
    ]) {
      if (seen[key].has(val)) issues.push(`zduplikowany ${key} z ${seen[key].get(val)}`);
      else seen[key].set(val, page);
    }
  }

  if (issues.length) {
    problems += issues.length;
    console.log(`\n${page}`);
    issues.forEach((i) => console.log(`  ✗ ${i}`));
  }
}

console.log(`\nSprawdzono ${pages} stron, problemów: ${problems}`);
process.exit(problems ? 1 : 0);
