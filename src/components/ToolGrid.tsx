import { ReactNode } from "react";

export interface ToolGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function ToolGrid({ children, columns = 3 }: ToolGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return <div className={`grid gap-6 ${gridCols}`}>{children}</div>;
}
