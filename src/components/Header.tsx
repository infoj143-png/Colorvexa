"use client";

import { useState } from "react";
import Link from "next/link";
import { Image as ImageIcon, Palette, BookOpen, Info, Menu, X, ChevronDown } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageDropdownOpen, setImageDropdownOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group text-slate-900 font-bold text-xl tracking-tight focus-visible:outline-2 focus-visible:outline-sky-600 rounded-md py-1 px-1.5 -ml-1.5"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white shadow-xs group-hover:bg-slate-800 transition-colors">
            <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-rose-400" />
          </span>
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent font-extrabold">
            Colorvexa
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-700">
          {/* Image Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setImageDropdownOpen(true)}
            onMouseLeave={() => setImageDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-sky-600"
              aria-expanded={imageDropdownOpen}
            >
              <ImageIcon className="w-4 h-4 text-sky-500" />
              <span>Image Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${imageDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {imageDropdownOpen && (
              <div className="absolute top-full left-0 w-64 pt-1 z-50">
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-1">
                  <Link
                    href="/tools/image-color-picker"
                    className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    Image Color Picker
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Pick any color directly from an image</span>
                  </Link>
                  <Link
                    href="/tools/dominant-color-extractor"
                    className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    Dominant Color Extractor
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Find prominent colors in images</span>
                  </Link>
                  <Link
                    href="/tools/image-color-palette-generator"
                    className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    Image Palette Generator
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Auto-generate cohesive palettes</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Color Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setColorDropdownOpen(true)}
            onMouseLeave={() => setColorDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-sky-600"
              aria-expanded={colorDropdownOpen}
            >
              <Palette className="w-4 h-4 text-indigo-500" />
              <span>Color Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${colorDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {colorDropdownOpen && (
              <div className="absolute top-full left-0 w-64 pt-1 z-50">
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-1">
                  <Link
                    href="/tools/color-converter"
                    className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    Color Converter
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Convert HEX, RGB, HSL values</span>
                  </Link>
                  <Link
                    href="/tools/color-shades-generator"
                    className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    Shades & Tints Generator
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Lighter & darker variations</span>
                  </Link>
                  <Link
                    href="/tools/color-contrast-checker"
                    className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  >
                    Contrast Checker
                    <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Check WCAG compliance</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/#how-it-works"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>Resources</span>
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            <Info className="w-4 h-4 text-amber-500" />
            <span>About</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-sky-600"
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-4">
          <div>
            <span className="block px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Image Tools
            </span>
            <div className="space-y-1 pl-2">
              <Link
                href="/tools/image-color-picker"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-medium text-slate-800 hover:text-slate-900"
              >
                Image Color Picker
              </Link>
              <Link
                href="/tools/dominant-color-extractor"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-medium text-slate-800 hover:text-slate-900"
              >
                Dominant Color Extractor
              </Link>
              <Link
                href="/tools/image-color-palette-generator"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-medium text-slate-800 hover:text-slate-900"
              >
                Image Palette Generator
              </Link>
            </div>
          </div>

          <div>
            <span className="block px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Color Tools
            </span>
            <div className="space-y-1 pl-2">
              <Link
                href="/tools/color-converter"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-medium text-slate-800 hover:text-slate-900"
              >
                Color Converter
              </Link>
              <Link
                href="/tools/color-shades-generator"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-medium text-slate-800 hover:text-slate-900"
              >
                Shades & Tints Generator
              </Link>
              <Link
                href="/tools/color-contrast-checker"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-medium text-slate-800 hover:text-slate-900"
              >
                Contrast Checker
              </Link>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-1">
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-2 py-1.5 text-sm font-medium text-slate-800 hover:text-slate-900"
            >
              Resources
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-2 py-1.5 text-sm font-medium text-slate-800 hover:text-slate-900"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
