import React from "react";
import { Avatar as RadixAvatar } from "radix-ui";
import { cn } from "../utils/cn";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Root> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export const Avatar = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Root>,
  AvatarProps
>(
  (
    {
      className,
      src,
      alt = "Avatar",
      fallback,
      size = "md",
      ...props
    },
    ref
  ) => {
    return (
      <RadixAvatar.Root
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full border border-border-subtle bg-surface-active select-none",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src && (
          <RadixAvatar.Image
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
          />
        )}
        <RadixAvatar.Fallback
          className="flex h-full w-full items-center justify-center font-semibold text-text-secondary uppercase"
          delayMs={600}
        >
          {fallback || (alt ? alt.slice(0, 2) : "♪")}
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
    );
  }
);

Avatar.displayName = "Avatar";
