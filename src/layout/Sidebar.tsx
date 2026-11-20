import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../utils/cn";

export {
  SidebarBrand,
  type SidebarBrandProps,
} from "./sidebar/SidebarBrand";

export {
  SidebarNav,
  type SidebarNavProps,
  SidebarNavItem,
  type SidebarNavItemProps,
} from "./sidebar/SidebarNav";

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
