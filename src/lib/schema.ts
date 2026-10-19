/**
 * Generatory danych strukturalnych schema.org (JSON-LD).
 * Testuj w: https://search.google.com/test/rich-results oraz https://validator.schema.org
 */
import { site } from '../config/site';
import { cities } from '../data/cities';

export const absoluteUrl = (path: string) => new URL(path, site.url).href;

export const businessId = absoluteUrl('/#business');
export const websiteId = absoluteUrl('/#website');

export function businessSchema() {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': businessId,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    foundingDate: String(site.foundingYear),
    priceRange: site.priceRange,
    image: absoluteUrl('/og-default.jpg'),
    logo: absoluteUrl('/logo.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: cities.map((c) => ({ '@type': 'City', name: c.name })),
    openingHoursSpecification: site.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    sameAs: Object.values(site.social),
    vatID: `PL${site.nip}`,
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.url,
    name: site.name,
    inLanguage: 'pl-PL',
    publisher: { '@id': businessId },
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  image: string;
  priceFrom: number;
  areaServed?: string[];
}) {
  return {
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    image: absoluteUrl(opts.image),
    provider: { '@id': businessId },
    areaServed: (opts.areaServed ?? cities.map((c) => c.name)).map((name) => ({ '@type': 'City', name })),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PLN',
      price: opts.priceFrom,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: opts.priceFrom,
        priceCurrency: 'PLN',
        valueAddedTaxIncluded: true,
      },
      availability: 'https://schema.org/InStock',
    },
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  image: string;
  published: Date;
  updated?: Date;
  author: string;
}) {
  return {
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: absoluteUrl(opts.path),
    image: absoluteUrl(opts.image),
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated ?? opts.published).toISOString(),
    author: { '@type': 'Organization', name: opts.author, url: site.url },
    publisher: { '@id': businessId },
    inLanguage: 'pl-PL',
  };
}

export function projectSchema(opts: {
  title: string;
  description: string;
  path: string;
  images: string[];
  date: Date;
  city: string;
}) {
  return {
    '@type': 'CreativeWork',
    name: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    image: opts.images.map(absoluteUrl),
    dateCreated: opts.date.toISOString().slice(0, 10),
    creator: { '@id': businessId },
    locationCreated: { '@type': 'Place', name: opts.city },
  };
}

/** Łączy kilka obiektów w jeden graf JSON-LD. */
export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
