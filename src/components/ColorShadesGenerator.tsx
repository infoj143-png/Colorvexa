"use client";

import { useState, useMemo } from "react";
import {
  getColorFormats,
  hexToRgba,
  parseRgbString,
  parseHslString,
  hslToRgb,
  generateShadesAndTints,
  ColorVariation,
} from "@/lib/colorUtils";
import {
  formatPaletteAsHex,
  formatPaletteAsCss,
  formatPaletteAsJson,
  exportShadesAndTintsAsPng,
} from "@/lib/exportUtils";
import { CopyButton } from "./CopyButton";
import {
  RotateCcw,
  Copy,
  Code,
  FileJson,
  Download,
  SlidersHorizontal,
  Check,
  AlertCircle,
} from "lucide-react";

const DEFAULT_BASE_HEX = "#FF5733";

export function ColorShadesGenerator() {
  const [hexInput, setHexInput] = useState<string>(DEFAULT_BASE_HEX);
  const [rgbInput, setRgbInput] = useState<string>("rgb(255, 87, 51)");
  const [hslInput, setHslInput] = useState<string>("hsl(11, 100%, 60%)");
  const [steps, setSteps] = useState<number>(9);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [copyAllStatus, setCopyAllStatus] = useState<string | null>(null);

  // Active base color formats
  const baseColor = useMemo(() => {
    const rgba = hexToRgba(hexInput);
    if (!rgba) return null;
    return getColorFormats(rgba.r, rgba.g, rgba.b);
  }, [hexInput]);

  // Synchronized update helper from RGB values
  const updateFromRgb = (r: number, g: number, b: number) => {
    const formats = getColorFormats(r, g, b);
    setHexInput(formats.hex);
    setRgbInput(formats.rgb);
    setHslInput(formats.hsl);
    setErrorMsg(null);
  };

  const handleHexChange = (value: string) => {
    setHexInput(value);
    const parsed = hexToRgba(value);
    if (parsed) {
      updateFromRgb(parsed.r, parsed.g, parsed.b);
    } else {
      setErrorMsg("Invalid HEX color string. Example: #FF5733");
    }
  };

  const handleRgbChange = (value: string) => {
    setRgbInput(value);
    const parsed = parseRgbString(value);
    if (parsed) {
      updateFromRgb(parsed.r, parsed.g, parsed.b);
    } else {
      setErrorMsg("Invalid RGB color string. Example: rgb(255, 87, 51) or 255, 87, 51");
    }
  };

  const handleHslChange = (value: string) => {
    setHslInput(value);
    const parsed = parseHslString(value);
    if (parsed) {
      const rgb = hslToRgb(parsed.h, parsed.s, parsed.l);
      updateFromRgb(rgb.r, rgb.g, rgb.b);
    } else {
      setErrorMsg("Invalid HSL color string. Example: hsl(11, 100%, 60%) or 11, 100%, 60%");
    }
  };

  const handlePickerChange = (value: string) => {
    handleHexChange(value);
  };

  const handleReset = () => {
    handleHexChange(DEFAULT_BASE_HEX);
    setSteps(9);
    setErrorMsg(null);
    setCopyAllStatus(null);
  };

  // Generate Tints & Shades scale
  const variations = useMemo(() => {
    if (!baseColor) return { tints: [], shades: [] };
    return generateShadesAndTints(baseColor.r, baseColor.g, baseColor.b, steps);
  }, [baseColor, steps]);

  // Combined full palette list: Tints (from highest % tint down to lowest %) -> Base -> Shades (from lowest % shade up to highest %)
  const fullScaleList = useMemo(() => {
    if (!baseColor) return [];

    // Tints sorted from highest tint (lightest) down to lowest tint
    const reversedTints = [...variations.tints].reverse();

    const baseVariation: ColorVariation = {
      ...baseColor,
      percentage: 0,
      label: "Base Color",
    };

    return [...reversedTints, baseVariation, ...variations.shades];
  }, [baseColor, variations]);

  const handleCopyAllHex = () => {
    if (fullScaleList.length === 0) return;
    const text = formatPaletteAsHex(fullScaleList);
    navigator.clipboard.writeText(text);
    setCopyAllStatus("copied-hex");
    setTimeout(() => setCopyAllStatus(null), 2000);
  };

  const handleCopyCss = () => {
    if (fullScaleList.length === 0) return;
    const text = formatPaletteAsCss(fullScaleList);
    navigator.clipboard.writeText(text);
    setCopyAllStatus("copied-css");
    setTimeout(() => setCopyAllStatus(null), 2000);
  };

  const handleCopyJson = () => {
    if (fullScaleList.length === 0) return;
    const text = formatPaletteAsJson(fullScaleList);
    navigator.clipboard.writeText(text);
    setCopyAllStatus("copied-json");
    setTimeout(() => setCopyAllStatus(null), 2000);
  };

  const handleDownloadPng = () => {
    if (!baseColor || fullScaleList.length === 0) return;
    exportShadesAndTintsAsPng(
      fullScaleList,
      baseColor.hex,
      `colorvexa-shades-tints-${baseColor.hex.replace("#", "")}.png`
    );
  };

  return (
    <div className="space-y-10">
      {/* Input & Control Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
              Base Color & Controls
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select or type a base color in HEX, RGB, or HSL format to generate matching tints and shades.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Validation Error Alert */}
        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Color Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* Swatch & Native Color Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Color Picker
            </label>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl border border-slate-300 shadow-inner shrink-0 transition-colors"
                style={{ backgroundColor: baseColor ? baseColor.hex : "#CCCCCC" }}
              />
              <input
                type="color"
                value={baseColor ? baseColor.hex : DEFAULT_BASE_HEX}
                onChange={(e) => handlePickerChange(e.target.value)}
                className="w-full h-12 rounded-xl border border-slate-300 p-1 cursor-pointer bg-white"
                aria-label="Pick base color visually"
              />
            </div>
          </div>

          {/* HEX Input */}
          <div>
            <label htmlFor="hex-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              HEX
            </label>
            <input
              id="hex-input"
              type="text"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#FF5733"
              className="w-full h-12 px-4 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden transition-all"
            />
          </div>

          {/* RGB Input */}
          <div>
            <label htmlFor="rgb-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              RGB
            </label>
            <input
              id="rgb-input"
              type="text"
              value={rgbInput}
              onChange={(e) => handleRgbChange(e.target.value)}
              placeholder="rgb(255, 87, 51)"
              className="w-full h-12 px-4 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden transition-all"
            />
          </div>

          {/* HSL Input */}
          <div>
            <label htmlFor="hsl-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              HSL
            </label>
            <input
              id="hsl-input"
              type="text"
              value={hslInput}
              onChange={(e) => handleHslChange(e.target.value)}
              placeholder="hsl(11, 100%, 60%)"
              className="w-full h-12 px-4 rounded-xl border border-slate-300 font-mono text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden transition-all"
            />
          </div>
        </div>

        {/* Step Selector Option */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Variations Steps:
            </span>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              {[5, 7, 9, 11].map((s) => (
                <button
                  key={s}
                  onClick={() => setSteps(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    steps === s
                      ? "bg-white text-emerald-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyAllHex}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              {copyAllStatus === "copied-hex" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All Colors</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyCss}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              {copyAllStatus === "copied-css" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Code className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy CSS</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              {copyAllStatus === "copied-json" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <FileJson className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPng}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PNG</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Scale Cards List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl font-extrabold text-slate-900">
            Generated Color Scale (Tints & Shades)
          </h2>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {fullScaleList.length} Total Variations
          </span>
        </div>

        {/* Display Scale: Tints -> Base Color -> Shades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {fullScaleList.map((col, idx) => {
            const isBase = col.label === "Base Color";
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col ${
                  isBase
                    ? "border-emerald-500 ring-2 ring-emerald-200 shadow-md"
                    : "border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                {/* Visual Swatch Header */}
                <div
                  className="h-28 w-full relative p-3 flex flex-col justify-between transition-colors"
                  style={{ backgroundColor: col.hex }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs backdrop-blur-md ${
                        isBase
                          ? "bg-slate-900 text-white"
                          : "bg-white/80 text-slate-900"
                      }`}
                    >
                      {col.label}
                    </span>
                  </div>
                </div>

                {/* Card Details & Copies */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-white">
                  <div className="space-y-2">
                    {/* HEX */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-900 uppercase">
                        {col.hex}
                      </span>
                      <CopyButton value={col.hex} label="Copy HEX" />
                    </div>

                    {/* RGB */}
                    <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                      <span>{col.rgb}</span>
                      <CopyButton value={col.rgb} label="Copy RGB" />
                    </div>

                    {/* HSL */}
                    <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                      <span>{col.hsl}</span>
                      <CopyButton value={col.hsl} label="Copy HSL" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
