import React from "react";
import { cn } from "../../utils/cn";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  className,
  title,
  action,
  children,
  ...props
}) => {
  return (
    <div className={cn("px-2 py-2 select-none", className)}>
      {title && (
        <div className="flex items-center justify-between px-3 py-1 mb-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-kicker">
            {title}
          </span>
          {action && <div className="text-text-tertiary hover:text-white">{action}</div>}
        </div>
      )}
      <nav className="flex flex-col gap-0.5" {...props}>
        {children}
      </nav>
    </div>
  );
};

SidebarNav.displayName = "SidebarNav";

export interface SidebarNavItemProps {
  icon?: React.ReactNode;
  label: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon,
  label,
  active = false,
  badge,
  onClick,
  href,
  className,
  disabled = false,
}) => {
  const content = (
    <>
      {icon && (
        <span
          className={cn(
            "flex h-4 w-4 shrink-0 items-center justify-center transition-colors",
            active ? "text-white" : "text-text-secondary group-hover:text-white"
          )}
        >
          {icon}
        </span>
      )}
      <span className="truncate flex-1 text-xs">{label}</span>
      {badge && (
        <span
          className={cn(
            "ml-auto shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium",
            active
              ? "bg-white/15 text-white"
              : "bg-white/5 text-text-tertiary group-hover:text-white"
          )}
        >
          {badge}
        </span>
      )}
    </>
  );

  const baseClasses = cn(
    "group relative flex h-8 w-full items-center gap-2.5 rounded-lg px-3 text-xs font-medium transition-all duration-150 outline-none text-left select-none cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-1 focus-visible:ring-offset-sidebar",
    active
      ? "bg-surface-active text-text-primary shadow-sm"
      : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
    disabled && "cursor-not-allowed opacity-40 hover:bg-transparent hover:text-text-secondary",
    className
  );

  if (href && !disabled) {
    return (
      <a href={href} onClick={onClick} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {content}
    </button>
  );
};

SidebarNavItem.displayName = "SidebarNavItem";
