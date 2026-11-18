import React from "react";
import { Search, X, Music2 } from "lucide-react";
import { cn } from "../utils/cn";

/* -------------------------------------------------------------------------- */
/* SidebarBrand                                                               */
/* -------------------------------------------------------------------------- */

export interface SidebarBrandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  logo?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
}

export const SidebarBrand: React.FC<SidebarBrandProps> = ({
  className,
  logo = <Music2 className="h-5 w-5 text-white" />,
  title = "Music",
  subtitle,
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
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
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

/* -------------------------------------------------------------------------- */
/* SearchInput                                                                */
/* -------------------------------------------------------------------------- */

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  containerClassName?: string;
  shortcutBadge?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      containerClassName,
      value = "",
      onChange,
      onClear,
      placeholder = "Search",
      shortcutBadge,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("px-3 py-1.5", containerClassName)}>
        <div
          className={cn(
            "group relative flex h-8 w-full items-center gap-2 rounded-lg border border-border-subtle bg-surface px-2.5 transition-all duration-150",
            "focus-within:border-border-focus focus-within:ring-1 focus-within:ring-border-focus",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <Search className="h-3.5 w-3.5 shrink-0 text-text-tertiary transition-colors group-focus-within:text-white" />
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "h-full w-full bg-transparent text-xs text-text-primary placeholder:text-text-tertiary outline-none",
              className
            )}
            {...props}
          />
          {value ? (
            <button
              type="button"
              onClick={onClear}
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-text-tertiary hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          ) : shortcutBadge ? (
            <kbd className="pointer-events-none shrink-0 rounded border border-border-subtle bg-white/5 px-1 py-0.5 text-[9px] font-mono text-text-tertiary">
              {shortcutBadge}
            </kbd>
          ) : null}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

/* -------------------------------------------------------------------------- */
/* SidebarNav                                                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* SidebarNavItem                                                             */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* SidebarFooter                                                              */
/* -------------------------------------------------------------------------- */

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "mt-auto border-t border-border-subtle p-3 text-xs text-text-secondary select-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

SidebarFooter.displayName = "SidebarFooter";

/* -------------------------------------------------------------------------- */
/* Sidebar Container                                                          */
/* -------------------------------------------------------------------------- */

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "flex h-screen w-[240px] min-w-[240px] max-w-[240px] flex-col border-r border-border-subtle bg-sidebar text-text-primary select-none",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";
