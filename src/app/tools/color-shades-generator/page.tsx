import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { FAQ } from "@/components/FAQ";
import { SlidersHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Shades & Tints Generator — Generate Color Variations",
  description:
    "Generate lighter tints and darker shades for any color code. Create clean step-by-step color scales for UI design.",
};

export default function ColorShadesGeneratorPage() {
  const faqs = [
    {
      question: "What is the difference between shades and tints?",
      answer:
        "A tint is created by adding white to a base color to make it lighter, while a shade is created by adding black to a base color to make it darker.",
    },
    {
      question: "How are shades and tints used in UI design?",
      answer:
        "Shades and tints help designers construct consistent design tokens for hover states, active states, backgrounds, borders, and disabled buttons.",
    },
  ];

  return (
    <ToolPageLayout
      title="Shades & Tints Generator"
      description="Generate lighter (tints) and darker (shades) step-by-step variations of any base color."
      icon={<SlidersHorizontal className="w-8 h-8 text-emerald-600" />}
      breadcrumbs={[
        { label: "Tools", href: "/#tools" },
        { label: "Shades & Tints Generator" },
      ]}
    >
      <div className="space-y-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 border border-slate-200 rounded-2xl">
              <div className="w-16 h-16 rounded-xl bg-sky-500 shadow-inner border border-slate-300 shrink-0" />
              <div className="w-full space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Base Color HEX
                </label>
                <input
                  type="text"
                  defaultValue="#0ea5e9"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                />
              </div>
            </div>

            {/* Scale Preview */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Generated Tints & Shades Scale
              </h3>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {[
                  { name: "100%", bg: "bg-sky-100", hex: "#e0f2fe" },
                  { name: "200%", bg: "bg-sky-200", hex: "#bae6fd" },
                  { name: "300%", bg: "bg-sky-300", hex: "#7dd3fc" },
                  { name: "400%", bg: "bg-sky-400", hex: "#38bdf8" },
                  { name: "500%", bg: "bg-sky-500", hex: "#0ea5e9" },
                  { name: "600%", bg: "bg-sky-600", hex: "#0284c7" },
                  { name: "700%", bg: "bg-sky-700", hex: "#0369a1" },
                  { name: "800%", bg: "bg-sky-800", hex: "#075985" },
                  { name: "900%", bg: "bg-sky-900", hex: "#0c4a6e" },
                  { name: "950%", bg: "bg-slate-950", hex: "#082f49" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 text-center">
                    <div className={`h-12 rounded-lg border border-slate-200 ${item.bg}`} />
                    <span className="text-[10px] font-mono text-slate-600 font-medium">{item.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <FAQ items={faqs} title="Shades & Tints FAQ" />
      </div>
    </ToolPageLayout>
  );
}
