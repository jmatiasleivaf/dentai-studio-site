import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  MapPin,
  MonitorPlay,
  GraduationCap,
  Mail,
  FolderOpen,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

/** Seção 7: o que a SuperClini entrega ao asociado. */
export function LoQueTeDamos() {
  const t = useTranslations("asociadosPage.support");

  const items = [
    { key: "portal", Icon: LayoutDashboard },
    { key: "zone", Icon: MapPin },
    { key: "demo", Icon: MonitorPlay },
    { key: "training", Icon: GraduationCap },
    { key: "email", Icon: Mail },
    { key: "kit", Icon: FolderOpen },
    { key: "technical", Icon: LifeBuoy },
    { key: "protection", Icon: ShieldCheck },
  ] as const;

  return (
    <Section tone="default">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, Icon }) => (
            <article
              key={key}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm dark:border-ink-800 dark:bg-ink-900"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-ink-950 dark:text-white">
                {t(`items.${key}.title` as never)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                {t(`items.${key}.body` as never)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
