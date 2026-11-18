import React from "react";
import { cn } from "../utils/cn";

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children?: React.ReactNode;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component ref={ref} className={cn(className)} {...props}>
        {children}
      </Component>
    );
  }
);

Box.displayName = "Box";
