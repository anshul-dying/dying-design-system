import React, { ReactNode } from "react";
import { cn } from "../utils/cn";

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  kicker?: string;
  actionSlot?: ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, kicker, actionSlot, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border-subtle mb-8 select-none",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-1 min-w-0">
          {kicker && (
            <span className="text-xs font-semibold uppercase tracking-wider text-text-kicker">
              {kicker}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-tight truncate">
            {title}
          </h1>
        </div>

        {actionSlot && (
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            {actionSlot}
          </div>
        )}
      </div>
    );
  }
);

PageHeader.displayName = "PageHeader";
