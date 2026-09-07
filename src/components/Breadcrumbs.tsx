import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 flex-wrap">
        <li>
          <Link href="/" className="flex items-center hover:text-slate-800 transition-colors">
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {item.href ? (
              <Link href={item.href} className="hover:text-slate-800 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-slate-900" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
