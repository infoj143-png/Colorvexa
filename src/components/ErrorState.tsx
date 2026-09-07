import { AlertTriangle, RefreshCw } from "lucide-react";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "An error occurred while processing your request. Please ensure your image is valid and try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-rose-50/80 border border-rose-200 rounded-2xl my-6">
      <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-rose-950">{title}</h3>
      <p className="mt-1 text-xs sm:text-sm text-rose-700 max-w-md leading-relaxed">
        {description}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-xl hover:bg-rose-700 transition-colors shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
