import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const serviceTypes = ['zadaszenia-tarasow', 'pergole', 'zabudowy-tarasu', 'systemy-zacieniajace'] as const;

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);

const uslugi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/uslugi' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Krótka nazwa do menu i kart
      name: z.string(),
      seoTitle: z.string().max(60),
      description: z.string().max(160),
      lead: z.string(),
      order: z.number(),
      priceFrom: z.number(),
      priceUnit: z.string().default('brutto'),
      cover: image(),
      coverAlt: z.string(),
      features: z.array(z.object({ title: z.string(), text: z.string() })),
      variants: z.array(z.object({ name: z.string(), text: z.string(), priceFrom: z.number().optional() })).default([]),
      keywords: z.array(z.string()).default([]),
      faq,
    }),
});

const realizacje = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realizacje' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(160),
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
      coverAlt: z.string(),
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      testimonial: z.object({ text: z.string(), author: z.string() }).optional(),
    }),
});

const poradnik = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/poradnik' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      seoTitle: z.string().max(60).optional(),
      description: z.string().max(160),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      author: z.string().default('Zespół Studio Pergoli'),
      cover: image(),
      coverAlt: z.string(),
      relatedService: z.enum(serviceTypes).optional(),
      faq,
    }),
});

const opinie = defineCollection({
  loader: file('src/content/opinie.json'),
  schema: z.object({
    author: z.string(),
    city: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    date: z.coerce.date(),
    project: reference('realizacje').optional(),
  }),
});

export const collections = { uslugi, realizacje, poradnik, opinie };
