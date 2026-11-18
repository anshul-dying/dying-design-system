import React from "react";
import { cn } from "../utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rounded" | "circle" | "text";
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "rounded", ...props }, ref) => {
    const variantStyles = {
      rounded: "rounded-xl",
      circle: "rounded-full",
      text: "rounded-md h-4 w-full",
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "animate-pulse bg-white/[0.06] border border-white/[0.04]",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionSlot?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, actionSlot, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-16 px-6 text-center rounded-2xl border border-dashed border-border-subtle bg-surface/40 select-none",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] border border-border-subtle text-text-secondary">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-bold text-text-primary tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-text-secondary max-w-sm">
            {description}
          </p>
        )}
        {actionSlot && <div className="mt-6">{actionSlot}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const alertStyles = {
  info: "bg-sky-500/10 border-sky-500/30 text-sky-200",
  success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-200",
  warning: "bg-amber-500/10 border-amber-500/30 text-amber-200",
  error: "bg-rose-500/10 border-rose-500/30 text-rose-200",
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, icon, onClose, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative flex w-full items-start gap-3 p-4 rounded-xl border backdrop-blur-md transition-all",
          alertStyles[variant],
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
        <div className="flex-1 min-w-0">
          {title && <h4 className="font-semibold text-sm leading-snug">{title}</h4>}
          <div className="text-xs text-text-secondary mt-0.5">{children}</div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close alert"
            className="shrink-0 text-text-secondary hover:text-white transition-colors p-1 rounded-lg"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";
