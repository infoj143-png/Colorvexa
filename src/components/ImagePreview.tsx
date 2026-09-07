"use client";

import { RefreshCw } from "lucide-react";

export interface ImagePreviewProps {
  src: string;
  alt?: string;
  onClear?: () => void;
  className?: string;
}

export function ImagePreview({ src, alt = "Uploaded Image Preview", onClear, className = "" }: ImagePreviewProps) {
  return (
    <div className={`relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md ${className}`}>
      {/* Action overlay */}
      {onClear && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <button
            onClick={onClear}
            type="button"
            className="flex items-center gap-1 text-xs font-medium bg-slate-900/80 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg backdrop-blur-xs border border-white/10 transition-colors shadow-xs"
            aria-label="Change Image"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Change Image</span>
          </button>
        </div>
      )}

      {/* Image Container */}
      <div className="flex items-center justify-center p-2 min-h-[250px] max-h-[500px]">
        {/* eslint-disable-next-html-element-suppression */}
        <img
          src={src}
          alt={alt}
          className="max-h-[480px] w-auto h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  );
}
