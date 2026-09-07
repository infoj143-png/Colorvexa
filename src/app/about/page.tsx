import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShieldCheck, Globe, Cpu, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Colorvexa — Free Online Color & Palette Utilities",
  description:
    "Learn about Colorvexa: a free, privacy-first worldwide web platform for image color extraction, palette creation, and design utility tools.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <Breadcrumbs items={[{ label: "About Colorvexa" }]} />

          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
            <div className="space-y-4 border-b border-slate-100 pb-8">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Our Mission
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                About Colorvexa
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Colorvexa is a worldwide, free-to-use online tools website created for designers, developers, photographers, creators, marketers, and general users.
              </p>
            </div>

            <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                Our product vision is simple: <strong>Image → Colors → Palette → Color Codes → Design Utilities</strong>. We provide fast, responsive, and privacy-friendly utilities directly in your web browser.
              </p>

              <h2 className="text-xl font-bold text-slate-900 pt-4">Core Principles</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose pt-2">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Privacy First</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Browser-first processing means your images and files remain on your device and are never uploaded to remote servers.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Globe className="w-5 h-5 text-sky-600" />
                    <span>100% Free Worldwide</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    No signups, no subscriptions, and no paywalls. Professional tools accessible to everyone globally.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Cpu className="w-5 h-5 text-indigo-600" />
                    <span>Client-Side Speed</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Powered by modern HTML5 Canvas and JavaScript engine technology for instantaneous results with zero latency.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Heart className="w-5 h-5 text-rose-600" />
                    <span>Clean & Minimal</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Restrained visual styling so your extracted colors and design palettes remain the star of the show.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
