import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAbsoluteUrl, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Terms of Use — ${SITE_NAME}`,
  description:
    "Terms of Use for Colorvexa online color tools and design utilities.",
  alternates: {
    canonical: getAbsoluteUrl("/terms"),
  },
  openGraph: {
    title: `Terms of Use — ${SITE_NAME}`,
    description:
      "Terms of Use for Colorvexa online color tools and design utilities.",
    url: getAbsoluteUrl("/terms"),
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <Breadcrumbs items={[{ label: "Terms of Use" }]} />

          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight border-b border-slate-100 pb-4">
              Terms of Use
            </h1>
            <p className="text-xs text-slate-500 font-mono">Last updated: September 2024</p>

            <h2 className="text-xl font-bold text-slate-900 pt-2">1. Agreement to Terms</h2>
            <p>
              By accessing and using Colorvexa (https://colorvexa.vercel.app), you agree to be bound by these Terms of Use and all applicable laws and regulations.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-2">2. Free Online Service</h2>
            <p>
              Colorvexa provides free online color tools for personal and commercial use. No account creation or paid subscription is required to access our core utilities.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-2">3. Intellectual Property & License</h2>
            <p>
              All extracted color palettes, generated values, and exported codes created by you using Colorvexa belong entirely to you. You are free to use them in any personal or commercial design project.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-2">4. Disclaimer</h2>
            <p>
              The materials and tools on Colorvexa are provided on an &apos;as is&apos; basis. Colorvexa makes no warranties, expressed or implied, regarding accuracy or reliability for specific color reproduction.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
