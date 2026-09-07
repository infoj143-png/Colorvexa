"use client";

import { useState, useRef, useCallback } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { CopyButton } from "@/components/CopyButton";
import { ColorValue } from "@/components/ColorValue";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { DownloadButton } from "@/components/DownloadButton";
import {
  extractDominantColors,
  ExtractedColor,
  getContrastColor,
} from "@/lib/colorUtils";
import {
  exportPaletteAsPng,
  formatPaletteAsHex,
  formatPaletteAsCss,
  formatPaletteAsJson,
} from "@/lib/exportUtils";
import {
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  Palette,
  Sparkles,
  Sliders,
  Image as ImageIcon,
  Code,
  FileJson,
  RotateCw,
} from "lucide-react";

export function ImageColorPaletteGenerator() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [paletteSize, setPaletteSize] = useState<number>(5);
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  // Copy feedback states
  const [copiedPalette, setCopiedPalette] = useState<boolean>(false);
  const [copiedCss, setCopiedCss] = useState<boolean>(false);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  // Seed / variation offset for regenerate feature
  const [regenerationSeed, setRegenerationSeed] = useState<number>(0);

  const imgRef = useRef<HTMLImageElement | null>(null);

  // Helper to copy text to clipboard with fallback
  const copyToClipboard = async (text: string, setSuccessState: (val: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccessState(true);
      setTimeout(() => setSuccessState(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setSuccessState(true);
      setTimeout(() => setSuccessState(false), 2000);
    }
  };

  // Analyze image colors when image source or size changes
  const processImage = useCallback(
    (src: string, count: number, seed = 0) => {
      setIsLoading(true);
      setErrorMessage(null);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;

      img.onload = () => {
        imgRef.current = img;
        setImageDimensions({
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
        });

        // Async scheduling to ensure loading state renders
        setTimeout(() => {
          try {
            // Sample with a slight shift or alternate resolution max dimension when regenerating to get useful variations
            const maxDimension = seed > 0 ? 200 + (seed % 3) * 30 : 200;
            let extracted = extractDominantColors(img, count, maxDimension);

            if (extracted.length === 0) {
              setErrorMessage(
                "Could not extract a color palette from this image. Please ensure the image contains visible pixels."
              );
            } else {
              // If seed > 0, produce a subtle deterministic re-sorting / layout variation that remains accurate to image colors
              if (seed % 2 === 1) {
                // Hue-sorted variation
                extracted = [...extracted].sort((a, b) => a.h - b.h);
              } else if (seed % 2 === 0 && seed > 0) {
                // Luminance-sorted variation
                extracted = [...extracted].sort((a, b) => b.l - a.l);
              }
              setColors(extracted);
            }
          } catch {
            setErrorMessage(
              "An error occurred while analyzing the image. Please try another image file."
            );
          } finally {
            setIsLoading(false);
          }
        }, 80);
      };

      img.onerror = () => {
        setIsLoading(false);
        setErrorMessage(
          "Failed to load the image. The file might be corrupted or in an unsupported format."
        );
      };
    },
    []
  );

  // Handle image uploaded by user
  const handleImageSelected = (file: File) => {
    setErrorMessage(null);
    setColors([]);
    setRegenerationSeed(0);

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type.toLowerCase()) && !file.type.startsWith("image/")) {
      setErrorMessage("Please select a supported image file (JPG, PNG, WebP).");
      return;
    }

    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }

    const src = URL.createObjectURL(file);
    setImageFile(file);
    setImageSrc(src);
    processImage(src, paletteSize, 0);
  };

  // Handle changing palette size (3, 4, 5, 6, 8, 10)
  const handleSizeChange = (size: number) => {
    setPaletteSize(size);
    if (imageSrc && imgRef.current) {
      setIsLoading(true);
      setTimeout(() => {
        try {
          const maxDimension = regenerationSeed > 0 ? 200 + (regenerationSeed % 3) * 30 : 200;
          let extracted = extractDominantColors(imgRef.current!, size, maxDimension);
          if (regenerationSeed % 2 === 1) {
            extracted = [...extracted].sort((a, b) => a.h - b.h);
          } else if (regenerationSeed % 2 === 0 && regenerationSeed > 0) {
            extracted = [...extracted].sort((a, b) => b.l - a.l);
          }
          setColors(extracted);
        } catch {
          setErrorMessage("Failed to recalculate color palette.");
        } finally {
          setIsLoading(false);
        }
      }, 50);
    }
  };

  // Handle Regenerate Palette button
  const handleRegenerate = () => {
    if (!imageSrc || !imgRef.current) return;
    const nextSeed = regenerationSeed + 1;
    setRegenerationSeed(nextSeed);
    processImage(imageSrc, paletteSize, nextSeed);
  };

  // Reset tool state
  const handleReset = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setImageFile(null);
    setImageSrc(null);
    setColors([]);
    setErrorMessage(null);
    setIsLoading(false);
    setCopiedPalette(false);
    setCopiedCss(false);
    setCopiedJson(false);
    setImageDimensions(null);
    setRegenerationSeed(0);
    imgRef.current = null;
  };

  // Copy entire palette (HEX list)
  const handleCopyPaletteHex = () => {
    if (colors.length === 0) return;
    const hexList = formatPaletteAsHex(colors);
    copyToClipboard(hexList, setCopiedPalette);
  };

  // Copy CSS Variables
  const handleCopyCss = () => {
    if (colors.length === 0) return;
    const cssVars = formatPaletteAsCss(colors);
    copyToClipboard(cssVars, setCopiedCss);
  };

  // Copy JSON Palette
  const handleCopyJson = () => {
    if (colors.length === 0) return;
    const jsonStr = formatPaletteAsJson(colors);
    copyToClipboard(jsonStr, setCopiedJson);
  };

  // Export palette as PNG image
  const handleExportPng = () => {
    if (colors.length === 0) return;
    const baseName = imageFile
      ? imageFile.name.replace(/\.[^/.]+$/, "")
      : "color-palette";
    const filename = `${baseName}-palette.png`;
    exportPaletteAsPng(colors, filename, "Colorvexa — Image Color Palette");
  };

  const paletteSizeOptions = [3, 4, 5, 6, 8, 10];

  return (
    <div className="space-y-8">
      {/* Privacy Guarantee Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-900">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">
            Your image is processed locally in your browser. We do not upload or store your image.
          </span>
        </div>
        <span className="shrink-0 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full hidden md:inline-block">
          100% Client-Side Privacy
        </span>
      </div>

      {/* Upload Dropzone or Main Application Workspace */}
      {!imageSrc ? (
        <div className="space-y-6">
          <ImageUploader
            onImageSelected={handleImageSelected}
            accept="image/jpeg,image/png,image/webp"
            maxSizeMB={20}
          />

          {errorMessage && (
            <ErrorState
              title="Image Processing Error"
              description={errorMessage}
              onRetry={handleReset}
            />
          )}

          <EmptyState
            title="Upload an image to generate a color palette"
            description="Drag and drop or select any photo (JPG, PNG, WebP) above. Colorvexa will extract a representative, harmonious color palette from your actual image."
          />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Control Bar: Palette Size Selector & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-100/90 border border-slate-200 rounded-2xl">
            {/* Palette Size Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mr-1">
                <Sliders className="w-4 h-4 text-rose-600" />
                <span>Palette Size:</span>
              </div>
              {paletteSizeOptions.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    paletteSize === size
                      ? "bg-rose-600 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                  aria-label={`Generate ${size} color palette`}
                >
                  {size} Colors
                </button>
              ))}
            </div>

            {/* Quick Action Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRegenerate}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3 py-2 rounded-xl transition-all shadow-xs disabled:opacity-50"
                aria-label="Regenerate color palette"
              >
                <RotateCw className={`w-3.5 h-3.5 text-rose-600 ${isLoading ? "animate-spin" : ""}`} />
                <span>Regenerate Palette</span>
              </button>

              <button
                onClick={handleReset}
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-300 hover:border-rose-200 px-3.5 py-2 rounded-xl transition-all shadow-xs"
                aria-label="Remove image and reset"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500 hover:text-rose-600" />
                <span>Remove Image</span>
              </button>
            </div>
          </div>

          {/* Loading or Error State */}
          {isLoading ? (
            <LoadingState message="Generating color palette..." />
          ) : errorMessage ? (
            <ErrorState
              title="Palette Generation Failed"
              description={errorMessage}
              onRetry={() => processImage(imageSrc, paletteSize, regenerationSeed)}
            />
          ) : (
            <div className="space-y-8">
              {/* Image Preview and Main Swatches Area */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Image Preview Box */}
                <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-sky-600" />
                      Original Image
                    </span>
                    {imageDimensions && (
                      <span className="font-mono text-slate-400">
                        {imageDimensions.width} × {imageDimensions.height} px
                      </span>
                    )}
                  </div>

                  <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-300 flex items-center justify-center p-2 min-h-[220px]">
                    {/* eslint-disable-next-html-element-suppression */}
                    <img
                      src={imageSrc}
                      alt={imageFile ? imageFile.name : "Uploaded Image Preview"}
                      className="max-h-[380px] w-auto h-auto object-contain rounded-lg"
                    />
                  </div>

                  {imageFile && (
                    <p className="text-xs text-slate-500 truncate text-center font-medium">
                      {imageFile.name} ({(imageFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                {/* Right Column: Palette Swatches Grid */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Palette className="w-5 h-5 text-rose-600" />
                      Generated Palette ({colors.length} Colors)
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">
                      Extracted from actual pixels
                    </span>
                  </div>

                  {/* Visual Color Swatches Grid */}
                  <div
                    className={`grid gap-4 ${
                      paletteSize <= 4
                        ? "grid-cols-1 sm:grid-cols-2"
                        : paletteSize <= 6
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    }`}
                  >
                    {colors.map((color, idx) => {
                      const textColor = getContrastColor(color.r, color.g, color.b);
                      const isLight = textColor === "#000000";

                      return (
                        <div
                          key={`${color.hex}-${idx}`}
                          className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-all group"
                        >
                          {/* Visual Swatch Card */}
                          <div
                            className="h-28 w-full relative p-3 flex flex-col justify-between transition-transform group-hover:scale-[1.01]"
                            style={{ backgroundColor: color.hex }}
                          >
                            {/* Color Proportion / Percentage Badge */}
                            <div className="flex items-center justify-between">
                              <span
                                className="px-2.5 py-1 rounded-full text-xs font-extrabold shadow-xs"
                                style={{
                                  backgroundColor: isLight
                                    ? "rgba(255, 255, 255, 0.85)"
                                    : "rgba(0, 0, 0, 0.45)",
                                  color: textColor,
                                }}
                              >
                                ~{color.percentage}%
                              </span>

                              <CopyButton value={color.hex} label="HEX" />
                            </div>

                            {/* HEX Code Overlay */}
                            <div className="flex justify-end">
                              <span
                                className="font-mono font-black text-lg tracking-wider drop-shadow-xs"
                                style={{ color: textColor }}
                              >
                                {color.hex.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          {/* Color Formats & Copy Options */}
                          <div className="p-4 space-y-2.5 text-xs bg-white">
                            <ColorValue label="HEX" value={color.hex.toUpperCase()} />
                            <ColorValue label="RGB" value={color.rgb} />
                            <ColorValue label="HSL" value={color.hsl} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Copy & Export Controls Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-600" />
                    Copy & Export Palette
                  </h3>
                  <span className="text-xs text-slate-500">
                    Export directly in your browser
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Copy Entire Palette HEX */}
                  <button
                    type="button"
                    onClick={handleCopyPaletteHex}
                    className="inline-flex items-center gap-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl transition-all shadow-xs"
                    aria-label="Copy entire palette HEX codes"
                  >
                    {copiedPalette ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied Palette!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Palette</span>
                      </>
                    )}
                  </button>

                  {/* Copy CSS Variables */}
                  <button
                    type="button"
                    onClick={handleCopyCss}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 px-3.5 py-2.5 rounded-xl transition-all shadow-xs"
                    aria-label="Copy palette as CSS variables"
                  >
                    {copiedCss ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied CSS!</span>
                      </>
                    ) : (
                      <>
                        <Code className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy CSS Variables</span>
                      </>
                    )}
                  </button>

                  {/* Copy JSON */}
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 px-3.5 py-2.5 rounded-xl transition-all shadow-xs"
                    aria-label="Copy palette as JSON"
                  >
                    {copiedJson ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied JSON!</span>
                      </>
                    ) : (
                      <>
                        <FileJson className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>

                  {/* Download PNG */}
                  <DownloadButton
                    onDownload={handleExportPng}
                    label="Download PNG Swatch"
                    format="PNG"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Feature Badges / Footnotes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Local Canvas median cut quantization</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>No server uploads — 100% private</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <Palette className="w-4 h-4 text-amber-500 shrink-0" />
          <span>HEX, RGB, HSL, CSS, JSON & PNG export</span>
        </div>
      </div>
    </div>
  );
}
