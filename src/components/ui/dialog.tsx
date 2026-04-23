"use client";

import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Wrapper mínimo do Radix Dialog alinhado com a identidade visual do site.
// Reutilizado pelo <ContactDialog> e potencialmente por outros modais.

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;
export const DialogPortal = RadixDialog.Portal;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => (
  <RadixDialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out data-[state=open]:fade-in",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
    hideClose?: boolean;
  }
>(({ className, children, hideClose, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <RadixDialog.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-xl",
        "-translate-x-1/2 -translate-y-1/2",
        "rounded-3xl border border-ink-100 bg-white p-6 shadow-2xl",
        "dark:border-ink-800 dark:bg-ink-900",
        "max-h-[calc(100dvh-2rem)] overflow-y-auto",
        "focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
      {hideClose ? null : (
        <RadixDialog.Close
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-ink-50"
          aria-label="Close"
        >
          <X className="h-5 w-5" aria-hidden />
        </RadixDialog.Close>
      )}
    </RadixDialog.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 pb-4", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.ComponentProps<typeof RadixDialog.Title>) {
  return (
    <RadixDialog.Title
      className={cn("font-display text-xl font-bold text-ink-900 dark:text-ink-50", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof RadixDialog.Description>) {
  return (
    <RadixDialog.Description
      className={cn("text-sm text-ink-600 dark:text-ink-400", className)}
      {...props}
    />
  );
}
