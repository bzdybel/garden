/**
 * Centralna konfiguracja firmy.
 * Dane firmy (NAP, godziny, profile, statystyki) edytuje się w tresci/firma.yaml –
 * trafiają stąd zarówno do treści, jak i do danych strukturalnych.
 * Tu zostają tylko ustawienia techniczne.
 */
import { getEntry } from 'astro:content';

const firma = (await getEntry('firma', 'firma'))!.data;

export const site = {
  ...firma,
  // TODO: docelowa domena (musi zgadzać się z `site` w astro.config.mjs)
  url: 'https://www.studiopergoli.pl',
  priceRange: '$$$',
  /** Zasięg usług – siedziba w Radomiu, montaż w całej Polsce */
  areaServed: 'Polska',

  // Endpoint formularza – np. Web3Forms (https://web3forms.com). Klucz w .env.
  form: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
  },
};

/** Profile społecznościowe z uzupełnionym adresem */
export const socialLinks = Object.entries(site.social).filter(([, href]) => href) as [keyof typeof site.social, string][];

export const phoneHref = `tel:${site.phone.replace(/\s/g, '')}`;
export const mailHref = `mailto:${site.email}`;

export const nav = [
  { href: '/uslugi/', label: 'Oferta' },
  { href: '/realizacje/', label: 'Realizacje' },
  { href: '/cennik/', label: 'Cennik' },
  { href: '/kalkulator/', label: 'Kalkulator' },
  { href: '/poradnik/', label: 'Poradnik' },
  { href: '/o-nas/', label: 'O nas' },
  { href: '/kontakt/', label: 'Kontakt' },
] as const;
