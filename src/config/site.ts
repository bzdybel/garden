/**
 * Centralna konfiguracja firmy.
 * Wszystkie dane NAP (Name, Address, Phone) są pobierane stąd – zarówno do treści,
 * jak i do danych strukturalnych. Po ustaleniu nazwy firmy wystarczy zmienić ten plik.
 */
export const site = {
  // TODO: docelowa nazwa i domena
  name: 'Drewniany Zakątek',
  legalName: 'Drewniany Zakątek Sp. z o.o.',
  url: 'https://www.drewnianyzakatek.pl',
  tagline: 'Altany, wiaty i zadaszenia z drewna na wymiar',
  description:
    'Projektujemy i budujemy drewniane altany ogrodowe, wiaty samochodowe, pergole i zadaszenia tarasów na wymiar. Własna stolarnia, montaż w 1–3 dni, 5 lat gwarancji.',
  foundingYear: 2012,

  // TODO: prawdziwe dane kontaktowe
  phone: '+48 600 100 200',
  email: 'kontakt@drewnianyzakatek.pl',
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
  priceRange: '$$',

  // Oceny pokazywane w schema MUSZĄ odpowiadać prawdziwym opiniom widocznym na stronie.
  rating: { value: 4.9, count: 87 },

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

  stats: [
    { value: '650+', label: 'zrealizowanych konstrukcji' },
    { value: '12 lat', label: 'doświadczenia' },
    { value: '5 lat', label: 'gwarancji' },
    { value: '1–3 dni', label: 'montażu na miejscu' },
  ],
} as const;

export const phoneHref = `tel:${site.phone.replace(/\s/g, '')}`;
export const mailHref = `mailto:${site.email}`;

export const nav = [
  { href: '/uslugi/', label: 'Usługi' },
  { href: '/realizacje/', label: 'Realizacje' },
  { href: '/cennik/', label: 'Cennik' },
  { href: '/poradnik/', label: 'Poradnik' },
  { href: '/o-nas/', label: 'O nas' },
  { href: '/kontakt/', label: 'Kontakt' },
] as const;
