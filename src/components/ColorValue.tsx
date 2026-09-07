"use client";

import { CopyButton } from "./CopyButton";

export interface ColorValueProps {
  label: string;
  value: string;
}

export function ColorValue({ label, value }: ColorValueProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono">
      <div className="flex items-center gap-2">
        <span className="font-sans font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
          {label}
        </span>
        <span className="text-slate-900 font-bold">{value}</span>
      </div>
      <CopyButton value={value} />
    </div>
  );
}
