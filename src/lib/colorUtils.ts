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

export interface ExtendedColorFormats extends ColorFormats {
  a: number; // Alpha transparency (0.0 to 1.0)
}

export interface ExtractedColor extends ColorFormats {
  count: number;
  percentage: number;
}

/**
 * Converts RGB(A) color values to a HEX / HEXA string.
 */
export function rgbToHex(r: number, g: number, b: number, a: number = 1): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, "0").toUpperCase();
  };
  const hexRGB = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (a < 1) {
    const alphaHex = toHex(Math.round(a * 255));
    return `${hexRGB}${alphaHex}`;
  }
  return hexRGB;
}

/**
 * Parses any HEX string (#RGB, #RGBA, #RRGGBB, #RRGGBBAA) into RGBA components (0-255 for RGB, 0-1 for Alpha).
 */
export function hexToRgba(hexStr: string): { r: number; g: number; b: number; a: number } | null {
  if (!hexStr) return null;
  let cleanHex = hexStr.trim();
  if (cleanHex.startsWith("#")) {
    cleanHex = cleanHex.slice(1);
  }

  // Validate hex characters
  if (!/^[0-9a-fA-F]+$/.test(cleanHex)) {
    return null;
  }

  let r = 0, g = 0, b = 0, a = 1;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 4) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
    a = Number((parseInt(cleanHex[3] + cleanHex[3], 16) / 255).toFixed(2));
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  } else if (cleanHex.length === 8) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
    a = Number((parseInt(cleanHex.slice(6, 8), 16) / 255).toFixed(2));
  } else {
    return null;
  }

  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return null;

  return { r, g, b, a };
}

/**
 * Converts HSL components to RGB components (0-255).
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const normH = ((h % 360) + 360) % 360;
  const normS = Math.max(0, Math.min(100, s)) / 100;
  const normL = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * normL - 1)) * normS;
  const x = c * (1 - Math.abs(((normH / 60) % 2) - 1));
  const m = normL - c / 2;

  let rPrime = 0, gPrime = 0, bPrime = 0;

  if (normH < 60) {
    rPrime = c; gPrime = x; bPrime = 0;
  } else if (normH < 120) {
    rPrime = x; gPrime = c; bPrime = 0;
  } else if (normH < 180) {
    rPrime = 0; gPrime = c; bPrime = x;
  } else if (normH < 240) {
    rPrime = 0; gPrime = x; bPrime = c;
  } else if (normH < 300) {
    rPrime = x; gPrime = 0; bPrime = c;
  } else {
    rPrime = c; gPrime = 0; bPrime = x;
  }

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255),
  };
}

/**
 * Parses RGB / RGBA strings or comma/space-separated numbers into RGBA components.
 */
export function parseRgbString(str: string): { r: number; g: number; b: number; a: number } | null {
  if (!str) return null;
  const cleaned = str.trim();

  // Match numbers (including decimals and percentage)
  const matches = cleaned.match(/[-+]?\d*\.?\d+%?/g)?.filter((m) => m.length > 0);
  if (!matches || (matches.length !== 3 && matches.length !== 4)) {
    return null;
  }

  const r = parseFloat(matches[0]);
  const g = parseFloat(matches[1]);
  const b = parseFloat(matches[2]);
  let a = 1;

  if (matches.length === 4) {
    const rawA = matches[3];
    if (rawA.endsWith("%")) {
      a = parseFloat(rawA) / 100;
    } else {
      a = parseFloat(rawA);
    }
  }

  if (
    isNaN(r) || r < 0 || r > 255 ||
    isNaN(g) || g < 0 || g > 255 ||
    isNaN(b) || b < 0 || b > 255 ||
    isNaN(a) || a < 0 || a > 1
  ) {
    return null;
  }

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
    a: Number(a.toFixed(2)),
  };
}

/**
 * Parses HSL / HSLA strings or comma/space-separated numbers into HSLA components.
 */
export function parseHslString(str: string): { h: number; s: number; l: number; a: number } | null {
  if (!str) return null;
  const cleaned = str.trim().replace(/°/g, "");

  const matches = cleaned.match(/[-+]?\d*\.?\d+%?/g)?.filter((m) => m.length > 0);
  if (!matches || (matches.length !== 3 && matches.length !== 4)) {
    return null;
  }

  const h = parseFloat(matches[0]);
  const s = parseFloat(matches[1]);
  const l = parseFloat(matches[2]);
  let a = 1;

  if (matches.length === 4) {
    const rawA = matches[3];
    if (rawA.endsWith("%")) {
      a = parseFloat(rawA) / 100;
    } else {
      a = parseFloat(rawA);
    }
  }

  if (
    isNaN(h) || h < 0 || h > 360 ||
    isNaN(s) || s < 0 || s > 100 ||
    isNaN(l) || l < 0 || l > 100 ||
    isNaN(a) || a < 0 || a > 1
  ) {
    return null;
  }

  return {
    h: Math.round(h),
    s: Math.round(s),
    l: Math.round(l),
    a: Number(a.toFixed(2)),
  };
}

