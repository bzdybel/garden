// Generuje ilustracje zastępcze (JPG) oraz ikony marki do czasu dostarczenia prawdziwych zdjęć realizacji.
// Użycie: node scripts/generate-placeholders.mjs
import { mkdir, rm, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const OUT = new URL('../src/assets/images/', import.meta.url);
const PUBLIC = new URL('../public/', import.meta.url);
const W = 1600;
const H = 1067;

// Wieczorne, „premium” palety: niebo o zmierzchu, grafitowe profile, ciepłe światło LED
const palettes = [
  { sky: ['#2b3442', '#c9a27a'], ground: '#2c2f2a', wall: '#d9d4cb', frame: '#2b2d30', glow: '#f3c98b' },
  { sky: ['#1f2733', '#8f8aa0'], ground: '#283026', wall: '#e4e0d8', frame: '#1f2124', glow: '#f6d39a' },
  { sky: ['#9fb4c7', '#efe7da'], ground: '#55654a', wall: '#f2efe9', frame: '#33363a', glow: '#ffe2ad' },
  { sky: ['#33302f', '#d8b28a'], ground: '#2f3329', wall: '#cfc8bd', frame: '#26282b', glow: '#f1c27d' },
];

const scene = (p) => `
  <rect y="${H * 0.74}" width="${W}" height="${H * 0.26}" fill="${p.ground}"/>
  <rect y="${H * 0.74}" width="${W}" height="10" fill="#000" opacity=".15"/>
  <ellipse cx="${W * 0.06}" cy="${H * 0.66}" rx="150" ry="170" fill="#1d241c" opacity=".55"/>
  <ellipse cx="${W * 0.96}" cy="${H * 0.63}" rx="170" ry="200" fill="#1d241c" opacity=".5"/>`;

const house = (p) => `
  <rect x="${W * 0.06}" y="${H * 0.14}" width="${W * 0.36}" height="${H * 0.6}" fill="${p.wall}"/>
  <rect x="${W * 0.1}" y="${H * 0.42}" width="${W * 0.28}" height="${H * 0.32}" fill="#1b1e22" opacity=".85"/>
  <rect x="${W * 0.1}" y="${H * 0.42}" width="${W * 0.28}" height="${H * 0.32}" fill="${p.glow}" opacity=".25"/>
  ${[0.17, 0.24, 0.31].map((x) => `<rect x="${W * x}" y="${H * 0.42}" width="4" height="${H * 0.32}" fill="${p.frame}"/>`).join('')}`;

const posts = (p, xs, top) => xs.map((x) => `<rect x="${W * x - 11}" y="${H * top}" width="22" height="${H * (0.74 - top)}" fill="${p.frame}"/>`).join('');
const led = (p, x1, x2, y) => `<rect x="${W * x1}" y="${H * y}" width="${W * (x2 - x1)}" height="5" fill="${p.glow}"/>
  <rect x="${W * x1}" y="${H * y}" width="${W * (x2 - x1)}" height="${H * 0.22}" fill="url(#glow)" opacity=".3"/>`;

const shapes = {
  // Zadaszenie przyścienne ze szkłem
  smart: (p) => `${house(p)}
    <polygon points="${W * 0.42},${H * 0.3} ${W * 0.9},${H * 0.36} ${W * 0.9},${H * 0.385} ${W * 0.42},${H * 0.325}" fill="${p.frame}"/>
    <polygon points="${W * 0.42},${H * 0.3} ${W * 0.9},${H * 0.36} ${W * 0.9},${H * 0.362} ${W * 0.42},${H * 0.302}" fill="#c9dbe6" opacity=".6"/>
    ${[0.52, 0.62, 0.72, 0.82].map((x) => `<rect x="${W * x}" y="${H * (0.312 + (x - 0.42) * 0.125)}" width="6" height="14" fill="${p.frame}"/>`).join('')}
    ${posts(p, [0.66, 0.89], 0.37)}
    ${led(p, 0.43, 0.88, 0.37)}`,
  // Duże zadaszenie z przeszkleniami przesuwnymi
  tline: (p) => `${house(p)}
    <rect x="${W * 0.42}" y="${H * 0.3}" width="${W * 0.5}" height="${H * 0.045}" fill="${p.frame}"/>
    ${posts(p, [0.6, 0.91], 0.34)}
    ${[0.45, 0.53, 0.61, 0.69, 0.77, 0.85].map((x) => `<rect x="${W * x}" y="${H * 0.36}" width="${W * 0.075}" height="${H * 0.38}" fill="#cfe0ea" opacity=".22" stroke="${p.frame}" stroke-width="4"/>`).join('')}
    ${led(p, 0.43, 0.9, 0.345)}`,
  // Płaski dach z ukrytym spadkiem, wolnostojący
  skyline: (p) => `
    <rect x="${W * 0.16}" y="${H * 0.28}" width="${W * 0.68}" height="${H * 0.06}" fill="${p.frame}"/>
    ${posts(p, [0.18, 0.5, 0.82], 0.34)}
    ${led(p, 0.18, 0.82, 0.34)}
    <rect x="${W * 0.36}" y="${H * 0.6}" width="${W * 0.28}" height="${H * 0.04}" fill="#8c7a66"/>
    <rect x="${W * 0.38}" y="${H * 0.64}" width="10" height="${H * 0.1}" fill="#5a4c3e"/><rect x="${W * 0.61}" y="${H * 0.64}" width="10" height="${H * 0.1}" fill="#5a4c3e"/>`,
  // Pergola z ruchomymi lamelami
  pergola: (p) => `
    <rect x="${W * 0.18}" y="${H * 0.27}" width="${W * 0.64}" height="${H * 0.05}" fill="${p.frame}"/>
    ${Array.from({ length: 16 }, (_, i) => `<rect x="${W * 0.2 + i * 62}" y="${H * 0.24}" width="40" height="12" fill="${p.frame}" transform="rotate(-18 ${W * 0.2 + i * 62 + 20} ${H * 0.245})"/>`).join('')}
    ${posts(p, [0.19, 0.81], 0.32)}
    ${led(p, 0.19, 0.81, 0.32)}
    <rect x="${W * 0.3}" y="${H * 0.6}" width="${W * 0.18}" height="${H * 0.06}" fill="#b8ad9c"/>
    <rect x="${W * 0.54}" y="${H * 0.6}" width="${W * 0.16}" height="${H * 0.06}" fill="#b8ad9c"/>`,
  // Zabudowa szklana i shuttersy
  zabudowa: (p) => `${house(p)}
    <rect x="${W * 0.42}" y="${H * 0.3}" width="${W * 0.48}" height="${H * 0.045}" fill="${p.frame}"/>
    ${posts(p, [0.9], 0.34)}
    ${[0.43, 0.52, 0.61].map((x) => `<rect x="${W * x}" y="${H * 0.36}" width="${W * 0.085}" height="${H * 0.38}" fill="#cfe0ea" opacity=".25" stroke="${p.frame}" stroke-width="4"/>`).join('')}
    <rect x="${W * 0.71}" y="${H * 0.36}" width="${W * 0.18}" height="${H * 0.38}" fill="#3a2f26"/>
    ${Array.from({ length: 14 }, (_, i) => `<rect x="${W * 0.71}" y="${H * 0.37 + i * 28}" width="${W * 0.18}" height="12" fill="#9c7a55"/>`).join('')}
    ${led(p, 0.43, 0.89, 0.345)}`,
  // Rolety / screeny zacieniające
  zacienienie: (p) => `${house(p)}
    <rect x="${W * 0.42}" y="${H * 0.3}" width="${W * 0.48}" height="${H * 0.045}" fill="${p.frame}"/>
    ${posts(p, [0.66, 0.9], 0.34)}
    <rect x="${W * 0.43}" y="${H * 0.35}" width="${W * 0.22}" height="${H * 0.28}" fill="#b9b1a4" opacity=".92"/>
    <rect x="${W * 0.67}" y="${H * 0.35}" width="${W * 0.22}" height="${H * 0.2}" fill="#b9b1a4" opacity=".92"/>
    ${led(p, 0.43, 0.89, 0.345)}`,
};

const svg = (shape, p, label) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[0]}"/><stop offset="1" stop-color="${p.sky[1]}"/></linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.glow}" stop-opacity=".7"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#s)"/>
  ${scene(p)}
  ${shapes[shape](p)}
  <text x="${W - 40}" y="${H - 36}" text-anchor="end" font-family="sans-serif" font-size="28" fill="#fff" opacity=".7">${label}</text>
