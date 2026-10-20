# Zadaszenia Premium – aluminiowe zadaszenia tarasów i pergole

Statyczna strona-wizytówka zbudowana w **Astro 7 + Tailwind 4**, zoptymalizowana pod SEO. Siedziba w Radomiu, zasięg: cała Polska.
Źródło wiedzy o ofercie: `Katalog.pdf` (systemy SMART, T-LINE, SKYLINE, pergole, wypełnienia, zacienienie, automatyka).
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
| Opinie | `src/content/opinie.json` (sekcja włączana flagą `rating.published` w `site.ts`) |
| Cennik kalkulatora | `src/data/kalkulator.ts` |
| Ilustracje zastępcze i ikony marki | `node scripts/generate-placeholders.mjs` |
| Miasta (strony lokalne) | `src/data/cities.ts` – każde miasto z **unikalnym** opisem |
| Kolory (złoty akcent), fonty (Instrument Serif + Figtree) | `src/styles/global.css` (`@theme`) |

### Dodanie realizacji
1. Wrzuć zdjęcia do `src/assets/images/realizacje/` (opisowe nazwy, np. `zadaszenie-tarasu-szklo-warszawa-wilanow.jpg`, min. 1600 px szerokości).
2. Skopiuj dowolny plik z `src/content/realizacje/` i zmień dane. Pole `city` = nazwa z `cities.ts`, żeby realizacja pojawiła się na stronie lokalnej.

## ⚠️ Przed publikacją
- Obrazy w `src/assets/images` to **ilustracje zastępcze** – podmień na prawdziwe zdjęcia.
- Domena `zadaszeniapremium.pl` – potwierdzić rejestrację; dane firmy (adres, NIP, telefon) w `site.ts` są przykładowe.
- **Realizacje w `src/content/realizacje/` i opinie są przykładowe** (oznaczone „PRZYKŁAD”) – zastąp prawdziwymi.
- Ceny w usługach, cenniku, kalkulatorze i artykule o cenach są poglądowe.
- Dane firmy, ceny, statystyki, **oceny i opinie są przykładowe** – publikowanie zmyślonych opinii/ocen (także w schema.org)
  narusza wytyczne Google i przepisy o nieuczciwych praktykach rynkowych. Zastąp prawdziwymi lub usuń.
- Treści o przepisach budowlanych (poradnik, FAQ) zweryfikuj z aktualnym Prawem budowlanym.
- Polityka prywatności do weryfikacji przez prawnika.

## Deploy – Cloudflare Pages
Projekt podłączony do repozytorium GitHub – każdy push do `main` wdraża się automatycznie.

| Ustawienie | Wartość |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Zmienne środowiskowe | `PUBLIC_WEB3FORMS_KEY` (klucz formularza) |

Wersję Node wskazuje plik `.node-version`. `public/_headers` ustawia nagłówki bezpieczeństwa i cache,
a adresom `*.pages.dev` dodaje `X-Robots-Tag: noindex` – indeksowana ma być tylko docelowa domena.
