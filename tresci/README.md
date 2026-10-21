# Treści strony – START TUTAJ

**Wszystkie teksty, ceny i zdjęcia strony są w tym folderze (`tresci/`).** Pliki poza nim to kod – nie trzeba ich ruszać.

- Jak wprowadzić zmianę krok po kroku: **[INSTRUKCJA.md](INSTRUKCJA.md)**
- Gotowe wzory nowych plików: **[_wzory/](_wzory/)**

## Mapa: która strona → który plik

| Strona (adres) | Co zmieniasz | Plik |
|---|---|---|
| Wszystkie strony | telefon, e-mail, adres, godziny, NIP, profile społecznościowe, liczby (5 lat, 16 województw…) | [`firma.yaml`](firma.yaml) |
| Strona główna `/` | wszystkie teksty strony głównej, zdjęcie główne, pytania i odpowiedzi | [`strony/strona-glowna.md`](strony/strona-glowna.md) |
| Wiele stron | sekcja „Jak pracujemy” i ciemny baner „Taras, który staje się drugim salonem” | [`strony/wspolne.md`](strony/wspolne.md) |
| Oferta `/uslugi/` | nagłówek i opis listy usług | [`strony/oferta.md`](strony/oferta.md) |
| Usługa, np. `/uslugi/pergole/` | opis usługi, warianty z cenami „od”, zalety, pytania, zdjęcie | [`uslugi/`](uslugi/) → plik o nazwie z adresu, np. `pergole.md` |
| Realizacje `/realizacje/` | nagłówek i opis listy | [`strony/realizacje.md`](strony/realizacje.md) |
| Realizacja, np. `/realizacje/pergola-lamelowa-krakow-zabierzow/` | opis, dane, zdjęcia | [`realizacje/`](realizacje/) → `pergola-lamelowa-krakow-zabierzow.md` |
| Cennik `/cennik/` | nagłówek, „Co zawsze jest w cenie”, dodatki, pytania | [`strony/cennik.md`](strony/cennik.md) (ceny wariantów: pliki w `uslugi/`) |
| Kalkulator `/kalkulator/` | teksty i pytania | [`strony/kalkulator.md`](strony/kalkulator.md) |
| Kalkulator `/kalkulator/` | **ceny** w kalkulatorze | [`cennik-kalkulatora.yaml`](cennik-kalkulatora.yaml) |
| Poradnik `/poradnik/` | nagłówek i opis listy | [`strony/poradnik.md`](strony/poradnik.md) |
| Artykuł, np. `/poradnik/ile-kosztuje-zadaszenie-tarasu/` | treść artykułu | [`poradnik/`](poradnik/) → `ile-kosztuje-zadaszenie-tarasu.md` |
| Obszar działania `/obszar-dzialania/` | nagłówek, opis, tekst pod listą miast | [`strony/obszar-dzialania.md`](strony/obszar-dzialania.md) |
| Miasto, np. `/obszar-dzialania/krakow/` | opis miasta, dzielnice, lokalne pytania | [`miasta/`](miasta/) → `krakow.md` |
| Każde miasto | teksty wspólne dla stron miast (nagłówki, wspólne pytania) | [`strony/miasta-wspolne.md`](strony/miasta-wspolne.md) |
| O nas `/o-nas/` | teksty i zdjęcie | [`strony/o-nas.md`](strony/o-nas.md) |
| Kontakt `/kontakt/` | nagłówek i opis (dane kontaktowe: `firma.yaml`) | [`strony/kontakt.md`](strony/kontakt.md) |
| Polityka prywatności | cała treść | [`strony/polityka-prywatnosci.md`](strony/polityka-prywatnosci.md) |
| Strona główna, O nas | opinie klientów | [`opinie.yaml`](opinie.yaml) |
| — | wszystkie zdjęcia | [`zdjecia/`](zdjecia/) (podfoldery: `strony`, `uslugi`, `realizacje`, `poradnik`) |

**Zasada:** nazwa pliku = końcówka adresu strony. Strona `/realizacje/zadaszenie-tarasu-z-roleta-radom/` to plik `realizacje/zadaszenie-tarasu-z-roleta-radom.md`.

