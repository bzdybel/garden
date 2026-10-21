/**
 * Cennik kalkulatora – aluminiowe zadaszenie tarasu SMART. Dane: tresci/cennik-kalkulatora.yaml.
 * Cena = odczyt z tabeli: wypełnienie dachu → głębokość (mm) → szerokość (mm). Kwoty brutto, z montażem.
 */
import { getCollection } from 'astro:content';

export const materials = (await getCollection('kalkulator')).map((e) => ({ id: e.id, ...e.data }));

const dims = (m: (typeof materials)[number]) => ({
  depths: Object.keys(m.prices).map(Number),
  widths: Object.keys(Object.values(m.prices)[0] ?? {}).map(Number),
});

export const { depths, widths } = dims(materials[0]);

// Kalkulator zakłada wspólną siatkę wymiarów – rozjazd w tabeli dałby „0 zł” dla części wyborów
for (const m of materials) {
  const sameWidths = Object.values(m.prices).every((row) => Object.keys(row).map(Number).join() === widths.join());
  if (!sameWidths || dims(m).depths.join() !== depths.join()) {
    throw new Error(`tresci/cennik-kalkulatora.yaml: „${m.label}” ma inne wymiary niż pierwsze wypełnienie – wszystkie tabele muszą mieć te same głębokości i szerokości.`);
  }
}
