/**
 * Schematy wszystkich treści z katalogu /tresci (edytowanego przez klienta).
 * Każdy błąd w pliku treści zatrzymuje build – wersja na produkcji zostaje bez zmian,
 * a komunikat (po polsku) wskazuje plik i pole do poprawy.
 */
import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

z.config(z.locales.pl());

export const serviceTypes = ['zadaszenia-tarasow', 'pergole', 'zabudowy-tarasu', 'systemy-zacieniajace'] as const;
export const iconNames = ['ruler', 'shield', 'clock', 'truck', 'tree', 'star', 'pencil', 'check', 'pin', 'phone', 'mail'] as const;

const T = './tresci';

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);
const alt = z
  .string()
  .min(10, 'Opis zdjęcia (alt) jest za krótki – opisz, co widać na zdjęciu (min. 10 znaków)')
  .max(140, 'Opis zdjęcia (alt) jest za długi – maks. 140 znaków');
const seoTitle = z.string().max(60, 'Tytuł dla Google może mieć maks. 60 znaków – dłuższy zostanie ucięty w wynikach');
const description = z.string().max(160, 'Opis dla Google może mieć maks. 160 znaków – dłuższy zostanie ucięty w wynikach');
/** Nagłówek sekcji: mała etykieta nad nagłówkiem + 1–3 linie (druga i kolejne kursywą) */
const heading = z.object({ label: z.string(), title: z.array(z.string()).min(1).max(3) });
const cta = z.object({ title: z.string(), accent: z.string() });

const uslugi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: `${T}/uslugi` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Krótka nazwa do menu i kart
      name: z.string(),
      seoTitle,
      description,
      lead: z.string(),
      order: z.number(),
      priceFrom: z.number(),
      priceUnit: z.string().default('brutto'),
      cover: image(),
      coverAlt: alt,
      features: z.array(z.object({ title: z.string(), text: z.string() })),
      variants: z.array(z.object({ name: z.string(), text: z.string(), priceFrom: z.number().optional() })).default([]),
      keywords: z.array(z.string()).default([]),
      faq,
    }),
});

const realizacje = defineCollection({
  loader: glob({ pattern: '**/*.md', base: `${T}/realizacje` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description,
      service: z.enum(serviceTypes),
      city: z.string(),
      date: z.coerce.date(),
      size: z.string(),
      // System konstrukcji i kolor, np. „SMART, RAL 7016”
      system: z.string(),
      // Wypełnienie dachu, np. „szkło bezpieczne 4.4.2”
      fill: z.string(),
      duration: z.string(),
      featured: z.boolean().default(false),
      // Realizacja przykładowa (nie prawdziwy projekt): widoczna etykieta, noindex, poza sitemapą
      // i poza sekcją „Nasze realizacje w [mieście]”. Usunąć po podmianie na prawdziwą realizację.
      example: z.boolean().default(false),
      cover: image(),
      coverAlt: alt,
      gallery: z.array(z.object({ src: image(), alt })).default([]),
      testimonial: z.object({ text: z.string(), author: z.string() }).optional(),
    }),
});

const poradnik = defineCollection({
  loader: glob({ pattern: '**/*.md', base: `${T}/poradnik` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      seoTitle: seoTitle.optional(),
      description,
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      author: z.string().default('Zespół Studio Pergoli'),
      cover: image(),
      coverAlt: alt,
      relatedService: z.enum(serviceTypes).optional(),
      faq,
    }),
});

const miasta = defineCollection({
  loader: glob({ pattern: '*.md', base: `${T}/miasta` }),
  schema: z.object({
    name: z.string(),
    /** Forma w miejscowniku: „w Radomiu” */
    locative: z.string().regex(/^we? /, 'Pole locative musi zaczynać się od „w ” lub „we ”, np. „w Radomiu”'),
    region: z.string(),
    /** Organ przyjmujący zgłoszenia robót budowlanych */
    authority: z.string(),
    headquarters: z.boolean().default(false),
    order: z.number(),
    intro: z.string(),
    local: z.string(),
    areas: z.array(z.string()),
    /** Dodatkowe, lokalne pytania – wyświetlane przed pytaniami wspólnymi */
    faq,
  }),
});

const opinie = defineCollection({
  loader: file(`${T}/opinie.yaml`),
  schema: z.object({
    author: z.string(),
    city: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    date: z.coerce.date(),
    project: reference('realizacje').optional(),
  }),
});

const optionalUrl = z.union([z.literal(''), z.url('Wpisz pełny adres zaczynający się od https://')]).default('');

