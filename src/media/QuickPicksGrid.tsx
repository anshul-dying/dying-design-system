import React from "react";
import { cn } from "../utils/cn";

export interface QuickPicksGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export const QuickPicksGrid = React.forwardRef<HTMLDivElement, QuickPicksGridProps>(
  ({ columns = 4, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-x-6 gap-y-1 w-full",
          columns === 3
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

QuickPicksGrid.displayName = "QuickPicksGrid";

export interface QuickPicksColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const QuickPicksColumn = React.forwardRef<HTMLDivElement, QuickPicksColumnProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1 min-w-0 w-full", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

QuickPicksColumn.displayName = "QuickPicksColumn";
