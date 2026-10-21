# Plan projektu – Studio Pergoli (aluminiowe zadaszenia tarasów i pergole)

## Cel
Szybka, nowoczesna strona-wizytówka, której głównym zadaniem jest **pozyskiwanie zapytań z Google**
(organicznie w całej Polsce + Profil Firmy w Google dla siedziby w Radomiu). Każda decyzja techniczna jest podporządkowana SEO i konwersji.

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
/                                   strona główna ("zadaszenia tarasów aluminiowe", "pergole")
/uslugi/                            hub oferty
/uslugi/zadaszenia-tarasow/         ← "zadaszenie tarasu", "zadaszenie tarasu aluminiowe / szkło / poliwęglan"
/uslugi/pergole/                    ← "pergola lamelowa", "pergola aluminiowa", "pergola bioklimatyczna"
/uslugi/zabudowy-tarasu/            ← "zabudowa tarasu", "szklane ściany przesuwne", "shuttersy"
/uslugi/systemy-zacieniajace/       ← "markiza dachowa", "rolety tarasowe"
/kalkulator/                        ← "zadaszenie tarasu cena", "kalkulator zadaszenia"
/realizacje/                        portfolio z filtrami (typ)
/realizacje/[slug]/                 case study: miasto, wymiary, system, wypełnienie, galeria
/cennik/                            ← "zadaszenie tarasu cennik", "pergola lamelowa cena"
/poradnik/                          blog / content marketing
/poradnik/[slug]/                   np. "czy zadaszenie tarasu wymaga pozwolenia"
/obszar-dzialania/                  hub – cała Polska
/obszar-dzialania/[miasto]/         landing ("zadaszenia tarasów Warszawa") – unikalna treść dla każdego miasta
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
      Nazwy plików opisowe: `zadaszenie-tarasu-szklo-warszawa-wilanow.jpg`
- [ ] Min. 10–15 realizacji z miastem w opisie (sygnał lokalny)
- [ ] 1–2 artykuły poradnikowe miesięcznie (lista tematów niżej)
- [ ] Opinie klientów (prawdziwe, z Google)
- [ ] Nazwa, NAP, NIP – wszystko w jednym pliku `tresci/firma.yaml`

### Off-site / lokalne (poza kodem)
- [ ] **Profil Firmy w Google** (siedziba w Radomiu; obszar obsługi: cała Polska; kategorie np. „Wykonawca zadaszeń”, „Producent pergoli” – do weryfikacji w GBP)
- [ ] Google Search Console + Bing Webmaster – zgłoszenie sitemapy
- [ ] Spójny NAP w katalogach: Panorama Firm, pkt.pl, Oferteo, Fixly, Houzz
- [ ] Linki z lokalnych portali, partnerów (tartak, sklepy ogrodnicze, architekci krajobrazu)
- [ ] Prośba o opinię po każdej realizacji (link do Google w SMS/mailu)

## Tematy poradnika (intencja informacyjna → zapytania)
1. Czy zadaszenie tarasu wymaga pozwolenia lub zgłoszenia? (2026) ✅ – do weryfikacji prawnej
2. Ile kosztuje aluminiowe zadaszenie tarasu? ✅
3. Poliwęglan czy szkło na zadaszenie tarasu? ✅
4. Pergola lamelowa (bioklimatyczna) – jak działa i ile kosztuje
5. SMART, T-LINE czy SKYLINE – który system zadaszenia wybrać
6. Zadaszenie tarasu od południa – jak uniknąć przegrzewania (markizy, szkło mleczne)
7. Szklane ściany przesuwne a ogród zimowy – różnice
8. Oświetlenie LED i promienniki ciepła pod zadaszeniem
9. Zadaszenie tarasu w zabudowie szeregowej – formalności i sąsiedzi
10. Jak dbać o aluminiowe zadaszenie i szkło dachowe

## Etapy
1. **Fundament** (ten commit): struktura, design system, komponenty SEO, wszystkie podstrony, przykładowe treści
2. Zdjęcia + nazwa firmy + dane kontaktowe → podmiana w `tresci/firma.yaml` i `tresci/zdjecia`
3. Podpięcie formularza (klucz Web3Forms w `.env`) + analityka (GA4/Plausible przez consent)
4. Deploy, domena, Search Console, Profil Firmy w Google
5. Ciągłe: realizacje, poradnik, opinie, monitoring pozycji
