import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ImageColorPaletteGenerator } from "@/components/ImageColorPaletteGenerator";
import { FAQ } from "@/components/FAQ";
import { ToolCard } from "@/components/ToolCard";
import { ToolGrid } from "@/components/ToolGrid";
import { getAbsoluteUrl, SITE_NAME } from "@/lib/site-config";
import {
  Palette,
  Pipette,
  Layers,
  RefreshCw,
  SlidersHorizontal,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Image Color Palette Generator – Extract a Palette From Any Image | Colorvexa",
  description:
    "Automatically generate beautiful color palettes from any photo or graphic. Extract representative HEX, RGB, and HSL colors and export as CSS or PNG directly in your browser.",
  alternates: {
    canonical: getAbsoluteUrl("/tools/image-color-palette-generator"),
  },
  openGraph: {
    title: "Image Color Palette Generator – Extract a Palette From Any Image | Colorvexa",
    description:
      "Automatically generate harmonious color palettes from uploaded images. Free, instant, and private client-side browser processing.",
    url: getAbsoluteUrl("/tools/image-color-palette-generator"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Color Palette Generator – Extract a Palette From Any Image | Colorvexa",
    description:
      "Generate beautiful color schemes and palettes from any photo instantly in your browser without uploading files.",
  },
};

export default function ImageColorPaletteGeneratorPage() {
  const faqs = [
    {
      question: "How do I create a color palette from an image?",
      answer:
        "Upload any photo (JPG, PNG, WebP) to Colorvexa. Our client-side algorithm instantly analyzes pixel frequency and spatial color clusters to generate a cohesive color palette.",
    },
    {
      question: "How many colors can I generate?",
      answer:
        "You can choose between 3, 4, 5, 6, 8, or 10 representative colors. The default palette size is 5 colors, and changing the size instantly regenerates the palette.",
    },
    {
      question: "Can I extract HEX codes from an image?",
      answer:
        "Yes! Each swatch displays its exact HEX code, which you can copy individually or copy all HEX codes simultaneously with the 'Copy Palette' button.",
    },
    {
      question: "Can I get RGB and HSL values?",
      answer:
        "Yes, every extracted palette color includes ready-to-copy HEX, RGB, and HSL values alongside approximate prominence percentages.",
    },
    {
      question: "Can I download the generated palette?",
      answer:
        "Yes, you can copy the palette as plain HEX, CSS variables (`:root`), JSON, or download a high-resolution PNG swatch image.",
    },
    {
      question: "Is my image uploaded?",
      answer:
        "No. All image processing occurs entirely within your web browser using HTML5 Canvas API. Your images never leave your device and are never uploaded or stored on any server.",
    },
    {
      question: "Does it work on mobile?",
      answer:
        "Yes, Colorvexa is fully responsive and optimized for mobile touchscreens, tablets, and desktop computers.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "Colorvexa supports JPG/JPEG, PNG, and WebP image formats.",
    },
    {
      question: "What is the difference between a dominant color extractor and a palette generator?",
      answer:
        "A dominant color extractor focuses primarily on calculating strict statistical color area percentages, while a palette generator groups similar colors into visual, harmonious design swatches ideal for UI design and artwork.",
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
      "Free online image color palette generator tool. Auto-create cohesive color palettes from photos directly in your web browser with client-side privacy.",
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
        name: "Image Color Palette Generator",
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
        description="Extract beautiful, representative color palettes directly from any photo or image instantly in your web browser."
        icon={<Palette className="w-8 h-8 text-rose-600" />}
        breadcrumbs={[
          { label: "Tools", href: "/#tools" },
          { label: "Image Color Palette Generator" },
        ]}
      >
        <div className="space-y-12">
          {/* Main Interactive Tool Component */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <ImageColorPaletteGenerator />
          </div>

          {/* GEO Educational Content Section */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                About the Image Color Palette Generator
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Learn how client-side color extraction helps designers turn photos into cohesive color schemes.
              </p>
            </div>

            <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  What is an Image Color Palette Generator?
                </h3>
                <p>
                  An <strong>Image Color Palette Generator</strong> is a specialized design utility that extracts
                  a structured collection of representative colors from an uploaded photo or graphic. Designers, branding
                  specialists, and digital artists use palette generators to turn photography, digital artwork, and mood boards
                  into practical color schemes for website themes, mobile apps, and graphic illustrations.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  How to Generate a Color Palette From an Image
                </h3>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>
                    <strong>Upload an image:</strong> Drag and drop or select a JPG, PNG, or WebP photo.
                  </li>
                  <li>
                    <strong>Colorvexa analyzes the image locally:</strong> HTML5 Canvas reads pixel data directly inside your browser.
                  </li>
                  <li>
                    <strong>Representative colors are identified:</strong> Similar colors are grouped using median cut quantization.
                  </li>
                  <li>
                    <strong>A color palette is generated:</strong> Swatches display exact HEX, RGB, and HSL values with approximate proportions.
                  </li>
                  <li>
                    <strong>Copy or export the colors:</strong> Instantly copy HEX lists, CSS variables, JSON arrays, or download a PNG swatch.
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  How Does the Palette Generator Work?
                </h3>
                <p>
                  When an image is loaded, Colorvexa samples pixel color values across an offscreen canvas. To maintain high performance
                  on large photo files, the image is efficiently downsampled. The algorithm groups pixel colors into balanced clusters using
                  color quantization (Median Cut algorithm), ignoring transparent pixels. Representative average values from each cluster form
                  a harmonious design palette reflecting the visual essence of your photo.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  What Color Formats Are Available?
                </h3>
                <p>
                  Every generated palette color includes three essential web design formats:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>
                    <strong>HEX (Hexadecimal):</strong> standard six-digit codes widely used in CSS and web design (e.g., <code>#F5F1E8</code>).
                  </li>
                  <li>
                    <strong>RGB (Red, Green, Blue):</strong> standard color values for screen displays (e.g., <code>rgb(245, 241, 232)</code>).
                  </li>
                  <li>
                    <strong>HSL (Hue, Saturation, Lightness):</strong> intuitive representation for color manipulation (e.g., <code>hsl(42, 43%, 94%)</code>).
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Is My Image Uploaded?
                </h3>
                <p>
                  No. Colorvexa prioritizes user privacy and security. Image analysis and palette generation occur entirely in your browser using
                  client-side JavaScript. Your images are never transmitted to external servers, cloud services, or third-party APIs.
                </p>
              </div>
            </div>
          </section>

          {/* INTERNAL LINKING SECTION */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Related Design & Color Utilities
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore more free, fast browser utilities on Colorvexa:
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
                  <span>Color Shades Generator</span>
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

          {/* FAQ SECTION */}
          <FAQ items={faqs} title="Frequently Asked Questions" />

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
