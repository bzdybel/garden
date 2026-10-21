# Instrukcja edycji treści – krok po kroku

Stronę edytujesz w przeglądarce, na GitHubie – bez instalowania czegokolwiek. Każda zmiana przechodzi tę samą drogę:

```
edycja pliku  →  propozycja zmiany (Pull Request)  →  automatyczne sprawdzenie + podgląd  →  publikacja
```

Dopóki nie klikniesz „Merge”, nic nie zmienia się na prawdziwej stronie. Jeśli w pliku jest błąd, publikacja jest **zablokowana** i strona działa dalej w starej wersji – nie da się jej „zepsuć”.

> GitHub ma menu po angielsku. Nazwy przycisków podajemy w cudzysłowach dokładnie tak, jak je zobaczysz, np. „Commit changes…”.

**Spis treści**
1. [Pierwsze kroki (jednorazowo)](#1-pierwsze-kroki-jednorazowo)
2. [Jak znaleźć tekst](#2-jak-znaleźć-tekst)
3. [Zmiana tekstu w jednym pliku](#3-zmiana-tekstu-w-jednym-pliku)
4. [Sprawdzenie i podgląd przed publikacją](#4-sprawdzenie-i-podgląd-przed-publikacją)
5. [Publikacja](#5-publikacja)
6. [Zmiana w kilku plikach naraz (np. nowa realizacja ze zdjęciami)](#6-zmiana-w-kilku-plikach-naraz)
7. [Przepisy: najczęstsze zadania](#7-przepisy-najczęstsze-zadania)
8. [Coś poszło nie tak](#8-coś-poszło-nie-tak)

---

## 1. Pierwsze kroki (jednorazowo)

1. Załóż bezpłatne konto na [github.com](https://github.com/signup) (jeśli go nie masz) i podaj nazwę użytkownika osobie technicznej.
2. Otwórz e-mail z zaproszeniem do repozytorium **bzdybel/garden** i kliknij „Accept invitation”.
3. Dodaj do zakładek folder z treściami: **https://github.com/bzdybel/garden/tree/main/tresci**
   Pod listą plików zobaczysz **mapę strony** (plik README) – pokazuje, który plik odpowiada której stronie.

## 2. Jak znaleźć tekst

**Sposób 1 – mapa.** W folderze `tresci` przewiń w dół do tabeli „Mapa: która strona → który plik”. Zasada: końcówka adresu strony = nazwa pliku, np. strona `…/uslugi/pergole/` → plik `tresci/uslugi/pergole.md`.

**Sposób 2 – wyszukiwanie fragmentu tekstu** (gdy pamiętasz, co jest napisane na stronie):
1. Kliknij pole wyszukiwania na górze GitHuba („Type / to search”).
2. Wpisz: `repo:bzdybel/garden path:tresci "fragment tekstu ze strony"` – np. `repo:bzdybel/garden path:tresci "drugim salonem"`.
3. Naciśnij Enter. Zobaczysz pliki z tym fragmentem – kliknij plik, by go otworzyć.

Wpisuj krótki, charakterystyczny fragment (3–4 słowa). Wyszukiwarka nie znajdzie tekstów, które strona wstawia sama ze zmiennych (np. `{telefon}`) – te zmieniasz w `firma.yaml`.

**Sposób 3 – szukanie w otwartym pliku:** `Ctrl + F` (Mac: `Cmd + F`).

## 3. Zmiana tekstu w jednym pliku

Przykład: zmiana ceny dodatku w cenniku.

1. Otwórz plik, np. `tresci/strony/cennik.md`.
2. Kliknij ikonę **ołówka** („Edit this file”) w prawym górnym rogu podglądu pliku.
3. Popraw tekst. Trzymaj się [zasad zapisu](README.md#5-zasad-zapisu-pól-najczęstsze-źródło-błędów) – zwłaszcza spacji po dwukropku i wcięć.
4. Kliknij zielony przycisk **„Commit changes…”** (prawy górny róg).
5. W okienku:
   - w polu „Commit message” wpisz krótko, co zmieniasz, np. `Nowa cena oświetlenia LED`,
   - zaznacz **„Create a new branch for this commit and start a pull request”** (jeśli widzisz wybór),
   - kliknij **„Propose changes”**.
6. Na następnym ekranie kliknij zielone **„Create pull request”**.

Gotowe – właśnie powstała **propozycja zmiany** (Pull Request). Przejdź do kroku 4.

## 4. Sprawdzenie i podgląd przed publikacją

Na stronie Pull Requesta poczekaj 2–4 minuty. Pojawią się dwie rzeczy:

**A. Wynik sprawdzenia** (dół strony, sekcja z checkami):
- ✅ zielony – wszystko w porządku,
- ❌ czerwony – w pliku jest błąd. Kliknij „Details” przy „Sprawdź treści” – zobaczysz po polsku, który plik i które pole poprawić. Błędne miejsce jest też zaznaczone w zakładce „Files changed”. Co dalej: [rozdział 8](#8-coś-poszło-nie-tak).

**B. Podgląd strony** – komentarz od „cloudflare-workers-and-pages” z linkiem **„Preview URL”**, np.
`https://nazwa-galezi-studio-pergoli.bartlomiej-zdybel.workers.dev`
Otwórz link i sprawdź zmianę dokładnie tak, jak będzie wyglądać na stronie (także na telefonie). Podgląd nie jest widoczny w Google.

Chcesz jeszcze coś poprawić w tej samej propozycji? Zakładka **„Files changed”** → przy pliku menu **„…”** → **„Edit file”** → popraw → „Commit changes…” → **„Commit directly to the … branch”** (zostaw gałąź tej propozycji). Sprawdzenie i podgląd odświeżą się same.

## 5. Publikacja

Gdy sprawdzenie jest zielone, a podgląd wygląda dobrze:

1. Na stronie Pull Requesta kliknij **„Merge pull request”**, a potem **„Confirm merge”**.
   *Jeśli przycisk jest szary z informacją o wymaganej akceptacji (review) – zmianę zatwierdza osoba techniczna; poczekaj na nią.*
2. Kliknij **„Delete branch”** (porządek – gałąź nie jest już potrzebna).
3. Po 2–3 minutach zmiana jest na **www.studiopergoli.pl**. Jeśli nie widzisz zmiany, odśwież stronę z pominięciem pamięci przeglądarki: `Ctrl + Shift + R` (Mac: `Cmd + Shift + R`).

## 6. Zmiana w kilku plikach naraz

Przykład: **nowa realizacja** = kilka zdjęć + jeden plik z opisem. Wszystko trafia do jednej propozycji zmiany.

**Krok 1 – utwórz własną gałąź (roboczą kopię):**
1. Otwórz https://github.com/bzdybel/garden
2. Kliknij przycisk z nazwą gałęzi **„main”** (lewy górny róg nad listą plików).
3. Wpisz nazwę, np. `realizacja-wilanow` (małe litery, bez spacji) i kliknij **„Create branch realizacja-wilanow from main”**.
4. Sprawdź, że przycisk pokazuje teraz `realizacja-wilanow`. Wszystkie dalsze kroki rób na tej gałęzi.

**Krok 2 – wgraj zdjęcia:**
1. Wejdź do folderu `tresci/zdjecia/realizacje`.
2. Kliknij **„Add file”** → **„Upload files”**.
3. Przeciągnij zdjęcia (nazwy: małe litery, bez polskich znaków i spacji, np. `zadaszenie-szklo-wilanow.jpg`, `zadaszenie-szklo-wilanow-2.jpg`).
4. Na dole zostaw zaznaczone **„Commit directly to the realizacja-wilanow branch”** i kliknij **„Commit changes”**.

**Krok 3 – utwórz plik realizacji ze wzoru:**
1. Otwórz `tresci/_wzory/realizacja.md` i kliknij ikonę **„Copy raw file”** (dwa prostokąty, prawy górny róg podglądu).
2. Wejdź do folderu `tresci/realizacje` → **„Add file”** → **„Create new file”**.
3. W polu nazwy wpisz np. `zadaszenie-szklo-wilanow.md` – to będzie adres strony.
4. Wklej wzór (`Ctrl + V`) i uzupełnij pola. Nazwy zdjęć wpisz dokładnie takie, jak wgrane w kroku 2.
5. **„Commit changes…”** → **„Commit directly to the realizacja-wilanow branch”** → **„Commit changes”**.

**Krok 4 – utwórz propozycję zmiany:**
1. Wróć na https://github.com/bzdybel/garden – na górze pojawi się żółty pasek „realizacja-wilanow had recent pushes”.
2. Kliknij **„Compare & pull request”**, a potem **„Create pull request”**.
3. Dalej jak w [rozdziale 4](#4-sprawdzenie-i-podgląd-przed-publikacją) i [5](#5-publikacja).

## 7. Przepisy: najczęstsze zadania

| Zadanie | Co zrobić |
|---|---|
| **Zmiana telefonu, e-maila, adresu, godzin** | `tresci/firma.yaml` – zmiana pojawi się na wszystkich stronach naraz. |
| **Uzupełnienie NIP-u, profili Facebook/Instagram/Google** | `tresci/firma.yaml` – pola `nip`, `social`. Pełne adresy profili, np. `https://www.facebook.com/studiopergoli`. Puste pole = ukryte na stronie. |
| **Zmiana cen w kalkulatorze** | `tresci/cennik-kalkulatora.yaml` – każdy wiersz to głębokość, w nawiasie ceny dla kolejnych szerokości. Zmieniaj tylko liczby. |
| **Zmiana ceny „od” usługi** | `tresci/uslugi/<usługa>.md` – pole `priceFrom` (kafel usługi) i `priceFrom` w `variants` (cennik). Liczba bez spacji i „zł”: `19900`. |
| **Zmiana cen dodatków** | `tresci/strony/cennik.md` – sekcja `extras`. |
| **Nowa realizacja** | [rozdział 6](#6-zmiana-w-kilku-plikach-naraz), wzór `tresci/_wzory/realizacja.md`. Miasto wpisz tak jak w `tresci/miasta` (np. `Kraków`) – realizacja pokaże się też na stronie miasta. |
| **Podmiana realizacji przykładowej na prawdziwą** | Otwórz plik w `tresci/realizacje`, wpisz prawdziwe dane i zdjęcia, **usuń linię `example: true`** (oraz komentarz „PRZYKŁAD” nad nią). |
| **Wymiana zdjęcia na nowe pod tą samą nazwą** | Wgraj plik o **identycznej nazwie** do tego samego folderu („Add file” → „Upload files”) – zastąpi stary. Popraw opis zdjęcia (alt), jeśli zdjęcie pokazuje coś innego. |
| **Usunięcie realizacji** | Otwórz plik realizacji → menu **„…”** (prawy górny róg) → **„Delete file”**. Usuń też jej zdjęcia z `tresci/zdjecia/realizacje`. Sprawdź, czy realizacja nie jest wskazana w `tresci/opinie.yaml` (pole `project`). |
| **Nowy artykuł w poradniku** | Jak nowa realizacja, ze wzorem `tresci/_wzory/artykul.md`, plik do `tresci/poradnik`, zdjęcie do `tresci/zdjecia/poradnik`. |
| **Nowe miasto** | Wzór `tresci/_wzory/miasto.md`, plik do `tresci/miasta`. Opis musi być unikalny. |
| **Dodanie opinii** | `tresci/opinie.yaml` – skopiuj cały blok jednej opinii (od `- id:` do `project:`), wklej na końcu, zmień `id` na kolejny (np. `r4`) i uzupełnij. **Tylko prawdziwe opinie.** |
| **Włączenie sekcji opinii i gwiazdek w Google** | `tresci/firma.yaml` → `rating`: wpisz aktualną średnią (`value`) i liczbę opinii z Google (`count`), ustaw `published: true`. Najpierw zastąp przykładowe opinie w `opinie.yaml` prawdziwymi. |
| **Zmiana pytań i odpowiedzi (FAQ)** | Sekcja `faq` w pliku danej strony. Pytanie `q:`, odpowiedź `a:` – zachowaj wcięcia jak w istniejących pytaniach. |
| **Zmiana zdjęcia głównego strony** | Wgraj nowe zdjęcie do `tresci/zdjecia/strony` i wpisz jego nazwę w `tresci/strony/strona-glowna.md` → `hero` → `image`, opisz je w `imageAlt`. |

## 8. Coś poszło nie tak

### Czerwony ❌ przy „Sprawdź treści”

1. Kliknij **„Details”** przy czerwonym sprawdzeniu – na górze zobaczysz listę błędów po polsku z nazwą pliku.
2. Popraw plik **w tej samej propozycji** (zakładka „Files changed” → „…” → „Edit file” → „Commit directly to the … branch”).
3. Sprawdzenie uruchomi się samo. Powtarzaj, aż będzie zielone.

| Komunikat zawiera | Co poprawić |
|---|---|
| „Błąd zapisu w linii N” | W linii N jest dwukropek, `#` lub `{` w tekście bez cudzysłowu albo złe wcięcie. Ujmij tekst w `'…'` lub wyrównaj wcięcie do linii powyżej (spacjami). |
| „Nie znaleziono zdjęcia” | Nazwa zdjęcia w pliku różni się od nazwy wgranego pliku (wielkość liter, `.jpg` vs `.jpeg`, literówka) albo zdjęcie nie zostało wgrane na tę gałąź. |
| „Opis zdjęcia (alt) jest za krótki / za długi” | Opisz zdjęcie w 10–140 znakach. |
| „Tytuł dla Google może mieć maks. 60 znaków” / „Opis … 160 znaków” | Skróć `seoTitle` / `description`. |
| „brakuje tego pola” / „oczekiwano …, otrzymano undefined” | Brakuje wymaganego pola (jego nazwa jest na początku komunikatu) – sprawdź, czy nie usunąłeś linii lub nie zmieniłeś nazwy pola przed dwukropkiem. |
| „Nieprawidłowa opcja: oczekiwano jednej z …” | Wpisz jedną z wartości podanych w komunikacie (np. przy `service` albo `icon`). |
| „NIP: 10 cyfr…”, „Kod pocztowy…”, „Telefon…” | Popraw format zgodnie z komunikatem. |
| „ma inne wymiary niż pierwsze wypełnienie” | W `cennik-kalkulatora.yaml` każde wypełnienie musi mieć te same głębokości i szerokości. |
| Coś innego / nie wiesz | Wyślij osobie technicznej link do Pull Requesta. |

### Zmiana jest już opublikowana, a jest błędna

Najszybciej: otwórz zamknięty Pull Request tej zmiany (zakładka „Pull requests” → „Closed”) i kliknij **„Revert”** → **„Create pull request”** → po zielonym sprawdzeniu **„Merge pull request”**. Strona wróci do poprzedniej wersji, a Ty możesz spokojnie przygotować poprawkę.

### Chcę porzucić propozycję zmiany

Na stronie Pull Requesta kliknij **„Close pull request”** na dole. Nic nie trafi na stronę.
