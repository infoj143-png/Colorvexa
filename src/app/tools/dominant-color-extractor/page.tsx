import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ImageUploader } from "@/components/ImageUploader";
import { EmptyState } from "@/components/EmptyState";
import { FAQ } from "@/components/FAQ";
import { ToolCard } from "@/components/ToolCard";
import { ToolGrid } from "@/components/ToolGrid";
import { getAbsoluteUrl, SITE_NAME } from "@/lib/site-config";
import {
  Layers,
  ShieldCheck,
  Zap,
  Sparkles,
  Pipette,
  Palette,
  RefreshCw,
  SlidersHorizontal,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dominant Color Extractor — Find Prominent Image Colors | Colorvexa",
  description:
    "Extract dominant colors from images online for free. Discover primary color distributions and color accents instantly in your browser with complete privacy.",
  alternates: {
    canonical: getAbsoluteUrl("/tools/dominant-color-extractor"),
  },
  openGraph: {
    title: "Dominant Color Extractor — Find Prominent Image Colors | Colorvexa",
    description:
      "Extract primary, dominant, and accent colors from any uploaded photo or image using fast client-side algorithms.",
    url: getAbsoluteUrl("/tools/dominant-color-extractor"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominant Color Extractor — Find Prominent Image Colors | Colorvexa",
    description:
      "Extract primary and dominant colors from any image instantly in your web browser.",
  },
};

export default function DominantColorExtractorPage() {
  const faqs = [
    {
      question: "What is a dominant color extractor?",
      answer:
        "A dominant color extractor analyzes the frequency and distribution of colors in an image to identify the primary and secondary colors that define its visual palette.",
    },
    {
      question: "How fast is color extraction?",
      answer:
        "Extraction takes less than a second because computation runs locally in your browser using optimized Canvas API color quantizing algorithms.",
    },
    {
      question: "Are my images stored or uploaded?",
      answer:
        "No, your images remain completely private and are processed locally on your device without server uploads.",
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
      title: "Image Color Palette Generator",
      description: "Automatically generate cohesive color palettes from uploaded images.",
      href: "/tools/image-color-palette-generator",
      icon: Palette,
      iconBgColor: "bg-rose-50 text-rose-600 border-rose-200",
    },
    {
      title: "Color Converter",
      description: "Convert seamlessly between HEX, RGB, and HSL color value formats.",
      href: "/tools/color-converter",
      icon: RefreshCw,
      iconBgColor: "bg-amber-50 text-amber-600 border-amber-200",
    },
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Dominant Color Extractor",
    url: getAbsoluteUrl("/tools/dominant-color-extractor"),
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript and HTML5 Canvas support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online dominant color extractor tool. Find primary color distribution ratios from images directly in your browser.",
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
        name: "Dominant Color Extractor",
        item: getAbsoluteUrl("/tools/dominant-color-extractor"),
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
        title="Dominant Color Extractor"
        description="Extract the most prominent and dominant colors from any image instantly in your browser."
        icon={<Layers className="w-8 h-8 text-indigo-600" />}
        breadcrumbs={[
          { label: "Tools", href: "/#tools" },
          { label: "Dominant Color Extractor" },
        ]}
      >
        <div className="space-y-12">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div className="max-w-3xl mx-auto">
              <ImageUploader />
            </div>

            <EmptyState
              title="Upload an image to extract dominant colors"
              description="Select an image above to automatically compute color frequency clusters and dominant swatches."
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Smart color frequency clustering</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero server upload or data storage</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>High-speed browser processing</span>
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
                  <span>Color Code Converter</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/color-shades-generator"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Color Shades & Tints Generator</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/color-contrast-checker"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <Eye className="w-4 h-4 shrink-0 text-purple-600" />
                  <span>WCAG Color Contrast Checker</span>
                </Link>
              </li>
            </ul>
          </section>

          <FAQ items={faqs} title="Dominant Color Extractor FAQ" />

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
