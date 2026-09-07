import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Pipette,
  Layers,
  Palette,
  RefreshCw,
  SlidersHorizontal,
  Eye,
  Home,
  HelpCircle,
} from "lucide-react";

export default function NotFound() {
  const popularTools = [
    {
      title: "Image Color Picker",
      description: "Pick exact pixel colors directly from any image.",
      href: "/tools/image-color-picker",
      icon: Pipette,
      color: "text-sky-600 bg-sky-50 border-sky-200",
    },
    {
      title: "Dominant Color Extractor",
      description: "Extract primary color distribution from photos.",
      href: "/tools/dominant-color-extractor",
      icon: Layers,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
    {
      title: "Image Color Palette Generator",
      description: "Auto-generate beautiful palettes from uploaded images.",
      href: "/tools/image-color-palette-generator",
      icon: Palette,
      color: "text-rose-600 bg-rose-50 border-rose-200",
    },
    {
      title: "Color Converter",
      description: "Convert seamlessly between HEX, RGB, and HSL formats.",
      href: "/tools/color-converter",
      icon: RefreshCw,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      title: "Shades & Tints Generator",
      description: "Generate lighter and darker color scales.",
      href: "/tools/color-shades-generator",
      icon: SlidersHorizontal,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Color Contrast Checker",
      description: "Verify text legibility and check WCAG accessibility.",
      href: "/tools/color-contrast-checker",
      icon: Eye,
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-12">
          {/* Main 404 Hero */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 shadow-xs space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-800 border border-slate-200 mb-2">
              <HelpCircle className="w-8 h-8 text-sky-600" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-sky-600 uppercase tracking-widest">
                404 — Page Not Found
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Oops! That page doesn&apos;t exist.
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed pt-2">
                The URL you requested could not be found on Colorvexa. It might have been moved, renamed, or is temporarily unavailable.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
              >
                <Home className="w-4 h-4" />
                <span>Return to Homepage</span>
              </Link>
            </div>
          </div>

          {/* Popular Tools Navigation */}
          <div className="space-y-6 text-left">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-slate-900">
                Popular Color Tools on Colorvexa
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Jump straight to one of our free client-side color utilities:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularTools.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={idx}
                    href={tool.href}
                    className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center ${tool.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
