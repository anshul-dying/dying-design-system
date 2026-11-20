import React from "react";
import { cn } from "../../utils/cn";
import { BrandLogo } from "../../components/BrandLogo";

export interface SidebarBrandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  logo?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
}

export const SidebarBrand: React.FC<SidebarBrandProps> = ({
  className,
  logo = <BrandLogo variant="app-icon" size={28} />,
  title = <BrandLogo variant="wordmark" size="sm" />,
  subtitle = "Streaming",
  badge,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 pt-5 pb-3 select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="shrink-0 flex items-center justify-center">
          {logo}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold tracking-tight text-text-primary">
              {title}
            </span>
            {badge && (
              <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/80">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <span className="truncate text-[11px] text-text-tertiary">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
};

SidebarBrand.displayName = "SidebarBrand";
