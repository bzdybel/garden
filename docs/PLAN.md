# Plan projektu – strona firmy budującej altany, wiaty i zadaszenia

## Cel
Szybka, nowoczesna strona-wizytówka, której głównym zadaniem jest **pozyskiwanie zapytań z Google**
(organicznie + mapy/lokalnie). Każda decyzja techniczna jest podporządkowana SEO i konwersji.

## Stack
| Element | Wybór | Dlaczego |
|---|---|---|
| Framework | **Astro 7** (output statyczny) | czysty HTML, ~0 KB JS, najlepsze Core Web Vitals |
| Style | Tailwind CSS 4 | mały CSS, szybki development |
| Treści | Content Collections (Markdown) | realizacje i poradnik dodaje się jako pliki `.md` |
| Obrazy | `astro:assets` + sharp | automatyczne AVIF/WebP, `srcset`, wymiary (brak CLS) |
| Fonty | Fontsource (self-hosted) | brak zapytań do Google Fonts, RODO, szybkość |
| Formularz | dowolny endpoint (Web3Forms / Formspree / własny) | statyczny hosting, progressive enhancement |
| Hosting | Cloudflare Pages / Netlify / Vercel | CDN, HTTPS, nagłówki z `public/_headers` |

## Architektura informacji (URL-e = słowa kluczowe)
```
/                                   strona główna (altany, wiaty, zadaszenia + miasto)
/uslugi/                            hub usług
/uslugi/altany-ogrodowe/            ← "altany ogrodowe", "altana drewniana na wymiar"
/uslugi/wiaty-samochodowe/          ← "wiata samochodowa", "wiata garażowa drewniana"
/uslugi/zadaszenia-tarasow/         ← "zadaszenie tarasu", "zadaszenie tarasu drewniane"
/uslugi/pergole/                    ← "pergola drewniana", "pergola ogrodowa"
/uslugi/wiaty-smietnikowe-drewutnie/← "wiata śmietnikowa", "drewutnia"
/realizacje/                        portfolio z filtrami (typ)
/realizacje/[slug]/                 case study: miasto, wymiary, drewno, galeria
/cennik/                            ← "altana ogrodowa cena", "ile kosztuje wiata"
/poradnik/                          blog / content marketing
/poradnik/[slug]/                   np. "czy altana wymaga pozwolenia na budowę"
/obszar-dzialania/                  hub lokalny
/obszar-dzialania/[miasto]/         landing lokalny ("altany ogrodowe Radom")
/o-nas/  /kontakt/  /polityka-prywatnosci/  /dziekujemy/ (noindex)
```

## SEO – checklista
### Techniczne (zrobione w kodzie)
- [x] Statyczny HTML, brak JS blokującego render, preload fontu
- [x] `<title>` / meta description / canonical na każdej stronie (komponent `Seo`)
- [x] Open Graph + Twitter Card, domyślny obraz OG
- [x] `sitemap-index.xml` (z wykluczeniem stron noindex) + `robots.txt`
- [x] Dane strukturalne JSON-LD:
  `HomeAndConstructionBusiness` (NAP, godziny, obszar, oceny), `WebSite`, `BreadcrumbList`,
  `Service` + `Offer` (cena od), `FAQPage`, `Article` (poradnik), `CreativeWork` (realizacje)
- [x] Okruszki (breadcrumbs) widoczne + w schema
- [x] Semantyczny HTML, 1×H1, hierarchia nagłówków, `lang="pl"`
- [x] Obrazy AVIF/WebP z `width/height`, `alt`, lazy loading poza first view
- [x] Linkowanie wewnętrzne: usługa ↔ realizacje ↔ poradnik ↔ miasta
- [x] Strona 404, spójne końcowe `/` w URL-ach
- [x] Nagłówki cache/bezpieczeństwa (`public/_headers`)
- [x] Manifest, favicon SVG, `theme-color`

### Treść (do uzupełnienia przez firmę)
- [ ] **Prawdziwe zdjęcia realizacji** – najważniejszy czynnik zaufania i konwersji.
      Nazwy plików opisowe: `altana-drewniana-radom-golebiow.jpg`
- [ ] Min. 10–15 realizacji z miastem w opisie (sygnał lokalny)
- [ ] 1–2 artykuły poradnikowe miesięcznie (lista tematów niżej)
- [ ] Opinie klientów (prawdziwe, z Google)
- [ ] Nazwa, NAP, NIP – wszystko w jednym pliku `src/config/site.ts`

### Off-site / lokalne (poza kodem)
- [ ] **Profil Firmy w Google** (kategoria: „Wykonawca altan”/„Stolarz”, zdjęcia, posty, opinie)
- [ ] Google Search Console + Bing Webmaster – zgłoszenie sitemapy
- [ ] Spójny NAP w katalogach: Panorama Firm, pkt.pl, Oferteo, Fixly, Houzz
- [ ] Linki z lokalnych portali, partnerów (tartak, sklepy ogrodnicze, architekci krajobrazu)
- [ ] Prośba o opinię po każdej realizacji (link do Google w SMS/mailu)

## Tematy poradnika (intencja informacyjna → zapytania)
1. Czy altana wymaga pozwolenia na budowę? (2026) ✅
2. Ile kosztuje altana ogrodowa? Cennik i co wpływa na cenę ✅
3. Wiata garażowa czy garaż – co się bardziej opłaca? ✅
4. Jakie drewno na altanę: świerk, modrzew, KVH, BSH
5. Zadaszenie tarasu: poliwęglan, szkło czy blacha?
6. Jak zabezpieczyć drewnianą altanę na zimę
7. Pergola bioklimatyczna vs drewniana
8. Wiata śmietnikowa – przepisy i odległości od granicy działki
9. Fundament pod altanę: stopy betonowe, kotwy, wkręty
10. Altana z grillem / kuchnią letnią – inspiracje

## Etapy
1. **Fundament** (ten commit): struktura, design system, komponenty SEO, wszystkie podstrony, przykładowe treści
2. Zdjęcia + nazwa firmy + dane kontaktowe → podmiana w `site.ts` i `src/assets`
3. Podpięcie formularza (klucz Web3Forms w `.env`) + analityka (GA4/Plausible przez consent)
4. Deploy, domena, Search Console, Profil Firmy w Google
5. Ciągłe: realizacje, poradnik, opinie, monitoring pozycji
