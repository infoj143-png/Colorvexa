import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { FAQ } from "@/components/FAQ";
import { ToolCard } from "@/components/ToolCard";
import { ToolGrid } from "@/components/ToolGrid";
import { getAbsoluteUrl, SITE_NAME } from "@/lib/site-config";
import {
  RefreshCw,
  Pipette,
  Layers,
  Palette,
  SlidersHorizontal,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Color Converter — Convert HEX, RGB & HSL Online | Colorvexa",
  description:
    "Free online color converter tool. Convert seamlessly between HEX, RGB, and HSL color values with instant 1-click copying.",
  alternates: {
    canonical: getAbsoluteUrl("/tools/color-converter"),
  },
  openGraph: {
    title: "Color Converter — Convert HEX, RGB & HSL Online | Colorvexa",
    description:
      "Convert seamlessly between HEX, RGB, and HSL color formats in real time with complete precision.",
    url: getAbsoluteUrl("/tools/color-converter"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Converter — Convert HEX, RGB & HSL Online | Colorvexa",
    description:
      "Convert between HEX, RGB, and HSL color value formats with 1-click copying.",
  },
};

export default function ColorConverterPage() {
  const faqs = [
    {
      question: "What color formats are supported?",
      answer:
        "Colorvexa supports HEX (#RRGGBB), RGB (rgb(r, g, b)), and HSL (hsl(h, s%, l%)) format conversions.",
    },
    {
      question: "Are color conversions exact?",
      answer:
        "Yes, mathematical color transformation formulas ensure precise lossless conversions between HEX, RGB, and HSL formats.",
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
      title: "Shades & Tints Generator",
      description: "Create step-by-step lighter and darker variations of any base color.",
      href: "/tools/color-shades-generator",
      icon: SlidersHorizontal,
      iconBgColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
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
    name: "Color Converter",
    url: getAbsoluteUrl("/tools/color-converter"),
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online color converter tool. Convert between HEX, RGB, and HSL values instantly in your browser.",
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
        name: "Color Converter",
        item: getAbsoluteUrl("/tools/color-converter"),
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
        title="Color Converter"
        description="Convert seamlessly between HEX, RGB, and HSL color representations with copy features."
        icon={<RefreshCw className="w-8 h-8 text-amber-600" />}
        breadcrumbs={[
          { label: "Tools", href: "/#tools" },
          { label: "Color Converter" },
        ]}
      >
        <div className="space-y-12">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div className="max-w-2xl mx-auto space-y-6">
              <p className="text-sm text-slate-600 text-center">
                Enter any HEX code, RGB numbers, or HSL values to convert across all formats in real time.
              </p>

              <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    HEX Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="#0ea5e9"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      RGB Values
                    </label>
                    <input
                      type="text"
                      defaultValue="rgb(14, 165, 233)"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                      placeholder="rgb(0, 0, 0)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      HSL Values
                    </label>
                    <input
                      type="text"
                      defaultValue="hsl(199, 89%, 48%)"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                      placeholder="hsl(0, 0%, 0%)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERNAL LINKING SECTION */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Related Design & Color Utilities
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore more free browser utilities on Colorvexa:
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
                  <span>Extract Dominant Colors</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/image-color-palette-generator"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <Palette className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Image Palette Generator</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/color-shades-generator"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Shades & Tints Generator</span>
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

          <FAQ items={faqs} title="Color Converter FAQ" />

          {/* RELATED COLOR TOOLS SECTION */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Related Color Tools
              </h2>
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
