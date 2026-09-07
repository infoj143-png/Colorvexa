import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-white border border-slate-700">
                <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-rose-400" />
              </span>
              <span className="text-white font-bold text-xl tracking-tight">
                Colorvexa
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Free, worldwide online color utility platform. Extract dominant colors, create palettes, convert codes, and check color contrast directly in your browser.
            </p>
            <div className="text-xs text-slate-500 pt-2">
              Privacy-first architecture. Browser-side local processing.
            </div>
          </div>

          {/* Image Tools Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Image Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/image-color-picker" className="text-slate-400 hover:text-white transition-colors">
                  Image Color Picker
                </Link>
              </li>
              <li>
                <Link href="/tools/dominant-color-extractor" className="text-slate-400 hover:text-white transition-colors">
                  Dominant Color Extractor
                </Link>
              </li>
              <li>
                <Link href="/tools/image-color-palette-generator" className="text-slate-400 hover:text-white transition-colors">
                  Image Palette Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Color Tools Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Color Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/color-converter" className="text-slate-400 hover:text-white transition-colors">
                  Color Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/color-shades-generator" className="text-slate-400 hover:text-white transition-colors">
                  Shades & Tints Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/color-contrast-checker" className="text-slate-400 hover:text-white transition-colors">
                  Contrast Checker
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Colorvexa
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-slate-400 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Colorvexa. All rights reserved.</p>
          <p>Built with Next.js, TypeScript, and browser-first client-side technology.</p>
        </div>
      </div>
    </footer>
  );
}
