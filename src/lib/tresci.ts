/**
 * Zmienne w tekstach z katalogu /tresci, np. „Cennik {rok}” → „Cennik 2026”.
 * Dzięki nim klient nie musi co roku ani po zmianie telefonu poprawiać wielu plików.
 * Lista zmiennych jest opisana w tresci/README.md – przy dodaniu nowej zaktualizuj też README.
 */
import { site } from '../config/site';
import { cities } from '../data/cities';

const hq = cities.find((c) => c.headquarters)!;

const companyLine = [site.legalName, `${site.address.street}, ${site.address.postalCode} ${site.address.city}`, site.nip && `NIP ${site.nip}`]
  .filter(Boolean)
  .join(', ');

const globals: Record<string, string> = {
  rok: String(new Date().getFullYear()),
  nazwa: site.name,
  telefon: site.phone,
  email: site.email,
  'w-siedzibie': hq.locative,
  'dane-firmy': companyLine,
  'lista-miast': cities
    .filter((c) => !c.headquarters)
    .map((c) => c.locative)
    .join(', '),
};

/** Podmienia zmienne {nazwa} w tekście; `extra` dodaje zmienne lokalne (np. dla strony miasta). */
export function fill(text: string, extra: Record<string, string> = {}): string {
  const vars = { ...globals, ...extra };
  // %7B…%7D – zmienna w adresie linku Markdown (np. mailto:{email}) po zakodowaniu przez parser
  return text.replace(/\{([a-z-]+)\}|%7B([a-z-]+)%7D/g, (match, a?: string, b?: string) => vars[(a ?? b)!] ?? match);
}

/** Zmienne dla stron miast: {miasto}, {w-miescie}, {urzad} */
export const cityVars = (c: (typeof cities)[number]) => ({ miasto: c.name, 'w-miescie': c.locative, urzad: c.authority });
