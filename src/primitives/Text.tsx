import React from "react";
import { cn } from "../utils/cn";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: "primary" | "secondary" | "tertiary" | "kicker" | "muted" | "accent";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  truncate?: boolean;
}

const variantClasses = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  tertiary: "text-text-tertiary",
  kicker: "text-text-kicker uppercase tracking-wider font-semibold",
  muted: "text-text-secondary/70",
  accent: "text-white font-medium",
};

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = "span",
      className,
      variant = "primary",
      size = "base",
      weight,
      truncate = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          variantClasses[variant],
          sizeClasses[size],
          weight && weightClasses[weight],
          truncate && "truncate block",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  tracking?: "tight" | "normal" | "wide";
  truncate?: boolean;
}

const levelElements: Record<number, "h1" | "h2" | "h3" | "h4" | "h5" | "h6"> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

const headingSizes = {
  h1: "text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight",
  h2: "text-2xl sm:text-3xl font-bold leading-tight",
  h3: "text-xl sm:text-2xl font-bold leading-snug",
  h4: "text-lg sm:text-xl font-semibold leading-snug",
  h5: "text-base sm:text-lg font-semibold leading-normal",
  h6: "text-sm sm:text-base font-semibold leading-normal",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as,
      level = 2,
      size,
      tracking = "tight",
      truncate = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || levelElements[level] || "h2";
    const resolvedSize = size || `h${level}` as keyof typeof headingSizes;

    return (
      <Component
        ref={ref}
        className={cn(
          "text-text-primary",
          headingSizes[resolvedSize],
          tracking === "tight" ? "tracking-tight" : tracking === "wide" ? "tracking-wider" : "",
          truncate && "truncate block",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";
