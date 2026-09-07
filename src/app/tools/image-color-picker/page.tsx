import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ImageUploader } from "@/components/ImageUploader";
import { EmptyState } from "@/components/EmptyState";
import { FAQ } from "@/components/FAQ";
import { Pipette, ShieldCheck, Zap, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Image Color Picker — Pick Any Color From Image Online",
  description:
    "Free online image color picker. Upload any picture and pick exact pixel colors in HEX, RGB, and HSL directly in your browser.",
};

export default function ImageColorPickerPage() {
  const faqs = [
    {
      question: "How does the Image Color Picker work?",
      answer:
        "Upload an image from your computer or phone. Colorvexa renders the image in an HTML5 canvas locally, allowing you to click or hover over any pixel to extract its precise color values.",
    },
    {
      question: "Is my uploaded image saved or stored?",
      answer:
        "No. Image processing happens entirely inside your local browser runtime. Your images are never transferred or stored on any server.",
    },
  ];

  return (
    <ToolPageLayout
      title="Image Color Picker"
      description="Pick any color directly from an image with pixel-level precision. Get instant HEX, RGB, and HSL codes for your designs."
      icon={<Pipette className="w-8 h-8 text-sky-600" />}
      breadcrumbs={[
        { label: "Tools", href: "/#tools" },
        { label: "Image Color Picker" },
      ]}
    >
      <div className="space-y-12">
        {/* Main Tool Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          {/* File Upload Area */}
          <div className="max-w-3xl mx-auto">
            <ImageUploader />
          </div>

          {/* Initial Clean State Container */}
          <EmptyState
            title="Upload an image to start picking colors"
            description="Once selected, your image will render locally with full zoom and pixel inspection controls."
          />

          {/* Tool Features Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Pixel-accurate eyedropper tool</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>100% Client-side privacy</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <Layers className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Instant HEX, RGB, HSL copy</span>
            </div>
          </div>
        </div>

        {/* Informational FAQ */}
        <FAQ items={faqs} title="Image Color Picker FAQ" />
      </div>
    </ToolPageLayout>
  );
}
