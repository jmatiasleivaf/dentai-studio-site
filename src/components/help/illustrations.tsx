import * as React from "react";
import type { Accent, IllustrationKey } from "@/lib/help/types";

/**
 * Ilustrações procedurais do Centro de Ayuda — mesmo estilo do resto do site
 * (linha + gradiente brand, zero imagens de banco). Os gradientes vivem uma
 * única vez em <HelpGradientDefs/> (renderizado por página) para evitar ids
 * duplicados quando a mesma ilustração aparece em vários lugares.
 */
export function HelpGradientDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <linearGradient id="help-grad-brand" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="help-grad-green" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#10b981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="help-grad-violet" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#7c3aed" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function gradFor(accent: Accent): string {
  if (accent === "green") return "url(#help-grad-green)";
  if (accent === "violet") return "url(#help-grad-violet)";
  return "url(#help-grad-brand)";
}

/** Ilustração de coleção (usada nos cards e no hero da categoria). */
export function CategoryIllustration({
  illustration,
  accent = "brand",
  className,
}: {
  illustration: IllustrationKey;
  accent?: Accent;
  className?: string;
}) {
  const g = gradFor(accent);
  const common = {
    width: 40,
    height: 40,
    viewBox: "0 0 48 48",
    fill: "none" as const,
    className,
    "aria-hidden": true,
  };

  switch (illustration) {
    case "primeros-pasos":
      return (
        <svg {...common}>
          <path d="M24 6c7 3 11 9 11 18 0 5-2 9-5 12l-6 5-6-5c-3-3-5-7-5-12 0-9 4-15 11-18Z" stroke={g} strokeWidth="2.5" />
          <circle cx="24" cy="20" r="4" stroke={g} strokeWidth="2.5" />
          <path d="M18 40c2 2 10 2 12 0" stroke="#06b6d4" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "agenda":
      return (
        <svg {...common}>
          <rect x="8" y="11" width="32" height="29" rx="5" stroke={g} strokeWidth="2.5" />
          <path d="M8 19h32" stroke={g} strokeWidth="2.5" />
          <path d="M16 7v7M32 7v7" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="14" y="24" width="7" height="6" rx="2" fill="#0ea5e9" opacity=".9" />
          <path d="M26 27h9M26 33h6" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "sofia":
      return (
        <svg {...common}>
          <path d="M10 12h28a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H20l-8 6v-6h-2a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3Z" stroke={g} strokeWidth="2.5" />
          <circle cx="18" cy="23" r="2" fill="#10b981" />
          <circle cx="24" cy="23" r="2" fill="#10b981" />
          <circle cx="30" cy="23" r="2" fill="#10b981" />
        </svg>
      );
    case "clinico":
      return (
        <svg {...common}>
          <path
            d="M24 12c-4-4-11-4-13 2-2 5 0 10 2 17 1 3 4 3 5 0l3-8c.6-1.6 2.4-1.6 3 0l3 8c1 3 4 3 5 0 2-7 4-12 2-17-2-6-9-6-13-2Z"
            stroke={g}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "finanzas":
      return (
        <svg {...common}>
          <rect x="7" y="14" width="34" height="22" rx="5" stroke={g} strokeWidth="2.5" />
          <path d="M7 22h34" stroke={g} strokeWidth="2.5" />
          <circle cx="24" cy="29" r="4" stroke="#06b6d4" strokeWidth="2.2" />
          <path d="M14 14l6-6 8 6" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "fiscal":
      return (
        <svg {...common}>
          <path d="M13 7h16l6 6v28l-4-3-4 3-4-3-4 3-4-3-4 3V7Z" stroke={g} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M18 19h12M18 26h9" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "totem":
      return (
        <svg {...common}>
          <rect x="12" y="6" width="24" height="30" rx="4" stroke={g} strokeWidth="2.5" />
          <rect x="17" y="11" width="14" height="14" rx="2" stroke="#06b6d4" strokeWidth="2.2" />
          <circle cx="24" cy="31" r="1.6" fill="#0ea5e9" />
          <path d="M18 42h12" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "cuenta":
      return (
        <svg {...common}>
          <path d="M24 6l14 5v10c0 9-6 16-14 20-8-4-14-11-14-20V11l14-5Z" stroke={g} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M18 24l4 4 8-9" stroke="#06b6d4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

/** Ilustrações didáticas maiores, embutidas no corpo dos artigos. */
export function BodyIllustration({ illustration }: { illustration: IllustrationKey }) {
  if (illustration === "flujo-sofia") {
    return (
      <svg viewBox="0 0 680 220" width="100%" role="img" aria-label="Flujo: paciente escribe, Sofía responde y agenda, el equipo confirma" className="block">
        <rect width="680" height="220" fill="none" />
        <rect x="24" y="78" width="150" height="64" rx="14" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="52" cy="110" r="14" fill="rgba(14,165,233,.12)" />
        <path d="M46 110l4 4 8-8" stroke="#0284c7" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <text x="76" y="106" fontFamily="sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">Paciente</text>
        <text x="76" y="124" fontFamily="sans-serif" fontSize="11" fill="#64748b">WhatsApp</text>
        <path d="M182 110h64" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M240 104l8 6-8 6" stroke="#94a3b8" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="256" y="70" width="168" height="80" rx="14" fill="#0f172a" />
        <circle cx="286" cy="110" r="15" fill="rgba(56,189,248,.2)" />
        <path d="M280 110a6 6 0 1 1 12 0" stroke="#38bdf8" strokeWidth="2.4" fill="none" />
        <circle cx="286" cy="107" r="2" fill="#38bdf8" />
        <text x="310" y="104" fontFamily="sans-serif" fontSize="13" fontWeight="700" fill="#fff">Sofía (IA)</text>
        <text x="310" y="122" fontFamily="sans-serif" fontSize="11" fill="#94a3b8">responde y agenda</text>
        <path d="M432 110h64" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M490 104l8 6-8 6" stroke="#94a3b8" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="506" y="78" width="150" height="64" rx="14" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="534" cy="110" r="14" fill="rgba(16,185,129,.14)" />
        <path d="M528 110l4 4 8-8" stroke="#047857" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <text x="558" y="106" fontFamily="sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">Tu equipo</text>
        <text x="558" y="124" fontFamily="sans-serif" fontSize="11" fill="#64748b">confirma</text>
      </svg>
    );
  }

  if (illustration === "flujo-migracion") {
    return (
      <svg viewBox="0 0 680 190" width="100%" role="img" aria-label="Exportas de Dentalink, mapeamos y validas antes de activar" className="block">
        <rect x="24" y="63" width="176" height="64" rx="14" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
        <path d="M50 84h16v22H50z" fill="none" stroke="#94a3b8" strokeWidth="2" />
        <path d="M58 92v10M53 97h10" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <text x="82" y="90" fontFamily="sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">Dentalink</text>
        <text x="82" y="108" fontFamily="sans-serif" fontSize="11" fill="#64748b">exportar datos</text>
        <path d="M208 95h56" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M258 89l8 6-8 6" stroke="#94a3b8" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="272" y="55" width="136" height="80" rx="14" fill="url(#help-grad-brand)" />
        <path d="M312 82l8 8-8 8M368 82l-8 8 8 8M344 78l-8 24" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="340" y="120" fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#e0f2fe" textAnchor="middle">mapeo automático</text>
        <path d="M416 95h56" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M466 89l8 6-8 6" stroke="#94a3b8" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="480" y="63" width="176" height="64" rx="14" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="510" cy="95" r="14" fill="rgba(16,185,129,.14)" />
        <path d="M504 95l4 4 8-8" stroke="#047857" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <text x="534" y="90" fontFamily="sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">SuperClini</text>
        <text x="534" y="108" fontFamily="sans-serif" fontSize="11" fill="#64748b">validar y activar</text>
      </svg>
    );
  }

  if (illustration === "pantalla-caja") {
    return (
      <svg viewBox="0 0 680 220" width="100%" role="img" aria-label="Cierre de caja: esperado, contado y diferencia" className="block">
        <rect x="140" y="30" width="400" height="160" rx="18" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
        <path d="M140 62h400" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="166" cy="46" r="5" fill="#0ea5e9" />
        <text x="182" y="51" fontFamily="sans-serif" fontSize="13" fontWeight="700" fill="#0f172a">Cierre de caja</text>
        <text x="172" y="98" fontFamily="sans-serif" fontSize="13" fill="#64748b">Esperado</text>
        <text x="508" y="98" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="end">$ 248.000</text>
        <text x="172" y="128" fontFamily="sans-serif" fontSize="13" fill="#64748b">Contado</text>
        <text x="508" y="128" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="end">$ 248.000</text>
        <path d="M172 146h336" stroke="#f1f5f9" strokeWidth="2" />
        <rect x="164" y="158" width="352" height="24" rx="8" fill="rgba(16,185,129,.12)" />
        <text x="180" y="174" fontFamily="sans-serif" fontSize="12.5" fontWeight="700" fill="#047857">Diferencia</text>
        <text x="500" y="174" fontFamily="sans-serif" fontSize="12.5" fontWeight="700" fill="#047857" textAnchor="end">$ 0 — cuadrado</text>
      </svg>
    );
  }

  return null;
}
