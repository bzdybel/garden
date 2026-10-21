# Edycja treści przez klienta – konfiguracja (jednorazowo, dla osoby technicznej)

Klient edytuje pliki w `tresci/` w przeglądarce, na GitHubie, bez CMS-a. Instrukcja dla klienta: [`tresci/INSTRUKCJA.md`](../tresci/INSTRUKCJA.md).

## Jak to działa

```
klient edytuje plik w tresci/ (github.com)
  └─ Pull Request (osobna gałąź)
       ├─ GitHub Actions „Sprawdź treści” – build + walidacja, błędy po polsku z adnotacją przy linii pliku
       ├─ Cloudflare Workers Builds – podgląd: https://<gałąź>-studio-pergoli.bartlomiej-zdybel.workers.dev
       └─ merge do main → automatyczny deploy produkcji
```

Walidacja: schematy w `src/content.config.ts` (Zod z polskim locale i własnymi komunikatami), kontrole spójności w
`src/data/*.ts`, tłumaczenie logu buildu w `scripts/sprawdz-tresci.mjs`. Błąd w treści = czerwony check, produkcja bez zmian.

## Kroki konfiguracji

1. **Dodaj klienta jako współpracownika:** GitHub → repozytorium → *Settings* → *Collaborators* → *Add people* → rola **Write**.
2. **Chroń gałąź `main`:** *Settings* → *Rules* → *Rulesets* → *New branch ruleset*:
   - *Target branches*: `main` (Default branch),
   - ✅ *Restrict deletions*, ✅ *Block force pushes*,
   - ✅ *Require a pull request before merging* – wymagane zatwierdzenia: **0**, jeśli klient ma publikować sam, albo **1**, jeśli każdą zmianę zatwierdzasz Ty (wtedy klient nie zmerguje własnego PR bez Twojej akceptacji),
   - ✅ *Require status checks to pass* → dodaj **„Sprawdź treści”** (pojawi się na liście po pierwszym uruchomieniu workflow) i opcjonalnie **„Workers Builds: studio-pergoli”**,
   - *Bypass list*: dodaj siebie (Repository admin), żeby móc pracować bez ograniczeń.
3. **Sprawdź podglądy Cloudflare:** Workers & Pages → `studio-pergoli` → *Settings* → *Build* → *Branch control*: podglądy dla gałęzi innych niż produkcyjna muszą być włączone, a komentarze w PR – aktywne (integracja GitHub).
4. **Przejdź ścieżkę raz razem z klientem:** drobna zmiana w `tresci/strony/kontakt.md` → PR → zielony check → podgląd → merge.

## Zasady utrzymania

- Nowy tekst widoczny na stronie dodawaj do pliku w `tresci/` i schematu w `src/content.config.ts`, nie na sztywno w `.astro`.
  Elementy interfejsu (menu, etykiety formularzy, przyciski) zostają w komponentach.
- Nowa zmienna w tekstach → `src/lib/tresci.ts` **i** tabela w `tresci/README.md`.
- Nowe pole w pliku treści → komentarz po polsku w pliku i we wzorze w `tresci/_wzory/`, jeśli dotyczy.
- `scripts/generate-placeholders.mjs --force` **usuwa** zdjęcia klienta z `tresci/zdjecia/` – używaj tylko na pustym projekcie.
