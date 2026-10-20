// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Strony wykluczone z indeksowania – muszą też mieć <meta name="robots" content="noindex">
const noindex = ['/dziekujemy/', '/404/'];

export default defineConfig({
  // TODO: docelowa domena (musi zgadzać się z site.url w src/config/site.ts)
  site: 'https://www.studiopergoli.pl',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !noindex.some((p) => page.endsWith(p)),
      changefreq: 'weekly',
      i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
