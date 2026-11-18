import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MoodChip } from "./MoodChip";
import { cn } from "../utils/cn";

export interface MoodChipData {
  id: string;
  title?: string;
  label?: string;
  params?: string;
  isActive?: boolean;
}

export interface MoodChipBarProps extends React.HTMLAttributes<HTMLDivElement> {
  chips: MoodChipData[];
  activeId?: string | null;
  onSelectChip?: (chip: MoodChipData) => void;
  showScrollButtons?: boolean;
  className?: string;
}

export const MoodChipBar = React.forwardRef<HTMLDivElement, MoodChipBarProps>(
  (
    {
      chips = [],
      activeId,
      onSelectChip,
      showScrollButtons = false,
      className,
      ...props
    },
    ref
  ) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = () => {
      const el = scrollContainerRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    useEffect(() => {
      updateScrollState();
      const el = scrollContainerRef.current;
      if (!el) return;
      el.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
      return () => {
        el.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }, [chips]);

    const scrollByAmount = (amount: number) => {
      const el = scrollContainerRef.current;
      if (!el) return;
      el.scrollBy({ left: amount, behavior: "smooth" });
    };

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Mood and genre filters"
        className={cn("relative flex items-center w-full select-none py-1 group/chipbar", className)}
        {...props}
      >
        {/* Left Scroll Button */}
        {showScrollButtons && canScrollLeft && (
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByAmount(-240)}
            className="absolute left-0 z-10 hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-text-primary border border-border-subtle shadow-md backdrop-blur-md hover:bg-surface-hover hover:border-border-muted transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth w-full px-1 py-1"
        >
          {chips.map((chip) => {
            const isChipActive =
              activeId !== undefined
                ? activeId === chip.id
                : Boolean(chip.isActive);
            const chipLabel = chip.title || chip.label || chip.id;

            return (
              <MoodChip
                key={chip.id}
                label={chipLabel}
                active={isChipActive}
                onClick={() => onSelectChip?.(chip)}
              />
            );
          })}
        </div>

        {/* Right Scroll Button */}
        {showScrollButtons && canScrollRight && (
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByAmount(240)}
            className="absolute right-0 z-10 hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-text-primary border border-border-subtle shadow-md backdrop-blur-md hover:bg-surface-hover hover:border-border-muted transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    );
  }
);

MoodChipBar.displayName = "MoodChipBar";
