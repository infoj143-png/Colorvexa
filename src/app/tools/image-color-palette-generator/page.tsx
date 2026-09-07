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
  Palette,
  Download,
  ShieldCheck,
  Sparkles,
  Pipette,
  Layers,
  RefreshCw,
  SlidersHorizontal,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Image Color Palette Generator — Generate Palettes From Photos | Colorvexa",
  description:
    "Automatically generate beautiful color palettes from any photo or graphic. Export color palettes in HEX, RGB, and CSS formats directly in your web browser.",
  alternates: {
    canonical: getAbsoluteUrl("/tools/image-color-palette-generator"),
  },
  openGraph: {
    title: "Image Color Palette Generator — Generate Palettes From Photos | Colorvexa",
    description:
      "Automatically generate harmonious color palettes from uploaded images. Free, instant, and private browser processing.",
    url: getAbsoluteUrl("/tools/image-color-palette-generator"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Color Palette Generator — Generate Palettes From Photos | Colorvexa",
    description:
      "Generate beautiful color schemes and palettes from any photo instantly in your browser.",
  },
};

export default function ImageColorPaletteGeneratorPage() {
  const faqs = [
    {
      question: "How are palettes generated from an image?",
      answer:
        "Colorvexa calculates spatial and perceptual color variations across the image pixels to form a harmonious 5 to 10 color design palette.",
    },
    {
      question: "Can I export my generated palette?",
      answer:
        "Yes, generated palettes can be exported directly as CSS variables, JSON, or image swatch files.",
    },
    {
      question: "Is my image uploaded or stored?",
      answer:
        "No. Palette generation happens entirely inside your browser memory using client-side JavaScript. Your image is never transmitted over the internet.",
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
      description: "Extract the most prominent colors and distribution ratios from any image.",
      href: "/tools/dominant-color-extractor",
      icon: Layers,
      iconBgColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      title: "Shades & Tints Generator",
      description: "Create step-by-step lighter and darker variations of any base color.",
      href: "/tools/color-shades-generator",
      icon: SlidersHorizontal,
      iconBgColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image Color Palette Generator",
    url: getAbsoluteUrl("/tools/image-color-palette-generator"),
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript and HTML5 Canvas support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online image color palette generator tool. Auto-create cohesive palettes from photos directly in your web browser.",
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
        name: "Image Palette Generator",
        item: getAbsoluteUrl("/tools/image-color-palette-generator"),
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
        title="Image Color Palette Generator"
        description="Automatically generate a balanced, beautiful color palette from any uploaded image."
        icon={<Palette className="w-8 h-8 text-rose-600" />}
        breadcrumbs={[
          { label: "Tools", href: "/#tools" },
          { label: "Image Palette Generator" },
        ]}
      >
        <div className="space-y-12">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div className="max-w-3xl mx-auto">
              <ImageUploader />
            </div>

            <EmptyState
              title="Upload an image to generate a color palette"
              description="Your image will be analyzed locally to produce a cohesive, downloadable color scheme."
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Harmonious color distribution</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <Download className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Multi-format palette export</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Private client-side processing</span>
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

          <FAQ items={faqs} title="Palette Generator FAQ" />

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
