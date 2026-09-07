import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { FAQ } from "@/components/FAQ";
import { RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Color Converter — Convert HEX, RGB & HSL Online",
  description:
    "Free online color converter tool. Convert between HEX, RGB, and HSL color values with instant 1-click copying.",
};

export default function ColorConverterPage() {
  const faqs = [
    {
      question: "What color formats are supported?",
      answer:
        "Colorvexa supports HEX (#RRGGBB), RGB (rgb(r, g, b)), and HSL (hsl(h, s%, l%)) format conversions.",
    },
    {
      question: "Are color conversions exact?",
      answer:
        "Yes, mathematical color transformation formulas ensure precise lossless conversions between HEX, RGB, and HSL formats.",
    },
  ];

  return (
    <ToolPageLayout
      title="Color Converter"
      description="Convert seamlessly between HEX, RGB, and HSL color representations with copy features."
      icon={<RefreshCw className="w-8 h-8 text-amber-600" />}
      breadcrumbs={[
        { label: "Tools", href: "/#tools" },
        { label: "Color Converter" },
      ]}
    >
      <div className="space-y-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-sm text-slate-600 text-center">
              Enter any HEX code, RGB numbers, or HSL values to convert across all formats in real time.
            </p>

            <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  HEX Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="#0ea5e9"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    RGB Values
                  </label>
                  <input
                    type="text"
                    defaultValue="rgb(14, 165, 233)"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                    placeholder="rgb(0, 0, 0)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    HSL Values
                  </label>
                  <input
                    type="text"
                    defaultValue="hsl(199, 89%, 48%)"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                    placeholder="hsl(0, 0%, 0%)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <FAQ items={faqs} title="Color Converter FAQ" />
      </div>
    </ToolPageLayout>
  );
}
