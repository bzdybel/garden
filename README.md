# Studio Pergoli – aluminiowe zadaszenia tarasów i pergole

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

**Wszystkie treści, ceny i zdjęcia są w katalogu [`tresci/`](tresci/)** – edytuje je także klient, przez przeglądarkę na GitHubie.
Mapa „strona → plik”: [`tresci/README.md`](tresci/README.md), instrukcja dla klienta: [`tresci/INSTRUKCJA.md`](tresci/INSTRUKCJA.md),
konfiguracja GitHuba pod edycję przez klienta: [`docs/EDYCJA-TRESCI-SETUP.md`](docs/EDYCJA-TRESCI-SETUP.md).

| Co | Gdzie |
|---|---|
| Dane firmy (NAP, NIP, godziny, oceny, profile, statystyki) | `tresci/firma.yaml` |
| Teksty stron (strona główna, O nas, cennik, kalkulator…) | `tresci/strony/*.md` |
| Usługi, realizacje, artykuły, miasta | `tresci/uslugi/`, `tresci/realizacje/`, `tresci/poradnik/`, `tresci/miasta/` |
| Opinie | `tresci/opinie.yaml` (sekcja włączana flagą `rating.published` w `firma.yaml`) |
| Cennik kalkulatora | `tresci/cennik-kalkulatora.yaml` |
| Zdjęcia | `tresci/zdjecia/` |
| Schematy i walidacja treści (komunikaty po polsku) | `src/content.config.ts` |
| Zmienne w tekstach (`{rok}`, `{telefon}`, `{w-miescie}`…) | `src/lib/tresci.ts` (lista także w `tresci/README.md`) |
| Domena, endpoint formularza | `src/config/site.ts` + `site` w `astro.config.mjs` |
| Ilustracje zastępcze i ikony marki | `node scripts/generate-placeholders.mjs --force` (**usuwa** zdjęcia w `tresci/zdjecia/`) |
| Kolory (złoty akcent), fonty (Instrument Serif + Figtree) | `src/styles/global.css` (`@theme`) |

Zasada: tekst widoczny na stronie należy do `tresci/`, a nie do plików `.astro`. Wyjątek to elementy interfejsu
(menu, etykiety formularzy, przyciski) – zostają w komponentach.

`npm run sprawdz` buduje stronę i tłumaczy błędy w treściach na polski; to samo uruchamia GitHub Actions
(`.github/workflows/sprawdz-tresci.yml`) dla każdego Pull Requesta, z adnotacją przy błędnej linii pliku.

## ⚠️ Przed publikacją
- Obrazy w `tresci/zdjecia` to **ilustracje zastępcze** – podmień na prawdziwe zdjęcia.
- Domena `studiopergoli.pl` – potwierdzić rejestrację; dane firmy (adres, NIP, telefon) w `tresci/firma.yaml` są przykładowe. Lista danych do zebrania: [`docs/DANE-OD-KLIENTA.md`](docs/DANE-OD-KLIENTA.md).
- **Realizacje w `tresci/realizacje/` i opinie są przykładowe** (`example: true` / „PRZYKŁAD”) – zastąp prawdziwymi.
- Ceny w usługach, cenniku, kalkulatorze i artykule o cenach są poglądowe.
- Dane firmy, ceny, statystyki, **oceny i opinie są przykładowe** – publikowanie zmyślonych opinii/ocen (także w schema.org)
  narusza wytyczne Google i przepisy o nieuczciwych praktykach rynkowych. Zastąp prawdziwymi lub usuń.
- Treści o przepisach budowlanych (poradnik, FAQ) zweryfikuj z aktualnym Prawem budowlanym.
- Polityka prywatności do weryfikacji przez prawnika.

## Deploy – Cloudflare Workers (statyczne assety)
Projekt podłączony do repozytorium GitHub (Workers Builds) – każdy push do `main` wdraża się automatycznie.
Konfiguracja wdrożenia jest w `wrangler.jsonc` (katalog `dist`, strona 404, ukośniki na końcu adresów).

| Ustawienie | Wartość |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Zmienne środowiskowe (build) | `PUBLIC_WEB3FORMS_KEY` (klucz formularza) |

Pole `name` w `wrangler.jsonc` musi zgadzać się z nazwą Workera w panelu Cloudflare.
Wersję Node wskazuje plik `.node-version`. `public/_headers` ustawia nagłówki bezpieczeństwa i cache,
a adresom `*.workers.dev` i `*.pages.dev` dodaje `X-Robots-Tag: noindex` – indeksowana ma być tylko docelowa domena.
