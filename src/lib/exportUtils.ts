import { ExtractedColor, getContrastColor } from "./colorUtils";

/**
 * Generates and downloads a PNG palette image containing dominant colors and their values.
 * Executed 100% locally in the browser using HTML5 Canvas API.
 */
export function exportPaletteAsPng(
  colors: ExtractedColor[],
  filename = "dominant-color-palette.png"
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
  ctx.fillText("Colorvexa — Dominant Color Palette", 40, 58);

  ctx.fillStyle = "#94A3B8"; // Slate 400
  ctx.font = "18px system-ui, -apple-system, sans-serif";
  ctx.fillText(`${colors.length} Extracted Dominant Colors`, 40, 92);

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
