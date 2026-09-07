import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/ToolPageLayout";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Shades & Tints Generator — Generate Color Variations | Colorvexa",
  description:
    "Generate lighter tints and darker shades for any color code. Create clean step-by-step color scales for UI design directly in your browser.",
  alternates: {
    canonical: getAbsoluteUrl("/tools/color-shades-generator"),
  },
  openGraph: {
    title: "Shades & Tints Generator — Generate Color Variations | Colorvexa",
    description:
      "Generate step-by-step lighter tints and darker shades for any HEX color code instantly.",
    url: getAbsoluteUrl("/tools/color-shades-generator"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shades & Tints Generator — Generate Color Variations | Colorvexa",
    description:
      "Create clean step-by-step lighter and darker color variations for UI design.",
  },
};

export default function ColorShadesGeneratorPage() {
  const faqs = [
    {
      question: "What is the difference between shades and tints?",
      answer:
        "A tint is created by adding white to a base color to make it lighter, while a shade is created by adding black to a base color to make it darker.",
    },
    {
      question: "How are shades and tints used in UI design?",
      answer:
        "Shades and tints help designers construct consistent design tokens for hover states, active states, backgrounds, borders, and disabled buttons.",
    },
  ];

  const relatedTools = [
    {
      title: "Color Converter",
      description: "Convert seamlessly between HEX, RGB, and HSL color representations with copy features.",
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
    {
      title: "Image Color Palette Generator",
      description: "Automatically generate cohesive color palettes from uploaded images.",
      href: "/tools/image-color-palette-generator",
      icon: Palette,
      iconBgColor: "bg-rose-50 text-rose-600 border-rose-200",
    },
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shades & Tints Generator",
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
      "Free online shades and tints generator. Create step-by-step color scales and lighter/darker variations in your web browser.",
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
        name: "Shades & Tints Generator",
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
        title="Shades & Tints Generator"
        description="Generate lighter (tints) and darker (shades) step-by-step variations of any base color."
        icon={<SlidersHorizontal className="w-8 h-8 text-emerald-600" />}
        breadcrumbs={[
          { label: "Tools", href: "/#tools" },
          { label: "Shades & Tints Generator" },
        ]}
      >
        <div className="space-y-12">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 border border-slate-200 rounded-2xl">
                <div className="w-16 h-16 rounded-xl bg-sky-500 shadow-inner border border-slate-300 shrink-0" />
                <div className="w-full space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Base Color HEX
                  </label>
                  <input
                    type="text"
                    defaultValue="#0ea5e9"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                  />
                </div>
              </div>

              {/* Scale Preview */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Generated Tints & Shades Scale
                </h3>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {[
                    { name: "100%", bg: "bg-sky-100", hex: "#e0f2fe" },
                    { name: "200%", bg: "bg-sky-200", hex: "#bae6fd" },
                    { name: "300%", bg: "bg-sky-300", hex: "#7dd3fc" },
                    { name: "400%", bg: "bg-sky-400", hex: "#38bdf8" },
                    { name: "500%", bg: "bg-sky-500", hex: "#0ea5e9" },
                    { name: "600%", bg: "bg-sky-600", hex: "#0284c7" },
                    { name: "700%", bg: "bg-sky-700", hex: "#0369a1" },
                    { name: "800%", bg: "bg-sky-800", hex: "#075985" },
                    { name: "900%", bg: "bg-sky-900", hex: "#0c4a6e" },
                    { name: "950%", bg: "bg-slate-950", hex: "#082f49" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1 text-center">
                      <div className={`h-12 rounded-lg border border-slate-200 ${item.bg}`} />
                      <span className="text-[10px] font-mono text-slate-600 font-medium">{item.hex}</span>
                    </div>
                  ))}
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
                  href="/tools/color-converter"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Color Code Converter</span>
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

          <FAQ items={faqs} title="Shades & Tints FAQ" />

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
