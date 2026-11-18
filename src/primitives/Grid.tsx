import React from "react";
import { cn } from "../utils/cn";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
}

const colClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-12",
};

const gapClasses = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ as: Component = "div", className, cols = 1, gap = "4", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("grid", colClasses[cols], gapClasses[gap], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = "Grid";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = "div", className, size = "xl", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("w-full mx-auto px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
