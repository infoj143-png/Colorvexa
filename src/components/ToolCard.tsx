import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

export interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  iconBgColor?: string;
}

export function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  badge,
  iconBgColor = "bg-sky-50 text-sky-600 border-sky-100",
}: ToolCardProps) {
  return (
    <div className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${iconBgColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
          <Link href={href} className="focus:outline-hidden">
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-sm font-semibold text-sky-600 group-hover:text-sky-700">
        <span>Open Tool</span>
        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}
