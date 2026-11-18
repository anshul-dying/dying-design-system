import React from "react";
import { cn } from "../utils/cn";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  direction?: "row" | "row-reverse" | "col" | "col-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
  inline?: boolean;
}

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const directionClasses = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  col: "flex-col",
  "col-reverse": "flex-col-reverse",
};

const wrapClasses = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
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

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      as: Component = "div",
      className,
      direction = "row",
      align = "stretch",
      justify = "start",
      wrap = "nowrap",
      gap = "0",
      inline = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          inline ? "inline-flex" : "flex",
          directionClasses[direction],
          alignClasses[align],
          justifyClasses[justify],
          wrapClasses[wrap],
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Flex.displayName = "Flex";

export interface StackProps extends Omit<FlexProps, "direction"> {
  direction?: "col" | "row";
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ direction = "col", align = "stretch", gap = "4", className, children, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        direction={direction}
        align={align}
        gap={gap}
        className={className}
        {...props}
      >
        {children}
      </Flex>
    );
  }
);

Stack.displayName = "Stack";
