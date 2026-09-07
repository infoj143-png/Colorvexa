export interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
}

/**
 * Converts RGB color values (0-255) to a HEX string (#RRGGBB).
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, "0");
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts RGB color values (0-255) to HSL components and formatted string.
 */
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number; formatted: string } {
  const normR = Math.max(0, Math.min(255, r)) / 255;
  const normG = Math.max(0, Math.min(255, g)) / 255;
  const normB = Math.max(0, Math.min(255, b)) / 255;

  const max = Math.max(normR, normG, normB);
  const min = Math.min(normR, normG, normB);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case normR:
        h = (normG - normB) / delta + (normG < normB ? 6 : 0);
        break;
      case normG:
        h = (normB - normR) / delta + 2;
        break;
      case normB:
        h = (normR - normG) / delta + 4;
        break;
    }
    h /= 6;
  }

  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);

  return {
    h: hDeg,
    s: sPct,
    l: lPct,
    formatted: `hsl(${hDeg}, ${sPct}%, ${lPct}%)`,
  };
}

/**
 * Formats RGB components into an 'rgb(r, g, b)' string.
 */
export function formatRgb(r: number, g: number, b: number): string {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/**
 * Creates a full ColorFormats object from RGB values.
 */
export function getColorFormats(r: number, g: number, b: number): ColorFormats {
  const hex = rgbToHex(r, g, b);
  const hslObj = rgbToHsl(r, g, b);
  const rgb = formatRgb(r, g, b);

  return {
    hex,
    rgb,
    hsl: hslObj.formatted,
    r,
    g,
    b,
    h: hslObj.h,
    s: hslObj.s,
    l: hslObj.l,
  };
}

/**
 * Calculates text color (black or white) for optimal contrast against a background color.
 */
export function getContrastColor(r: number, g: number, b: number): "#000000" | "#ffffff" {
  // Using WCAG relative luminance formula
  const toLuminanceComponent = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };

  const luminance =
    0.2126 * toLuminanceComponent(r) +
    0.7152 * toLuminanceComponent(g) +
    0.0722 * toLuminanceComponent(b);

  return luminance > 0.179 ? "#000000" : "#ffffff";
}