/**
 * Formats RGB / RGBA into a CSS string.
 */
export function formatRgba(r: number, g: number, b: number, a: number = 1): string {
  const roundedR = Math.round(r);
  const roundedG = Math.round(g);
  const roundedB = Math.round(b);
  if (a < 1) {
    return `rgba(${roundedR}, ${roundedG}, ${roundedB}, ${Number(a.toFixed(2))})`;
  }
  return `rgb(${roundedR}, ${roundedG}, ${roundedB})`;
}

/**
 * Formats HSL / HSLA into a CSS string.
 */
export function formatHsla(h: number, s: number, l: number, a: number = 1): string {
  const roundedH = Math.round(h);
  const roundedS = Math.round(s);
  const roundedL = Math.round(l);
  if (a < 1) {
    return `hsla(${roundedH}, ${roundedS}%, ${roundedL}%, ${Number(a.toFixed(2))})`;
  }
  return `hsl(${roundedH}, ${roundedS}%, ${roundedL}%)`;
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
 * Calculates relative luminance of an RGB color according to WCAG 2.1 specs.
 */
export function calculateLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const s = Math.max(0, Math.min(255, c)) / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };

  return (
    0.2126 * toLinear(r) +
    0.7152 * toLinear(g) +
    0.0722 * toLinear(b)
  );
}

/**
 * Calculates the WCAG contrast ratio between two RGB colors (1:1 to 21:1).
 */
export function calculateContrastRatio(
  rgb1: { r: number; g: number; b: number },
  rgb2: { r: number; g: number; b: number }
): number {
  const l1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Number(ratio.toFixed(2));
}

export interface WcagResults {
  ratio: number;
  normalAA: boolean;
  normalAAA: boolean;
  largeAA: boolean;
  largeAAA: boolean;
  uiComponent: boolean;
}

/**
 * Evaluates WCAG 2.1 compliance for a given contrast ratio.
 */
export function evaluateWcag(ratio: number): WcagResults {
  return {
    ratio,
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7.0,
    largeAA: ratio >= 3.0,
    largeAAA: ratio >= 4.5,
    uiComponent: ratio >= 3.0,
  };
}

export interface ColorVariation extends ColorFormats {
  percentage: number;
  label: string;
}

/**
 * Generates progressive tints (mixed towards white) and shades (mixed towards black)
 * for a base color with a given number of steps (e.g. 5, 7, 9, 11).
 */
export function generateShadesAndTints(
  r: number,
  g: number,
  b: number,
  stepsCount: number = 9
): { base: ColorFormats; tints: ColorVariation[]; shades: ColorVariation[] } {
  const base = getColorFormats(r, g, b);
  const tints: ColorVariation[] = [];
  const shades: ColorVariation[] = [];

  for (let i = 1; i <= stepsCount; i++) {
    const percentage = Math.round((i / (stepsCount + 1)) * 100);
    const factor = percentage / 100;

    // Tint: mix base towards white (255, 255, 255)
    // Percentage indicates amount of white added (e.g. 10% white tint)
    const tintR = Math.round(r + (255 - r) * factor);
    const tintG = Math.round(g + (255 - g) * factor);
    const tintB = Math.round(b + (255 - b) * factor);

    tints.push({
      ...getColorFormats(tintR, tintG, tintB),
      percentage,
      label: `${percentage}% Tint`,
    });

    // Shade: mix base towards black (0, 0, 0)
    // Percentage indicates amount of black added (e.g. 10% black shade)
    const shadeR = Math.round(r * (1 - factor));
    const shadeG = Math.round(g * (1 - factor));
    const shadeB = Math.round(b * (1 - factor));

    shades.push({
      ...getColorFormats(shadeR, shadeG, shadeB),
      percentage,
      label: `${percentage}% Shade`,
    });
  }

  return { base, tints, shades };
}

/**
 * Calculates text color (black or white) for optimal contrast against a background color.
 */
export function getContrastColor(r: number, g: number, b: number): "#000000" | "#ffffff" {
  const luminance = calculateLuminance(r, g, b);
  return luminance > 0.179 ? "#000000" : "#ffffff";
}

