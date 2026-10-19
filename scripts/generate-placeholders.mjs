// Generuje ilustracje zastępcze (JPG) do czasu dostarczenia prawdziwych zdjęć realizacji.
// Użycie: node scripts/generate-placeholders.mjs
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const OUT = new URL('../src/assets/images/', import.meta.url);
const W = 1600;
const H = 1067;

const palettes = [
  { sky: ['#cfe3d8', '#f4efe3'], grass: '#5f7f4f', wood: '#8a5a35', roof: '#3d3a36' },
  { sky: ['#f6d9b8', '#f9f1e4'], grass: '#6b8a4e', wood: '#a06a3b', roof: '#4a3b30' },
  { sky: ['#bcd3e6', '#eef3f2'], grass: '#4f7448', wood: '#7a4e2d', roof: '#2f3438' },
  { sky: ['#e7d6c7', '#f6f0ea'], grass: '#728b55', wood: '#94603a', roof: '#53463d' },
];

const ground = (p) => `
  <rect y="${H * 0.72}" width="${W}" height="${H * 0.28}" fill="${p.grass}"/>
  <ellipse cx="${W * 0.15}" cy="${H * 0.72}" rx="220" ry="120" fill="${p.grass}" opacity=".7"/>
  <ellipse cx="${W * 0.9}" cy="${H * 0.73}" rx="260" ry="140" fill="${p.grass}" opacity=".6"/>
  <circle cx="${W * 0.08}" cy="${H * 0.5}" r="110" fill="#3f5e3a" opacity=".55"/>
  <circle cx="${W * 0.93}" cy="${H * 0.47}" r="140" fill="#3f5e3a" opacity=".5"/>`;

const shapes = {
  altana: (p) => `
    <polygon points="${W * 0.3},${H * 0.36} ${W * 0.5},${H * 0.16} ${W * 0.7},${H * 0.36}" fill="${p.roof}"/>
    <rect x="${W * 0.32}" y="${H * 0.36}" width="${W * 0.36}" height="18" fill="${p.wood}"/>
    ${[0.33, 0.43, 0.57, 0.67].map((x) => `<rect x="${W * x - 14}" y="${H * 0.37}" width="28" height="${H * 0.36}" fill="${p.wood}"/>`).join('')}
    <rect x="${W * 0.33}" y="${H * 0.6}" width="${W * 0.34}" height="14" fill="${p.wood}" opacity=".85"/>
    <rect x="${W * 0.3}" y="${H * 0.72}" width="${W * 0.4}" height="22" fill="#b9a58c"/>`,
  wiata: (p) => `
    <polygon points="${W * 0.18},${H * 0.3} ${W * 0.82},${H * 0.36} ${W * 0.82},${H * 0.4} ${W * 0.18},${H * 0.34}" fill="${p.roof}"/>
    ${[0.21, 0.5, 0.79].map((x) => `<rect x="${W * x - 16}" y="${H * 0.33}" width="32" height="${H * 0.4}" fill="${p.wood}"/>`).join('')}
    <rect x="${W * 0.34}" y="${H * 0.58}" width="${W * 0.26}" height="${H * 0.12}" rx="40" fill="#5b6770"/>
    <circle cx="${W * 0.39}" cy="${H * 0.7}" r="34" fill="#22272b"/><circle cx="${W * 0.55}" cy="${H * 0.7}" r="34" fill="#22272b"/>`,
  zadaszenie: (p) => `
    <rect x="${W * 0.08}" y="${H * 0.18}" width="${W * 0.3}" height="${H * 0.55}" fill="#e9e2d6"/>
    <rect x="${W * 0.14}" y="${H * 0.4}" width="${W * 0.12}" height="${H * 0.33}" fill="#6d7f8a" opacity=".7"/>
    <polygon points="${W * 0.38},${H * 0.3} ${W * 0.86},${H * 0.36} ${W * 0.86},${H * 0.38} ${W * 0.38},${H * 0.33}" fill="${p.roof}" opacity=".6"/>
    ${[0.6, 0.84].map((x) => `<rect x="${W * x - 12}" y="${H * 0.35}" width="24" height="${H * 0.38}" fill="${p.wood}"/>`).join('')}
    <rect x="${W * 0.38}" y="${H * 0.72}" width="${W * 0.5}" height="20" fill="#b9a58c"/>`,
  pergola: (p) => `
    ${[0.25, 0.42, 0.58, 0.75].map((x) => `<rect x="${W * x - 12}" y="${H * 0.32}" width="24" height="${H * 0.41}" fill="${p.wood}"/>`).join('')}
    ${Array.from({ length: 11 }, (_, i) => `<rect x="${W * 0.2 + i * 90}" y="${H * 0.28}" width="18" height="${H * 0.06}" fill="${p.wood}" opacity=".9"/>`).join('')}
    <rect x="${W * 0.2}" y="${H * 0.32}" width="${W * 0.6}" height="16" fill="${p.wood}"/>
    <path d="M${W * 0.25} ${H * 0.34} q60 120 0 240" stroke="#4d7a3c" stroke-width="18" fill="none"/>`,
  drewutnia: (p) => `
    <polygon points="${W * 0.3},${H * 0.36} ${W * 0.7},${H * 0.3} ${W * 0.7},${H * 0.34} ${W * 0.3},${H * 0.4}" fill="${p.roof}"/>
    <rect x="${W * 0.32}" y="${H * 0.38}" width="${W * 0.36}" height="${H * 0.35}" fill="${p.wood}" opacity=".35"/>
    ${Array.from({ length: 6 }, (_, r) => Array.from({ length: 9 }, (_, c) => `<circle cx="${W * 0.35 + c * 58}" cy="${H * 0.45 + r * 50}" r="22" fill="#c08a5a" stroke="${p.wood}" stroke-width="5"/>`).join('')).join('')}`,
};

