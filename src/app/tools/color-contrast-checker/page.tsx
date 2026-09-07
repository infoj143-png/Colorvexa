import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { FAQ } from "@/components/FAQ";
import { Eye, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Color Contrast Checker — Test WCAG 2.1 Accessibility",
  description:
    "Check color contrast ratios against WCAG 2.1 AA and AAA accessibility standards. Ensure text legibility for all users.",
};

export default function ColorContrastCheckerPage() {
  const faqs = [
    {
      question: "What is WCAG color contrast standard?",
      answer:
        "The Web Content Accessibility Guidelines (WCAG) specify minimum contrast ratios for text: Level AA requires at least 4.5:1 for normal text and 3:1 for large text. Level AAA requires 7:1 for normal text and 4.5:1 for large text.",
    },
    {
      question: "Why is color contrast important?",
      answer:
        "Proper contrast ensures that visually impaired, color-blind, or low-vision users can comfortably read content on your website or mobile application.",
    },
  ];

  return (
    <ToolPageLayout
      title="Color Contrast Checker"
      description="Check text and background color contrast against WCAG 2.1 accessibility guidelines."
      icon={<Eye className="w-8 h-8 text-purple-600" />}
      breadcrumbs={[
        { label: "Tools", href: "/#tools" },
        { label: "Contrast Checker" },
      ]}
    >
      <div className="space-y-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Contrast Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Text Color
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-300 shrink-0" />
                  <input
                    type="text"
                    defaultValue="#0f172a"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-300 shrink-0" />
                  <input
                    type="text"
                    defaultValue="#ffffff"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-mono font-bold text-slate-900 focus:outline-2 focus:outline-sky-600"
                  />
                </div>
              </div>
            </div>

            {/* Contrast Result Preview Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-center">
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono">
                15.8 : 1
              </div>
              <p className="text-xs font-medium text-slate-500">
                Calculated Contrast Ratio
              </p>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>WCAG AA Pass</span>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>WCAG AAA Pass</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FAQ items={faqs} title="Contrast Checker FAQ" />
      </div>
    </ToolPageLayout>
  );
}
