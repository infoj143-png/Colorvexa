import { ReactNode } from "react";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";
import { Header } from "./Header";
import { Footer } from "./Footer";

export interface ToolPageLayoutProps {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
  icon?: ReactNode;
}

export function ToolPageLayout({
  title,
  description,
  breadcrumbs,
  children,
  icon,
}: ToolPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Tool Page Header */}
        <div className="bg-white border-b border-slate-200 py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="flex items-start gap-4">
              {icon && (
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 shrink-0 hidden sm:block">
                  {icon}
                </div>
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {title}
                </h1>
                <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Interactive Area / Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
