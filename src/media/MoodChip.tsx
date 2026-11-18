import React from "react";
import { cn } from "../utils/cn";

export interface MoodChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const MoodChip = React.forwardRef<HTMLButtonElement, MoodChipProps>(
  ({ label, active = false, onClick, className, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-pressed={active}
        className={cn(
          "relative inline-flex items-center justify-center shrink-0 select-none whitespace-nowrap",
          "h-9 px-4 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          "active:scale-95 disabled:cursor-not-allowed disabled:opacity-40",
          active
            ? "bg-white text-black font-semibold border border-white shadow-md shadow-white/10"
            : "bg-surface text-text-primary border border-border-subtle hover:bg-surface-hover hover:border-border-muted backdrop-blur-md",
          className
        )}
        {...props}
      >
        {label}
      </button>
    );
  }
);

MoodChip.displayName = "MoodChip";
