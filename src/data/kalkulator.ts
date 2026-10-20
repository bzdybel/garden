/**
 * Cennik kalkulatora – aluminiowe zadaszenie tarasu SMART (moduł do 8 × 4,5 m).
 * Cena = odczyt z tabeli: wypełnienie dachu → głębokość (mm) → szerokość (mm). Kwoty brutto, z montażem.
 * TODO: wartości poglądowe – podmienić na prawdziwy cennik firmy (i zaktualizować artykuł
 * src/content/poradnik/ile-kosztuje-zadaszenie-tarasu.md oraz ceny „od” w src/content/uslugi/).
 */
export const depths = [2000, 2500, 3000, 3500, 4000, 4500] as const;
export const widths = [3000, 4000, 5000, 6000, 7000, 8000] as const;

export type PriceTable = Record<(typeof depths)[number], Record<(typeof widths)[number], number>>;

export const materials = [
  {
    id: 'poliweglan-komorowy',
    label: 'Poliwęglan komorowy 16 mm',
    text: 'Ekonomiczny, rozprasza światło, dobrze izoluje',
    prices: {
      2000: { 3000: 11900, 4000: 13700, 5000: 15500, 6000: 17300, 7000: 19100, 8000: 20900 },
      2500: { 3000: 13300, 4000: 15500, 5000: 17800, 6000: 20000, 7000: 22300, 8000: 24500 },
      3000: { 3000: 14600, 4000: 17300, 5000: 20000, 6000: 22700, 7000: 25400, 8000: 28100 },
      3500: { 3000: 16000, 4000: 19100, 5000: 22300, 6000: 25400, 7000: 28600, 8000: 31700 },
      4000: { 3000: 17300, 4000: 20900, 5000: 24500, 6000: 28100, 7000: 31700, 8000: 35300 },
      4500: { 3000: 18700, 4000: 22700, 5000: 26800, 6000: 30800, 7000: 34900, 8000: 38900 },
    },
  },
  {
    id: 'poliweglan-lity',
    label: 'Poliwęglan lity 8 mm',
    text: 'Wygląd szkła, lekki i odporny na uderzenia',
    prices: {
      2000: { 3000: 13300, 4000: 15300, 5000: 17400, 6000: 19400, 7000: 21400, 8000: 23400 },
      2500: { 3000: 14900, 4000: 17400, 5000: 19900, 6000: 22400, 7000: 25000, 8000: 27400 },
      3000: { 3000: 16400, 4000: 19400, 5000: 22400, 6000: 25400, 7000: 28400, 8000: 31500 },
      3500: { 3000: 17900, 4000: 21400, 5000: 25000, 6000: 28400, 7000: 32000, 8000: 35500 },
      4000: { 3000: 19400, 4000: 23400, 5000: 27400, 6000: 31500, 7000: 35500, 8000: 39500 },
      4500: { 3000: 20900, 4000: 25400, 5000: 30000, 6000: 34500, 7000: 39100, 8000: 43600 },
    },
  },
  {
    id: 'szklo',
    label: 'Szkło bezpieczne 4.4.2',
    text: 'Pełna przejrzystość, najwyższa elegancja',
    prices: {
      2000: { 3000: 14900, 4000: 17100, 5000: 19400, 6000: 21600, 7000: 23900, 8000: 26100 },
      2500: { 3000: 16600, 4000: 19400, 5000: 22300, 6000: 25000, 7000: 27900, 8000: 30600 },
      3000: { 3000: 18300, 4000: 21600, 5000: 25000, 6000: 28400, 7000: 31800, 8000: 35100 },
      3500: { 3000: 20000, 4000: 23900, 5000: 27900, 6000: 31800, 7000: 35800, 8000: 39600 },
      4000: { 3000: 21600, 4000: 26100, 5000: 30600, 6000: 35100, 7000: 39600, 8000: 44100 },
      4500: { 3000: 23400, 4000: 28400, 5000: 33500, 6000: 38500, 7000: 43600, 8000: 48600 },
    },
  },
] as const satisfies readonly { id: string; label: string; text: string; prices: PriceTable }[];