**Nie wiesz, gdzie jest dany tekst?** Wyszukaj jego fragment – patrz [INSTRUKCJA.md → „Jak znaleźć tekst”](INSTRUKCJA.md#2-jak-znaleźć-tekst).

**Czego tu nie ma:** menu, nagłówki kolumn w stopce, napisy na przyciskach formularza i inne elementy interfejsu – to część kodu. O ich zmianę poproś osobę techniczną.

## Zmienne – wpisują się same

W tekstach można używać zmiennych w nawiasach klamrowych. Strona sama wstawi aktualną wartość:

| Zmienna | Co wstawia | Przykład |
|---|---|---|
| `{rok}` | bieżący rok | Cennik 2026 |
| `{nazwa}` | nazwa firmy z `firma.yaml` | Studio Pergoli |
| `{telefon}` | telefon z `firma.yaml` | +48 600 100 200 |
| `{email}` | e-mail z `firma.yaml` | kontakt@studiopergoli.pl |
| `{dane-firmy}` | nazwa prawna, adres i NIP | Studio Pergoli Sp. z o.o., ul. Ogrodowa 12, 26-600 Radom |
| `{w-siedzibie}` | miasto siedziby w formie „w …” | w Radomiu |
| `{lista-miast}` | wszystkie miasta poza siedzibą | w Warszawie, w Krakowie, … |
| `{miasto}` | *(tylko `miasta-wspolne.md`)* nazwa miasta | Kraków |
| `{w-miescie}` | *(tylko `miasta-wspolne.md`)* miasto w formie „w …” | w Krakowie |
| `{urzad}` | *(tylko `miasta-wspolne.md`)* urząd z pliku miasta | Prezydent Miasta Krakowa – … |

Jeśli tekst **zaczyna się** od zmiennej, ujmij go w cudzysłów: `title: '{miasto} to nasza siedziba'`.

## Jak zbudowany jest plik

Pliki `.md` mają dwie części:

```
---
title: Tytuł strony          ← część z polami (góra pliku, między kreskami ---)
description: Opis dla Google
---

Zwykły tekst strony…          ← treść (pod drugą kreską ---), nie we wszystkich plikach
```

Pliki `.yaml` mają tylko pola (bez kresek).

Linie zaczynające się od `#` w części z polami to **komentarze** – podpowiedzi, które nie pojawiają się na stronie.

### 5 zasad zapisu pól (najczęstsze źródło błędów)

1. **Po dwukropku spacja:** `title: Tekst` (nie `title:Tekst`).
2. **Wcięcia to spacje, nie tabulator** – trzymaj się wcięć z pliku (2 spacje na poziom).
3. **Cudzysłów `'…'`, gdy tekst zawiera dwukropek ze spacją, znak `#` albo zaczyna się od `{`, `'`, `[`, `@`, `-`:**
   `lead: 'Zanim wybierzesz zadaszenie: przepisy i koszty'`. Apostrof wewnątrz takiego tekstu zapisz podwójnie: `'Rock''n''roll'`.
4. **Listy** to linie zaczynające się od `- ` (myślnik i spacja), z tym samym wcięciem.
5. **Puste pole** zapisz jako `''` (dwa apostrofy).

### Treść (pod drugą kreską `---`) – formatowanie

| Wpisujesz | Wychodzi |
|---|---|
| `## Śródtytuł` | śródtytuł |
| `**pogrubienie**` | **pogrubienie** |
| `[tekst linku](/kalkulator/)` | link do strony |
| `- punkt` | punkt listy |
| pusta linia | nowy akapit |

## Zasady treści (ważne dla Google i dla prawa)

- **Opis zdjęcia (`alt`, `coverAlt`, `imageAlt`)** – napisz, co widać na zdjęciu: rodzaj konstrukcji, materiał, kolor, miasto. 10–140 znaków. Np. „Pergola lamelowa w kolorze antracytu nad tarasem domu w Krakowie”.
- **Tytuł dla Google (`seoTitle`) maks. 60 znaków, opis (`description`) maks. 160 znaków** – dłuższe zatrzymają publikację z komunikatem.
- **Opisy miast muszą być różne** – kopiowanie tego samego tekstu z podmienioną nazwą miasta Google traktuje jak spam.
- **Tylko prawdziwe opinie i realizacje.** Zmyślone opinie są niezgodne z prawem (dyrektywa Omnibus). Przykładowe realizacje mają pole `example: true` – usuń je, gdy podmienisz realizację na prawdziwą.
- **Zdjęcia:** JPG, szerokość min. 1600 px, nazwa pliku małymi literami, bez polskich znaków i spacji, opisowa: `pergola-lamelowa-krakow-2.jpg`. Strona sama zmniejszy i skompresuje zdjęcia.
