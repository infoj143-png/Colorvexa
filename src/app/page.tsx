import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { ToolGrid } from "@/components/ToolGrid";
import { FAQ } from "@/components/FAQ";
import { getAbsoluteUrl, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";
import {
  Pipette,
  Layers,
  Palette,
  RefreshCw,
  SlidersHorizontal,
  ShieldCheck,
  Zap,
  Lock,
  Smartphone,
  Sparkles,
  Cpu,
  CheckCircle2,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Free Online Image Color & Palette Utility Tools`,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: getAbsoluteUrl("/"),
  },
  openGraph: {
    title: `${SITE_NAME} — Free Online Image Color & Palette Utility Tools`,
    description: SITE_DESCRIPTION,
    url: getAbsoluteUrl("/"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free Online Image Color & Palette Utility Tools`,
    description:
      "Free client-side color utility platform for designers, developers, and creators.",
  },
};

export default function HomePage() {
  const popularTools = [
    {
      title: "Image Color Picker",
      description: "Pick any color directly from an image with pixel precision and inspect RGB/HEX values.",
      href: "/tools/image-color-picker",
      icon: Pipette,
      iconBgColor: "bg-sky-50 text-sky-600 border-sky-200",
      badge: "Popular",
    },
    {
      title: "Dominant Color Extractor",
      description: "Extract the most prominent and dominant colors from any image instantly in your browser.",
      href: "/tools/dominant-color-extractor",
      icon: Layers,
      iconBgColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
      badge: "Fast",
    },
    {
      title: "Image Color Palette Generator",
      description: "Automatically generate a balanced, beautiful color palette from any uploaded image.",
      href: "/tools/image-color-palette-generator",
      icon: Palette,
      iconBgColor: "bg-rose-50 text-rose-600 border-rose-200",
      badge: "Essential",
    },
    {
      title: "Color Converter",
      description: "Convert seamlessly between HEX, RGB, and HSL color representations with copy features.",
      href: "/tools/color-converter",
      icon: RefreshCw,
      iconBgColor: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      title: "Shades & Tints Generator",
      description: "Generate lighter (tints) and darker (shades) step-by-step variations of any base color.",
      href: "/tools/color-shades-generator",
      icon: SlidersHorizontal,
      iconBgColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      title: "Color Contrast Checker",
      description: "Check text and background color contrast against WCAG 2.1 accessibility guidelines.",
      href: "/tools/color-contrast-checker",
      icon: Eye,
      iconBgColor: "bg-purple-50 text-purple-600 border-purple-200",
      badge: "WCAG",
    },
  ];

  const homepageFaqs = [
    {
      question: "What is an image color picker?",
      answer:
        "An image color picker is an online tool that allows you to upload or drag-and-drop an image and inspect any pixel to find its exact color codes in HEX, RGB, or HSL formats.",
    },
    {
      question: "How does Colorvexa extract colors from an image?",
      answer:
        "Colorvexa uses browser HTML5 Canvas and client-side color extraction algorithms. When you load an image, your browser analyzes the image pixels locally without uploading your image to external servers.",
    },
    {
      question: "Are my images uploaded to a server?",
      answer:
        "No. Your privacy is paramount. Colorvexa processes all image analysis 100% locally in your web browser. Your images never leave your device or get saved on any server.",
    },
    {
      question: "What are HEX, RGB and HSL?",
      answer:
        "HEX, RGB, and HSL are formats for representing colors on screens. HEX uses a 6-character hexadecimal code (e.g. #0F172A). RGB uses Red, Green, and Blue light values (0-255). HSL uses Hue (0-360°), Saturation (0-100%), and Lightness (0-100%).",
    },
    {
      question: "Is Colorvexa free?",
      answer:
        "Yes, Colorvexa is 100% free to use worldwide. No registration, login, subscriptions, or hidden charges are required.",
    },
    {
      question: "Can I use Colorvexa on mobile?",
      answer:
        "Absolutely. Colorvexa is designed mobile-first and works seamlessly across smartphones, tablets, laptops, and desktop screens.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-12 pb-16 lg:pt-20 lg:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

              {/* Left Column: Copy & Actions */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>100% Free & Client-Side Local Processing</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  Extract Colors From Images.{" "}
                  <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent">
                    Create Better Palettes.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Free online color tools for extracting colors, generating palettes, converting color formats, and creating beautiful color combinations.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                  <Link
                    href="/tools/image-color-picker"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-sky-600"
                  >
                    <Pipette className="w-4 h-4 text-sky-400" />
                    <span>Pick Colors From Image</span>
                  </Link>

                  <Link
                    href="/tools/image-color-palette-generator"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-semibold rounded-xl transition-all shadow-xs"
                  >
                    <Palette className="w-4 h-4 text-rose-500" />
                    <span>Generate Color Palette</span>
                  </Link>
                </div>

                <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    No Login Required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Instant Results
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Preview / Pure UI Component Mockup */}
              <div className="lg:col-span-6">
                <div className="relative mx-auto max-w-lg lg:max-w-none bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-800">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-2">Colorvexa Studio</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      Local Canvas API
                    </span>
                  </div>

                  {/* Mockup Content: Image Preview & Sample Palette */}
                  <div className="space-y-4">
                    {/* Mock Image Box */}
                    <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden bg-gradient-to-tr from-sky-900 via-indigo-900 to-slate-900 border border-slate-800 flex items-center justify-center p-4">
                      {/* Decorative Shapes inside Mockup */}
                      <div className="absolute -top-12 -left-12 w-40 h-40 bg-sky-500/20 rounded-full blur-2xl" />
                      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-rose-500/20 rounded-full blur-2xl" />

                      <div className="relative z-10 text-center space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                          <Pipette className="w-6 h-6 text-sky-400 animate-bounce" />
                        </div>
                        <p className="text-xs text-slate-300 font-medium">
                          Hovering pixel coordinate <span className="font-mono text-sky-400">(X: 420, Y: 180)</span>
                        </p>
                      </div>

                      {/* Floating Color Badge */}
                      <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md border border-slate-700 rounded-lg p-2 flex items-center gap-2 shadow-lg">
                        <span className="w-5 h-5 rounded-md bg-sky-500 border border-white/20" />
                        <span className="font-mono text-xs font-bold text-white">#0ea5e9</span>
                        <span className="text-[10px] text-slate-400 font-mono">RGB(14,165,233)</span>
                      </div>
                    </div>

                    {/* Extracted Palette Swatches */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                        <span>Extracted Palette (5 colors)</span>
                        <span className="text-sky-400">100% Extracted</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          { hex: "#0f172a", name: "Slate", bg: "bg-slate-900" },
                          { hex: "#0ea5e9", name: "Sky", bg: "bg-sky-500" },
                          { hex: "#6366f1", name: "Indigo", bg: "bg-indigo-500" },
                          { hex: "#f43f5e", name: "Rose", bg: "bg-rose-500" },
                          { hex: "#f8fafc", name: "White", bg: "bg-slate-50" },
                        ].map((c, i) => (
                          <div key={i} className="flex flex-col gap-1.5">
                            <div className={`h-12 rounded-lg border border-white/10 ${c.bg}`} />
                            <span className="font-mono text-[10px] text-slate-300 text-center">{c.hex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURED TOOLS SECTION */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Essential Platform
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Color Tools
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Client-side color extraction, conversion, and harmony utilities built for modern web workflows.
            </p>
          </div>

          <ToolGrid columns={3}>
            {popularTools.map((tool, idx) => (
              <ToolCard key={idx} {...tool} />
            ))}
          </ToolGrid>
        </section>

        {/* TOOL CATEGORIES SECTION */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore Tool Categories
              </h2>
              <p className="text-slate-600 text-sm">
                Comprehensive color utility suites structured for fast navigation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category 1 */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2.5 font-bold text-slate-900">
                  <div className="p-2 rounded-lg bg-sky-100 text-sky-700">
                    <Pipette className="w-5 h-5" />
                  </div>
                  <h3>Image Color Tools</h3>
                </div>
                <ul className="space-y-2 text-xs font-medium text-slate-600">
                  <li>
                    <Link href="/tools/image-color-picker" className="hover:text-sky-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Image Color Picker
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/dominant-color-extractor" className="hover:text-sky-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Dominant Color Extractor
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/image-color-palette-generator" className="hover:text-sky-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Image Palette Generator
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Category 2 */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2.5 font-bold text-slate-900">
                  <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <h3>Color Conversion</h3>
                </div>
                <ul className="space-y-2 text-xs font-medium text-slate-600">
                  <li>
                    <Link href="/tools/color-converter" className="hover:text-indigo-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      HEX to RGB & RGB to HEX
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/color-converter" className="hover:text-indigo-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      HEX to HSL & HSL to HEX
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/color-converter" className="hover:text-indigo-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      RGB to HSL & HSL to RGB
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Category 3 */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2.5 font-bold text-slate-900">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <h3>Color Generator Tools</h3>
                </div>
                <ul className="space-y-2 text-xs font-medium text-slate-600">
                  <li>
                    <Link href="/tools/color-shades-generator" className="hover:text-emerald-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Shades & Tints Generator
                    </Link>
                  </li>
                  <li>
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      Color Harmony Generator (Planned)
                    </span>
                  </li>
                  <li>
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      Gradient Generator (Planned)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Category 4 */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center gap-2.5 font-bold text-slate-900">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h3>Accessibility</h3>
                </div>
                <ul className="space-y-2 text-xs font-medium text-slate-600">
                  <li>
                    <Link href="/tools/color-contrast-checker" className="hover:text-purple-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Color Contrast Checker
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/color-contrast-checker" className="hover:text-purple-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      WCAG 2.1 Compliance Tester
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Simple Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How Colorvexa Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Extracting colors and creating palettes in 3 effortless steps directly inside your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-bold text-lg mb-5">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">1. Upload Image</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Upload any PNG, JPG, WebP, or SVG image file directly from your computer or mobile device.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold text-lg mb-5">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">2. Extract Colors</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Colorvexa analyzes image pixel data directly in your browser using high-performance Canvas APIs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold text-lg mb-5">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">3. Copy & Export</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instantly copy HEX, RGB, or HSL codes with 1-click, or export palettes for your design projects.
              </p>
            </div>
          </div>

          {/* Privacy Callout Banner */}
          <div className="mt-12 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-800 rounded-xl text-emerald-400 shrink-0 border border-slate-700">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base">Your Privacy First</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  Your images are processed locally in your browser and are never uploaded or stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY COLORVEXA? SECTION */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Why Choose Colorvexa?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Engineered for speed, privacy, and seamless design workflows worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "100% Free",
                  desc: "Unlimited access to all color utilities without paywalls, subscriptions, or hidden charges.",
                  icon: Sparkles,
                },
                {
                  title: "No Signup Required",
                  desc: "Start extracting colors immediately without creating accounts or supplying personal info.",
                  icon: CheckCircle2,
                },
                {
                  title: "Browser-Based Processing",
                  desc: "Client-side processing powered by modern web technologies for maximum efficiency.",
                  icon: Cpu,
                },
                {
                  title: "Privacy-Friendly",
                  desc: "Your files never leave your computer. Complete local isolation for sensitive creative assets.",
                  icon: Lock,
                },
                {
                  title: "Lightning Fast",
                  desc: "Zero network latency for image processing. Instant extraction with client-side performance.",
                  icon: Zap,
                },
                {
                  title: "Mobile-Friendly Design",
                  desc: "Fully responsive interface tuned for smartphones, tablets, and desktop workstations.",
                  icon: Smartphone,
                },
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 shrink-0 shadow-xs">
                    <feature.icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOMEPAGE FAQ SECTION */}
        <section className="py-16 lg:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ
            title="Frequently Asked Questions"
            description="Got questions about Colorvexa or how browser color extraction works? We have answers."
            items={homepageFaqs}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
