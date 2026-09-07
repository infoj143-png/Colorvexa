"use client";

import { Download } from "lucide-react";

export interface DownloadButtonProps {
  onDownload: () => void;
  label?: string;
  format?: "PNG" | "JSON" | "CSS" | "SVG";
  className?: string;
}

export function DownloadButton({
  onDownload,
  label = "Export Palette",
  format,
  className = "",
}: DownloadButtonProps) {
  return (
    <button
      onClick={onDownload}
      type="button"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs ${className}`}
    >
      <Download className="w-4 h-4 text-sky-400" />
      <span>{label}</span>
      {format && (
        <span className="ml-1 text-[10px] font-mono uppercase bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
          {format}
        </span>
      )}
    </button>
  );
}