interface ColorBox {
  pixels: [number, number, number][];
  rMin: number;
  rMax: number;
  gMin: number;
  gMax: number;
  bMin: number;
  bMax: number;
}

function createBox(pixels: [number, number, number][]): ColorBox {
  let rMin = 255, rMax = 0;
  let gMin = 255, gMax = 0;
  let bMin = 255, bMax = 0;

  for (let i = 0; i < pixels.length; i++) {
    const p = pixels[i];
    if (p[0] < rMin) rMin = p[0];
    if (p[0] > rMax) rMax = p[0];
    if (p[1] < gMin) gMin = p[1];
    if (p[1] > gMax) gMax = p[1];
    if (p[2] < bMin) bMin = p[2];
    if (p[2] > bMax) bMax = p[2];
  }

  return { pixels, rMin, rMax, gMin, gMax, bMin, bMax };
}

function getLongestDimension(box: ColorBox): 0 | 1 | 2 {
  const rRange = box.rMax - box.rMin;
  const gRange = box.gMax - box.gMin;
  const bRange = box.bMax - box.bMin;

  if (rRange >= gRange && rRange >= bRange) return 0;
  if (gRange >= rRange && gRange >= bRange) return 1;
  return 2;
}

/**
 * Extracts dominant colors from an HTMLImageElement using client-side Median Cut color quantization.
 * Downsamples large images to an offscreen canvas for fast client-side performance.
 * Ignores fully transparent pixels (alpha < 128).
 */
export function extractDominantColors(
  img: HTMLImageElement,
  targetCount: number = 5,
  maxSampleDimension: number = 200
): ExtractedColor[] {
  const canvas = document.createElement("canvas");
  let width = img.naturalWidth || img.width || 100;
  let height = img.naturalHeight || img.height || 100;

  if (width > maxSampleDimension || height > maxSampleDimension) {
    if (width > height) {
      height = Math.round((height * maxSampleDimension) / width);
      width = maxSampleDimension;
    } else {
      width = Math.round((width * maxSampleDimension) / height);
      height = maxSampleDimension;
    }
  }

  canvas.width = Math.max(1, width);
  canvas.height = Math.max(1, height);

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  const pixels: [number, number, number][] = [];
  for (let i = 0; i < imgData.length; i += 4) {
    const a = imgData[i + 3];
    if (a >= 128) {
      pixels.push([imgData[i], imgData[i + 1], imgData[i + 2]]);
    }
  }

  if (pixels.length === 0) {
    return [];
  }

  const boxes: ColorBox[] = [createBox(pixels)];

  while (boxes.length < targetCount) {
    let splittableIndex = -1;
    let maxScore = -1;

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (box.pixels.length <= 1) continue;

      const dim = getLongestDimension(box);
      const range =
        dim === 0
          ? box.rMax - box.rMin
          : dim === 1
          ? box.gMax - box.gMin
          : box.bMax - box.bMin;

      if (range === 0) continue;

      const score = range * Math.sqrt(box.pixels.length);
      if (score > maxScore) {
        maxScore = score;
        splittableIndex = i;
      }
    }

    if (splittableIndex === -1) break;

    const boxToSplit = boxes[splittableIndex];
    boxes.splice(splittableIndex, 1);

    const dim = getLongestDimension(boxToSplit);
    boxToSplit.pixels.sort((a, b) => a[dim] - b[dim]);

    const medianIndex = Math.floor(boxToSplit.pixels.length / 2);
    const p1 = boxToSplit.pixels.slice(0, medianIndex);
    const p2 = boxToSplit.pixels.slice(medianIndex);

    if (p1.length > 0) boxes.push(createBox(p1));
    if (p2.length > 0) boxes.push(createBox(p2));
  }

  const totalPixels = pixels.length;
  const results: ExtractedColor[] = boxes.map((box) => {
    let sumR = 0, sumG = 0, sumB = 0;
    for (let i = 0; i < box.pixels.length; i++) {
      sumR += box.pixels[i][0];
      sumG += box.pixels[i][1];
      sumB += box.pixels[i][2];
    }
    const count = box.pixels.length;
    const avgR = Math.round(sumR / count);
    const avgG = Math.round(sumG / count);
    const avgB = Math.round(sumB / count);
    const formats = getColorFormats(avgR, avgG, avgB);
    const percentage = Number(((count / totalPixels) * 100).toFixed(1));

    return {
      ...formats,
      count,
      percentage,
    };
  });

  results.sort((a, b) => b.count - a.count);

  return results;
}
