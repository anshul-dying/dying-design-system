import React from "react";
import { cn } from "../utils/cn";

/* -------------------------------------------------------------------------- */
/* BrandLogo Types                                                            */
/* -------------------------------------------------------------------------- */

export type BrandLogoVariant =
  | "mark"
  | "wordmark"
  | "full"
  | "app-icon"
  | "monochrome-tile";

export type BrandLogoSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

export type BrandLogoColor = "brand" | "monochrome" | "white" | "current";

export interface BrandLogoProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  variant?: BrandLogoVariant;
  size?: BrandLogoSize;
  color?: BrandLogoColor;
  showSubtitle?: boolean;
  subtitle?: string;
  badge?: React.ReactNode;
}

interface SizeConfig {
  iconSize: number;
  wordmarkClass: string;
  appIconSize: number;
  tileRadius: string;
  gap: string;
}

const SIZE_MAP: Record<"xs" | "sm" | "md" | "lg" | "xl", SizeConfig> = {
  xs: { iconSize: 16, wordmarkClass: "text-xs tracking-tight", appIconSize: 24, tileRadius: "rounded-md", gap: "gap-1.5" },
  sm: { iconSize: 20, wordmarkClass: "text-sm tracking-tight", appIconSize: 32, tileRadius: "rounded-lg", gap: "gap-2" },
  md: { iconSize: 28, wordmarkClass: "text-lg tracking-tight", appIconSize: 44, tileRadius: "rounded-xl", gap: "gap-2.5" },
  lg: { iconSize: 40, wordmarkClass: "text-2xl tracking-tight", appIconSize: 64, tileRadius: "rounded-2xl", gap: "gap-3" },
  xl: { iconSize: 56, wordmarkClass: "text-4xl tracking-tight", appIconSize: 88, tileRadius: "rounded-3xl", gap: "gap-4" },
};

/* -------------------------------------------------------------------------- */
/* BrandSymbolMark (SVG Icon)                                                */
/* -------------------------------------------------------------------------- */

export interface BrandSymbolMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  holeColor?: string;
}

