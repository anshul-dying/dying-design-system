import React from "react";
import { cn } from "../utils/cn";

export interface OledBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  grain?: boolean;
}

export const OledBase = React.forwardRef<HTMLDivElement, OledBaseProps>(
  ({ className, children, grain = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative min-h-screen w-full bg-canvas text-text-primary antialiased selection:bg-white/20 selection:text-white",
          grain && "before:pointer-events-none before:fixed before:inset-0 before:z-50 before:opacity-[0.015] before:bg-repeat before:bg-[radial-gradient(#fff_1px,transparent_1px)] before:[background-size:16px_16px]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

OledBase.displayName = "OledBase";
