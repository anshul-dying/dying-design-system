import React from "react";
import { cn } from "../../utils/cn";
import { FullPlayerTab } from "./types";

export interface FullPlayerTabsHeaderProps {
  activeTab: FullPlayerTab;
  onTabClick: (tab: FullPlayerTab) => void;
}

export const FullPlayerTabsHeader: React.FC<FullPlayerTabsHeaderProps> = ({
  activeTab,
  onTabClick,
}) => {
  return (
    <div className="flex items-center border-b border-border-subtle shrink-0 mb-4 px-2">
      <button
        type="button"
        onClick={() => onTabClick("upNext")}
        className={cn(
          "relative pb-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
          activeTab === "upNext"
            ? "text-white"
            : "text-text-tertiary hover:text-text-primary"
        )}
      >
        UP NEXT
        {activeTab === "upNext" && (
          <div className="absolute bottom-0 inset-x-2 h-0.5 bg-white rounded-full" />
        )}
      </button>

      <button
        type="button"
        onClick={() => onTabClick("lyrics")}
        className={cn(
          "relative pb-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
          activeTab === "lyrics"
            ? "text-white"
            : "text-text-tertiary hover:text-text-primary"
        )}
      >
        LYRICS
        {activeTab === "lyrics" && (
          <div className="absolute bottom-0 inset-x-2 h-0.5 bg-white rounded-full" />
        )}
      </button>

      <button
        type="button"
        onClick={() => onTabClick("related")}
        className={cn(
          "relative pb-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
          activeTab === "related"
            ? "text-white"
            : "text-text-tertiary hover:text-text-primary"
        )}
      >
        RELATED
        {activeTab === "related" && (
          <div className="absolute bottom-0 inset-x-2 h-0.5 bg-white rounded-full" />
        )}
      </button>
    </div>
  );
};

FullPlayerTabsHeader.displayName = "FullPlayerTabsHeader";
