import Image from "next/image";
import { MessageSquare, Sparkles, Scan, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export function AISection() {
  const t = useTranslations("ai");

  return (
    <Section id="ai" tone="default">
      <Container>
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <WhatsAppCard />
          <SmileCard />
          <RadiographCard />
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <a href="#features">
              {t("ctaAll")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function WhatsAppCard() {
  const t = useTranslations("ai.cards.whatsapp");
  return (
    <article
      id="whatsapp"
      className="relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card-hover dark:border-ink-800 dark:bg-ink-900"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#128c7e]">
        <MessageSquare className="h-6 w-6 text-white" aria-hidden />
      </div>
      <h3 className="font-display text-lg font-bold leading-tight">{t("title")}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
        {t("desc")}
      </p>
      <div className="mt-5 space-y-2 rounded-2xl bg-ink-50 p-3 dark:bg-ink-800">
        <Bubble side="user">{t("examples.user1")}</Bubble>
        <Bubble side="bot">{t("examples.bot1")}</Bubble>
      </div>
    </article>
  );
}

function SmileCard() {
  const t = useTranslations("ai.cards.smile");
  return (
    <article className="relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card-hover dark:border-ink-800 dark:bg-ink-900">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500">
        <Sparkles className="h-6 w-6 text-white" aria-hidden />
      </div>
      <h3 className="font-display text-lg font-bold leading-tight">{t("title")}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
        {t("desc")}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-ink-100 dark:bg-ink-800">
          <Image
            src="/showcase/smile-antes.png"
            alt={t("before")}
            fill
            sizes="(min-width: 768px) 200px, 50vw"
            className="object-cover"
          />
          <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
            {t("before")}
          </span>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-ink-100 ring-2 ring-brand-400/50 dark:bg-ink-800">
          <Image
            src="/showcase/smile-depois.png"
            alt={t("after")}
            fill
            sizes="(min-width: 768px) 200px, 50vw"
            className="object-cover"
          />
          <span className="absolute bottom-2 left-2 rounded-md bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
            {t("after")}
          </span>
        </div>
      </div>
    </article>
  );
}

function RadiographCard() {
  const t = useTranslations("ai.cards.radiograph");
  return (
    <article className="relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card-hover dark:border-ink-800 dark:bg-ink-900">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500">
        <Scan className="h-6 w-6 text-white" aria-hidden />
      </div>
      <h3 className="font-display text-lg font-bold leading-tight">{t("title")}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
        {t("desc")}
      </p>
      <dl className="mt-5 space-y-2 text-sm">
        {(["caries", "lesions", "restorations"] as const).map((k, i) => (
          <div
            key={k}
            className="flex items-center justify-between rounded-xl bg-ink-50 px-3 py-2 dark:bg-ink-800"
          >
            <dt className="text-ink-600 dark:text-ink-400">{t(`metrics.${k}`)}</dt>
            <dd className="font-bold text-ink-900 dark:text-ink-50">
              {[3, 1, 5][i]}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function Bubble({ side, children }: { side: "bot" | "user"; children: React.ReactNode }) {
  return (
    <div className={`flex ${side === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={
          side === "user"
            ? "max-w-[85%] rounded-xl rounded-br-sm bg-brand-500 px-3 py-1.5 text-xs text-white"
            : "max-w-[85%] rounded-xl rounded-bl-sm bg-white px-3 py-1.5 text-xs text-ink-800 shadow-sm dark:bg-ink-700 dark:text-ink-100"
        }
      >
        {children}
      </div>
    </div>
  );
}
