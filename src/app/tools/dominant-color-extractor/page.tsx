import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ImageUploader } from "@/components/ImageUploader";
import { EmptyState } from "@/components/EmptyState";
import { FAQ } from "@/components/FAQ";
import { Layers, ShieldCheck, Zap, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Dominant Color Extractor — Find Prominent Image Colors",
  description:
    "Extract dominant colors from images online for free. Discover primary color distributions and color accents instantly in your browser.",
};

export default function DominantColorExtractorPage() {
  const faqs = [
    {
      question: "What is a dominant color extractor?",
      answer:
        "A dominant color extractor analyzes the frequency and distribution of colors in an image to identify the primary and secondary colors that define its visual palette.",
    },
    {
      question: "How fast is color extraction?",
      answer:
        "Extraction takes less than a second because computation runs locally in your browser using optimized Canvas API color quantizing algorithms.",
    },
  ];

  return (
    <ToolPageLayout
      title="Dominant Color Extractor"
      description="Extract the most prominent and dominant colors from any image instantly in your browser."
      icon={<Layers className="w-8 h-8 text-indigo-600" />}
      breadcrumbs={[
        { label: "Tools", href: "/#tools" },
        { label: "Dominant Color Extractor" },
      ]}
    >
      <div className="space-y-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="max-w-3xl mx-auto">
            <ImageUploader />
          </div>

          <EmptyState
            title="Upload an image to extract dominant colors"
            description="Select an image above to automatically compute color frequency clusters and dominant swatches."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Smart color frequency clustering</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Zero server upload or data storage</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>High-speed browser processing</span>
            </div>
          </div>
        </div>

        <FAQ items={faqs} title="Dominant Color Extractor FAQ" />
      </div>
    </ToolPageLayout>
  );
}
