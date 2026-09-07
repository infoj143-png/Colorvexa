import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAbsoluteUrl, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Disclaimer — ${SITE_NAME}`,
  description:
    "Disclaimer regarding color conversion accuracy, monitor calibration, and browser processing on Colorvexa.",
  alternates: {
    canonical: getAbsoluteUrl("/disclaimer"),
  },
  openGraph: {
    title: `Disclaimer — ${SITE_NAME}`,
    description:
      "Disclaimer regarding color conversion accuracy, monitor calibration, and browser processing on Colorvexa.",
    url: getAbsoluteUrl("/disclaimer"),
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <Breadcrumbs items={[{ label: "Disclaimer" }]} />

          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight border-b border-slate-100 pb-4">
              Disclaimer
            </h1>

            <p>
              The information and tools provided on Colorvexa are for general design, development, and educational purposes only.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-2">Color Accuracy & Monitor Display</h2>
            <p>
              Color perception on digital displays depends on display hardware, sRGB/Display-P3 profiles, screen brightness, operating system settings, and browser color management. Colorvexa does not guarantee 100% physical print-accurate color matching.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-2">Accessibility & WCAG Compliance</h2>
            <p>
              While our Color Contrast Checker provides automated mathematical checks based on WCAG 2.1 specifications, final accessibility compliance testing should include user testing and comprehensive screen reader evaluation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
