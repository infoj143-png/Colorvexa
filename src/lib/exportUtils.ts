import { ExtractedColor, getContrastColor } from "./colorUtils";

/**
 * Formats a list of colors as a line-separated list of HEX codes.
 */
export function formatPaletteAsHex(colors: { hex: string }[]): string {
  return colors.map((c) => c.hex.toUpperCase()).join("\n");
}

/**
 * Formats a list of colors as CSS custom properties (:root).
 */
export function formatPaletteAsCss(colors: { hex: string; label?: string }[]): string {
  const vars = colors
    .map((c, i) => {
      const varName = c.label
        ? c.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        : `color-${i + 1}`;
      return `  --${varName}: ${c.hex.toUpperCase()};`;
    })
    .join("\n");
  return `:root {\n${vars}\n}`;
}

/**
 * Formats a list of colors as a JSON array of HEX strings.
 */
export function formatPaletteAsJson(colors: { hex: string; label?: string }[]): string {
  return JSON.stringify(
    colors.map((c) => ({
      hex: c.hex.toUpperCase(),
      ...(c.label ? { label: c.label } : {}),
    })),
    null,
    2
  );
}

/**
 * Generates and downloads a PNG palette image containing colors and their values.
 * Executed 100% locally in the browser using HTML5 Canvas API.
 */
export function exportPaletteAsPng(
  colors: ExtractedColor[],
  filename = "image-color-palette.png",
  title = "Colorvexa — Image Color Palette"
): void {
  if (!colors || colors.length === 0) return;

  const canvas = document.createElement("canvas");
  const width = 1200;
  const headerHeight = 120;
  const footerHeight = 60;
  const swatchAreaHeight = 420;
  const height = headerHeight + swatchAreaHeight + footerHeight;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background
  ctx.fillStyle = "#0F172A"; // Slate 900
  ctx.fillRect(0, 0, width, height);

  // Header Title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
  ctx.fillText(title, 40, 58);

  ctx.fillStyle = "#94A3B8"; // Slate 400
  ctx.font = "18px system-ui, -apple-system, sans-serif";
  ctx.fillText(`${colors.length} Extracted Image Palette Colors`, 40, 92);

  // Swatches Side by Side
  const count = colors.length;
  const padding = 16;
  const availableWidth = width - 80 - (count - 1) * padding;
  const colWidth = availableWidth / count;
  const startX = 40;
  const startY = headerHeight;

  colors.forEach((color, i) => {
    const x = startX + i * (colWidth + padding);
    const y = startY;

    // Draw swatch box with rounded corners
    ctx.fillStyle = color.hex;
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(x, y, colWidth, swatchAreaHeight, 16);
    } else {
      ctx.rect(x, y, colWidth, swatchAreaHeight);
    }
    ctx.fill();

    // Text Overlay inside Swatch Box
    const textColor = getContrastColor(color.r, color.g, color.b);
    ctx.fillStyle = textColor;

    // Prominence percentage badge
    ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
    ctx.fillText(`${color.percentage}%`, x + 16, y + 45);

    // HEX code
    ctx.font = "bold 20px monospace";
    ctx.fillText(color.hex.toUpperCase(), x + 16, y + swatchAreaHeight - 75);

    // RGB value
    ctx.font = "13px monospace";
    ctx.fillText(color.rgb, x + 16, y + swatchAreaHeight - 48);

    // HSL value
    ctx.font = "13px monospace";
    ctx.fillText(color.hsl, x + 16, y + swatchAreaHeight - 24);
  });

  // Footer branding
  ctx.fillStyle = "#64748B"; // Slate 500
  ctx.font = "16px system-ui, -apple-system, sans-serif";
  ctx.fillText("Generated with colorvexa.com • 100% Client-Side Privacy", 40, height - 25);

  // Trigger file download
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/**
 * Generates and downloads a PNG image for shades and tints variations.
 * Executed 100% locally in the browser using HTML5 Canvas API.
 */
export function exportShadesAndTintsAsPng(
  colors: { hex: string; rgb: string; hsl: string; r: number; g: number; b: number; label: string }[],
  baseHex: string,
  filename = "color-shades-and-tints.png"
): void {
  if (!colors || colors.length === 0) return;

  const canvas = document.createElement("canvas");
  const width = 1200;
  const headerHeight = 120;
  const footerHeight = 60;
  const swatchAreaHeight = 360;
  const height = headerHeight + swatchAreaHeight + footerHeight;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background
  ctx.fillStyle = "#0F172A"; // Slate 900
  ctx.fillRect(0, 0, width, height);

  // Header Title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
  ctx.fillText("Colorvexa — Color Shades & Tints", 40, 58);

  ctx.fillStyle = "#94A3B8"; // Slate 400
  ctx.font = "18px system-ui, -apple-system, sans-serif";
  ctx.fillText(`Base Color: ${baseHex.toUpperCase()} • ${colors.length} Variations`, 40, 92);

  // Swatches Side by Side
  const count = colors.length;
  const padding = 12;
  const availableWidth = width - 80 - (count - 1) * padding;
  const colWidth = availableWidth / count;
  const startX = 40;
  const startY = headerHeight;

  colors.forEach((color, i) => {
    const x = startX + i * (colWidth + padding);
    const y = startY;

    // Draw swatch box
    ctx.fillStyle = color.hex;
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(x, y, colWidth, swatchAreaHeight, 12);
    } else {
      ctx.rect(x, y, colWidth, swatchAreaHeight);
    }
    ctx.fill();

    // Text Overlay inside Swatch Box
    const textColor = getContrastColor(color.r, color.g, color.b);
    ctx.fillStyle = textColor;

    // Label (e.g., "50% Tint" or "Base Color")
    ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
    ctx.fillText(color.label, x + 10, y + 32);

    // HEX code
    ctx.font = "bold 15px monospace";
    ctx.fillText(color.hex.toUpperCase(), x + 10, y + swatchAreaHeight - 55);

    // RGB value
    ctx.font = "11px monospace";
    ctx.fillText(color.rgb, x + 10, y + swatchAreaHeight - 35);

    // HSL value
    ctx.font = "11px monospace";
    ctx.fillText(color.hsl, x + 10, y + swatchAreaHeight - 15);
  });

  // Footer branding
  ctx.fillStyle = "#64748B"; // Slate 500
  ctx.font = "16px system-ui, -apple-system, sans-serif";
  ctx.fillText("Generated with colorvexa.com • 100% Client-Side Privacy", 40, height - 25);

  // Trigger file download
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
