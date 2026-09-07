"use client";

import { useState, useMemo } from "react";
import {
  getColorFormats,
  hexToRgba,
  parseRgbString,
  parseHslString,
  hslToRgb,
  calculateContrastRatio,
  evaluateWcag,
  ColorFormats,
} from "@/lib/colorUtils";
import {
  ArrowLeftRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  AlertCircle,
  Eye,
  Type,
  Layout,
} from "lucide-react";

const DEFAULT_FG_HEX = "#0F172A"; // Slate 900
const DEFAULT_BG_HEX = "#FFFFFF"; // Pure White

export function ColorContrastChecker() {
  // Foreground states
  const [fgHex, setFgHex] = useState<string>(DEFAULT_FG_HEX);
  const [fgRgb, setFgRgb] = useState<string>("rgb(15, 23, 42)");
  const [fgHsl, setFgHsl] = useState<string>("hsl(222, 47%, 11%)");
  const [fgError, setFgError] = useState<string | null>(null);

  // Background states
  const [bgHex, setBgHex] = useState<string>(DEFAULT_BG_HEX);
  const [bgRgb, setBgRgb] = useState<string>("rgb(255, 255, 255)");
  const [bgHsl, setBgHsl] = useState<string>("hsl(0, 0%, 100%)");
  const [bgError, setBgError] = useState<string | null>(null);

  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  // Parse Foreground color
  const fgColor: ColorFormats | null = useMemo(() => {
    const rgba = hexToRgba(fgHex);
    if (!rgba) return null;
    return getColorFormats(rgba.r, rgba.g, rgba.b);
  }, [fgHex]);

  // Parse Background color
  const bgColor: ColorFormats | null = useMemo(() => {
    const rgba = hexToRgba(bgHex);
    if (!rgba) return null;
    return getColorFormats(rgba.r, rgba.g, rgba.b);
  }, [bgHex]);

  // Foreground Handlers
  const updateFgFromRgb = (r: number, g: number, b: number) => {
    const f = getColorFormats(r, g, b);
    setFgHex(f.hex);
    setFgRgb(f.rgb);
    setFgHsl(f.hsl);
    setFgError(null);
  };

  const handleFgHexChange = (val: string) => {
    setFgHex(val);
    const parsed = hexToRgba(val);
    if (parsed) {
      updateFgFromRgb(parsed.r, parsed.g, parsed.b);
    } else {
      setFgError("Invalid HEX color code");
    }
  };

  const handleFgRgbChange = (val: string) => {
    setFgRgb(val);
    const parsed = parseRgbString(val);
    if (parsed) {
      updateFgFromRgb(parsed.r, parsed.g, parsed.b);
    } else {
      setFgError("Invalid RGB color string");
    }
  };

  const handleFgHslChange = (val: string) => {
    setFgHsl(val);
    const parsed = parseHslString(val);
    if (parsed) {
      const rgb = hslToRgb(parsed.h, parsed.s, parsed.l);
      updateFgFromRgb(rgb.r, rgb.g, rgb.b);
    } else {
      setFgError("Invalid HSL color string");
    }
  };

  // Background Handlers
  const updateBgFromRgb = (r: number, g: number, b: number) => {
    const f = getColorFormats(r, g, b);
    setBgHex(f.hex);
    setBgRgb(f.rgb);
    setBgHsl(f.hsl);
    setBgError(null);
  };

  const handleBgHexChange = (val: string) => {
    setBgHex(val);
    const parsed = hexToRgba(val);
    if (parsed) {
      updateBgFromRgb(parsed.r, parsed.g, parsed.b);
    } else {
      setBgError("Invalid HEX color code");
    }
  };

  const handleBgRgbChange = (val: string) => {
    setBgRgb(val);
    const parsed = parseRgbString(val);
    if (parsed) {
      updateBgFromRgb(parsed.r, parsed.g, parsed.b);
    } else {
      setBgError("Invalid RGB color string");
    }
  };

  const handleBgHslChange = (val: string) => {
    setBgHsl(val);
    const parsed = parseHslString(val);
    if (parsed) {
      const rgb = hslToRgb(parsed.h, parsed.s, parsed.l);
      updateBgFromRgb(rgb.r, rgb.g, rgb.b);
    } else {
      setBgError("Invalid HSL color string");
    }
  };

  // Swap Colors
  const handleSwap = () => {
    if (!fgColor || !bgColor) return;
    const oldFgHex = fgHex;
    handleFgHexChange(bgHex);
    handleBgHexChange(oldFgHex);
  };

  // Reset
  const handleReset = () => {
    handleFgHexChange(DEFAULT_FG_HEX);
    handleBgHexChange(DEFAULT_BG_HEX);
    setCopiedReport(false);
  };

  // Contrast Ratio & WCAG Calculations
  const contrastRatio = useMemo(() => {
    if (!fgColor || !bgColor) return null;
    return calculateContrastRatio(fgColor, bgColor);
  }, [fgColor, bgColor]);

  const wcag = useMemo(() => {
    if (contrastRatio === null) return null;
    return evaluateWcag(contrastRatio);
  }, [contrastRatio]);

  // Copy Full Summary Report
  const handleCopyReport = () => {
    if (!fgColor || !bgColor || contrastRatio === null || !wcag) return;

    const report = [
      `Colorvexa — Color Contrast Report`,
      `==================================`,
      `Foreground Color: ${fgColor.hex} (${fgColor.rgb})`,
      `Background Color: ${bgColor.hex} (${bgColor.rgb})`,
      `Contrast Ratio:   ${contrastRatio}:1`,
      ``,
      `WCAG 2.1 Results:`,
      `- Normal Text (AA):  ${wcag.normalAA ? "PASS (>= 4.5:1)" : "FAIL (< 4.5:1)"}`,
      `- Normal Text (AAA): ${wcag.normalAAA ? "PASS (>= 7.0:1)" : "FAIL (< 7.0:1)"}`,
      `- Large Text (AA):   ${wcag.largeAA ? "PASS (>= 3.0:1)" : "FAIL (< 3.0:1)"}`,
      `- Large Text (AAA):  ${wcag.largeAAA ? "PASS (>= 4.5:1)" : "FAIL (< 4.5:1)"}`,
      `- UI Components:     ${wcag.uiComponent ? "PASS (>= 3.0:1)" : "FAIL (< 3.0:1)"}`,
      `==================================`,
      `Generated at https://colorvexa.com/tools/color-contrast-checker`,
    ].join("\n");

    navigator.clipboard.writeText(report);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-600" />
            Color Contrast Checker
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Compare text (foreground) and background colors according to WCAG 2.1 guidelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSwap}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-xl border border-purple-200 transition-colors focus-visible:outline-2 focus-visible:outline-purple-600"
            title="Swap foreground and background colors"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Swap Colors</span>
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-purple-600"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Dual Column: Controls & Score Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Color Inputs (FG & BG) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Foreground Color Panel */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border border-slate-300"
                  style={{ backgroundColor: fgColor ? fgColor.hex : DEFAULT_FG_HEX }}
                />
                Foreground Color (Text / Elements)
              </span>
              <span className="font-mono text-xs text-slate-500 uppercase">
                {fgColor ? fgColor.hex : fgHex}
              </span>
            </div>

            {fgError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-800 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{fgError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Picker
                </label>
                <input
                  type="color"
                  value={fgColor ? fgColor.hex : DEFAULT_FG_HEX}
                  onChange={(e) => handleFgHexChange(e.target.value)}
                  className="w-full h-11 rounded-xl border border-slate-300 p-1 cursor-pointer bg-white"
                  aria-label="Pick foreground color visually"
                />
              </div>

              <div>
                <label htmlFor="fg-hex" className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  HEX
                </label>
                <input
                  id="fg-hex"
                  type="text"
                  value={fgHex}
                  onChange={(e) => handleFgHexChange(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 font-mono text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="fg-rgb" className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  RGB
                </label>
                <input
                  id="fg-rgb"
                  type="text"
                  value={fgRgb}
                  onChange={(e) => handleFgRgbChange(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 font-mono text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="fg-hsl" className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  HSL
                </label>
                <input
                  id="fg-hsl"
                  type="text"
                  value={fgHsl}
                  onChange={(e) => handleFgHslChange(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 font-mono text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Background Color Panel */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border border-slate-300"
                  style={{ backgroundColor: bgColor ? bgColor.hex : DEFAULT_BG_HEX }}
                />
                Background Color (Surface)
              </span>
              <span className="font-mono text-xs text-slate-500 uppercase">
                {bgColor ? bgColor.hex : bgHex}
              </span>
            </div>

            {bgError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-800 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{bgError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Picker
                </label>
                <input
                  type="color"
                  value={bgColor ? bgColor.hex : DEFAULT_BG_HEX}
                  onChange={(e) => handleBgHexChange(e.target.value)}
                  className="w-full h-11 rounded-xl border border-slate-300 p-1 cursor-pointer bg-white"
                  aria-label="Pick background color visually"
                />
              </div>

              <div>
                <label htmlFor="bg-hex" className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  HEX
                </label>
                <input
                  id="bg-hex"
                  type="text"
                  value={bgHex}
                  onChange={(e) => handleBgHexChange(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 font-mono text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="bg-rgb" className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  RGB
                </label>
                <input
                  id="bg-rgb"
                  type="text"
                  value={bgRgb}
                  onChange={(e) => handleBgRgbChange(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 font-mono text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="bg-hsl" className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  HSL
                </label>
                <input
                  id="bg-hsl"
                  type="text"
                  value={bgHsl}
                  onChange={(e) => handleBgHslChange(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 font-mono text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contrast Score Card & WCAG Results */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Prominent Score Display */}
            <div className="text-center p-6 rounded-2xl bg-slate-900 text-white space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Contrast Ratio
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                {contrastRatio !== null ? `${contrastRatio}:1` : "—"}
              </div>
              <p className="text-xs text-slate-400">
                WCAG 2.1 Relative Luminance Calculation
              </p>
            </div>

            {/* WCAG Passes / Fails Grid */}
            {wcag && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    WCAG 2.1 Compliance Results
                  </h3>
                  <button
                    onClick={handleCopyReport}
                    className="inline-flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    {copiedReport ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied Report!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Report</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Normal Text */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Type className="w-4 h-4 text-slate-500" />
                      Normal Text (&lt; 18pt / 24px)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* AA */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                      <span className="font-semibold text-slate-700">AA (4.5:1)</span>
                      {wcag.normalAA ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Pass
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Fail
                        </span>
                      )}
                    </div>

                    {/* AAA */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                      <span className="font-semibold text-slate-700">AAA (7.0:1)</span>
                      {wcag.normalAAA ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Pass
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Fail
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Large Text */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Type className="w-5 h-5 text-slate-500" />
                      Large Text (&ge; 18pt / 24px)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* AA */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                      <span className="font-semibold text-slate-700">AA (3.0:1)</span>
                      {wcag.largeAA ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Pass
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Fail
                        </span>
                      )}
                    </div>

                    {/* AAA */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                      <span className="font-semibold text-slate-700">AAA (4.5:1)</span>
                      {wcag.largeAAA ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Pass
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Fail
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* UI Components */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Layout className="w-4 h-4 text-slate-500" />
                      UI Components & Icons
                    </span>
                    <div className="text-xs">
                      {wcag.uiComponent ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Pass (3.0:1)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Fail (&lt; 3.0:1)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Swatch Preview Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layout className="w-5 h-5 text-purple-600" />
            Live Realistic Preview
          </h2>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Foreground: {fgColor ? fgColor.hex : fgHex} on Background: {bgColor ? bgColor.hex : bgHex}
          </span>
        </div>

        {/* Dynamic Canvas Container using actual Foreground & Background */}
        <div
          className="p-8 sm:p-12 rounded-2xl border transition-all space-y-8"
          style={{
            backgroundColor: bgColor ? bgColor.hex : DEFAULT_BG_HEX,
            color: fgColor ? fgColor.hex : DEFAULT_FG_HEX,
            borderColor: fgColor ? `${fgColor.hex}33` : "#CCCCCC",
          }}
        >
          {/* Normal Text Sample */}
          <div className="space-y-2">
            <span className="text-xs font-mono opacity-70 block uppercase tracking-wider">
              Normal Text Sample (16px / 1rem)
            </span>
            <p className="text-base leading-relaxed">
              The quick brown fox jumps over the lazy dog. Good color contrast makes digital text readable and comfortable for all users across various screen lighting environments.
            </p>
          </div>

          {/* Large Text Sample */}
          <div className="space-y-2 pt-4 border-t border-current/15">
            <span className="text-xs font-mono opacity-70 block uppercase tracking-wider">
              Large Text Sample (24px / 1.5rem bold)
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Accessible Headline & Visual Hierarchy
            </h3>
          </div>

          {/* UI Components & Buttons Sample */}
          <div className="space-y-3 pt-4 border-t border-current/15">
            <span className="text-xs font-mono opacity-70 block uppercase tracking-wider">
              UI Elements & Action Buttons Sample
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className="px-5 py-2.5 rounded-xl font-bold text-sm border-2 transition-transform"
                style={{
                  backgroundColor: fgColor ? fgColor.hex : DEFAULT_FG_HEX,
                  color: bgColor ? bgColor.hex : DEFAULT_BG_HEX,
                  borderColor: fgColor ? fgColor.hex : DEFAULT_FG_HEX,
                }}
              >
                Solid Button Component
              </button>

              <button
                className="px-5 py-2.5 rounded-xl font-bold text-sm border-2"
                style={{
                  backgroundColor: "transparent",
                  color: fgColor ? fgColor.hex : DEFAULT_FG_HEX,
                  borderColor: fgColor ? fgColor.hex : DEFAULT_FG_HEX,
                }}
              >
                Outlined Button
              </button>

              <div
                className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border"
                style={{
                  borderColor: fgColor ? fgColor.hex : DEFAULT_FG_HEX,
                }}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>UI Badge Indicator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
