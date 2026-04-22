"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-gradient text-white shadow-brand hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-12px_rgba(14,165,233,0.6)]",
        secondary:
          "bg-white text-ink-900 ring-1 ring-ink-200 hover:ring-brand-400 hover:text-brand-600 dark:bg-ink-900 dark:text-ink-50 dark:ring-ink-700 dark:hover:ring-brand-400",
        outline:
          "border-2 border-ink-200 bg-transparent text-ink-900 hover:border-brand-400 hover:text-brand-600 dark:border-ink-700 dark:text-ink-50 dark:hover:border-brand-400",
        ghost:
          "bg-transparent text-ink-600 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50",
        whatsapp:
          "bg-[#25D366] text-white shadow-[0_10px_40px_-12px_rgba(37,211,102,0.5)] hover:-translate-y-0.5",
        dark:
          "bg-ink-900 text-white hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-ink-200",
        link:
          "bg-transparent text-brand-600 underline-offset-4 hover:underline dark:text-brand-400",
      },
      size: {
        sm: "min-h-touch px-4 text-sm",
        md: "min-h-touch-md px-6 text-sm",
        lg: "min-h-touch-lg px-8 text-base",
        icon: "h-touch-md w-touch-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