export const BrandSymbolMark: React.FC<BrandSymbolMarkProps> = ({
  size = 28,
  className,
  holeColor,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0 select-none", className)}
      {...props}
    >
      {/* Outer stylized 'G' vinyl record arc */}
      <path
        d="M76 28.1 A34 34 0 1 0 84 50 L58 50"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner musical eighth-note head & turntable center label */}
      <circle cx="49.931" cy="49.834" r="10" fill="currentColor" />
      {/* Angled musical note stem */}
      <rect
        x="42.227"
        y="27.626"
        width="7.323"
        height="23"
        rx="4.5"
        fill="currentColor"
        transform="matrix(0.989099, 0.147252, -0.147252, 0.989099, 10.33844, 0.008403)"
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
      />
      {/* Vinyl record center hole with white outline */}
      <ellipse
        cx="49.868"
        cy="49.736"
        rx="4.881"
        ry="4.881"
        style={{
          fill: holeColor || "var(--color-brand-primary, #D6452B)",
          stroke: "currentColor",
          strokeWidth: 1,
        }}
      />
      {/* Musical note flag */}
      <rect
        x="40.383"
        y="16.779"
        width="7.003"
        height="13.969"
        rx="4.5"
        fill="currentColor"
        transform="matrix(-0.733636, 0.679543, -0.679543, -0.733636, 16.641211, 9.658047)"
        style={{ strokeWidth: 1, transformOrigin: "43.884px 23.762px" }}
      />
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/* BrandLogo Component                                                        */
/* -------------------------------------------------------------------------- */

export const BrandLogo = React.forwardRef<HTMLDivElement, BrandLogoProps>(
  (
    {
      variant = "mark",
      size = "md",
      color = "brand",
      showSubtitle = false,
      subtitle = "Music",
      badge,
      className,
      ...props
    },
    ref
  ) => {
    const isNamedSize = typeof size === "string" && size in SIZE_MAP;
    const sizeConfig = isNamedSize ? SIZE_MAP[size as keyof typeof SIZE_MAP] : SIZE_MAP.md;
    const numericIconSize = typeof size === "number" ? size : sizeConfig.iconSize;
    const numericAppIconSize = typeof size === "number" ? size : sizeConfig.appIconSize;

    const accentClass =
      color === "white"
        ? "text-white"
        : color === "monochrome"
        ? "text-text-primary"
        : color === "current"
        ? "text-current"
        : "text-brand-primary";

    if (variant === "mark") {
      return (
        <div
          ref={ref}
          role="img"
          aria-label="GaneGan logo mark"
          className={cn("inline-flex items-center justify-center shrink-0", accentClass, className)}
          {...props}
        >
          <BrandSymbolMark size={numericIconSize} holeColor="var(--color-canvas, #141416)" />
        </div>
      );
    }

    if (variant === "wordmark") {
      return (
        <div
          ref={ref}
          role="img"
          aria-label="GaneGan"
          className={cn("inline-flex flex-col select-none leading-none", className)}
          {...props}
        >
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "font-sans font-semibold text-text-primary tracking-tight",
                sizeConfig.wordmarkClass
              )}
            >
              <span className={accentClass}>G</span>ane
              <span className={accentClass}>G</span>an
            </span>
            {badge && <div className="shrink-0">{badge}</div>}
          </div>
          {showSubtitle && subtitle && (
            <span className="text-[11px] font-medium text-text-tertiary mt-0.5 tracking-normal">
              {subtitle}
            </span>
          )}
        </div>
      );
    }

    if (variant === "app-icon") {
      return (
        <div
          ref={ref}
          role="img"
          aria-label="GaneGan app icon"
          style={{ width: numericAppIconSize, height: numericAppIconSize }}
          className={cn(
            "relative inline-flex items-center justify-center shrink-0 select-none overflow-hidden",
            "bg-brand-primary text-white shadow-specular-inset",
            sizeConfig.tileRadius,
            className
          )}
          {...props}
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
          <BrandSymbolMark
            size={Math.round(numericAppIconSize * 0.62)}
            holeColor="var(--color-brand-primary, #D6452B)"
          />
        </div>
      );
    }

    if (variant === "monochrome-tile") {
      return (
        <div
          ref={ref}
          role="img"
          aria-label="GaneGan monochrome app icon"
          style={{ width: numericAppIconSize, height: numericAppIconSize }}
          className={cn(
            "relative inline-flex items-center justify-center shrink-0 select-none overflow-hidden",
            "bg-surface text-text-primary border border-border-subtle shadow-specular-inset backdrop-blur-md",
            sizeConfig.tileRadius,
            className
          )}
          {...props}
        >
          <BrandSymbolMark
            size={Math.round(numericAppIconSize * 0.62)}
            holeColor="var(--color-surface, #1e1e22)"
          />
        </div>
      );
    }

    // Full Lockup (Mark + Wordmark)
    return (
      <div
        ref={ref}
        role="img"
        aria-label="GaneGan"
        className={cn("inline-flex items-center select-none", sizeConfig.gap, className)}
        {...props}
      >
        <div className={cn("shrink-0", accentClass)}>
          <BrandSymbolMark size={numericIconSize} holeColor="var(--color-canvas, #141416)" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className={cn(
                "font-sans font-semibold text-text-primary tracking-tight truncate",
                sizeConfig.wordmarkClass
              )}
            >
              <span className={accentClass}>G</span>ane
              <span className={accentClass}>G</span>an
            </span>
            {badge && <div className="shrink-0">{badge}</div>}
          </div>
          {showSubtitle && subtitle && (
            <span className="text-[11px] font-medium text-text-tertiary truncate">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    );
  }
);

BrandLogo.displayName = "BrandLogo";
export const GaneGanLogo = BrandLogo;
