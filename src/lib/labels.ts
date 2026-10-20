import type { serviceTypes } from '../content.config';

export const serviceLabels: Record<(typeof serviceTypes)[number], string> = {
  'zadaszenia-tarasow': 'Zadaszenie tarasu',
  pergole: 'Pergola',
  'zabudowy-tarasu': 'Zabudowa tarasu',
  'systemy-zacieniajace': 'Systemy zacieniające',
};

export const formatPrice = (n: number) => new Intl.NumberFormat('pl-PL').format(n) + ' zł';

export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
