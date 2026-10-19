# Strona firmy – altany, wiaty, zadaszenia

Statyczna strona-wizytówka zbudowana w **Astro 7 + Tailwind 4**, zoptymalizowana pod SEO i lokalne pozycjonowanie.
Plan projektu i checklista SEO: [`docs/PLAN.md`](docs/PLAN.md).

## Start

```bash
npm install
cp .env.example .env      # klucz formularza
npm run dev               # http://localhost:4321
npm run verify            # typy + build + audyt SEO (title, description, H1, alt, JSON-LD, duplikaty)
```

## Gdzie co zmieniać

| Co | Gdzie |
|---|---|
| Nazwa firmy, telefon, adres, NIP, godziny, oceny | `src/config/site.ts` (+ `site` w `astro.config.mjs`) |
| Usługi (treść, ceny, FAQ) | `src/content/uslugi/*.md` |
| Realizacje | `src/content/realizacje/*.md` + zdjęcia w `src/assets/images/realizacje/` |
| Artykuły poradnika | `src/content/poradnik/*.md` |
| Opinie | `src/content/opinie.json` |
| Miasta (strony lokalne) | `src/data/cities.ts` – każde miasto z **unikalnym** opisem |
| Kolory, fonty | `src/styles/global.css` (`@theme`) |

### Dodanie realizacji
1. Wrzuć zdjęcia do `src/assets/images/realizacje/` (opisowe nazwy, np. `altana-radom-golebiow.jpg`, min. 1600 px szerokości).
2. Skopiuj dowolny plik z `src/content/realizacje/` i zmień dane. Pole `city` = nazwa z `cities.ts`, żeby realizacja pojawiła się na stronie lokalnej.

## ⚠️ Przed publikacją
- Obrazy w `src/assets/images` to **ilustracje zastępcze** – podmień na prawdziwe zdjęcia.
- Dane firmy, ceny, statystyki, **oceny i opinie są przykładowe** – publikowanie zmyślonych opinii/ocen (także w schema.org)
  narusza wytyczne Google i przepisy o nieuczciwych praktykach rynkowych. Zastąp prawdziwymi lub usuń.
- Treści o przepisach budowlanych (poradnik, FAQ) zweryfikuj z aktualnym Prawem budowlanym.
- Polityka prywatności do weryfikacji przez prawnika.

## Deploy
Dowolny hosting statyczny (Cloudflare Pages, Netlify, Vercel): build `npm run build`, katalog `dist/`.
`public/_headers` ustawia nagłówki bezpieczeństwa i cache na Cloudflare/Netlify.
