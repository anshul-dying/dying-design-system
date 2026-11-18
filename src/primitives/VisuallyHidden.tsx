import React from "react";
import { VisuallyHidden as RadixVisuallyHidden } from "radix-ui";

export interface VisuallyHiddenProps
  extends React.ComponentPropsWithoutRef<typeof RadixVisuallyHidden.Root> {
  children: React.ReactNode;
}

export const VisuallyHidden = React.forwardRef<
  React.ElementRef<typeof RadixVisuallyHidden.Root>,
  VisuallyHiddenProps
>(({ children, ...props }, ref) => {
  return (
    <RadixVisuallyHidden.Root ref={ref} {...props}>
      {children}
    </RadixVisuallyHidden.Root>
  );
});

VisuallyHidden.displayName = "VisuallyHidden";
