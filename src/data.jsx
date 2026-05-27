// Shared product data + helpers
// Same beans across all 3 SKUs — only size & price differ.
// Source: real bag label.

const SHARED_NOTES = ['Piloncillo', 'Almendra', 'Chocolate', 'Caramelo', 'Nuez tostada'];
const SHARED_VARIETAL = 'Arábica';
const SHARED_ORIGIN = 'Yecuatla, Veracruz';
const SHARED_ALTITUDE = '1200–1600 m.s.n.m.';
const SHARED_INTENSITY_LEVEL = 4; // 4/5 dots on label
const SHARED_INTENSITY = 'Medio-alto';

window.PRODUCTS = [
  {
    id: 'descubrir',
    name: 'Para Descubrir',
    size: '250g',
    price: 130,
    intensity: SHARED_INTENSITY,
    intensityLevel: SHARED_INTENSITY_LEVEL,
    notes: SHARED_NOTES,
    varietal: SHARED_VARIETAL,
    origin: SHARED_ORIGIN,
    altitude: SHARED_ALTITUDE,
    tag: 'NUEVO AQUÍ',
    eyebrow: '01 · La probadita',
    blurb: 'Bolsa chica para empezar el rito. Rinde unos días — suficiente para enamorarte. O para regalar y quedar bien.',
    rinde: '~16 tazas',
    color: '#D88B70',
    bagImg: 'assets/bag-1kg.png',  // small bag = 250g
  },
  {
    id: 'diaria',
    name: 'Tu Taza Diaria',
    size: '400g',
    price: 240,
    intensity: SHARED_INTENSITY,
    intensityLevel: SHARED_INTENSITY_LEVEL,
    notes: SHARED_NOTES,
    varietal: SHARED_VARIETAL,
    origin: SHARED_ORIGIN,
    altitude: SHARED_ALTITUDE,
    tag: 'MÁS VENDIDA',
    eyebrow: '02 · El default',
    blurb: 'La cantidad justa para quien no perdona su café cada mañana. Una bolsa, dos semanas, cero excusas.',
    rinde: '~26 tazas',
    color: '#D88B70',
    bagImg: 'assets/bag-400g.png',
  },
  {
    id: 'amantes',
    name: 'Para Amantes',
    size: '1kg',
    price: 415,
    intensity: SHARED_INTENSITY,
    intensityLevel: SHARED_INTENSITY_LEVEL,
    notes: SHARED_NOTES,
    varietal: SHARED_VARIETAL,
    origin: SHARED_ORIGIN,
    altitude: SHARED_ALTITUDE,
    tag: 'SIN MIEDO',
    eyebrow: '03 · El kilo',
    blurb: 'Para quienes lo toman a diario o lo comparten en casa, oficina o cafetería. El kilo de los devotos.',
    rinde: '~66 tazas',
    color: '#D88B70',
    bagImg: 'assets/bag-250g.png',  // large bag = 1kg
  },
];

// Presentación: grano entero o molido
window.PRESENT_OPTIONS = [
  { id: 'grano', label: 'Grano entero', sub: 'Tú lo muelas en casa' },
  { id: 'molido', label: 'Molido', sub: 'Listo para preparar' },
];

window.formatMXN = (n) => `$${n.toLocaleString('es-MX')} MXN`;

// Tasting profile (same for all SKUs)
window.TASTING = {
  fragancia: 'Medio-alto, con notas de piloncillo, almendra y chocolate.',
  retrogusto: 'Duradero, con toques de caramelo y nuez tostada.',
  varietal: SHARED_VARIETAL,
  origin: SHARED_ORIGIN,
  altitude: SHARED_ALTITUDE,
  intensityLevel: SHARED_INTENSITY_LEVEL,
};
