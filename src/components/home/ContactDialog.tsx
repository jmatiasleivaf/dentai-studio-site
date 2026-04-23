"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactForm } from "@/components/forms/ContactForm";
import type { LEAD_INTERESSES } from "@/lib/lead-schema";

interface ContactDialogProps {
  /** O botão que abre o modal. Recebe um handler onClick. */
  trigger: (openProps: { onClick: () => void }) => React.ReactNode;
  defaultInteresse?: (typeof LEAD_INTERESSES)[number];
}

export function ContactDialog({ trigger, defaultInteresse }: ContactDialogProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("contact");

  return (
    <>
      {trigger({ onClick: () => setOpen(true) })}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("dialogTitle")}</DialogTitle>
            <DialogDescription>{t("dialogSubtitle")}</DialogDescription>
          </DialogHeader>
          <div className="pt-2">
            <ContactForm
              defaultInteresse={defaultInteresse}
              hideHeader
              onSuccess={() => {
                // Fecha após 3s para que o usuário veja o estado de sucesso.
                setTimeout(() => setOpen(false), 3000);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
