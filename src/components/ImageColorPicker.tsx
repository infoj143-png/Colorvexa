"use client";

import { useState, useRef, useEffect, useCallback, MouseEvent, TouchEvent } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { CopyButton } from "@/components/CopyButton";
import { ColorValue } from "@/components/ColorValue";
import { EmptyState } from "@/components/EmptyState";
import { getColorFormats, ColorFormats, getContrastColor } from "@/lib/colorUtils";
import { RefreshCw, ShieldCheck, Zap, Layers, Pipette, AlertCircle, History, ZoomIn } from "lucide-react";

export function ImageColorPicker() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorFormats | null>(null);
  const [hoverColor, setHoverColor] = useState<ColorFormats | null>(null);
  const [pointerPos, setPointerPos] = useState<{ xPercent: number; yPercent: number } | null>(null);
  const [hoverPos, setHoverPos] = useState<{ xPercent: number; yPercent: number; pixelX: number; pixelY: number } | null>(null);
  const [colorHistory, setColorHistory] = useState<ColorFormats[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Handle file selection
  const handleImageSelected = (file: File) => {
    setErrorMessage(null);
    setSelectedColor(null);
    setHoverColor(null);
    setPointerPos(null);
    setHoverPos(null);

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (PNG, JPG, WebP, SVG).");
      return;
    }

    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }

    const src = URL.createObjectURL(file);
    setImageFile(file);
    setImageSrc(src);
  };

  // Reset / Clear image
  const handleReset = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setImageFile(null);
    setImageSrc(null);
    setSelectedColor(null);
    setHoverColor(null);
    setPointerPos(null);
    setHoverPos(null);
    setColorHistory([]);
    setErrorMessage(null);
  };

  // Draw image to canvas once loaded
  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      imgRef.current = img;

      const canvas = canvasRef.current || document.createElement("canvas");
      canvasRef.current = canvas;

      // Limit canvas size safely to prevent high memory usage on giant images (e.g., 8K)
      const MAX_CANVAS_DIM = 2048;
      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      if (width > MAX_CANVAS_DIM || height > MAX_CANVAS_DIM) {
        if (width > height) {
          height = Math.round((height * MAX_CANVAS_DIM) / width);
          width = MAX_CANVAS_DIM;
        } else {
          width = Math.round((width * MAX_CANVAS_DIM) / height);
          height = MAX_CANVAS_DIM;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Pick default initial color from image center
        const centerX = Math.floor(width / 2);
        const centerY = Math.floor(height / 2);
        const pixelData = ctx.getImageData(centerX, centerY, 1, 1).data;
        const initialFormats = getColorFormats(pixelData[0], pixelData[1], pixelData[2]);

        setSelectedColor(initialFormats);
        setPointerPos({ xPercent: 50, yPercent: 50 });
        setColorHistory([initialFormats]);
      }
    };

    img.onerror = () => {
      setErrorMessage("Failed to load image. The file format might be unsupported or corrupted.");
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc]);

  // Extract color at specific element coordinates
  const getColorAtCoords = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current || !canvasRef.current) return null;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Relative percentage inside container
    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

    // Map to canvas pixel space
    const canvas = canvasRef.current;
    const pixelX = Math.max(0, Math.min(canvas.width - 1, Math.floor((x / rect.width) * canvas.width)));
    const pixelY = Math.max(0, Math.min(canvas.height - 1, Math.floor((y / rect.height) * canvas.height)));

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    const pixelData = ctx.getImageData(pixelX, pixelY, 1, 1).data;
    const colorFormats = getColorFormats(pixelData[0], pixelData[1], pixelData[2]);

    return {
      colorFormats,
      xPercent,
      yPercent,
      pixelX,
      pixelY,
    };
  }, []);

  // Handle image click
  const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
    const result = getColorAtCoords(e.clientX, e.clientY);
    if (!result) return;

    const { colorFormats, xPercent, yPercent } = result;

    setSelectedColor(colorFormats);
    setPointerPos({ xPercent, yPercent });

    // Update color history (avoid adjacent duplicates, keep max 10)
    setColorHistory((prev) => {
      if (prev.length > 0 && prev[0].hex === colorFormats.hex) {
        return prev;
      }
      return [colorFormats, ...prev.filter((c) => c.hex !== colorFormats.hex)].slice(0, 10);
    });
  };

  // Handle mouse move for hover inspection
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const result = getColorAtCoords(e.clientX, e.clientY);
    if (!result) return;

    setHoverColor(result.colorFormats);
    setHoverPos({
      xPercent: result.xPercent,
      yPercent: result.yPercent,
      pixelX: result.pixelX,
      pixelY: result.pixelY,
    });
  };

  const handleMouseLeave = () => {
    setHoverColor(null);
    setHoverPos(null);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const result = getColorAtCoords(touch.clientX, touch.clientY);
      if (result) {
        setSelectedColor(result.colorFormats);
        setPointerPos({ xPercent: result.xPercent, yPercent: result.yPercent });
        setColorHistory((prev) => {
          if (prev.length > 0 && prev[0].hex === result.colorFormats.hex) return prev;
          return [result.colorFormats, ...prev.filter((c) => c.hex !== result.colorFormats.hex)].slice(0, 10);
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Privacy Notice Banner */}
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

      {/* Uploader or Interactive Picker */}
      {!imageSrc ? (
        <div className="space-y-6">
          <ImageUploader
            onImageSelected={handleImageSelected}
            accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
            maxSizeMB={20}
          />

          {errorMessage && (
            <div className="flex items-center gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 p-4 rounded-xl">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <EmptyState
            title="Upload an image to start picking colors"
            description="Drop any photo or graphics file above. Click or tap anywhere on the image to inspect exact HEX, RGB, and HSL color values."
          />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Controls Bar above Image */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-100/80 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
              <Pipette className="w-4 h-4 text-sky-600" />
              <span>Click or tap anywhere on the image to pick a color</span>
            </div>

            <button
              onClick={handleReset}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3.5 py-2 rounded-xl transition-all shadow-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset & Change Image</span>
            </button>
          </div>

          {/* Interactive Image Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Canvas Viewport */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div
                ref={containerRef}
                onClick={handleImageClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                className="relative cursor-crosshair rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 shadow-lg select-none max-w-full touch-none"
                style={{ touchAction: "none" }}
                role="button"
                tabIndex={0}
                aria-label="Click to pick color from image"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    // Default center click for keyboard
                    if (containerRef.current) {
                      const rect = containerRef.current.getBoundingClientRect();
                      const fakeEvent = {
                        clientX: rect.left + rect.width / 2,
                        clientY: rect.top + rect.height / 2,
                      } as MouseEvent<HTMLDivElement>;
                      handleImageClick(fakeEvent);
                    }
                  }
                }}
              >
                {/* Image element for display */}
                {/* eslint-disable-next-html-element-suppression */}
                <img
                  src={imageSrc}
                  alt={imageFile ? imageFile.name : "Uploaded Image"}
                  className="max-h-[500px] w-auto h-auto object-contain block mx-auto pointer-events-none"
                />

                {/* Selected Point Marker */}
                {pointerPos && (
                  <div
                    className="absolute w-7 h-7 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center transition-all duration-75"
                    style={{
                      left: `${pointerPos.xPercent}%`,
                      top: `${pointerPos.yPercent}%`,
                    }}
                  >
                    <span className="absolute inset-0 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.8)] animate-ping opacity-75" />
                    <span
                      className="w-5 h-5 rounded-full border-2 border-white shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                      style={{ backgroundColor: selectedColor?.hex || "#000000" }}
                    />
                  </div>
                )}

                {/* Live Hover Loupe / Magnifier Preview Badge */}
                {hoverColor && hoverPos && (
                  <div
                    className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-16 bg-slate-950/95 backdrop-blur-md border border-slate-700 rounded-xl p-2 shadow-2xl flex items-center gap-2"
                    style={{
                      left: `${hoverPos.xPercent}%`,
                      top: `${hoverPos.yPercent}%`,
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-lg border border-white/20 shadow-xs"
                      style={{ backgroundColor: hoverColor.hex }}
                    />
                    <div className="flex flex-col text-[11px] font-mono text-white leading-tight">
                      <span className="font-bold">{hoverColor.hex.toUpperCase()}</span>
                      <span className="text-slate-400">{hoverColor.rgb}</span>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-500 mt-3 text-center flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5 text-slate-400" />
                Hover to preview pixels • Click or tap to select exact color
              </p>
            </div>

            {/* Right: Selected Color Details Panel */}
            <div className="lg:col-span-5 space-y-6">
              {selectedColor ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Selected Color
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {selectedColor.r}, {selectedColor.g}, {selectedColor.b}
                    </span>
                  </div>

                  {/* Prominent Visual Color Swatch */}
                  <div
                    className="h-32 rounded-2xl relative shadow-inner transition-colors duration-200 flex flex-col justify-between p-4 border border-black/10"
                    style={{ backgroundColor: selectedColor.hex }}
                  >
                    <div className="flex justify-end">
                      <CopyButton value={selectedColor.hex} label="HEX" />
                    </div>

                    <div className="flex items-end justify-between">
                      <span
                        className="text-2xl font-mono font-black tracking-wider uppercase drop-shadow-xs"
                        style={{ color: getContrastColor(selectedColor.r, selectedColor.g, selectedColor.b) }}
                      >
                        {selectedColor.hex}
                      </span>
                    </div>
                  </div>

                  {/* Color Values Table */}
                  <div className="space-y-3">
                    <ColorValue label="HEX" value={selectedColor.hex.toUpperCase()} />
                    <ColorValue label="RGB" value={selectedColor.rgb} />
                    <ColorValue label="HSL" value={selectedColor.hsl} />
                  </div>

                  {/* Color History / Recently Picked Swatches */}
                  {colorHistory.length > 1 && (
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <History className="w-3.5 h-3.5 text-slate-500" />
                        <span>Recent Colors from this Image</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {colorHistory.map((item, index) => (
                          <button
                            key={`${item.hex}-${index}`}
                            onClick={() => setSelectedColor(item)}
                            type="button"
                            title={`Select ${item.hex}`}
                            className={`w-9 h-9 rounded-xl border transition-all hover:scale-110 shadow-xs relative group ${
                              selectedColor.hex === item.hex
                                ? "ring-2 ring-sky-500 border-white"
                                : "border-slate-300 hover:border-slate-400"
                            }`}
                            style={{ backgroundColor: item.hex }}
                          >
                            <span className="sr-only">Select color {item.hex}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-3xl text-slate-500 text-sm">
                  Click anywhere on the uploaded image to select a color.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feature Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Pixel-accurate eyedropper tool</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>100% Client-side privacy</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <Layers className="w-4 h-4 text-sky-500 shrink-0" />
          <span>Instant HEX, RGB, HSL copy</span>
        </div>
      </div>
    </div>
  );
}
