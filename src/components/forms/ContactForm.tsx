"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Check, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  contactFormSchema,
  type ContactFormValues,
  LEAD_PAISES,
  LEAD_TAMANHOS,
  LEAD_INTERESSES,
} from "@/lib/lead-schema";
import { useCountry } from "@/contexts/CountryContext";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "https://app.superclini.com";

type Status = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  /** Valor inicial para o campo "interesse" (ex.: "trial_profesional" via CTA específico) */
  defaultInteresse?: (typeof LEAD_INTERESSES)[number];
  /** Chamado quando o envio concluir com sucesso — usado pelo modal para fechar-se. */
  onSuccess?: () => void;
  /** Oculta o título/descrição interno (quando o form está num header próprio, ex.: modal). */
  hideHeader?: boolean;
}

export function ContactForm({ defaultInteresse, onSuccess, hideHeader }: ContactFormProps) {
  const t = useTranslations("contact");
  const tForm = useTranslations("contact.form");
  const tErr = useTranslations("contact.errors");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { country } = useCountry();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      clinica: "",
      pais: country.code as (typeof LEAD_PAISES)[number],
      tamanho: "",
      interesse: defaultInteresse ?? "",
      mensagem: "",
      consentimento: false as unknown as true, // validado via Zod
      website: "", // honeypot
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("submitting");
    setErrorMsg("");

    // Captura de atribuição — não vem do form
    const origemUrl = typeof document !== "undefined" ? document.referrer || undefined : undefined;
    const landingPath = typeof window !== "undefined" ? window.location.pathname : undefined;
    const utmSource = searchParams?.get("utm_source") ?? undefined;
    const utmMedium = searchParams?.get("utm_medium") ?? undefined;
    const utmCampaign = searchParams?.get("utm_campaign") ?? undefined;
    const utmContent = searchParams?.get("utm_content") ?? undefined;
    const utmTerm = searchParams?.get("utm_term") ?? undefined;

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          origemUrl,
          landingPath,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
        }),
      });

      if (response.status === 201 || response.status === 200) {
        setStatus("success");
        reset();
        onSuccess?.();
        return;
      }

      if (response.status === 422) {
        const json = await response.json().catch(() => null);
        setErrorMsg(json?.issues?.[0]?.message ?? tErr("invalid"));
      } else if (response.status === 429) {
        setErrorMsg(tErr("rateLimit"));
      } else {
        setErrorMsg(tErr("generic"));
      }
      setStatus("error");
    } catch {
      setErrorMsg(tErr("network"));
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
          <Check className="h-6 w-6 text-white" aria-hidden />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold text-emerald-900 dark:text-emerald-200">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">{t("successBody")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-emerald-700 underline dark:text-emerald-300"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
      aria-labelledby={hideHeader ? undefined : "contact-form-title"}
    >
      {!hideHeader ? (
        <div className="pb-2">
          <h2 id="contact-form-title" className="font-display text-2xl font-bold text-ink-900 dark:text-ink-50">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-ink-600 dark:text-ink-400">{t("subtitle")}</p>
        </div>
      ) : null}

      {/* Honeypot — invisible via inline CSS + aria-hidden + tabindex=-1 */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}
      >
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={tForm("name")} error={errors.nome && tErr(errors.nome.message ?? "required")}>
          <input
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            {...register("nome")}
            className={fieldClass}
          />
        </Field>

        <Field
          label={tForm("clinic")}
          hint={tForm("optional")}
          error={errors.clinica && tErr("tooLong")}
        >
          <input
            type="text"
            autoComplete="organization"
            enterKeyHint="next"
            {...register("clinica")}
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={tForm("email")} error={errors.email && tErr(errors.email.message ?? "email")}>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            enterKeyHint="next"
            {...register("email")}
            className={fieldClass}
          />
        </Field>

        <Field
          label={tForm("phone")}
          hint={tForm("phoneHint")}
          error={errors.telefone && tErr(errors.telefone.message ?? "tel")}
        >
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
            enterKeyHint="next"
            {...register("telefone")}
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label={tForm("country")}>
          <select {...register("pais")} className={fieldClass}>
            {LEAD_PAISES.map((code) => (
              <option key={code} value={code}>
                {tForm(`countries.${code}` as never)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={tForm("size")} hint={tForm("optional")}>
          <select {...register("tamanho")} className={fieldClass}>
            <option value="">{tForm("sizeAny")}</option>
            {LEAD_TAMANHOS.map((s) => (
              <option key={s} value={s}>
                {tForm(`sizes.${s}` as never)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={tForm("interest")} hint={tForm("optional")}>
          <select {...register("interesse")} className={fieldClass}>
            <option value="">{tForm("interestAny")}</option>
            {LEAD_INTERESSES.map((i) => (
              <option key={i} value={i}>
                {tForm(`interests.${i}` as never)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={tForm("message")} hint={tForm("optional")}>
        <textarea
          rows={4}
          maxLength={1000}
          {...register("mensagem")}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      <label className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-ink-50/50 p-4 dark:border-ink-800 dark:bg-ink-900/50">
        <input
          type="checkbox"
          {...register("consentimento")}
          className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-ink-300 text-brand-500 focus:ring-brand-400 dark:border-ink-700"
        />
        <span className="text-xs text-ink-600 dark:text-ink-400">
          {t.rich("consent", {
            link: (chunks) => (
              <a
                href={`/${locale}/privacidade`}
                target="_blank"
                className="font-semibold text-brand-600 underline hover:text-brand-700 dark:text-brand-400"
              >
                {chunks}
              </a>
            ),
          })}
        </span>
      </label>
      {errors.consentimento ? (
        <p className="text-xs text-rose-600 dark:text-rose-400">{tErr("consent")}</p>
      ) : null}

      {status === "error" && errorMsg ? (
        <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950/30">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-600 dark:text-rose-400" aria-hidden />
          <p className="text-sm text-rose-700 dark:text-rose-300">{errorMsg}</p>
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submit")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}

// ─── Subcomponentes ─────────────────────────────────────────────────────────

const fieldClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200/60 disabled:opacity-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50";

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-700 dark:text-ink-300">
          {label}
        </span>
        {hint ? <span className="text-[10px] text-ink-400">{hint}</span> : null}
      </span>
      {children}
      {error ? <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{error}</p> : null}
    </label>
  );
}
