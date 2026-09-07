import { Loader2 } from "lucide-react";

export interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Processing image locally in browser..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 rounded-2xl my-6">
      <Loader2 className="w-8 h-8 text-sky-600 animate-spin mb-3" />
      <p className="text-sm font-semibold text-slate-900">{message}</p>
      <p className="text-xs text-slate-500 mt-1">100% Client-side. Your image is never uploaded to any server.</p>
    </div>
  );
}
