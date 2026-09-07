import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Colorvexa — Get in Touch",
  description:
    "Have questions, suggestions, or feedback about Colorvexa? Get in touch with our team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
          <Breadcrumbs items={[{ label: "Contact Us" }]} />

          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
            <div className="space-y-3 border-b border-slate-100 pb-6">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Support & Inquiries
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Contact Colorvexa
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                Have questions, feature requests, or feedback? We would love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-slate-900">Email Contact</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For general inquiries or feedback regarding our color tools:
                </p>
                <a
                  href="mailto:support@colorvexa.com"
                  className="inline-block text-xs font-bold text-sky-600 hover:underline"
                >
                  support@colorvexa.com
                </a>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-slate-900">Feature Requests</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Looking for a specific color tool or export format? Send us your suggestions!
                </p>
                <a
                  href="mailto:feedback@colorvexa.com"
                  className="inline-block text-xs font-bold text-indigo-600 hover:underline"
                >
                  feedback@colorvexa.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
