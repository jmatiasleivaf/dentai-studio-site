"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Check, Loader2, AlertCircle, ArrowRight, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signupSchema, type SignupFormValues, SIGNUP_PAISES } from "@/lib/signup-schema";
import { useCountry } from "@/contexts/CountryContext";
import { useConsent } from "@/contexts/ConsentContext";
import { forTransmission } from "@/lib/attribution";
import { CONSENT_POLICY_VERSION } from "@/lib/consent";
import { COUNTRIES, type CountryCode } from "@/lib/countries";

/**
 * Cadastro self-service com trial de 14 dias, sem cartão.
 *
 * Vive no site e não no app de propósito: é aqui que o envelope de atribuição
 * do primeiro toque está em memória. Se o formulário estivesse em
 * app.superclini.com, outro domínio, a conta nasceria sem origem, e a
 * pergunta "que campanha trouxe esta clínica" voltaria a não ter resposta.
 * O POST é cross-origin, com a mesma whitelist de CORS já usada pelo
 * formulário de contato.
 */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "https://app.superclini.com";

const fieldClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 disabled:opacity-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50 dark:hover:border-ink-600 dark:focus:ring-brand-900/50";

type Status = "idle" | "submitting" | "success" | "error";

export function SignupForm() {
  const t = useTranslations("signup");
  const tForm = useTranslations("signup.form");
  const tErr = useTranslations("signup.errors");
  const locale = useLocale() as "es" | "pt" | "en";
  const { country } = useCountry();
  const { attribution, consent } = useConsent();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nomeClinica: "",
      nomeAdmin: "",
      email: "",
      telefone: "",
      pais: country.code as (typeof SIGNUP_PAISES)[number],
      consentimento: false as unknown as true,
      website: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setStatus("submitting");
    setErrorMsg("");

    // gclid/fbclid só seguem com consentimento de marketing.
    const envelope = forTransmission(attribution, consent);

    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          atribuicao: envelope,
          consentPolicyVersion: CONSENT_POLICY_VERSION,
          consentMarketing: consent?.marketing ?? false,
        }),
      });

      if (response.status === 201 || response.status === 200) {
        setStatus("success");
        return;
      }

      const json = await response.json().catch(() => null);
      if (response.status === 409) {
        setErrorMsg(tErr("emailTaken"));
      } else if (response.status === 422) {
        setErrorMsg(json?.error === "disposable_email" ? tErr("disposableEmail") : tErr("invalid"));
      } else if (response.status === 429) {
        setErrorMsg(tErr("rateLimit"));
      } else if (response.status === 503) {
        setErrorMsg(tErr("unavailable"));
      } else {
        setErrorMsg(tErr("generic"));
      }
      setStatus("error");
    } catch {
      setErrorMsg(tErr("network"));
      setStatus("error");
    }
  };

  // Sucesso: o próximo passo é o EMAIL, não o login. Quem acabou de se
  // cadastrar ainda não tem senha, mandar para /login aqui seria um beco.
  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/40">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
          <MailCheck className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-emerald-900 dark:text-emerald-200">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-emerald-700 dark:text-emerald-300">
          {t("successBody")}
        </p>
        <p className="mt-4 text-xs text-emerald-600 dark:text-emerald-400">{t("successHint")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot: invisível ao humano, tabbable só por bot. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}
      >
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <Field label={tForm("clinicName")} required error={errors.nomeClinica && tErr("required")}>
        <input
          type="text"
          autoComplete="organization"
          placeholder={tForm("clinicNamePlaceholder")}
          className={fieldClass}
          {...register("nomeClinica")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={tForm("yourName")} required error={errors.nomeAdmin && tErr("required")}>
          <input
            type="text"
            autoComplete="name"
            className={fieldClass}
            {...register("nomeAdmin")}
          />
        </Field>

        <Field label={tForm("country")} required>
          <select className={fieldClass} {...register("pais")}>
            {SIGNUP_PAISES.map((code) => (
              <option key={code} value={code}>
                {COUNTRIES[code as CountryCode]?.name[locale] ?? code}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label={tForm("email")}
        required
        hint={tForm("emailHint")}
        error={errors.email && tErr(errors.email.message ?? "required")}
      >
        <input
          type="email"
          autoComplete="email"
          inputMode="email"
          className={fieldClass}
          {...register("email")}
        />
      </Field>

      <Field label={tForm("phone")} hint={tForm("optional")}>
        <input
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={fieldClass}
          {...register("telefone")}
        />
      </Field>

      <label className="flex min-h-touch cursor-pointer items-start gap-3 pt-1">
        <input
          type="checkbox"
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-400 dark:border-ink-600 dark:bg-ink-900"
          {...register("consentimento")}
        />
        <span className="text-xs leading-relaxed text-ink-600 dark:text-ink-400">
          {t("consent")}
        </span>
      </label>
      {errors.consentimento ? (
        <p className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {tErr("consentRequired")}
        </p>
      ) : null}

      {status === "error" && errorMsg ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{errorMsg}</span>
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full bg-brand-gradient text-white shadow-brand hover:opacity-95"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            {tForm("submitting")}
          </>
        ) : (
          <>
            {tForm("submit")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-500 dark:text-ink-400">
        <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
        {t("noCard")}
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-700 dark:text-ink-300">
          {label}
          {required ? (
            <span className="ml-0.5 text-rose-500" aria-hidden>
              *
            </span>
          ) : null}
        </span>
        {hint ? <span className="text-xs text-ink-400">{hint}</span> : null}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </span>
      ) : null}
    </label>
  );
}