</svg>`;

const images = [
  ['hero', 'smart', 0],
  ['o-nas', 'tline', 3],
  ['uslugi/zadaszenia-tarasow', 'smart', 1],
  ['uslugi/pergole', 'pergola', 0],
  ['uslugi/zabudowy-tarasu', 'zabudowa', 3],
  ['uslugi/systemy-zacieniajace', 'zacienienie', 2],
  ['poradnik/ile-kosztuje-zadaszenie-tarasu', 'smart', 2],
  ['poradnik/poliweglan-czy-szklo', 'tline', 1],
  ['poradnik/pozwolenie-zadaszenie-tarasu', 'skyline', 2],
];

export const projects = [
  ['zadaszenie-smart-szklo-konstancin-jeziorna', 'smart'],
  ['pergola-lamelowa-krakow-zabierzow', 'pergola'],
  ['zadaszenie-skyline-wolnostojace-wroclaw', 'skyline'],
  ['zadaszenie-t-line-z-zabudowa-lodz', 'tline'],
  ['pergola-z-shuttersami-poznan', 'zabudowa'],
  ['zadaszenie-tarasu-z-roleta-radom', 'zacienienie'],
];
projects.forEach(([slug, shape], i) => {
  images.push([`realizacje/${slug}`, shape, i % 4]);
  images.push([`realizacje/${slug}-2`, shape, (i + 1) % 4]);
  images.push([`realizacje/${slug}-3`, shape, (i + 2) % 4]);
});

await rm(new URL('uslugi/', OUT), { recursive: true, force: true });
await rm(new URL('realizacje/', OUT), { recursive: true, force: true });
await rm(new URL('poradnik/', OUT), { recursive: true, force: true });

for (const [name, shape, pi] of images) {
  const target = new URL(`${name}.jpg`, OUT);
  await mkdir(new URL('.', target), { recursive: true });
  await sharp(Buffer.from(svg(shape, palettes[pi], 'zdjęcie poglądowe')))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(target.pathname);
}

// ——— Marka: znak (zadaszenie: belka + dwa słupy) w złocie na grafitowym tle ———
const mark = (size, pad = 0.18) => {
  const s = size;
  const p = s * pad;
  const sw = s * 0.07;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" fill="#121110"/>
  <path d="M${p} ${s * 0.36}H${s - p}M${s * 0.3} ${s * 0.36}V${s - p}M${s * 0.7} ${s * 0.36}V${s - p}" fill="none" stroke="#c3a46b" stroke-width="${sw}" stroke-linecap="square"/>
</svg>`;
};
await writeFile(new URL('favicon.svg', PUBLIC), mark(40, 0.16));
for (const [file, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180], ['logo.png', 512]]) {
  await sharp(Buffer.from(mark(size))).png().toFile(new URL(file, PUBLIC).pathname);
}

// Obraz Open Graph z nazwą marki
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#121110"/>
  <path d="M80 210H260M128 210V360M212 210V360" fill="none" stroke="#c3a46b" stroke-width="12"/>
  <text x="80" y="460" font-family="Georgia, serif" font-size="84" fill="#f6f4ef">Zadaszenia Premium</text>
  <text x="82" y="530" font-family="sans-serif" font-size="30" letter-spacing="6" fill="#c3a46b">ALUMINIOWE ZADASZENIA TARASÓW · PERGOLE</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 88 }).toFile(new URL('og-default.jpg', OUT).pathname);
await sharp(Buffer.from(og)).jpeg({ quality: 88 }).toFile(new URL('og-default.jpg', PUBLIC).pathname);

console.log(`Wygenerowano ${images.length} obrazów w src/assets/images/ oraz ikony marki w public/`);
