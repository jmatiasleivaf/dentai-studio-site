# SuperClini — Site institucional

Site institucional multi-idioma com geolocalização, preços em moeda local (PPP) e IA como diferencial-herói.

**Produção:** https://superclini.com — **App:** https://app.superclini.com

Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · next-intl 3 · Lucide · Framer Motion · Radix.

---

## Estrutura

```
src/
├── app/
│   ├── [locale]/             # es · pt · en (roteamento next-intl)
│   │   ├── layout.tsx        # NavBar + Footer + CountryProvider
│   │   └── page.tsx          # Home — compõe as 10 seções
│   ├── layout.tsx            # Root layout (fontes, viewport)
│   ├── globals.css           # Tailwind + tokens
│   ├── sitemap.ts            # Sitemap multi-locale
│   └── robots.ts
├── components/
│   ├── ui/                   # Primitivos (Button, Card, Badge, Section, Logo)
│   ├── layout/               # NavBar, Footer, LocaleSwitcher
│   └── home/                 # Hero, TrustStrip, AISection, Features, Personas,
│                             # Pricing, Totem, Proof, FAQ, CtaFinal
├── contexts/
│   └── CountryContext.tsx    # Cookie-backed country state (SSR-safe)
├── i18n/
│   ├── routing.ts            # Locales (es default, pt, en)
│   ├── request.ts            # Carrega mensagens por locale
│   └── navigation.ts         # Link/redirect type-safe
├── lib/
│   ├── countries.ts          # 9 países (CL/BR/CO/AR/MX/PE/US/ES/PT)
│   ├── pricing.ts            # Preços PPP por país × plano
│   └── utils.ts              # cn() helper
├── messages/
│   ├── es.json               # Espanhol (mercado primário)
│   ├── pt.json               # Português (BR/PT)
│   └── en.json               # Inglês (US/internacional)
└── middleware.ts             # i18n + geo detection (Cloudflare/Vercel headers)
```

## Como funciona a detecção de idioma e país

Padrão de mercado (Stripe/Vercel/Linear) — ver `src/middleware.ts`:

1. **Cookie `NEXT_LOCALE`** (escolha manual anterior via LocaleSwitcher) — sempre ganha
2. **Header de geo** (`x-vercel-ip-country` / `cf-ipcountry`) → mapa país→locale em `lib/countries.ts`
3. **`Accept-Language`** do browser
4. **Fallback:** `es` (mercado primário Chile)

O país detectado também vai para o cookie `NEXT_COUNTRY`, usado pelo `<Pricing>` para exibir moeda local sem precisar recarregar.

## Comandos

```bash
npm install
npm run dev             # http://localhost:3000 (redireciona para /es, /pt ou /en)
npm run build           # build produção standalone
npm start               # roda o build
npm run lint
```

## Deploy

### Opção A — Vercel (recomendado)
1. Conectar repo no Vercel
2. Build default detecta Next.js 15
3. Configurar env vars (copiar `.env.example`)
4. Apontar domínio `superclini.com` (substituindo redirect atual para `app.*`)

### Opção B — Docker (VPS atual)
1. `docker build -t superclini-site .`
2. `docker run -p 3000:3000 superclini-site`
3. Nginx reverse proxy apontando `superclini.com` para porta 3000

**Arquivo de referência Docker**: `Dockerfile` (multi-stage, standalone output, non-root user).

## Próximas iterações

- [ ] **Backend de leads no super-admin** do app dentai-studio: model `Lead` em `prisma/schema.prisma`, API route `POST /api/leads`, página `/super-admin/leads`, form no site enviando via `LEAD_INTAKE_URL`.
- [ ] **Páginas internas**: /precios, /ia, /whatsapp, /funcionalidades, /clientes, /sobre, /contacto, /ayuda, legais.
- [ ] **Analytics**: GA4 + Microsoft Clarity (só grátis, conforme decisão).
- [ ] **Screenshots reais**: regenerar via Playwright (já existe projeto em `C:/Users/User/Documents/SuperClini/`).
- [ ] **Cases reais**: trocar seção "Proof" placeholder por depoimentos quando existirem.
- [ ] **Refinar traduções pt/en** (passagem profissional após aprovação do copy em es).
- [ ] **OG images**: gerar dinamicamente via `@vercel/og` (1200×630).
- [ ] **Schema.org**: Organization + SoftwareApplication + FAQPage + Product.
- [ ] **Preços PPP**: confirmar valores com estratégia real antes do cutover — hoje em `lib/pricing.ts` são preliminares.
- [ ] **DNS cutover**: testar em staging → apontar `superclini.com` para novo origin (Vercel ou VPS:3000).

## Legacy

O HTML estático original foi preservado em `_legacy/` (inclui `index.html` de 602 linhas + PNGs + Dockerfile nginx). Serve como referência de baseline visual. **Não é servido em produção.**

## Convenções herdadas do app dentai-studio

- **Mobile-first**: tap targets ≥44px (`min-h-touch`), dark mode em pares `light dark:`, safe-area com `pt-safe*`.
- **i18n obrigatório**: toda string nova em `es.json` + `pt.json` + `en.json`.
- **SSR-safe hooks**: useState inicia com valor estável, useEffect atualiza (ver `CountryContext`).
- **Consistência de stack**: mesmas versões de Next/React/Tailwind do app principal.

Ver [`dentai-studio/CLAUDE.md`](../../Documents/dentai-studio/CLAUDE.md) para regras completas.
