"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  postulacionSchema,
  type PostulacionFormValues,
  REGIONES_CL,
  PERFILES,
  CLINICAS_RANGOS,
  DISPONIBILIDAD,
} from "@/lib/postulacion-schema";
import { useConsent } from "@/contexts/ConsentContext";
import { forTransmission } from "@/lib/attribution";
import { CONSENT_POLICY_VERSION } from "@/lib/consent";

/**
 * Formulário de postulación ao Programa de Asociados.
 *
 * Posta na rota do próprio site (`/api/postulacion`), que repassa ao CRM pelo
 * servidor com o token de ingestão e com a intenção de parceiro. Não existe
 * destino secundário de propósito: se o CRM estiver fora, a pessoa vê o erro e
 * pode tentar de novo ou escrever pelo contato. Um sucesso falso aqui custaria
 * um candidato que acha que se postulou e nunca é chamado.
 */

const fieldClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100 disabled:opacity-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50 dark:hover:border-ink-600 dark:focus:ring-brand-900/50";

type Status = "idle" | "submitting" | "success" | "error";

export function PostulacionForm() {
  const t = useTranslations("asociadosPage.form");
  const tErr = useTranslations("asociadosPage.form.errors");
  const locale = useLocale();
  const { attribution, consent } = useConsent();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostulacionFormValues>({
    resolver: zodResolver(postulacionSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      empresa: "",
      region: "",
      comuna: "",
      perfil: "",
      clinicas: "",
      disponibilidad: "",
      mensaje: "",
      consentimiento: false as unknown as true,
      website: "",
    } as unknown as PostulacionFormValues,
  });

  const onSubmit = async (data: PostulacionFormValues) => {
    setStatus("submitting");
    setErrorMsg("");

    // Atribuição de primeiro toque, vinda do ConsentProvider. gclid e fbclid
    // só seguem com consentimento de marketing.
    const envelope = forTransmission(attribution, consent);

    try {
      const res = await fetch("/api/postulacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          atribuicao: envelope,
          consentPolicyVersion: CONSENT_POLICY_VERSION,
          consentMarketing: consent?.marketing ?? false,
        }),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      if (res.status === 422) {
        setErrorMsg(tErr("invalid"));
      } else if (res.status === 429) {
        setErrorMsg(tErr("rateLimit"));
      } else if (res.status === 502 || res.status === 503) {
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

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/40"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
          <Check className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-emerald-900 dark:text-emerald-200">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-emerald-700 dark:text-emerald-300">
          {t("successBody")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot: invisível ao humano, tabulável só por bot. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}
      >
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <Field label={t("name")} required error={errors.nombre && tErr(errors.nombre.message ?? "required")}>
        <input
          type="text"
          autoComplete="name"
          enterKeyHint="next"
          className={fieldClass}
          {...register("nombre")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("email")} required error={errors.email && tErr(errors.email.message ?? "email")}>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            enterKeyHint="next"
            className={fieldClass}
            {...register("email")}
          />
        </Field>

        <Field
          label={t("phone")}
          required
          hint={t("phoneHint")}
          error={errors.telefono && tErr(errors.telefono.message ?? "tel")}
        >
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
            enterKeyHint="next"
            className={fieldClass}
            {...register("telefono")}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("region")} required error={errors.region && tErr("required")}>
          <select className={fieldClass} defaultValue="" {...register("region")}>
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {REGIONES_CL.map((r) => (
              <option key={r.code} value={r.code}>
                {r.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t("comuna")} required error={errors.comuna && tErr(errors.comuna.message ?? "required")}>
          <input
            type="text"
            autoComplete="address-level2"
            enterKeyHint="next"
            className={fieldClass}
            {...register("comuna")}
          />
        </Field>
      </div>

      <Field label={t("profile")} required error={errors.perfil && tErr("required")}>
        <select className={fieldClass} defaultValue="" {...register("perfil")}>
          <option value="" disabled>
            {t("selectPlaceholder")}
          </option>
          {PERFILES.map((p) => (
            <option key={p} value={p}>
              {t(`profiles.${p}` as never)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t("company")} hint={t("optional")} error={errors.empresa && tErr("tooLong")}>
        <input
          type="text"
          autoComplete="organization"
          enterKeyHint="next"
          className={fieldClass}
          {...register("empresa")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t("clinics")} required error={errors.clinicas && tErr("required")}>
          <select className={fieldClass} defaultValue="" {...register("clinicas")}>
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {CLINICAS_RANGOS.map((c) => (
              <option key={c} value={c}>
                {t(`clinicRanges.${c}` as never)}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={t("availability")}
          required
          error={errors.disponibilidad && tErr("required")}
        >
          <select className={fieldClass} defaultValue="" {...register("disponibilidad")}>
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {DISPONIBILIDAD.map((d) => (
              <option key={d} value={d}>
                {t(`availabilityRanges.${d}` as never)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t("message")} hint={t("optional")}>
        <textarea
          rows={4}
          maxLength={1000}
          placeholder={t("messagePlaceholder")}
          className={`${fieldClass} resize-y`}
          {...register("mensaje")}
        />
      </Field>

      <label className="flex min-h-touch cursor-pointer items-start gap-3 rounded-2xl border border-ink-100 bg-ink-50/60 p-4 dark:border-ink-800 dark:bg-ink-900/60">
        <input
          type="checkbox"
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-400 dark:border-ink-600 dark:bg-ink-900"
          {...register("consentimiento")}
        />
        <span className="text-xs leading-relaxed text-ink-600 dark:text-ink-400">
          {t.rich("consent", {
            link: (chunks) => (
              <a
                href={`/${locale}/privacidade`}
                target="_blank"
                rel="noopener"
                className="font-semibold text-brand-600 underline hover:text-brand-700 dark:text-brand-400"
              >
                {chunks}
              </a>
            ),
          })}
        </span>
      </label>
      {errors.consentimiento ? (
        <p className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {tErr("consent")}
        </p>
      ) : null}

      {status === "error" && errorMsg ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <span className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>{errorMsg}</span>
          </span>
          <a
            href={`/${locale}/contato`}
            className="mt-2 inline-block pl-6 text-xs font-semibold underline"
          >
            {tErr("fallbackLink")}
          </a>
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
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submit")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </Button>

      <p className="pt-1 text-center text-xs text-ink-500 dark:text-ink-400">{t("sla")}</p>
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
