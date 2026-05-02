# SuperClini — Site Institucional

Site institucional multi-idioma com geolocalização e preços em moeda local (PPP).

**URLs:**
- `https://superclini.com` — produção (em preparação)
- `https://www-staging.superclini.com` — staging (em preparação)

## Stack

Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS 3 · next-intl 3 · Radix · Framer Motion · Lucide.

## Como rodar localmente

```bash
npm install
npm run dev             # http://localhost:3000 (redireciona para /es, /pt ou /en)
npm run build           # build produção standalone
npm start               # roda o build
npm run lint
```

## Documentação e convenções

Arquitetura, regras de engenharia (mobile-first, i18n, SSR-safe, AUTH_URL, deploy staging→prod, nginx) seguem o **CLAUDE.md mestre do ecossistema** em [`../dentai-studio/CLAUDE.md`](../dentai-studio/CLAUDE.md). Este repo segue rigorosamente essas regras — não há documento separado.

Legacy (HTML estático original) → [`_legacy/`](./_legacy/)
