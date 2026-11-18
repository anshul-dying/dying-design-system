import React from "react";
import { Checkbox as RadixCheckbox, Switch as RadixSwitch } from "radix-ui";
import { Check } from "lucide-react";
import { cn } from "../utils/cn";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label?: string;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ className, label, id, disabled, ...props }, ref) => {
  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <RadixCheckbox.Root
        ref={ref}
        id={id}
        disabled={disabled}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-md border border-border-subtle bg-surface",
          "transition-all duration-150 outline-none cursor-pointer",
          "focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          "data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-black",
          disabled && "cursor-not-allowed opacity-40",
          className
        )}
        {...props}
      >
        <RadixCheckbox.Indicator className="flex items-center justify-center text-current">
          <Check className="h-3.5 w-3.5 stroke-[3]" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-text-primary cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-40"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: string;
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(({ className, label, id, disabled, ...props }, ref) => {
  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <RadixSwitch.Root
        ref={ref}
        id={id}
        disabled={disabled}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border-subtle bg-surface-active",
          "transition-colors duration-200 outline-none",
          "focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          "data-[state=checked]:bg-white data-[state=checked]:border-white",
          disabled && "cursor-not-allowed opacity-40",
          className
        )}
        {...props}
      >
        <RadixSwitch.Thumb
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-text-secondary shadow-lg ring-0 transition-transform duration-200",
            "data-[state=checked]:translate-x-5 data-[state=checked]:bg-black",
            "data-[state=unchecked]:translate-x-1"
          )}
        />
      </RadixSwitch.Root>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-primary cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-40"
        >
          {label}
        </label>
      )}
    </div>
  );
});

Switch.displayName = "Switch";
