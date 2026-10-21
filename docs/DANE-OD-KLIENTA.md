# Dane do zebrania od klienta – Studio Pergoli

Lista wszystkiego, czego strona potrzebuje przed startem na www.studiopergoli.pl.
Kolejność = priorytet. Gdzie dane trafiają w kodzie – kolumna „Plik”.

## 1. Dane firmy (blokuje start)

| # | Informacja | Uwagi | Plik |
|---|---|---|---|
| 1.1 | Pełna nazwa prawna i forma prawna (sp. z o.o., JDG…) | Musi zgadzać się z KRS/CEIDG | `src/config/site.ts` → `legalName` |
| 1.2 | NIP (oraz REGON / KRS, jeśli są) | Dziś `0000000000` – ukryty na stronie do czasu podania | `site.ts` → `nip` |
| 1.3 | Adres siedziby (ulica, kod, miasto) | Identyczny jak w Profilu Firmy w Google | `site.ts` → `address` |
| 1.4 | Czy pod adresem przyjmowani są klienci (showroom)? | Decyduje, czy w Google pokazujemy adres, czy tylko obszar działania | `site.ts` |
| 1.5 | Główny numer telefonu | Dziś zastępczy `+48 600 100 200` | `site.ts` → `phone` |
| 1.6 | Adres e-mail do zapytań | Dziś `kontakt@studiopergoli.pl` | `site.ts` → `email` |
| 1.7 | Godziny otwarcia / kontaktu | Dziś pn–pt 8–17, sob 9–13 | `site.ts` → `openingHours` |
| 1.8 | Rok założenia firmy | Ukryty w danych strukturalnych do czasu potwierdzenia | `site.ts` → `foundingYear` |
| 1.9 | Domena: czy studiopergoli.pl jest zarejestrowana i kto ma dostęp do DNS | Potrzebne do podpięcia w Cloudflare | `astro.config.mjs`, `site.ts` |

## 2. Profile i konta (blokuje local SEO)

| # | Informacja | Uwagi |
|---|---|---|
| 2.1 | Link do Profilu Firmy w Google (albo zgoda na założenie) | Kategorie, obszar obsługi, zdjęcia – patrz checklista w audycie |
| 2.2 | Linki do Facebooka, Instagrama, YouTube, Houzz, LinkedIn (jeśli są) | Dziś ukryte – puste linki zostały usunięte |
| 2.3 | Dostęp do Google Search Console i Bing Webmaster (lub zgoda na założenie) | Zgłoszenie sitemapy po starcie |
| 2.4 | Klucz Web3Forms (lub inny adres, na który mają przychodzić zapytania z formularza) | `.env` → `PUBLIC_WEB3FORMS_KEY` |
| 2.5 | Czy firma jest w katalogach (Panorama Firm, pkt.pl, Oferteo, Fixly, aleo)? Jakie dane tam widnieją? | NAP musi być wszędzie identyczny |

## 3. Realizacje (najważniejsze dla zaufania i pozycji)

Obecnie na stronie jest 6 **przykładowych** realizacji – oznaczonych na stronie jako przykład i wyłączonych z indeksowania.
Docelowo minimum 10–15 prawdziwych. Dla każdej:

- [ ] miasto / dzielnica (za zgodą klienta)
- [ ] data montażu (miesiąc i rok)
- [ ] typ: zadaszenie / pergola / zabudowa / zacienienie
- [ ] system i kolor (np. SMART, RAL 7016)
- [ ] wymiary (np. 6 × 4 m)
- [ ] wypełnienie dachu (szkło 4.4.2, poliwęglan…)
- [ ] dodatki (LED, markiza, ściany przesuwne, promiennik)
- [ ] czas montażu
- [ ] 2–3 zdania: problem klienta → rozwiązanie
- [ ] 3–6 zdjęć (oryginały, min. 1600 px szerokości, opisowe nazwy plików, najlepiej także zdjęcie „przed”)
- [ ] opcjonalnie: cytat klienta z imieniem i inicjałem + zgoda na publikację

Priorytetowo: realizacje z miast, które mają podstrony (Warszawa, Kraków, Łódź, Wrocław, Poznań, Gdańsk, Katowice, Lublin, Kielce, Radom).

## 4. Opinie klientów

- [ ] Prawdziwe opinie (najlepiej z Profilu Firmy w Google): treść, imię + inicjał, miasto, data, ocena
- [ ] Aktualna średnia ocen i liczba opinii w Google
- Bez prawdziwych opinii sekcja i ocena w Google pozostają wyłączone (dyrektywa Omnibus, wytyczne Google).

## 5. Ceny i oferta

| # | Informacja | Plik |
|---|---|---|
| 5.1 | Prawdziwy cennik zadaszenia SMART (tabela szerokość × głębokość × wypełnienie) – dziś wartości poglądowe | `src/data/kalkulator.ts` |
| 5.2 | Ceny „od” dla: zadaszeń, pergoli, zabudów, systemów zacieniających | `src/content/uslugi/*.md` → `priceFrom` |
| 5.3 | Ceny dodatków (LED, markiza, ściany szklane, promiennik, transport) | `src/pages/cennik.astro` |
| 5.4 | Producent / dostawca profili i systemów (nazwy SMART, T-LINE, SKYLINE – czyje to systemy?) | treści usług |
| 5.5 | Gwarancja: na co i na ile (konstrukcja, lakier, automatyka, montaż) | `site.ts` → `stats` |
| 5.6 | Obciążenie śniegiem / wiatrem, certyfikaty, deklaracje właściwości użytkowych | wiarygodność + nowy poradnik |
| 5.7 | Realny czas od zamówienia do montażu, warunki płatności (zaliczka?) | FAQ, cennik |
| 5.8 | Czy firma robi coś z drewna lub łączy aluminium z drewnem / okładzinami drewnopodobnymi? | frazy „drewniane” (ok. 19K/mies.) |
| 5.9 | Czy montujecie pergole na balkonach? | fraza „pergola na balkon” |

## 6. Ludzie i firma (E-E-A-T)

- [ ] Właściciel / zespół: imię i nazwisko, rola, doświadczenie (lata, liczba realizacji), zdjęcie – do strony O nas i jako autor poradników
- [ ] Historia firmy w 3–5 zdaniach (skąd, od kiedy, ile realizacji)
- [ ] Liczba wykonanych realizacji (prawdziwa – można ją pokazać jako statystykę)
- [ ] Certyfikaty, szkolenia producentów, członkostwa, nagrody
- [ ] Zdjęcia zespołu przy pracy, warsztatu / magazynu, samochodów firmowych

## 7. Teksty do weryfikacji przez klienta lub specjalistę

- [ ] Artykuł „Czy zadaszenie tarasu wymaga pozwolenia” – weryfikacja przez architekta lub prawnika (progi m², podstawa prawna, nowelizacja od 7.01.2026)
- [ ] Polityka prywatności – weryfikacja przez prawnika (administrator, podstawy, odbiorcy, cookies)
- [ ] Opisy miast (`src/data/cities.ts`) – czy dzielnice i okoliczne miejscowości się zgadzają, czy firma faktycznie tam montowała
- [ ] Lista miast: czy dodać / usunąć któreś

## 8. Media

- [ ] Zdjęcie główne strony (hero) – najlepiej prawdziwa realizacja wieczorem z LED, poziome, min. 2560 px
- [ ] Zdjęcia do kart usług (zadaszenia, pergole, zabudowy, zacienienie)
- [ ] Logo w wersji wektorowej (SVG)
- [ ] Opcjonalnie wideo: ruch lamel pergoli, montaż (15–60 s) – świetnie działa w Google i AI
