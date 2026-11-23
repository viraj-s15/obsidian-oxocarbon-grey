import { grey as g, accent as a, syntax } from 'oxocarbon-grey/src/palette.mjs';

const channels = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

export const rgb = (hex) => channels(hex).join(', ');

const alpha = (hex, opacity) =>
  hex +
  Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');

export const hsl = (hex) => {
  const [r, gr, b] = channels(hex).map((c) => c / 255);
  const max = Math.max(r, gr, b);
  const min = Math.min(r, gr, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l: Math.round(l * 100) };
  const s = d / (1 - Math.abs(2 * l - 1));
  const sector = max === r ? ((gr - b) / d) % 6 : max === gr ? (b - r) / d + 2 : (r - gr) / d + 4;
  return { h: Math.round(((sector * 60) + 360) % 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

// Oxocarbon has no orange or yellow, so rose stands in for orange and purple
// for yellow, which matches the terminal ports' ANSI yellow.
const namedColours = {
  red: a.pink,
  orange: a.rose,
  yellow: a.purple,
  green: a.green,
  cyan: a.teal,
  blue: a.blue,
  purple: a.purple,
  pink: a.rose,
};

// The bars move from blue through purple to rose for the main levels, and
// the minor levels share a muted steel so that they recede.
const headingBars = [a.blue, a.purple, a.rose, a.steel, a.steel, a.steel];

export const folderColours = [a.pink, a.rose, a.purple, a.blue, a.sky, a.teal, a.green, a.ice];

const accent = hsl(a.blue);

export const variables = {
  '--accent-h': String(accent.h),
  '--accent-s': `${accent.s}%`,
  '--accent-l': `${accent.l}%`,

  '--color-base-00': g.bg,
  '--color-base-05': g.bgLine,
  '--color-base-10': g.bgLine,
  '--color-base-20': g.bgFloat,
  '--color-base-25': g.bgFloat,
  '--color-base-30': g.guide,
  '--color-base-35': g.bgSelection,
  '--color-base-40': g.lineNr,
  '--color-base-50': g.fgSubtle,
  '--color-base-60': g.fgSubtle,
  '--color-base-70': g.fgMuted,
  '--color-base-100': g.fg,
  ...Object.fromEntries(
    Object.entries(namedColours).flatMap(([name, hex]) => [
      [`--color-${name}`, hex],
      [`--color-${name}-rgb`, rgb(hex)],
    ]),
  ),

  '--background-primary': g.bg,
  '--background-primary-alt': g.bgLine,
  '--background-secondary': g.bg,
  '--background-secondary-alt': g.bgFloat,
  '--background-modifier-hover': g.bgFloat,
  '--background-modifier-active-hover': g.bgSelection,
  '--background-modifier-border': g.guide,
  '--background-modifier-border-hover': g.lineNr,
  '--background-modifier-border-focus': g.fgSubtle,
  '--background-modifier-form-field': g.bgLine,
  '--divider-color': g.guide,
  '--titlebar-background': g.bg,
  '--titlebar-background-focused': g.bg,
  '--tab-container-background': g.bg,
  '--ribbon-background': g.bg,
  '--ribbon-background-collapsed': g.bg,
  '--status-bar-background': g.bg,
  '--scrollbar-thumb-bg': g.guide,
  '--scrollbar-active-thumb-bg': g.lineNr,

  '--text-normal': g.fg,
  '--text-muted': g.fgMuted,
  '--text-faint': g.fgSubtle,
  '--text-on-accent': g.bg,
  '--text-selection': g.bgSelection,
  '--text-highlight-bg': alpha(a.purple, 0.25),
  '--link-color': syntax.link,
  '--link-color-hover': a.ice,
  '--link-external-color': syntax.link,
  '--link-external-color-hover': a.ice,
  '--list-marker-color': g.fgSubtle,

  '--nav-item-background-hover': g.bgFloat,
  '--nav-item-background-active': g.bgSelection,
  '--nav-item-color-active': g.fg,
  '--nav-indentation-guide-color': g.guide,

  '--code-background': g.bgLine,
  '--code-normal': g.fg,
  '--code-comment': syntax.comment,
  '--code-function': syntax.function,
  '--code-important': syntax.invalid,
  '--code-keyword': syntax.keyword,
  '--code-operator': syntax.operator,
  '--code-property': syntax.property,
  '--code-punctuation': syntax.punctuation,
  '--code-string': syntax.string,
  '--code-tag': syntax.tag,
  '--code-value': syntax.number,

  '--bold-color': syntax.bold,
  '--italic-color': a.purple,
  '--inline-title-color': a.blueLight,

  ...Object.fromEntries(headingBars.map((hex, i) => [`--oxg-h${i + 1}-bar`, hex])),
};
