import { Image as ImageIcon, RefreshCw } from "lucide-react";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No image selected",
  description = "Upload an image above to start extracting colors and generating palettes locally in your browser.",
  icon,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl my-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-200/60 flex items-center justify-center text-slate-500 mb-4 shadow-xs">
        {icon || <ImageIcon className="w-7 h-7 text-slate-400" />}
      </div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          type="button"
          className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}
