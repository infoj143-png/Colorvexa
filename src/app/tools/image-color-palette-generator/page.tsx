import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ImageUploader } from "@/components/ImageUploader";
import { EmptyState } from "@/components/EmptyState";
import { FAQ } from "@/components/FAQ";
import { Palette, Download, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Image Color Palette Generator — Generate Palettes From Photos",
  description:
    "Automatically generate beautiful color palettes from any photo or graphic. Export color palettes in HEX, RGB, and CSS formats.",
};

export default function ImageColorPaletteGeneratorPage() {
  const faqs = [
    {
      question: "How are palettes generated from an image?",
      answer:
        "Colorvexa calculates spatial and perceptual color variations across the image pixels to form a harmonious 5 to 10 color design palette.",
    },
    {
      question: "Can I export my generated palette?",
      answer:
        "Yes, generated palettes can be exported directly as CSS variables, JSON, or image swatch files.",
    },
  ];

  return (
    <ToolPageLayout
      title="Image Color Palette Generator"
      description="Automatically generate a balanced, beautiful color palette from any uploaded image."
      icon={<Palette className="w-8 h-8 text-rose-600" />}
      breadcrumbs={[
        { label: "Tools", href: "/#tools" },
        { label: "Image Palette Generator" },
      ]}
    >
      <div className="space-y-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="max-w-3xl mx-auto">
            <ImageUploader />
          </div>

          <EmptyState
            title="Upload an image to generate a color palette"
            description="Your image will be analyzed locally to produce a cohesive, downloadable color scheme."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Harmonious color distribution</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <Download className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Multi-format palette export</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Private client-side processing</span>
            </div>
          </div>
        </div>

        <FAQ items={faqs} title="Palette Generator FAQ" />
      </div>
    </ToolPageLayout>
  );
}
