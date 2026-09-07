"use client";

import { CopyButton } from "./CopyButton";

export interface ColorSwatchProps {
  hex: string;
  name?: string;
  rgb?: string;
  hsl?: string;
  showDetails?: boolean;
}

export function ColorSwatch({ hex, name, rgb, hsl, showDetails = true }: ColorSwatchProps) {
  return (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden hover:border-slate-300 hover:shadow-md transition-all">
      <div
        className="h-24 w-full relative transition-transform group-hover:scale-[1.02]"
        style={{ backgroundColor: hex }}
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton value={hex} label="HEX" />
        </div>
      </div>

      {showDetails && (
        <div className="p-3 flex flex-col justify-between gap-1 text-xs">
          <div className="font-mono font-bold text-slate-900 flex items-center justify-between">
            <span>{hex.toUpperCase()}</span>
            {name && <span className="font-sans font-normal text-slate-500 text-[11px]">{name}</span>}
          </div>
          {rgb && <div className="text-slate-500 font-mono text-[11px] truncate">{rgb}</div>}
          {hsl && <div className="text-slate-400 font-mono text-[10px] truncate">{hsl}</div>}
        </div>
      )}
    </div>
  );
}