const svg = (shape, p, label) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[0]}"/><stop offset="1" stop-color="${p.sky[1]}"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#s)"/>
  ${ground(p)}
  ${shapes[shape](p)}
  <text x="${W - 40}" y="${H - 36}" text-anchor="end" font-family="sans-serif" font-size="30" fill="#fff" opacity=".8">${label}</text>
</svg>`;

const images = [
  ['hero', 'altana', 0],
  ['o-nas', 'pergola', 3],
  ['og-default', 'altana', 1],
  ['uslugi/altany-ogrodowe', 'altana', 0],
  ['uslugi/wiaty-samochodowe', 'wiata', 2],
  ['uslugi/zadaszenia-tarasow', 'zadaszenie', 1],
  ['uslugi/pergole', 'pergola', 0],
  ['uslugi/wiaty-smietnikowe-drewutnie', 'drewutnia', 3],
  ['poradnik/pozwolenie-na-budowe-altany', 'altana', 2],
  ['poradnik/ile-kosztuje-altana', 'altana', 3],
  ['poradnik/wiata-czy-garaz', 'wiata', 0],
];

const projects = [
  ['altana-modrzewiowa-jedlnia-letnisko', 'altana'],
  ['wiata-dwustanowiskowa-kozienice', 'wiata'],
  ['zadaszenie-tarasu-radom-golebiow', 'zadaszenie'],
  ['pergola-z-lamelami-skaryszew', 'pergola'],
  ['altana-z-grillem-pionki', 'altana'],
  ['drewutnia-i-wiata-smietnikowa-szydlowiec', 'drewutnia'],
];
projects.forEach(([slug, shape], i) => {
  images.push([`realizacje/${slug}`, shape, i % 4]);
  images.push([`realizacje/${slug}-2`, shape, (i + 1) % 4]);
  images.push([`realizacje/${slug}-3`, shape, (i + 2) % 4]);
});

for (const [name, shape, pi] of images) {
  const target = new URL(`${name}.jpg`, OUT);
  await mkdir(new URL('.', target), { recursive: true });
  await sharp(Buffer.from(svg(shape, palettes[pi], 'zdjęcie poglądowe')))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(target.pathname);
}
console.log(`Wygenerowano ${images.length} obrazów w src/assets/images/`);
