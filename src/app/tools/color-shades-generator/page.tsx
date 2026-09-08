import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ColorShadesGenerator } from "@/components/ColorShadesGenerator";
import { FAQ } from "@/components/FAQ";
import { ToolCard } from "@/components/ToolCard";
import { ToolGrid } from "@/components/ToolGrid";
import { getAbsoluteUrl, SITE_NAME } from "@/lib/site-config";
import {
  SlidersHorizontal,
  Pipette,
  Layers,
  Palette,
  RefreshCw,
  Eye,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Color Shades & Tints Generator – Create Color Variations | Colorvexa",
  description:
    "Free online color shades and tints generator. Generate lighter tints and darker shades of any HEX, RGB, or HSL base color with copy and export features.",
  alternates: {
    canonical: getAbsoluteUrl("/tools/color-shades-generator"),
  },
  openGraph: {
    title: "Color Shades & Tints Generator – Create Color Variations | Colorvexa",
    description:
      "Generate beautiful lighter tints and darker shades from any base color with instant copy and export capabilities.",
    url: getAbsoluteUrl("/tools/color-shades-generator"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Shades & Tints Generator – Create Color Variations | Colorvexa",
    description:
      "Generate color variations, shades, and tints instantly in your browser with 100% privacy.",
  },
};

export default function ColorShadesGeneratorPage() {
  const faqs = [
    {
      question: "What is a shade of a color?",
      answer:
        "A shade is created by mixing a base color with pure black (#000000). Increasing the percentage of black reduces lightness, producing a darker version of the original hue.",
    },
    {
      question: "What is a tint of a color?",
      answer:
        "A tint is created by mixing a base color with pure white (#FFFFFF). Increasing the percentage of white raises lightness, producing a lighter version of the original hue.",
    },
    {
      question: "How do I make lighter versions of a color?",
      answer:
        "To create lighter versions (tints) of any color, enter your base HEX, RGB, or HSL code into Colorvexa. The tool automatically generates progressive tints by linearly blending your base color toward white.",
    },
    {
      question: "How do I make darker versions of a color?",
      answer:
        "To create darker versions (shades) of a color, select or enter your base color. Colorvexa calculates progressive shades by blending the base color toward black.",
    },
    {
      question: "Can I get HEX codes for shades and tints?",
      answer:
        "Yes! Every generated tint and shade swatch displays its exact HEX, RGB, and HSL codes, with 1-click copy buttons for instant copying.",
    },
    {
      question: "Can I copy the generated colors?",
      answer:
        "Yes. You can copy individual color values, use 'Copy All Colors' for a list of HEX codes, copy CSS custom properties, copy JSON, or download the entire scale as a PNG palette image.",
    },
    {
      question: "Does the tool work on mobile?",
      answer:
        "Yes, Colorvexa is fully responsive on mobile devices including Android smartphones, iPhones, iPads, tablets, and desktop browsers.",
    },
  ];

  const relatedTools = [
    {
      title: "Image Color Picker",
      description: "Pick exact pixel colors from any uploaded image with pixel-level precision.",
      href: "/tools/image-color-picker",
      icon: Pipette,
      iconBgColor: "bg-sky-50 text-sky-600 border-sky-200",
    },
    {
      title: "Dominant Color Extractor",
      description: "Extract prominent dominant colors and palette ratios from any image.",
      href: "/tools/dominant-color-extractor",
      icon: Layers,
      iconBgColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      title: "Image Color Palette Generator",
      description: "Automatically generate cohesive color palettes from uploaded images.",
      href: "/tools/image-color-palette-generator",
      icon: Palette,
      iconBgColor: "bg-rose-50 text-rose-600 border-rose-200",
    },
    {
      title: "Color Converter",
      description: "Convert seamlessly between HEX, RGB, and HSL color representations.",
      href: "/tools/color-converter",
      icon: RefreshCw,
      iconBgColor: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      title: "Color Contrast Checker",
      description: "Verify text readability and check WCAG 2.1 accessibility compliance.",
      href: "/tools/color-contrast-checker",
      icon: Eye,
      iconBgColor: "bg-purple-50 text-purple-600 border-purple-200",
    },
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Color Shades & Tints Generator",
    url: getAbsoluteUrl("/tools/color-shades-generator"),
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online color shades and tints generator. Generate lighter tints and darker shades of any base color in your browser with 100% privacy.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: getAbsoluteUrl("/#tools"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Color Shades & Tints Generator",
        item: getAbsoluteUrl("/tools/color-shades-generator"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ToolPageLayout
        title="Color Shades & Tints Generator"
        description="Generate precise lighter tints and darker shades from any base color with custom steps, CSS export, and instant browser calculation."
        icon={<SlidersHorizontal className="w-8 h-8 text-emerald-600" />}
        breadcrumbs={[
          { label: "Tools", href: "/#tools" },
          { label: "Color Shades & Tints Generator" },
        ]}
      >
        <div className="space-y-16">
          {/* Main Interactive Shades & Tints Generator */}
          <ColorShadesGenerator />

          {/* GEO CONTENT SECTION 1: What Are Color Shades? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              What Are Color Shades?
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              A <strong>color shade</strong> is a darker variation of a base color created by progressively mixing it with <strong>black (#000000)</strong>. In design theory, adding black decreases the lightness of the color while retaining its fundamental hue angle. Shades are extensively used for text headers, hover states, border highlights, drop shadows, and dark mode UI themes.
            </p>
          </section>

          {/* GEO CONTENT SECTION 2: What Are Color Tints? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              What Are Color Tints?
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              A <strong>color tint</strong> is a lighter variation of a base color created by progressively mixing it with <strong>white (#FFFFFF)</strong>. Adding white increases lightness, producing soft pastels and gentle background highlights. Tints are essential in web design for subtle button backgrounds, active card states, form input highlights, and cohesive UI color scales.
            </p>
          </section>

          {/* GEO CONTENT SECTION 3: How to Generate Shades and Tints */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              How to Generate Shades and Tints
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 list-none p-0">
              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">1. Select a Base Color</h3>
                <p className="text-xs text-slate-600">
                  Choose or paste a color code in HEX, RGB, or HSL format, or pick a color using the visual picker.
                </p>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">2. Set Variations Count</h3>
                <p className="text-xs text-slate-600">
                  Select your desired step resolution (5, 7, 9, or 11 steps) to customize scale granularities.
                </p>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">3. Review Generated Scale</h3>
                <p className="text-xs text-slate-600">
                  Colorvexa automatically computes mathematical tints and shades instantly in your browser.
                </p>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">4. Copy or Export</h3>
                <p className="text-xs text-slate-600">
                  Copy individual color formats, copy CSS variables or JSON, or download the palette PNG image.
                </p>
              </li>
            </ol>
          </section>

          {/* GEO CONTENT SECTION 4: How Are Shades and Tints Calculated? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              How Are Shades and Tints Calculated?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Colorvexa uses linear interpolation (RGB color mixing) to ensure smooth, predictable color transitions:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-slate-900">Tint Formula:</strong> For step factor <i>f</i> (0 to 1), each channel is calculated as: <code>R_tint = R + (255 - R) × f</code>. This linearly scales color intensity toward pure white.
              </li>
              <li className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-slate-900">Shade Formula:</strong> For step factor <i>f</i> (0 to 1), each channel is calculated as: <code>R_shade = R × (1 - f)</code>. This linearly scales channel values down toward pure black.
              </li>
            </ul>
          </section>

          {/* PRIVACY NOTICE SECTION */}
          <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-800 rounded-xl text-emerald-400 border border-slate-700">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Private Client-Side Processing
              </h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              All calculations run 100% locally in your web browser. No color codes or data are sent to external servers or remote tracking systems.
            </p>
          </section>

          {/* INTERNAL LINKING SECTION */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Explore Related Color Tools on Colorvexa
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Enhance your design workflow with our suite of free online color tools:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm font-medium text-slate-700">
              <li>
                <Link
                  href="/tools/image-color-picker"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <Pipette className="w-4 h-4 shrink-0 text-sky-600" />
                  <span>Image Color Picker</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/dominant-color-extractor"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <Layers className="w-4 h-4 shrink-0 text-indigo-600" />
                  <span>Dominant Color Extractor</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/image-color-palette-generator"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <Palette className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Image Color Palette Generator</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/color-converter"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Color Converter</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/color-contrast-checker"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <Eye className="w-4 h-4 shrink-0 text-purple-600" />
                  <span>Color Contrast Checker</span>
                </Link>
              </li>
            </ul>
          </section>

          {/* GEO FAQ SECTION */}
          <FAQ items={faqs} title="Color Shades & Tints FAQ" />

          {/* RELATED COLOR TOOLS SECTION */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Related Color Tools
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Discover more client-side color utilities on Colorvexa.
              </p>
            </div>
            <ToolGrid columns={3}>
              {relatedTools.map((tool, idx) => (
                <ToolCard key={idx} {...tool} />
              ))}
            </ToolGrid>
          </section>
        </div>
      </ToolPageLayout>
    </>
  );
}
