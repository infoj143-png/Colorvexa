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
import { exportPaletteAsPng } from "@/lib/exportUtils";
import {
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  Layers,
  Sparkles,
  Sliders,
  Image as ImageIcon,
} from "lucide-react";

export function DominantColorExtractor() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colorCount, setColorCount] = useState<number>(5);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);

  // Analyze image colors when image source or colorCount changes
  const processImage = useCallback(
    (src: string, count: number) => {
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

        // Async scheduling to ensure loading spinner renders properly
        setTimeout(() => {
          try {
            const colors = extractDominantColors(img, count);
            if (colors.length === 0) {
              setErrorMessage(
                "Could not extract colors from this image. Please ensure the image contains visible pixels."
              );
            } else {
              setExtractedColors(colors);
            }
          } catch {
            setErrorMessage(
              "An error occurred while processing the image. Please try another image file."
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

  // Handle user uploaded image
  const handleImageSelected = (file: File) => {
    setErrorMessage(null);
    setExtractedColors([]);

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }

    const src = URL.createObjectURL(file);
    setImageFile(file);
    setImageSrc(src);
    processImage(src, colorCount);
  };

  // Handle count change (3, 5, 8, 10)
  const handleCountChange = (count: number) => {
    setColorCount(count);
    if (imageSrc && imgRef.current) {
      setIsLoading(true);
      setTimeout(() => {
        try {
          const colors = extractDominantColors(imgRef.current!, count);
          setExtractedColors(colors);
        } catch {
          setErrorMessage("Failed to recalculate color palette.");
        } finally {
          setIsLoading(false);
        }
      }, 50);
    }
  };

  // Reset tool state
  const handleReset = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setImageFile(null);
    setImageSrc(null);
    setExtractedColors([]);
    setErrorMessage(null);
    setIsLoading(false);
    setCopiedAll(false);
    setImageDimensions(null);
    imgRef.current = null;
  };

  // Copy all HEX colors
  const handleCopyAllHex = async () => {
    if (extractedColors.length === 0) return;
    const allHex = extractedColors.map((c) => c.hex.toUpperCase()).join(", ");

    try {
      await navigator.clipboard.writeText(allHex);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = allHex;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  // Export palette as PNG
  const handleExportPng = () => {
    if (extractedColors.length === 0) return;
    const filename = imageFile
      ? `dominant-palette-${imageFile.name.replace(/\.[^/.]+$/, "")}.png`
      : "dominant-color-palette.png";
    exportPaletteAsPng(extractedColors, filename);
  };

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
          100% Client-Side
        </span>
      </div>

      {/* Upload Dropzone */}
      {!imageSrc ? (
        <div className="space-y-6">
          <ImageUploader
            onImageSelected={handleImageSelected}
            accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
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
            title="Upload an image to extract dominant colors"
            description="Drop any photo (JPG, PNG, WebP) above to automatically calculate color frequency clusters, dominant swatches, and color ratios."
          />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Control Bar: Color Count & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-100/90 border border-slate-200 rounded-2xl">
            {/* Color Count Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mr-1">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <span>Colors:</span>
              </div>
              {[3, 5, 8, 10].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handleCountChange(count)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    colorCount === count
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                  aria-label={`Extract ${count} dominant colors`}
                >
                  {count} Colors
                </button>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {extractedColors.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={handleCopyAllHex}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3 py-2 rounded-xl transition-all shadow-xs"
                  >
                    {copiedAll ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied All HEX!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy All HEX</span>
                      </>
                    )}
                  </button>

                  <DownloadButton
                    onDownload={handleExportPng}
                    label="Export PNG"
                    format="PNG"
                  />
                </>
              )}

              <button
                onClick={handleReset}
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-300 hover:border-rose-200 px-3.5 py-2 rounded-xl transition-all shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500 hover:text-rose-600" />
                <span>Remove Image</span>
              </button>
            </div>
          </div>

          {/* Processing Loading Spinner State */}
          {isLoading ? (
            <LoadingState message="Analyzing image colors..." />
          ) : errorMessage ? (
            <ErrorState
              title="Color Extraction Failed"
              description={errorMessage}
              onRetry={() => processImage(imageSrc, colorCount)}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Source Image Preview */}
              <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-sky-600" />
                    Source Image
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
                    alt={imageFile ? imageFile.name : "Uploaded Preview"}
                    className="max-h-[380px] w-auto h-auto object-contain rounded-lg"
                  />
                </div>

                {imageFile && (
                  <p className="text-xs text-slate-500 truncate text-center font-medium">
                    {imageFile.name} ({(imageFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
              </div>

              {/* Right Column: Dominant Extracted Color Swatches Grid */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-600" />
                    Dominant Palette ({extractedColors.length} Colors)
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Sorted by visual prominence
                  </span>
                </div>

                {/* Swatches Grid */}
                <div
                  className={`grid gap-4 ${
                    colorCount <= 5
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  }`}
                >
                  {extractedColors.map((color, idx) => (
                    <div
                      key={`${color.hex}-${idx}`}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-all group"
                    >
                      {/* Large Swatch Block */}
                      <div
                        className="h-28 w-full relative p-3 flex flex-col justify-between transition-transform group-hover:scale-[1.01]"
                        style={{ backgroundColor: color.hex }}
                      >
                        {/* Prominence Percentage Badge */}
                        <div className="flex items-center justify-between">
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-extrabold shadow-xs"
                            style={{
                              backgroundColor: getContrastColor(color.r, color.g, color.b) === "#ffffff" ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.75)",
                              color: getContrastColor(color.r, color.g, color.b),
                            }}
                          >
                            {color.percentage}%
                          </span>

                          <CopyButton value={color.hex} label="HEX" />
                        </div>

                        {/* HEX Code Overlay */}
                        <div className="flex justify-end">
                          <span
                            className="font-mono font-black text-lg tracking-wider drop-shadow-xs"
                            style={{
                              color: getContrastColor(color.r, color.g, color.b),
                            }}
                          >
                            {color.hex.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Color Details & Individual Copy Controls */}
                      <div className="p-4 space-y-2.5 text-xs bg-white">
                        <ColorValue label="HEX" value={color.hex.toUpperCase()} />
                        <ColorValue label="RGB" value={color.rgb} />
                        <ColorValue label="HSL" value={color.hsl} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Feature Footnotes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>Median Cut quantization algorithm</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>100% Client-side browser execution</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <Layers className="w-4 h-4 text-amber-500 shrink-0" />
          <span>PNG export & HEX/RGB/HSL copy</span>
        </div>
      </div>
    </div>
  );
}
