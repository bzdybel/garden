/**
 * Centralna konfiguracja firmy.
 * Wszystkie dane NAP (Name, Address, Phone) są pobierane stąd – zarówno do treści,
 * jak i do danych strukturalnych. Po ustaleniu nazwy firmy wystarczy zmienić ten plik.
 */
export const site = {
  // TODO: potwierdzić rejestrację domeny studiopergoli.pl i formę prawną
  name: 'Studio Pergoli',
  legalName: 'Studio Pergoli Sp. z o.o.',
  url: 'https://www.studiopergoli.pl',
  tagline: 'Pergole aluminiowe i zadaszenia tarasów premium',
  description:
    'Aluminiowe zadaszenia tarasów, pergole lamelowe i zabudowy szklane klasy premium. Profile produkowane w Polsce, montaż w całej Polsce, 5 lat gwarancji.',
  // TODO: rok założenia firmy
  foundingYear: 2012,

  // TODO: prawdziwe dane kontaktowe
  phone: '+48 600 100 200',
  email: 'kontakt@studiopergoli.pl',
  address: {
    street: 'ul. Ogrodowa 12',
    postalCode: '26-600',
    city: 'Radom',
    /** Dopełniacz: "od Radomia" */
    cityGenitive: 'Radomia',
    region: 'mazowieckie',
    /** Miejscownik regionu: "w województwie mazowieckim" */
    regionLocative: 'na Mazowszu',
    /** ISO 3166-2 – województwo mazowieckie */
    regionCode: 'PL-14',
    country: 'PL',
  },
  geo: { lat: 51.4027, lng: 21.1471 },
  nip: '0000000000',
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00', label: 'pon.–pt. 8:00–17:00' },
    { days: ['Saturday'], opens: '09:00', closes: '13:00', label: 'sob. 9:00–13:00' },
  ],
  priceRange: '$$$',
  /** Zasięg usług – siedziba w Radomiu, montaż w całej Polsce */
  areaServed: 'Polska',

  // Opinie i ocena MUSZĄ pochodzić od prawdziwych klientów (np. z Profilu Firmy w Google).
  // Publikowanie zmyślonych opinii jest niezgodne z prawem (dyrektywa Omnibus) i wytycznymi Google.
  // Dopóki `published` = false, sekcja opinii i aggregateRating w schema są ukryte.
  rating: { value: 4.9, count: 87, published: false as boolean },

  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    google: 'https://g.page/',
  },

  // Endpoint formularza – np. Web3Forms (https://web3forms.com). Klucz w .env.
  form: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
  },

  // Tylko fakty, które można udowodnić (źródło: katalog produktów)
  stats: [
    { value: '5 lat', label: 'gwarancji na konstrukcję' },
    { value: '16', label: 'województw – montujemy w całej Polsce' },
    { value: '8 × 4,5 m', label: 'maksymalny moduł zadaszenia SMART' },
    { value: 'RAL', label: 'dowolny kolor konstrukcji' },
  ],
} as const;

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
