import React, { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "../utils/cn";

export interface MediaShelfProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  seeAllHref?: string;
  onSeeAll?: () => void;
  children: React.ReactNode;
}

export const MediaShelf = React.forwardRef<HTMLDivElement, MediaShelfProps>(
  ({ className, title, seeAllHref, onSeeAll, children, ...props }, ref) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const offset = direction === "left" ? -480 : 480;
        scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
      }
    };

    return (
      <section
        ref={ref}
        className={cn("w-full mb-10 select-none group/shelf", className)}
        {...props}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              {title}
            </h2>
            {(seeAllHref || onSeeAll) && (
              seeAllHref ? (
                <a
                  href={seeAllHref}
                  className="flex items-center text-xs sm:text-sm font-semibold text-text-tertiary hover:text-white transition-colors ml-2 group/link focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus rounded"
                >
                  <span>See All</span>
                  <ChevronRight size={16} className="transition-transform group-hover/link:translate-x-0.5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onSeeAll}
                  className="flex items-center text-xs sm:text-sm font-semibold text-text-tertiary hover:text-white transition-colors ml-2 group/link focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus rounded"
                >
                  <span>See All</span>
                  <ChevronRight size={16} className="transition-transform group-hover/link:translate-x-0.5" />
                </button>
              )
            )}
          </div>

          {/* Scroll navigation for desktop */}
          <div className="hidden md:flex items-center gap-1.5 opacity-0 group-hover/shelf:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="p-1.5 rounded-full bg-surface text-text-tertiary hover:text-white hover:bg-surface-hover border border-border-subtle transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="p-1.5 rounded-full bg-surface text-text-tertiary hover:text-white hover:bg-surface-hover border border-border-subtle transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-3 pt-1 px-1 snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
      </section>
    );
  }
);

MediaShelf.displayName = "MediaShelf";
