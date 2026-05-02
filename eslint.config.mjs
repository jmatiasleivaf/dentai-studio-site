import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  { ignores: ["_legacy/**", ".next/**", "node_modules/**"] },
  {
    // Regras novas do react-hooks v7 que disparam em padrões legados pré-existentes
    // (LocaleSwitcher, CountryContext, fade-in-section). Refatorar gradualmente
    // — ver SITE-STATUS.md "lint debt".
    rules: {
      "react-hooks/immutability": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
