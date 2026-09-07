import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ImageColorPicker } from "@/components/ImageColorPicker";
import { FAQ } from "@/components/FAQ";
import { ToolCard } from "@/components/ToolCard";
import { ToolGrid } from "@/components/ToolGrid";
import {
  Pipette,
  Layers,
  Palette,
  RefreshCw,
  SlidersHorizontal,
  Eye,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Image Color Picker – Pick HEX, RGB & HSL Colors From Images | Colorvexa",
  description:
    "Free online image color picker. Upload any image to pick exact pixel colors in HEX, RGB, and HSL formats. Fast, precise, and 100% private client-side processing.",
  alternates: {
    canonical: "https://colorvexa.com/tools/image-color-picker",
  },
  openGraph: {
    title: "Image Color Picker – Pick HEX, RGB & HSL Colors From Images | Colorvexa",
    description:
      "Upload an image and pick any pixel color instantly. Get accurate HEX, RGB, and HSL values in your browser with complete privacy.",
    url: "https://colorvexa.com/tools/image-color-picker",
    siteName: "Colorvexa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Color Picker – Pick HEX, RGB & HSL Colors From Images | Colorvexa",
    description:
      "Upload an image and pick any pixel color instantly in HEX, RGB, or HSL format.",
  },
};

export default function ImageColorPickerPage() {
  const faqs = [
    {
      question: "How do I pick a color from an image?",
      answer:
        "Upload or drag and drop your image file into the color picker. Once rendered, click or tap anywhere on the image to select a pixel color. The tool instantly displays the HEX code, RGB values, and HSL values with one-click copy buttons.",
    },
    {
      question: "Can I get a HEX code from an image?",
      answer:
        "Yes! When you click on any pixel on your image, Colorvexa immediately calculates and provides the standard 6-character hexadecimal color code (e.g. #3B82F6) ready to copy.",
    },
    {
      question: "Can I get RGB and HSL values?",
      answer:
        "Yes, the Image Color Picker provides complete color formatting including RGB (Red, Green, Blue) and HSL (Hue, Saturation, Lightness) alongside the HEX value.",
    },
    {
      question: "Does the image get uploaded?",
      answer:
        "No. Colorvexa performs all pixel extraction locally in your browser using the HTML5 Canvas API. Your image never leaves your device and is never uploaded or stored on any external server.",
    },
    {
      question: "Does the image color picker work on mobile?",
      answer:
        "Yes, the Image Color Picker is fully responsive. You can tap anywhere on an image on your smartphone or tablet to inspect and copy colors on the go.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "The Image Color Picker supports popular web image formats including JPG/JPEG, PNG, WebP, SVG, and GIF files up to 20MB in size.",
    },
  ];

  const relatedTools = [
    {
      title: "Dominant Color Extractor",
      description: "Extract the most prominent colors and distribution ratios from any image.",
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
    name: "Image Color Picker",
    url: "https://colorvexa.com/tools/image-color-picker",
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript and HTML5 Canvas support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online image color picker tool. Pick exact pixel colors in HEX, RGB, and HSL directly in your web browser.",
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
        item: "https://colorvexa.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://colorvexa.com/#tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Image Color Picker",
        item: "https://colorvexa.com/tools/image-color-picker",
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
        title="Image Color Picker"
        description="Pick a color from an image with pixel-level precision. Upload any photo to extract accurate HEX color from image, RGB color from image, and HSL color values instantly in your browser."
        icon={<Pipette className="w-8 h-8 text-sky-600" />}
        breadcrumbs={[
          { label: "Tools", href: "/#tools" },
          { label: "Image Color Picker" },
        ]}
      >
        <div className="space-y-16">
          {/* Main Interactive Tool Container */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <ImageColorPicker />
          </div>

          {/* GEO CONTENT SECTION 1: What is an Image Color Picker? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              What is an Image Color Picker?
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              An <strong>image color picker</strong> is a web-based utility that lets you inspect any photo or image file to detect exact pixel colors. Whether you need to find a <strong>HEX color from an image</strong> for web styling or extract an <strong>RGB color from an image</strong> for graphic design, an image color picker converts visual pixel data into precise numeric color values instantly.
            </p>
          </section>

          {/* GEO CONTENT SECTION 2: How to Pick a Color From an Image */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              How to Pick a Color From an Image
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Follow these four simple steps to <strong>pick a color from an image</strong> on desktop or mobile:
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Upload an image</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Drag and drop or browse to select a PNG, JPG, WebP, or SVG file from your device.
                  </p>
                </div>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Click or tap the desired area</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Click anywhere on the preview image or tap on mobile screens to pinpoint the pixel.
                  </p>
                </div>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Colorvexa detects the pixel color</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    The HTML5 Canvas API extracts the exact pixel color data instantaneously.
                  </p>
                </div>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Copy the HEX, RGB, or HSL value</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Use the 1-click copy buttons to copy formatted HEX, RGB, or HSL values directly to your clipboard.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* GEO CONTENT SECTION 3: What Color Formats Does It Support? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              What Color Formats Does It Support?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  HEX Format
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Hexadecimal color codes (e.g., <code>#0EA5E9</code>) used extensively in CSS, HTML web development, and digital UI design tools.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  RGB Format
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Red, Green, and Blue intensity values (e.g., <code>rgb(14, 165, 233)</code>) representing primary light channels from 0 to 255.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  HSL Format
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Hue, Saturation, and Lightness values (e.g., <code>hsl(199, 89%, 48%)</code>) offering an intuitive human-friendly way to adjust color tone and shade.
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
              <strong>No, your image is never uploaded to any server.</strong> All processing occurs strictly inside your web browser runtime using client-side JavaScript and the HTML5 Canvas element. Your image files remain completely private on your computer or mobile phone.
            </p>
          </section>

          {/* INTERNAL LINKING SECTION */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Explore More Color Tools on Colorvexa
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Enhance your design workflow with our full suite of free online color utilities:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm font-medium text-slate-700">
              <li>
                <Link
                  href="/tools/dominant-color-extractor"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <Layers className="w-4 h-4 shrink-0 text-indigo-600" />
                  <span>Extract Dominant Colors From Images</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/image-color-palette-generator"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <Palette className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Generate Image Color Palettes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/color-converter"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Convert HEX, RGB, and HSL Codes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/color-shades-generator"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Generate Color Shades & Tints</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/color-contrast-checker"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <Eye className="w-4 h-4 shrink-0 text-purple-600" />
                  <span>Check Color Contrast for Accessibility</span>
                </Link>
              </li>
            </ul>
          </section>

          {/* GEO FAQ SECTION */}
          <FAQ items={faqs} title="Frequently Asked Questions" />

          {/* RELATED COLOR TOOLS SECTION */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Related Color Tools
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Discover other client-side color utilities to streamline your creative process.
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
