// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync } from 'node:fs';

// Strony wykluczone z indeksowania – muszą też mieć <meta name="robots" content="noindex">
const noindex = ['/dziekujemy/', '/404/'];

// Frontmatter realizacji i poradnika: daty do <lastmod> oraz przykładowe realizacje (noindex) do wykluczenia z mapy
/** @param {string} collection */
const entries = (collection) =>
  readdirSync(`./tresci/${collection}`)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = readFileSync(`./tresci/${collection}/${f}`, 'utf8').split('---')[1] ?? '';
      /** @param {string} name */
      const field = (name) => fm.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1].trim();
      return { path: `/${collection}/${f.replace(/\.md$/, '')}/`, date: field('updated') ?? field('published') ?? field('date'), example: field('example') === 'true' };
    });
const content = [...entries('realizacje'), ...entries('poradnik')];
for (const e of content) if (e.example) noindex.push(e.path);
const lastmod = new Map(content.flatMap((e) => (e.date ? [[e.path, new Date(e.date).toISOString()]] : [])));

export default defineConfig({
  // TODO: docelowa domena (musi zgadzać się z site.url w src/config/site.ts)
  site: 'https://www.studiopergoli.pl',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !noindex.some((p) => page.endsWith(p)),
      // changefreq/priority Google ignoruje – podajemy tylko prawdziwe daty zmian treści
      serialize: (item) => {
        const date = lastmod.get(new URL(item.url).pathname);
        return date ? { ...item, lastmod: date } : item;
      },
      i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
