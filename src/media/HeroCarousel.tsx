import React from "react";
import { cn } from "../utils/cn";

export interface HeroCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const HeroCarousel = React.forwardRef<HTMLDivElement, HeroCarouselProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mb-10 select-none",
          className
        )}
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {children}
        </div>
      </div>
    );
  }
);

HeroCarousel.displayName = "HeroCarousel";
