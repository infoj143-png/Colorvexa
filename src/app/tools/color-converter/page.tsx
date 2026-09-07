import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ColorConverter } from "@/components/ColorConverter";
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
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Color Converter – HEX, RGB & HSL Converter | Colorvexa",
  description:
    "Free online color converter tool. Convert seamlessly between HEX, RGB, and HSL color values with instant real-time calculations and 1-click copying.",
  alternates: {
    canonical: getAbsoluteUrl("/tools/color-converter"),
  },
  openGraph: {
    title: "Color Converter – HEX, RGB & HSL Converter | Colorvexa",
    description:
      "Convert seamlessly between HEX, RGB, and HSL color formats in real time with complete precision.",
    url: getAbsoluteUrl("/tools/color-converter"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Converter – HEX, RGB & HSL Converter | Colorvexa",
    description:
      "Convert between HEX, RGB, and HSL color formats instantly with 1-click copying.",
  },
};

export default function ColorConverterPage() {
  const faqs = [
    {
      question: "How do I convert HEX to RGB?",
      answer:
        "Enter or paste your HEX color code (such as #FF5733 or #F53) into the HEX input field. Colorvexa automatically calculates and displays the equivalent RGB color values (rgb(255, 87, 51)) instantly without requiring a page refresh or submit button.",
    },
    {
      question: "How do I convert RGB to HEX?",
      answer:
        "Type your RGB numbers (such as 255, 87, 51 or rgb(255, 87, 51)) into the RGB input field. The converter instantly calculates the standard 6-character hexadecimal color code (#FF5733) ready to copy.",
    },
    {
      question: "How do I convert HEX to HSL?",
      answer:
        "Paste your HEX color string into the HEX field. The mathematical conversion formula converts the red, green, and blue components into exact Hue, Saturation, and Lightness percentages (hsl(11, 100%, 60%)).",
    },
    {
      question: "How do I convert HSL to HEX?",
      answer:
        "Enter your HSL values (such as hsl(11, 100%, 60%) or 11, 100%, 60%) into the HSL input. The tool converts HSL to RGB, and then to HEX (#FF5733) in real time.",
    },
    {
      question: "Are the conversions accurate?",
      answer:
        "Yes, all conversions use exact mathematical formulas for lossless round-trip transformations between HEX, RGB, and HSL color representations.",
    },
    {
      question: "Can I convert colors on mobile?",
      answer:
        "Yes, Colorvexa is fully responsive on mobile devices including Android smartphones, iPhones, tablets, and desktop computers.",
    },
    {
      question: "Does the converter send my color data to a server?",
      answer:
        "No. All color transformations run 100% client-side in your web browser. No color codes or personal data are ever transmitted to any external server.",
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
      "Free online color converter tool. Convert between HEX, RGB, and HSL values instantly in your browser with 100% privacy.",
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
        description="Convert seamlessly between HEX, RGB, and HSL color representations in real time with copy features."
        icon={<RefreshCw className="w-8 h-8 text-amber-600" />}
        breadcrumbs={[
          { label: "Tools", href: "/#tools" },
          { label: "Color Converter" },
        ]}
      >
        <div className="space-y-16">
          {/* Main Interactive Color Converter Component */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <ColorConverter />
          </div>

          {/* GEO CONTENT SECTION 1: What is a Color Converter? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              What is a Color Converter?
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              A <strong>color converter</strong> is an online utility that transforms color codes between different technical representations such as <strong>HEX</strong>, <strong>RGB</strong>, and <strong>HSL</strong>. It allows designers and software developers to translate colors seamlessly between different software applications, CSS stylesheets, and design tools without losing color fidelity.
            </p>
          </section>

          {/* GEO CONTENT SECTION 2: How to Convert HEX, RGB and HSL Colors */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              How to Convert HEX, RGB and HSL Colors
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Converting colors with Colorvexa takes just three simple steps:
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0">
              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Enter your color code</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Type or paste a color code into any input box (HEX, RGB, or HSL) or pick a color visually using the native color picker.
                  </p>
                </div>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Instant real-time calculation</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Colorvexa instantly performs exact mathematical conversion across all color formats simultaneously.
                  </p>
                </div>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Copy converted values or CSS</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Click the copy button on individual values, use &quot;Copy All&quot; for all formats, or copy ready-to-use CSS declarations.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* GEO CONTENT SECTION 3: Detailed Explanations of HEX, RGB, HSL */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Understanding Color Formats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  What is HEX?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong>HEX (Hexadecimal)</strong> is a 6-character alphanumeric code representing Red, Green, and Blue intensity values in base-16 notation (e.g., <code>#FF5733</code>). It is the most common format in web design and CSS.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  What is RGB?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong>RGB (Red, Green, Blue)</strong> defines color by specifying intensity values from 0 to 255 for primary light channels (e.g., <code>rgb(255, 87, 51)</code>). It directly maps to digital monitor displays and hardware.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  What is HSL?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong>HSL (Hue, Saturation, Lightness)</strong> models colors based on human perception. Hue ranges from 0° to 360°, Saturation from 0% to 100%, and Lightness from 0% to 100% (e.g., <code>hsl(11, 100%, 60%)</code>).
                </p>
              </div>
            </div>
          </section>

          {/* GEO CONTENT SECTION 4: Which Color Format Should I Use? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Which Color Format Should I Use?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Choosing the right color format depends on your workflow requirements:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-slate-900">HEX:</strong> Ideal for standard CSS stylesheets, HTML code, design tokens, and quick copy-paste between Figma or Adobe XD and code.
              </li>
              <li className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-slate-900">RGB / RGBA:</strong> Best when working with canvas manipulation, programmatic image processing, or alpha transparency overlays in CSS.
              </li>
              <li className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-slate-900">HSL / HSLA:</strong> Perfect for creating consistent color schemes, hover states, lighter tints, and darker shades by easily tweaking lightness or saturation percentages.
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
                Private & Secure Processing
              </h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Colorvexa performs all color transformations client-side directly in your browser using mathematical algorithms. Your input values are never recorded or sent to remote servers.
            </p>
          </section>

          {/* INTERNAL LINKING SECTION */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Explore Related Color Tools on Colorvexa
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Enhance your creative workflow with our other free browser tools:
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

          {/* GEO FAQ SECTION */}
          <FAQ items={faqs} title="Color Converter FAQ" />

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
