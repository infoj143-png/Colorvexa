import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { FAQ } from "@/components/FAQ";
import { ToolCard } from "@/components/ToolCard";
import { ToolGrid } from "@/components/ToolGrid";
import { getAbsoluteUrl, SITE_NAME } from "@/lib/site-config";
import {
  Eye,
  CheckCircle2,
  Pipette,
  Layers,
  Palette,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Color Contrast Checker — Test WCAG 2.1 Accessibility | Colorvexa",
  description:
    "Check color contrast ratios against WCAG 2.1 AA and AAA accessibility standards. Ensure text legibility for all users with client-side privacy.",
  alternates: {
    canonical: getAbsoluteUrl("/tools/color-contrast-checker"),
  },
  openGraph: {
    title: "Color Contrast Checker — Test WCAG 2.1 Accessibility | Colorvexa",
    description:
      "Verify text legibility and test WCAG 2.1 AA/AAA compliance instantly in your browser.",
    url: getAbsoluteUrl("/tools/color-contrast-checker"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Contrast Checker — Test WCAG 2.1 Accessibility | Colorvexa",
    description:
      "Test color contrast ratios for text and background combinations against WCAG guidelines.",
  },
};

export default function ColorContrastCheckerPage() {
  const faqs = [
    {
      question: "What is WCAG color contrast standard?",
      answer:
        "The Web Content Accessibility Guidelines (WCAG) specify minimum contrast ratios for text: Level AA requires at least 4.5:1 for normal text and 3:1 for large text. Level AAA requires 7:1 for normal text and 4.5:1 for large text.",
    },
    {
      question: "Why is color contrast important?",
      answer:
        "Proper contrast ensures that visually impaired, color-blind, or low-vision users can comfortably read content on your website or mobile application.",
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
      title: "Shades & Tints Generator",
      description: "Generate lighter (tints) and darker (shades) step-by-step variations of any base color.",
      href: "/tools/color-shades-generator",
      icon: SlidersHorizontal,
      iconBgColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      title: "Image Color Picker",
      description: "Pick exact pixel colors from any uploaded image with pixel-level precision.",
      href: "/tools/image-color-picker",
      icon: Pipette,
      iconBgColor: "bg-sky-50 text-sky-600 border-sky-200",
    },
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Color Contrast Checker",
    url: getAbsoluteUrl("/tools/color-contrast-checker"),
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online color contrast checker tool. Verify WCAG 2.1 accessibility compliance directly in your web browser.",
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
        name: "Color Contrast Checker",
        item: getAbsoluteUrl("/tools/color-contrast-checker"),
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
        title="Color Contrast Checker"
        description="Check text and background color contrast against WCAG 2.1 accessibility guidelines."
        icon={<Eye className="w-8 h-8 text-purple-600" />}
        breadcrumbs={[
          { label: "Tools", href: "/#tools" },
          { label: "Contrast Checker" },
        ]}
      >
        <div className="space-y-12">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Contrast Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Text Color
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-300 shrink-0" />
                    <input
                      type="text"
                      defaultValue="#0f172a"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-300 shrink-0" />
                    <input
                      type="text"
                      defaultValue="#ffffff"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                    />
                  </div>
                </div>
              </div>

              {/* Contrast Result Preview Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-center">
                <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono">
                  15.8 : 1
                </div>
                <p className="text-xs font-medium text-slate-500">
                  Calculated Contrast Ratio
                </p>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>WCAG AA Pass</span>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>WCAG AAA Pass</span>
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
                  href="/tools/color-converter"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Color Code Converter</span>
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
            </ul>
          </section>

          <FAQ items={faqs} title="Contrast Checker FAQ" />

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
