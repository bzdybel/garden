// Buduje stronę i tłumaczy błędy w plikach z /tresci na zrozumiałe komunikaty po polsku.
// W GitHub Actions dodatkowo zaznacza błąd przy konkretnej linii pliku w Pull Requeście.
// Użycie: node scripts/sprawdz-tresci.mjs
import { spawnSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { relative } from 'node:path';

const result = spawnSync('npx', ['astro', 'build'], { encoding: 'utf8', env: { ...process.env, FORCE_COLOR: '0', NO_COLOR: '1' } });
// eslint-disable-next-line no-control-regex
const output = `${result.stdout}\n${result.stderr}`.replace(/\x1b\[[0-9;]*m/g, '');

if (result.status === 0) {
  console.log('✅ Treści są poprawne – strona zbudowała się bez błędów.');
  process.exit(0);
}

const lines = output.split('\n');
const fileOf = (text) => text.match(/(tresci\/[^\s:]+?)(?::(\d+))?(?::\d+)?\s*$/);
const problems = [];

lines.forEach((line, i) => {
  // Pole niezgodne ze schematem, np. „coverAlt: Opis zdjęcia (alt) jest za krótki…”
  if (line.includes('InvalidContentEntryDataError') || line.includes('does not match collection schema')) {
    const details = [];
    let file;
    for (const next of lines.slice(i + 1, i + 15)) {
      if (next.includes('tresci/')) file = fileOf(relative(process.cwd(), next.trim()));
      else if (/^\s{2}\S/.test(next) && !/Error reference|Hint|Location|Stack trace|https?:/.test(next)) details.push(next.trim());
      if (file) break;
    }
    problems.push({ file: file?.[1], line: 1, message: details.join('; ') || line.trim() });
  }
  // Błąd składni YAML (np. dwukropek w tekście bez cudzysłowu, złe wcięcie)
  if (/at line \d+, column \d+/.test(line)) {
    const loc = lines.slice(i, i + 8).find((l) => l.includes('tresci/'));
    const file = loc && fileOf(relative(process.cwd(), loc.trim()));
    problems.push({
      file: file?.[1],
      line: Number(file?.[2] ?? 0) + 1,
      message: `Błąd zapisu w linii ${Number(file?.[2] ?? 0) + 1} (${line.replace(/ at line \d+, column \d+:?/, '').trim()}) – najczęściej pomaga ujęcie tekstu w cudzysłów '…' (gdy zawiera dwukropek, # lub zaczyna się od {) albo poprawienie wcięcia (spacje, nie tabulator).`,
    });
  }
  // Brakujące zdjęcie
  const img = line.match(/Could not find requested image `([^`]+)`/);
  if (img) problems.push({ message: `Nie znaleziono zdjęcia „${img[1]}” – sprawdź nazwę pliku (wielkość liter, rozszerzenie .jpg) i czy zdjęcie zostało wgrane do tresci/zdjecia/.` });
  // Własne kontrole (np. siedziba firmy, wymiary w cenniku kalkulatora)
  if (/^Error: tresci\//.test(line.trim()) || /tresci\/[^\s]+: /.test(line) && line.includes('Error')) problems.push({ message: line.replace(/^.*?Error:\s*/, '').trim() });
});

// Komunikaty Astro dla brakującego pola: „size**: **size: Required” → „size: brakuje tego pola (jest wymagane)”
const tidy = (m) =>
  m
    .replace(/\*\*/g, '')
    .replace(/([\w.]+): \1: Required/g, '$1: brakuje tego pola (jest wymagane)')
    .replace(/: Required\b/g, ': brakuje tego pola (jest wymagane)');
problems.forEach((p) => (p.message = tidy(p.message)));
const unique = problems.filter((p, i) => problems.findIndex((q) => q.message === p.message && q.file === p.file) === i);

console.log('\n❌ Strona się nie zbudowała – wersja na produkcji pozostaje bez zmian.\n');
if (unique.length) {
  for (const p of unique) console.log(`• ${p.file ? `${p.file}: ` : ''}${p.message}`);
} else {
  console.log('Nie udało się rozpoznać błędu – poniżej pełny log, przekaż go osobie technicznej:\n');
  console.log(output.split('\n').slice(-40).join('\n'));
}

if (process.env.GITHUB_ACTIONS) {
  for (const p of unique) {
    const where = p.file ? ` file=${p.file},line=${p.line ?? 1}` : '';
    console.log(`::error${where},title=Błąd w treści::${p.message.replace(/\n/g, ' ')}`);
  }
  if (process.env.GITHUB_STEP_SUMMARY) {
    const list = unique.map((p) => `- ${p.file ? `\`${p.file}\` – ` : ''}${p.message}`).join('\n') || '- Nie udało się rozpoznać błędu – szczegóły w logu kroku „Sprawdź treści”.';
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## ❌ W treściach jest błąd\n\n${list}\n\nPopraw plik i zapisz zmianę w tej samej gałęzi – sprawdzenie uruchomi się ponownie. Instrukcja: \`tresci/INSTRUKCJA.md\`, rozdział „Coś poszło nie tak”.\n`);
  }
}
process.exit(1);
