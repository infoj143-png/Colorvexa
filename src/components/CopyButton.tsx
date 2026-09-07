"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

export function CopyButton({ value, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API fails
      const textArea = document.createElement("textarea");
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 transition-colors shadow-xs ${className}`}
      aria-label={`Copy ${label || value}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-700 font-semibold">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-slate-500" />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
