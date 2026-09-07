import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { DominantColorExtractor } from "@/components/DominantColorExtractor";
import { FAQ } from "@/components/FAQ";
import { ToolCard } from "@/components/ToolCard";
import { ToolGrid } from "@/components/ToolGrid";
import { getAbsoluteUrl, SITE_NAME } from "@/lib/site-config";
import {
  Layers,
  Pipette,
  Palette,
  RefreshCw,
  SlidersHorizontal,
  Eye,
  Lock,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dominant Color Extractor – Extract Colors From Images",
  description:
    "Extract dominant colors from images online for free. Discover primary color distributions, color accents, and frequency ratios in your browser with 100% client-side privacy.",
  alternates: {
    canonical: getAbsoluteUrl("/tools/dominant-color-extractor"),
  },
  openGraph: {
    title: "Dominant Color Extractor – Extract Colors From Images | Colorvexa",
    description:
      "Extract primary and dominant colors from any image instantly in your web browser. Get exact HEX, RGB, and HSL codes with complete privacy.",
    url: getAbsoluteUrl("/tools/dominant-color-extractor"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominant Color Extractor – Extract Colors From Images | Colorvexa",
    description:
      "Extract primary and dominant colors from any photo instantly in your web browser.",
  },
};

export default function DominantColorExtractorPage() {
  const faqs = [
    {
      question: "What is a dominant color?",
      answer:
        "A dominant color is the most visually prominent color in an image, occupying the largest proportion of total pixel space or driving the primary visual tone of the photo.",
    },
    {
      question: "How do I extract colors from an image?",
      answer:
        "Upload or drag and drop your image (JPG, PNG, WebP) into Colorvexa. Our browser-based quantization algorithm automatically analyzes pixel frequencies and extracts the top dominant colors instantly.",
    },
    {
      question: "How many colors can I extract?",
      answer:
        "You can choose to extract 3, 5, 8, or 10 dominant colors depending on your design needs. By default, Colorvexa generates a 5-color dominant palette.",
    },
    {
      question: "Can I get HEX codes from an image?",
      answer:
        "Yes, every extracted dominant color includes a 6-character hexadecimal code (e.g. #38BDF8) with a 1-click copy button, as well as a 'Copy All HEX' action.",
    },
    {
      question: "Can I get RGB and HSL values?",
      answer:
        "Yes, Colorvexa displays full RGB (Red, Green, Blue) and HSL (Hue, Saturation, Lightness) color values alongside HEX for every extracted swatch.",
    },
    {
      question: "Is my image uploaded?",
      answer:
        "No. All image processing and color analysis happen 100% locally in your web browser using HTML5 Canvas. Your image is never uploaded, saved, or transmitted to any server.",
    },
    {
      question: "Does the tool work on mobile?",
      answer:
        "Yes, the Dominant Color Extractor is fully optimized for smartphones, tablets, and desktop computers.",
    },
    {
      question: "Which image formats are supported?",
      answer:
        "The tool supports JPG/JPEG, PNG, WebP, SVG, and GIF image files up to 20MB in size.",
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

  // Structured Data (JSON-LD)
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
      "Free online dominant color extractor tool. Find primary color distributions and prominence ratios from images directly in your browser with zero server uploads.",
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
        description="Extract the most prominent colors and percentage ratios from any image instantly in your web browser. Free, accurate, and 100% private client-side processing."
        icon={<Layers className="w-8 h-8 text-indigo-600" />}
        breadcrumbs={[
          { label: "Tools", href: "/#tools" },
          { label: "Dominant Color Extractor" },
        ]}
      >
        <div className="space-y-16">
          {/* Main Interactive Tool Container */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <DominantColorExtractor />
          </div>

          {/* GEO CONTENT SECTION 1: What is a Dominant Color Extractor? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              What is a Dominant Color Extractor?
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              A <strong>dominant color extractor</strong> is an online utility that analyzes an image to discover its primary, secondary, and accent colors. Instead of picking individual pixels manually, an <strong>image color extractor</strong> automatically scans pixel clusters across the photo to identify which colors occupy the largest surface area. This makes it effortless to <strong>extract dominant colors from an image</strong> for branding, UI theme design, or photography analysis.
            </p>
          </section>

          {/* GEO CONTENT SECTION 2: How to Extract Dominant Colors From an Image */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              How to Extract Dominant Colors From an Image
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Follow these simple steps to <strong>extract colors from photo</strong> files instantly on mobile or desktop:
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Upload an image</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Select or drag and drop a JPG, PNG, or WebP photo into the extractor zone.
                  </p>
                </div>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Colorvexa analyzes pixels</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Your browser computes pixel distributions locally without uploading your image to external servers.
                  </p>
                </div>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Similar colors are grouped</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Smart color quantization (Median Cut) groups neighboring pixel shades into clean representative clusters.
                  </p>
                </div>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Prominent colors are displayed</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    The strongest colors appear ranked by percentage frequency ratio (e.g. 35.2%).
                  </p>
                </div>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                  5
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Copy values or export PNG</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Copy HEX, RGB, or HSL values with one click, or export the full palette card as a PNG image.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* GEO CONTENT SECTION 3: How Does Color Extraction Work? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              How Does Color Extraction Work?
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Color extraction relies on a combination of <strong>pixel sampling</strong>, <strong>transparent pixel filtering</strong>, and <strong>color quantization algorithms</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base text-indigo-700">1. Pixel Downsampling</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To ensure ultra-fast processing even for 4K images, the image is rendered onto an offscreen canvas at an optimized sample size, maintaining accurate color representation without browser lag.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base text-indigo-700">2. Median Cut Clustering</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pixels are split into 3D color boxes along the RGB axis with the greatest variance. The median point of each box forms a representative cluster centroid.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base text-indigo-700">3. Frequency Ranking</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Each color cluster is ranked by the total percentage of image pixels it accounts for, giving you an exact mathematical overview of the <strong>dominant colors from image</strong> files.
                </p>
              </div>
            </div>
          </section>

          {/* GEO CONTENT SECTION 4: Is My Image Uploaded? */}
          <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-800 rounded-xl text-emerald-400 border border-slate-700">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Is My Image Uploaded?
              </h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              <strong>No, your image is processed 100% locally in your web browser.</strong> Colorvexa uses HTML5 Canvas and client-side JavaScript execution. Your photos never leave your device, ensuring maximum speed, zero bandwidth usage, and complete personal privacy.
            </p>
          </section>

          {/* INTERNAL LINKING SECTION */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Explore More Free Color Tools on Colorvexa
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Supercharge your creative design workflow with our full suite of free browser utilities:
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

          {/* FAQ SECTION */}
          <FAQ items={faqs} title="Dominant Color Extractor FAQ" />

          {/* RELATED COLOR TOOLS SECTION */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Related Color Tools
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Discover other client-side color utilities on Colorvexa.
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
