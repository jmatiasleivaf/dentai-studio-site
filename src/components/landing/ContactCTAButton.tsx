"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/home/ContactDialog";
import type { LEAD_INTERESSES } from "@/lib/lead-schema";

/**
 * Wrapper Client Component que abre o ContactDialog ao clicar.
 *
 * Existe porque o ContactDialog usa render-prop `trigger` (função), e funções
 * não podem ser passadas de Server Component para Client Component (erro RSC).
 * Server pages (landings) usam este wrapper passando children + props simples.
 */
type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp" | "dark" | "link";
type Size = "sm" | "md" | "lg" | "icon";

export function ContactCTAButton({
  children,
  defaultInteresse,
  variant = "primary",
  size = "lg",
  className,
}: {
  children: React.ReactNode;
  defaultInteresse?: (typeof LEAD_INTERESSES)[number];
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <ContactDialog
      defaultInteresse={defaultInteresse}
      trigger={({ onClick }) => (
        <Button onClick={onClick} variant={variant} size={size} className={className}>
          {children}
        </Button>
      )}
    />
  );
}
