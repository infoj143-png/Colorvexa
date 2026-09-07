import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ColorContrastChecker } from "@/components/ColorContrastChecker";
import { FAQ } from "@/components/FAQ";
import { ToolCard } from "@/components/ToolCard";
import { ToolGrid } from "@/components/ToolGrid";
import { getAbsoluteUrl, SITE_NAME } from "@/lib/site-config";
import {
  Eye,
  Pipette,
  Layers,
  Palette,
  RefreshCw,
  SlidersHorizontal,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Color Contrast Checker – WCAG Contrast Ratio Tool | Colorvexa",
  description:
    "Free online color contrast checker. Calculate WCAG 2.1 contrast ratios between text and background colors with AA and AAA accessibility compliance checks.",
  alternates: {
    canonical: getAbsoluteUrl("/tools/color-contrast-checker"),
  },
  openGraph: {
    title: "Color Contrast Checker – WCAG Contrast Ratio Tool | Colorvexa",
    description:
      "Check foreground and background color contrast against WCAG 2.1 guidelines with instant pass/fail feedback and realistic preview.",
    url: getAbsoluteUrl("/tools/color-contrast-checker"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Contrast Checker – WCAG Contrast Ratio Tool | Colorvexa",
    description:
      "Evaluate WCAG AA and AAA color contrast compliance instantly in your browser.",
  },
};

export default function ColorContrastCheckerPage() {
  const faqs = [
    {
      question: "What is a good color contrast ratio?",
      answer:
        "According to WCAG 2.1 guidelines, a contrast ratio of 4.5:1 or higher is recommended for normal text (AA level). A ratio of 7:1 or higher achieves the stricter AAA level.",
    },
    {
      question: "What contrast ratio does WCAG AA require?",
      answer:
        "WCAG 2.1 AA requires a minimum contrast ratio of 4.5:1 for normal body text and 3.0:1 for large text (18pt+ or 14pt+ bold) and essential UI components/icons.",
    },
    {
      question: "What contrast ratio does WCAG AAA require?",
      answer:
        "WCAG 2.1 AAA requires a minimum contrast ratio of 7.0:1 for normal text and 4.5:1 for large text.",
    },
    {
      question: "What is the difference between normal and large text?",
      answer:
        "In WCAG specifications, normal text is smaller than 18pt (approx 24px) or 14pt bold (approx 18.5px bold). Large text is defined as at least 18pt or 14pt bold.",
    },
    {
      question: "Can I check HEX colors?",
      answer:
        "Yes, Colorvexa supports HEX, RGB, and HSL color inputs for both foreground and background values, as well as native visual color pickers.",
    },
    {
      question: "Can I swap foreground and background colors?",
      answer:
        "Yes! Click the 'Swap Colors' button to instantly exchange the foreground and background colors. Mathematically, the contrast ratio remains identical.",
    },
    {
      question: "Does the tool work on mobile?",
      answer:
        "Yes, Colorvexa is fully responsive on mobile smartphones, tablets, laptops, and desktop computers.",
    },
    {
      question: "Is this a complete accessibility audit?",
      answer:
        "No. Colorvexa provides exact mathematical contrast ratio calculations based on WCAG 2.1 relative luminance algorithms. A comprehensive accessibility audit should also test screen readers, keyboard navigation, focus management, and semantic structure.",
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
      title: "Shades & Tints Generator",
      description: "Generate step-by-step lighter and darker variations of any base color.",
      href: "/tools/color-shades-generator",
      icon: SlidersHorizontal,
      iconBgColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
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
      "Free online color contrast checker tool. Calculate WCAG 2.1 contrast ratios and check AA and AAA compliance in your browser with 100% privacy.",
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
        description="Check text and background color contrast ratios against WCAG 2.1 AA & AAA guidelines with instant pass/fail evaluation and visual preview."
        icon={<Eye className="w-8 h-8 text-purple-600" />}
        breadcrumbs={[
          { label: "Tools", href: "/#tools" },
          { label: "Color Contrast Checker" },
        ]}
      >
        <div className="space-y-16">
          {/* Main Interactive Contrast Checker */}
          <ColorContrastChecker />

          {/* GEO CONTENT SECTION 1: What is a Color Contrast Checker? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              What is a Color Contrast Checker?
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              A <strong>color contrast checker</strong> is an accessibility testing tool that evaluates the luminance contrast between a foreground text or element color and its surrounding background surface. Sufficient color contrast ensures that digital text, buttons, and user interface icons remain legible and usable for people with visual impairments, low vision, or color blindness, as well as under bright sunlight or glare.
            </p>
          </section>

          {/* GEO CONTENT SECTION 2: How to Check Color Contrast */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              How to Check Color Contrast
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 list-none p-0">
              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-2">
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">1. Select Foreground Color</h3>
                <p className="text-xs text-slate-600">
                  Enter or pick the color used for text, icons, or UI element outlines.
                </p>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-2">
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">2. Select Background Color</h3>
                <p className="text-xs text-slate-600">
                  Enter or pick the color used for card surfaces, container backgrounds, or screen body.
                </p>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-2">
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">3. Review Contrast Ratio</h3>
                <p className="text-xs text-slate-600">
                  Colorvexa instantly computes the relative luminance ratio (from 1:1 up to 21:1).
                </p>
              </li>

              <li className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-2">
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">4. Check WCAG Compliance</h3>
                <p className="text-xs text-slate-600">
                  Check Pass/Fail indicators for Normal Text, Large Text, and UI components across AA and AAA levels.
                </p>
              </li>
            </ol>
          </section>

          {/* GEO CONTENT SECTION 3: What is Contrast Ratio? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              What is Contrast Ratio?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong>Contrast ratio</strong> is a numerical representation of the difference in perceived luminance between two colors. Ratios range from <strong>1:1</strong> (zero contrast, e.g. white text on white background) up to <strong>21:1</strong> (maximum contrast, e.g. black text on pure white background). Higher ratios correlate directly with improved visual legibility.
            </p>
          </section>

          {/* GEO CONTENT SECTION 4: What Do AA and AAA Mean? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              What Do WCAG AA and AAA Mean?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base">Level AA (Minimum Standard)</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Level AA is the widely accepted legal and industry standard for public web accessibility compliance. It requires a minimum contrast ratio of <strong>4.5:1</strong> for normal body text and <strong>3.0:1</strong> for large text and non-text UI components.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base">Level AAA (Enhanced Standard)</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Level AAA provides enhanced contrast suitable for specialized accessibility requirements. It requires a minimum ratio of <strong>7.0:1</strong> for normal text and <strong>4.5:1</strong> for large text.
                </p>
              </div>
            </div>
          </section>

          {/* GEO CONTENT SECTION 5: How is Contrast Ratio Calculated? */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              How is Contrast Ratio Calculated?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The standard WCAG 2.1 relative luminance calculation transforms non-linear sRGB values to linear RGB components:
            </p>
            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs space-y-2">
              <p>Relative Luminance (L) = 0.2126 × R_linear + 0.7152 × G_linear + 0.0722 × B_linear</p>
              <p>Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)  [where L1 is lighter and L2 is darker]</p>
            </div>
            <p className="text-xs text-slate-500 italic">
              Note: This tool provides contrast calculations and compliance checks based on WCAG formulas and does not constitute a full legal accessibility guarantee.
            </p>
          </section>

          {/* ACCESSIBILITY EXPLANATION & PRIVACY NOTICE */}
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
              All calculations run 100% locally inside your web browser. No color choices or accessibility logs are stored or sent across remote servers.
            </p>
          </section>

          {/* INTERNAL LINKING SECTION */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Explore Related Color Tools on Colorvexa
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Enhance your creative workflow with our suite of free browser tools:
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
                  href="/tools/color-shades-generator"
                  className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Color Shades Generator</span>
                </Link>
              </li>
            </ul>
          </section>

          {/* GEO FAQ SECTION */}
          <FAQ items={faqs} title="Color Contrast Checker FAQ" />

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