const firma = defineCollection({
  loader: glob({ pattern: 'firma.yaml', base: T }),
  schema: z.object({
    name: z.string(),
    legalName: z.string(),
    tagline: z.string(),
    description,
    foundingYear: z.number().int().min(1900).max(2100).nullable().default(null),
    phone: z.string().regex(/^\+?[\d\s]{9,}$/, 'Telefon: same cyfry i spacje, np. +48 600 100 200'),
    email: z.email('Nieprawidłowy adres e-mail'),
    address: z.object({
      street: z.string(),
      postalCode: z.string().regex(/^\d{2}-\d{3}$/, 'Kod pocztowy w formacie 00-000'),
      city: z.string(),
      cityGenitive: z.string(),
      region: z.string(),
      regionLocative: z.string(),
      regionCode: z.string(),
      country: z.string(),
    }),
    geo: z.object({ lat: z.number(), lng: z.number() }),
    nip: z.string().regex(/^(\d{10})?$/, 'NIP: 10 cyfr bez kresek i spacji albo puste pole'),
    openingHours: z.array(
      z.object({
        days: z.array(z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])),
        opens: z.string().regex(/^\d{2}:\d{2}$/, 'Godzina w formacie 08:00'),
        closes: z.string().regex(/^\d{2}:\d{2}$/, 'Godzina w formacie 17:00'),
        label: z.string(),
      }),
    ),
    rating: z.object({ value: z.number().min(1).max(5), count: z.number().int(), published: z.boolean() }),
    social: z.object({ facebook: optionalUrl, instagram: optionalUrl, google: optionalUrl }),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
  }),
});

const kalkulator = defineCollection({
  loader: file(`${T}/cennik-kalkulatora.yaml`),
  schema: z.object({
    label: z.string(),
    text: z.string(),
    // głębokość (mm) → szerokość (mm) → cena brutto
    prices: z.record(z.string(), z.record(z.string(), z.number().positive('Cena musi być liczbą większą od zera'))),
  }),
});

/* ---------- Teksty stron (tresci/strony) – jeden plik = jedna strona ---------- */

const page = <S extends z.ZodType>(name: string, schema: S) =>
  defineCollection({ loader: glob({ pattern: `${name}.md`, base: `${T}/strony` }), schema });

const stronaGlowna = defineCollection({
  loader: glob({ pattern: 'strona-glowna.md', base: `${T}/strony` }),
  schema: ({ image }) =>
    z.object({
      seoTitle,
      description,
      hero: z.object({
        eyebrow: z.string(),
        title: z.string(),
        accent: z.string(),
        text: z.string(),
        image: image(),
        imageAlt: alt,
        facts: z.array(z.object({ value: z.string(), label: z.string() })).max(4),
      }),
      offer: heading.extend({ tile: z.object({ eyebrow: z.string(), title: z.string(), accent: z.string(), text: z.string() }) }),
      systems: heading.extend({ items: z.array(z.object({ name: z.string(), text: z.string(), specs: z.array(z.string()) })) }),
      calculator: heading.extend({ text: z.string(), image: image(), imageAlt: alt, items: z.array(z.string()) }),
      projects: heading,
      usp: heading.extend({ items: z.array(z.object({ icon: z.enum(iconNames), title: z.string(), text: z.string() })) }),
      articles: heading,
      area: heading.extend({ text: z.string() }),
      faq,
    }),
});

const oNas = defineCollection({
  loader: glob({ pattern: 'o-nas.md', base: `${T}/strony` }),
  schema: ({ image }) =>
    z.object({
      seoTitle,
      description,
      eyebrow: z.string(),
      title: z.string(),
      lead: z.string(),
      image: image(),
      imageAlt: alt,
      values: heading,
    }),
});

const cennik = page(
  'cennik',
  z.object({
    seoTitle,
    description,
    title: z.string(),
    lead: z.string(),
    included: z.array(z.string()),
    extras: z.array(z.object({ name: z.string(), price: z.string() })),
    faqTitle: z.string(),
    faq,
    cta,
  }),
);

const kalkulatorStrona = page(
  'kalkulator',
  z.object({ seoTitle, description, eyebrow: z.string(), title: z.string(), lead: z.string(), faqTitle: z.string(), faq }),
);

const kontakt = page('kontakt', z.object({ seoTitle, description, title: z.string(), lead: z.string() }));
const oferta = page('oferta', z.object({ seoTitle, description, title: z.string(), lead: z.string() }));
const realizacjeLista = page('realizacje', z.object({ seoTitle, description, title: z.string(), lead: z.string(), cta }));
const poradnikLista = page('poradnik', z.object({ seoTitle, description, title: z.string(), lead: z.string() }));
const obszarDzialania = page('obszar-dzialania', z.object({ seoTitle, description, eyebrow: z.string(), title: z.string(), lead: z.string() }));

const miastaWspolne = page(
  'miasta-wspolne',
  z.object({
    // W tekstach można używać: {miasto}, {w-miescie}, {urzad}
    seoTitle: z.string(),
    description: z.string(),
    title: z.string(),
    localTitle: z.string(),
    areasTitle: z.string(),
    offer: heading,
    faqTitle: z.string(),
    faq: z.array(z.object({ q: z.string(), a: z.string(), aHeadquarters: z.string().optional() })),
    quote: heading.extend({ text: z.string() }),
  }),
);

const wspolne = page(
  'wspolne',
  z.object({
    process: heading.extend({ text: z.string(), button: z.string(), steps: z.array(z.object({ title: z.string(), text: z.string() })) }),
    cta: cta.extend({ text: z.string() }),
  }),
);

const politykaPrywatnosci = page('polityka-prywatnosci', z.object({ seoTitle, description, title: z.string() }));

export const collections = {
  uslugi,
  realizacje,
  poradnik,
  miasta,
  opinie,
  firma,
  kalkulator,
  stronaGlowna,
  oNas,
  cennik,
  kalkulatorStrona,
  kontakt,
  oferta,
  realizacjeLista,
  poradnikLista,
  obszarDzialania,
  miastaWspolne,
  wspolne,
  politykaPrywatnosci,
};
