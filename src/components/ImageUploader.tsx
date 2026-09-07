"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";

export interface ImageUploaderProps {
  onImageSelected?: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function ImageUploader({
  onImageSelected,
  accept = "image/jpeg,image/png,image/webp,image/svg+xml",
  maxSizeMB = 10,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setErrorMessage(null);
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload a valid image file (PNG, JPG, WebP, SVG).");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMessage(`File size exceeds the ${maxSizeMB}MB limit.`);
      return;
    }
    if (onImageSelected) {
      onImageSelected(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
          isDragging
            ? "border-sky-500 bg-sky-50/50 scale-[0.99]"
            : "border-slate-300 hover:border-slate-400 bg-white shadow-xs"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-4">
          {isDragging ? <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-sky-600" /> : <Upload className="w-6 h-6 sm:w-8 sm:h-8" />}
        </div>

        <p className="text-base sm:text-lg font-semibold text-slate-900">
          Drop your image here, or <span className="text-sky-600 underline underline-offset-2">browse</span>
        </p>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Supports PNG, JPG, WebP, SVG up to {maxSizeMB}MB
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Processed 100% locally in browser</span>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-3 flex items-center gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
