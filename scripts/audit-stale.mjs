#!/usr/bin/env node
/**
 * audit-stale: detecta números literais hardcoded em src/messages/*.json
 * que deveriam ser placeholders ICU consumidos via SUPERCLINI_FACTS.
 *
 * Uso: `node scripts/audit-stale.mjs` ou `npm run audit-stale`.
 * Exit code: 0 se limpo, 1 se houver drift.
 *
 * Regra de ouro: qualquer número que descreve o produto (testes, módulos,
 * países, cotas IA) precisa vir do SSoT. Strings de UI puras (ex: "14 días",
 * "30 minutos") são whitelist via padrões abaixo.
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = join(__dirname, "..", "src", "messages");

// Padrões que disparam alarme. Cada um é uma claim sobre o PRODUTO
// (não sobre uma feature de copy genérica como "30 minutos de demo").
const STALE_PATTERNS = [
  { name: "tests", regex: /\b\d+\s+(testes?|tests?|pruebas?\s+automatizadas?)/i },
  { name: "modules", regex: /\b\d+\s+(m[oó]dulos?|modules?)\s+(operacionais?|operativos?|operational)/i },
  { name: "countries", regex: /\b\d+\s+(pa[ií]ses?|countries)\b/i },
  { name: "currencies", regex: /\b\d+\s+(monedas?|moedas?|currencies)\b/i },
  { name: "ai-simulations", regex: /\b\d+\s+(simulaciones?|simulações?|simulations?)\s+(de\s+sonrisa|de\s+sorriso|smile)/i },
  { name: "ai-radiograph", regex: /\b\d+\s+(an[áa]lisis|an[áa]lises|analyses)\s+(radiogr[áa]ficas?|radiogr[áa]ficos?|radiograph)/i },
  { name: "ai-whatsapp", regex: /\b\d+\s+(conversaciones?|conversas?|conversations?)\s+(únicas?|unique)/i },
];

// Padrões dentro de strings que NÃO devem disparar (false positives conhecidos).
// Exemplo: chave "30mo" em pricing.matrix.values é um label, não claim.
const WHITELIST_KEYS = new Set([
  "pricing.matrix.values.30mo",
  "pricing.matrix.values.100mo",
  "pricing.matrix.values.300conv",
  "pricing.matrix.values.33tpl",
  "pricing.matrix.values.5gb",
  "pricing.matrix.values.50gb",
  "pricing.matrix.values.100gb",
  "pricing.matrix.values.500gb",
  // Labels de feature por plano: a SSoT autoritativa é pricing.ts/PLAN_MATRIX,
  // que cards/matriz já consomem. Estas strings i18n duplicam o número como
  // texto descritivo. TODO: refatorar para gerar dinamicamente em Pricing.tsx
  // (eliminar duplicação) — Wave 2/3.
  "pricing.features.casosIa30",
  "pricing.features.casosIa100",
  "pricing.features.radiographIa30",
  "pricing.features.radiographIa100",
  "pricing.features.whatsappConv300",
  // FAQ resposta longa que enumera os 9 países por nome — refatorar em Wave 2
  // quando reescrever FAQ para consumir COUNTRY_LIST + facts dinamicamente.
  "faq.items.6.a",
  // Landing /sofia: FAQ menciona "300 conversaciones" como label do plano,
  // não como claim global do produto. Mesma justificativa de pricing.features.*.
  "sofiaPage.faq.items.5.a",
]);

/**
 * Walk recursivo pelo objeto JSON, retorna { keyPath, value } para cada string.
 */
function* walkStrings(obj, path = []) {
  for (const [key, value] of Object.entries(obj)) {
    const newPath = [...path, key];
    if (typeof value === "string") {
      yield { keyPath: newPath.join("."), value };
    } else if (typeof value === "object" && value !== null) {
      yield* walkStrings(value, newPath);
    }
  }
}

const findings = [];
const files = readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json"));

for (const file of files) {
  const content = JSON.parse(readFileSync(join(MESSAGES_DIR, file), "utf8"));
  for (const { keyPath, value } of walkStrings(content)) {
    if (WHITELIST_KEYS.has(keyPath)) continue;
    for (const pattern of STALE_PATTERNS) {
      if (pattern.regex.test(value)) {
        findings.push({ file, keyPath, pattern: pattern.name, value });
      }
    }
  }
}

if (findings.length === 0) {
  console.log(`✓ audit-stale: ${files.length} files scanned, zero drift detected.`);
  process.exit(0);
}

console.error(`\n✗ audit-stale: ${findings.length} drift(s) detected.\n`);
for (const f of findings) {
  console.error(`  [${f.pattern}]  ${f.file}  →  ${f.keyPath}`);
  console.error(`    "${f.value}"`);
  console.error(`    Fix: replace literal with {placeholder} and consume from SUPERCLINI_FACTS.\n`);
}
process.exit(1);
