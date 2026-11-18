import React from "react";
import { cn } from "../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "accent" | "glass" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  dot?: boolean;
}

const variantStyles = {
  neutral: "bg-surface-active text-text-secondary border-border-subtle",
  accent: "bg-white text-black font-semibold border-white",
  glass: "bg-glass-frosted text-text-primary border-border-subtle backdrop-blur-md",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  error: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  info: "bg-sky-500/15 text-sky-400 border-sky-500/30",
};

const dotColors = {
  neutral: "bg-text-secondary",
  accent: "bg-black",
  glass: "bg-white",
  success: "bg-emerald-400",
  warning: "bg-amber-300",
  error: "bg-rose-400",
  info: "bg-sky-400",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-[11px] gap-1.5 rounded-md",
  md: "px-2.5 py-1 text-xs gap-1.5 rounded-lg",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "neutral",
      size = "sm",
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium border select-none leading-none tracking-wide",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotColors[variant])}
            aria-hidden="true"
          />
        )}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = "Badge";
