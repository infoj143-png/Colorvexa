import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAbsoluteUrl, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
  description:
    "Colorvexa Privacy Policy. Learn about our commitment to browser-first client-side processing and user data privacy.",
  alternates: {
    canonical: getAbsoluteUrl("/privacy"),
  },
  openGraph: {
    title: `Privacy Policy — ${SITE_NAME}`,
    description:
      "Colorvexa Privacy Policy. Learn about our commitment to browser-first client-side processing and user data privacy.",
    url: getAbsoluteUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight border-b border-slate-100 pb-4">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 font-mono">Last updated: September 2024</p>

            <p>
              At <strong>Colorvexa</strong>, accessible from https://colorvexa.com, one of our main priorities is the privacy of our visitors.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">Client-Side Local Image Processing</h2>
            <p>
              Colorvexa is designed as a browser-first application. When you select or drop an image into our tools (such as the Image Color Picker or Palette Generator), the image is rendered locally in your web browser using JavaScript and Canvas APIs.
            </p>
            <p className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-medium text-xs sm:text-sm">
              Your images are never transmitted to our web servers, stored on remote databases, or shared with any third parties.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">Log Files & Analytics</h2>
            <p>
              Like most websites, Colorvexa may collect standard log files for essential website performance monitoring and security. These logs may include IP addresses, browser types, Internet Service Providers (ISP), date/time stamps, and referring/exit pages. None of this data is linked to personally identifiable information.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">Cookies</h2>
            <p>
              Colorvexa uses minimal functional cookies strictly required for website operation and remembering user interface preferences.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">Contact Us</h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at support@colorvexa.com.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
