/**
 * Miasta z dedykowanymi stronami lokalnymi (/obszar-dzialania/[slug]/) – treści w tresci/miasta/*.md.
 * Nazwa pliku = adres strony (slug). Kolejność wg pola `order`.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type City = CollectionEntry<'miasta'>['data'] & { slug: string };

export const cities: City[] = (await getCollection('miasta'))
  .sort((a, b) => a.data.order - b.data.order)
  .map((e) => ({ slug: e.id, ...e.data }));

if (cities.filter((c) => c.headquarters).length !== 1) {
  throw new Error('tresci/miasta: dokładnie jedno miasto musi mieć „headquarters: true” (siedziba firmy).');
}
