import { Heart, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

export function Proof() {
  const t = useTranslations("proof");

  return (
    <Section tone="default">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
            <Heart className="h-7 w-7" aria-hidden />
          </div>
          <SectionHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("sub")} />
          <div className="mt-8">
            <Button asChild variant="ghost" size="md">
              <a href="#">
                {t("ctaStory")} <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
