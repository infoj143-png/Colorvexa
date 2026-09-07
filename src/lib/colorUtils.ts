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

export interface ExtractedColor extends ColorFormats {
  count: number;
  percentage: number;
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
