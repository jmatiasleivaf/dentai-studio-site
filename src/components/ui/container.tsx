import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  size = "xl",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "md" | "lg" | "xl" | "full";
}) {
  const sizeMap = {
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
    full: "max-w-[1400px]",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
