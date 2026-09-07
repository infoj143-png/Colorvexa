"use client";

import { useState, useCallback } from "react";
import {
  hexToRgba,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  parseRgbString,
  parseHslString,
  formatRgba,
  formatHsla,
  getContrastColor,
} from "@/lib/colorUtils";
import { CopyButton } from "@/components/CopyButton";
import {
  RefreshCw,
  Copy,
  Check,
  Code,
  Palette,
  AlertCircle,
  ShieldCheck,
  Zap,
  Sliders,
} from "lucide-react";

interface ColorState {
  r: number;
  g: number;
  b: number;
  a: number; // 0..1
}

const DEFAULT_COLOR: ColorState = {
  r: 255,
  g: 87,
  b: 51,
  a: 1,
};

const TEST_PRESETS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#FF0000" },
  { name: "Green", hex: "#00FF00" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Gray", hex: "#808080" },
  { name: "Coral", hex: "#FF5733" },
];

export function ColorConverter() {
  const [color, setColor] = useState<ColorState | null>(DEFAULT_COLOR);

  // Raw text inputs for active editing
  const [hexInput, setHexInput] = useState<string>("#FF5733");
  const [rgbInput, setRgbInput] = useState<string>("rgb(255, 87, 51)");
  const [hslInput, setHslInput] = useState<string>("hsl(11, 100%, 60%)");

  const [activeInput, setActiveInput] = useState<"hex" | "rgb" | "hsl" | "picker" | null>("hex");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copyAllState, setCopyAllState] = useState(false);
  const [copyCssState, setCopyCssState] = useState(false);

  // Synchronize derived values when color state changes
  const syncFromColorState = useCallback((newColor: ColorState, source: "hex" | "rgb" | "hsl" | "picker") => {
    setColor(newColor);
    setValidationError(null);

    const hex = rgbToHex(newColor.r, newColor.g, newColor.b, newColor.a);
    const rgbStr = formatRgba(newColor.r, newColor.g, newColor.b, newColor.a);
    const hslObj = rgbToHsl(newColor.r, newColor.g, newColor.b);
    const hslStr = formatHsla(hslObj.h, hslObj.s, hslObj.l, newColor.a);

    if (source !== "hex") setHexInput(hex);
    if (source !== "rgb") setRgbInput(rgbStr);
    if (source !== "hsl") setHslInput(hslStr);
  }, []);

  // Handle HEX input change
  const handleHexChange = (value: string) => {
    setHexInput(value);
    setActiveInput("hex");

    if (!value.trim()) {
      setColor(null);
      setValidationError("Please enter a HEX color code (e.g., #FF5733).");
      return;
    }

    const parsed = hexToRgba(value);
    if (parsed) {
      syncFromColorState(parsed, "hex");
    } else {
      setColor(null);
      setValidationError(
        "Invalid HEX code format. Valid formats include #RGB, #RRGGBB, #RGBA, or #RRGGBBAA."
      );
    }
  };

  // Handle RGB input change
  const handleRgbChange = (value: string) => {
    setRgbInput(value);
    setActiveInput("rgb");

    if (!value.trim()) {
      setColor(null);
      setValidationError("Please enter RGB values (e.g., 255, 87, 51).");
      return;
    }

    const parsed = parseRgbString(value);
    if (parsed) {
      syncFromColorState(parsed, "rgb");
    } else {
      setColor(null);
      setValidationError(
        "Invalid RGB format. Expected format: rgb(r, g, b) or r, g, b values between 0 and 255."
      );
    }
  };

  // Handle HSL input change
  const handleHslChange = (value: string) => {
    setHslInput(value);
    setActiveInput("hsl");

    if (!value.trim()) {
      setColor(null);
      setValidationError("Please enter HSL values (e.g., 11, 100%, 60%).");
      return;
    }

    const parsed = parseHslString(value);
    if (parsed) {
      const rgb = hslToRgb(parsed.h, parsed.s, parsed.l);
      syncFromColorState({ ...rgb, a: parsed.a }, "hsl");
    } else {
      setColor(null);
      setValidationError(
        "Invalid HSL format. Expected format: hsl(h, s%, l%) with H: 0–360, S: 0–100%, L: 0–100%."
      );
    }
  };

  // Handle Native Color Picker change
  const handleNativePickerChange = (hexValue: string) => {
    setActiveInput("picker");
    const parsed = hexToRgba(hexValue);
    if (parsed) {
      // Preserve existing alpha if present
      const currentAlpha = color ? color.a : 1;
      syncFromColorState({ ...parsed, a: currentAlpha }, "picker");
      setHexInput(rgbToHex(parsed.r, parsed.g, parsed.b, currentAlpha));
    }
  };

  // Preset Selection
  const handlePresetSelect = (hexPreset: string) => {
    const parsed = hexToRgba(hexPreset);
    if (parsed) {
      syncFromColorState(parsed, "hex");
      setHexInput(hexPreset);
    }
  };

  // Reset function
  const handleReset = () => {
    setColor(null);
    setHexInput("");
    setRgbInput("");
    setHslInput("");
    setValidationError(null);
    setActiveInput(null);
  };

  // Derived values for output
  const currentHex = color ? rgbToHex(color.r, color.g, color.b, color.a) : "";
  const currentRgb = color ? formatRgba(color.r, color.g, color.b, color.a) : "";
  const currentHsl = color
    ? formatHsla(
        rgbToHsl(color.r, color.g, color.b).h,
        rgbToHsl(color.r, color.g, color.b).s,
        rgbToHsl(color.r, color.g, color.b).l,
        color.a
      )
    : "";

  const allValuesText = color
    ? `HEX: ${currentHex}\nRGB: ${currentRgb}\nHSL: ${currentHsl}`
    : "";

  const cssText = color
    ? `color: ${currentHex};\ncolor: ${currentRgb};\ncolor: ${currentHsl};`
    : "";

  const handleCopyAll = async () => {
    if (!allValuesText) return;
    try {
      await navigator.clipboard.writeText(allValuesText);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = allValuesText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopyAllState(true);
    setTimeout(() => setCopyAllState(false), 2000);
  };

  const handleCopyCss = async () => {
    if (!cssText) return;
    try {
      await navigator.clipboard.writeText(cssText);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = cssText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopyCssState(true);
    setTimeout(() => setCopyCssState(false), 2000);
  };

  // Native color picker hex value (needs #RRGGBB format)
  const nativePickerHex = color ? rgbToHex(color.r, color.g, color.b, 1) : "#FF5733";

  return (
    <div className="space-y-8">
      {/* Top Banner / Privacy Badge */}
      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-900">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">
            100% Client-Side Conversion. Mathematical calculations run instantly in your browser without network calls.
          </span>
        </div>
        <span className="shrink-0 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full hidden md:inline-block">
          Instant & Private
        </span>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form & Color Picker */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-600" />
              <span>Color Inputs</span>
            </h2>
            <button
              onClick={handleReset}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl transition-colors focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              aria-label="Reset color inputs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </button>
          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-700 bg-rose-50 border border-rose-200 p-4 rounded-2xl">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
              <div>
                <p className="font-semibold">Invalid Color Input</p>
                <p className="text-rose-600 mt-0.5">{validationError}</p>
              </div>
            </div>
          )}

          {/* Input Fields */}
          <div className="space-y-5">
            {/* HEX Input + Native Picker */}
            <div>
              <label
                htmlFor="hex-input"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                HEX / HEXA Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    id="hex-input"
                    type="text"
                    value={hexInput}
                    onChange={(e) => handleHexChange(e.target.value)}
                    placeholder="#FF5733 or #FF573380"
                    className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 transition-all ${
                      activeInput === "hex" && !validationError
                        ? "border-amber-500 ring-2 ring-amber-500/20 bg-white"
                        : "border-slate-300 focus:border-amber-500 focus:ring-amber-500/20"
                    }`}
                  />
                </div>
                {/* Native Visual Color Picker Button */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <input
                    type="color"
                    value={nativePickerHex}
                    onChange={(e) => handleNativePickerChange(e.target.value)}
                    className="sr-only"
                    id="native-color-picker"
                    title="Choose color with native color picker"
                  />
                  <label
                    htmlFor="native-color-picker"
                    className="w-10 h-10 rounded-xl border border-slate-300 shadow-xs cursor-pointer flex items-center justify-center hover:scale-105 transition-transform"
                    style={{ backgroundColor: nativePickerHex }}
                    title="Click to open color picker"
                  >
                    <Palette
                      className="w-4 h-4"
                      style={{
                        color: color
                          ? getContrastColor(color.r, color.g, color.b)
                          : "#ffffff",
                      }}
                    />
                    <span className="sr-only">Open color picker</span>
                  </label>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports #RGB, #RRGGBB, #RGBA, or #RRGGBBAA
              </p>
            </div>

            {/* RGB Input */}
            <div>
              <label
                htmlFor="rgb-input"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                RGB / RGBA
              </label>
              <input
                id="rgb-input"
                type="text"
                value={rgbInput}
                onChange={(e) => handleRgbChange(e.target.value)}
                placeholder="rgb(255, 87, 51) or 255, 87, 51"
                className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 transition-all ${
                  activeInput === "rgb" && !validationError
                    ? "border-amber-500 ring-2 ring-amber-500/20 bg-white"
                    : "border-slate-300 focus:border-amber-500 focus:ring-amber-500/20"
                }`}
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Format: rgb(r, g, b) or comma-separated numbers (0–255)
              </p>
            </div>

            {/* HSL Input */}
            <div>
              <label
                htmlFor="hsl-input"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                HSL / HSLA
              </label>
              <input
                id="hsl-input"
                type="text"
                value={hslInput}
                onChange={(e) => handleHslChange(e.target.value)}
                placeholder="hsl(11, 100%, 60%) or 11, 100%, 60%"
                className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 transition-all ${
                  activeInput === "hsl" && !validationError
                    ? "border-amber-500 ring-2 ring-amber-500/20 bg-white"
                    : "border-slate-300 focus:border-amber-500 focus:ring-amber-500/20"
                }`}
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Format: hsl(h, s%, l%) with Hue (0–360), Saturation (0–100%), Lightness (0–100%)
              </p>
            </div>

            {/* Alpha / Transparency Slider */}
            {color && (
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="alpha-slider"
                    className="text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    Alpha / Transparency
                  </label>
                  <span className="text-xs font-mono font-semibold text-slate-600">
                    {Math.round(color.a * 100)}% ({color.a})
                  </span>
                </div>
                <input
                  id="alpha-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={color.a}
                  onChange={(e) => {
                    const newAlpha = parseFloat(e.target.value);
                    syncFromColorState({ ...color, a: newAlpha }, "picker");
                  }}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Quick Preset Colors */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Quick Test Colors
            </label>
            <div className="flex flex-wrap gap-2">
              {TEST_PRESETS.map((preset) => (
                <button
                  key={preset.hex}
                  onClick={() => handlePresetSelect(preset.hex)}
                  type="button"
                  title={`Select ${preset.name} (${preset.hex})`}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all hover:scale-105 ${
                    color && currentHex.toLowerCase() === preset.hex.toLowerCase()
                      ? "ring-2 ring-amber-500 border-white bg-slate-100 font-bold"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: preset.hex }}
                  />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Output Results & Preview */}
        <div className="lg:col-span-5 space-y-6">
          {color ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Converted Color Output
                </span>
                <button
                  onClick={handleCopyAll}
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 px-3 py-1.5 rounded-xl transition-colors shadow-2xs"
                  aria-label="Copy all color formats"
                >
                  {copyAllState ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied All!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-700" />
                      <span>Copy All</span>
                    </>
                  )}
                </button>
              </div>

              {/* Large Visual Swatch Preview with Transparency Pattern */}
              <div
                className="h-32 rounded-2xl relative shadow-inner overflow-hidden border border-slate-300 flex flex-col justify-between p-4"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)",
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                }}
              >
                {/* Foreground Color Layer */}
                <div
                  className="absolute inset-0 transition-colors duration-150"
                  style={{
                    backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                  }}
                />

                <div className="relative z-10 flex justify-end">
                  <CopyButton value={currentHex} label="HEX" />
                </div>

                <div className="relative z-10 flex items-end justify-between">
                  <span
                    className="text-2xl font-mono font-black tracking-wider uppercase drop-shadow-xs"
                    style={{
                      color: getContrastColor(color.r, color.g, color.b),
                    }}
                  >
                    {currentHex}
                  </span>
                </div>
              </div>

              {/* Individual Formatted Color Values */}
              <div className="space-y-3">
                {/* HEX */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="font-sans font-bold text-slate-500 uppercase tracking-wider text-[10px] w-8">
                      HEX
                    </span>
                    <span className="text-slate-900 font-bold">{currentHex}</span>
                  </div>
                  <CopyButton value={currentHex} aria-label="Copy HEX value" />
                </div>

                {/* RGB */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="font-sans font-bold text-slate-500 uppercase tracking-wider text-[10px] w-8">
                      RGB
                    </span>
                    <span className="text-slate-900 font-bold">{currentRgb}</span>
                  </div>
                  <CopyButton value={currentRgb} aria-label="Copy RGB value" />
                </div>

                {/* HSL */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="font-sans font-bold text-slate-500 uppercase tracking-wider text-[10px] w-8">
                      HSL
                    </span>
                    <span className="text-slate-900 font-bold">{currentHsl}</span>
                  </div>
                  <CopyButton value={currentHsl} aria-label="Copy HSL value" />
                </div>
              </div>

              {/* CSS Code Output Block */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Code className="w-4 h-4 text-slate-500" />
                    <span>CSS Code Output</span>
                  </div>
                  <button
                    onClick={handleCopyCss}
                    type="button"
                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg border bg-white hover:bg-slate-50 text-slate-700 border-slate-200 transition-colors"
                  >
                    {copyCssState ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-500" />
                        <span>Copy CSS</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-900 text-slate-200 font-mono text-xs rounded-2xl p-4 space-y-1 overflow-x-auto select-all shadow-inner">
                  <p className="text-amber-400">&#47;&#42; CSS Color Declarations &#42;&#47;</p>
                  <p>color: {currentHex};</p>
                  <p>color: {currentRgb};</p>
                  <p>color: {currentHsl};</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center space-y-4 text-slate-600">
              <Palette className="w-10 h-10 text-slate-400 mx-auto" />
              <div>
                <h3 className="font-bold text-slate-900">No Active Color</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Enter a valid HEX, RGB, or HSL color input above to calculate instant exact color format conversions.
                </p>
              </div>
              <button
                onClick={() => {
                  setColor(DEFAULT_COLOR);
                  setHexInput("#FF5733");
                  setRgbInput("rgb(255, 87, 51)");
                  setHslInput("hsl(11, 100%, 60%)");
                  setValidationError(null);
                  setActiveInput("hex");
                }}
                type="button"
                className="text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl transition-colors shadow-2xs"
              >
                Load Default Color (#FF5733)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
          <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Instant Real-Time Conversion</span>
        </div>
        <div className="flex items-center gap-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>100% Client-Side Calculations</span>
        </div>
        <div className="flex items-center gap-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
          <Code className="w-4 h-4 text-sky-500 shrink-0" />
          <span>CSS Output & Alpha Support</span>
        </div>
      </div>
    </div>
  );
}
