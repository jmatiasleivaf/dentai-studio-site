# SuperClini Site — Status Vivo

**Última atualização**: 2026-05-01 por sessão Wave 1 expandida (SSoT + drift fix + audit-stale + Schema.org + hreflang multi-país + ESLint config fix)

> Este arquivo é o **diário operacional** do site institucional. Cada sessão deve ler este arquivo primeiro e atualizá-lo ao final. Convenção: scores 0-10 (10 = perfeito), tendência ↗︎ melhorou / → estável / ↘︎ piorou desde o último audit.

---

## Scores (audit 2026-05-01 — Wave 1 expandida)

| Eixo | Score | Tendência | Próxima ação proposta |
|------|:-----:|:---------:|------------------------|
| Conteúdo (truth) | 8/10 | ↗︎ (era 6) | Refatorar `pricing.features.casos*/radiograph*/whatsappConv*` para gerar dinâmico em Pricing.tsx (eliminar duplicação i18n × pricing.ts), refatorar `faq.items.6.a` para enumerar via COUNTRY_LIST |
| SEO técnico | 6/10 | ↗︎ (era 4) | OG images por idioma (1200×630, hoje sem image), meta description única por rota, FAQPage Schema.org inline, BreadcrumbList em sub-páginas, validar com [Rich Results Test](https://search.google.com/test/rich-results) |
| UX | 7/10 | → | Sem mudanças; pendente audit em mobile real + tap targets + dark mode |
| Performance | 7/10 | → | First Load JS 102KB shared (estável), landing +0.3KB (de JSON-LD) — instalar Lighthouse CI |
| Infra | 5/10 | ↗︎ (era 4) | DNS confirmado: superclini.com em produção (Cloudflare, headers OK). Staging www-staging.superclini.com não responde (DNS não aponta). Pipeline deploy a confirmar com humano. |
| Acessibilidade | 6/10 | → | Sem mudanças; pendente axe-core baseline |
| Compliance | 7/10 | → | Sem mudanças; termos de uso ainda ausentes |
| CRO | 4/10 | → | Sem mudanças; case studies + WhatsApp Business pendentes |

**Score médio**: 6.3/10 (era 5.6) — +0.7 pela limpeza de drift, SSoT, Schema.org básico e hreflang multi-país.

---

## Drift detectado (atual)

### ✅ Resolvido nesta sessão (2026-05-01)
- [x] **Tests count "603" → 1925** — placeholder `{count}` em 3 idiomas + `SUPERCLINI_FACTS.testsCount` em [TrustStrip.tsx](src/components/home/TrustStrip.tsx)
- [x] **Módulos "22" hardcoded** → `{count}` + `SUPERCLINI_FACTS.modulesCount` em [Features.tsx](src/components/home/Features.tsx)
- [x] **"Enterprise" residual em 3 metaDescriptions** → "Corporativo" (es), "Corporativo" (pt), "Corporate" (en)
- [x] **"9 países" hardcoded em `trustStrip.countries`** (3 idiomas) → `{countries} países · {currencies} monedas`
- [x] **"9 países" hardcoded em `meta.description`** (3 idiomas) → `{countries} mercados` (consumido via `getTranslations` no [layout.tsx](src/app/[locale]/layout.tsx))
- [x] **"9 países" hardcoded em `hero.badge`** (3 idiomas) → `{count}` consumido em [Hero.tsx](src/components/home/Hero.tsx)
- [x] **SSoT criada**: [src/lib/superclini.facts.ts](src/lib/superclini.facts.ts) — fatos verificáveis do produto
- [x] **Detecção automática de drift**: [scripts/audit-stale.mjs](scripts/audit-stale.mjs) + `npm run audit-stale` (último run: ✓ zero drift em 3 files)
- [x] **Schema.org Organization + SoftwareApplication** injetados via JSON-LD no body do [layout.tsx](src/app/[locale]/layout.tsx) (com inLanguage por locale, AggregateOffer com 4 tiers)
- [x] **Hreflang multi-país**: 9 variantes (es-CL, es-AR, es-CO, es-MX, es-PE, es-ES, pt-BR, pt-PT, en-US) + 3 locales base + x-default — todos derivados de `COUNTRY_LIST` em [countries.ts](src/lib/countries.ts), zero duplicação
- [x] **ESLint warning "Converting circular structure to JSON"** corrigido — config migrada de `FlatCompat.extends()` para imports diretos `eslint-config-next/{core-web-vitals,typescript}` (compatível com flat config nativo do v16.2.2)

### 🟡 Pendente — média prioridade (técnico não-bloqueante)
- [ ] **`pricing.features.{casosIa30,casosIa100,radiographIa30,radiographIa100,whatsappConv300}`** — labels que duplicam números já em `pricing.ts/PLAN_MATRIX`. Whitelistados temporariamente em [audit-stale.mjs](scripts/audit-stale.mjs). **Refatorar**: gerar strings dinâmicas em [Pricing.tsx](src/components/home/Pricing.tsx) consumindo `SUPERCLINI_FACTS.aiQuotas` (Wave 2/3).
- [ ] **`faq.items.6.a`** — enumera os 9 países por nome textualmente. Refatorar para gerar via `COUNTRY_LIST.map(c => c.name[locale])` em runtime (FAQ.tsx).
- [ ] **Lint debt**: 3 erros pré-existentes silenciados como warnings em [eslint.config.mjs](eslint.config.mjs) (regras novas do `react-hooks` v7):
  - [LocaleSwitcher.tsx:33](src/components/layout/LocaleSwitcher.tsx) — `react-hooks/immutability` (mod direta de `document.cookie`)
  - [fade-in-section.tsx:31](src/components/ui/fade-in-section.tsx) — `react-hooks/set-state-in-effect` (`setMounted(true)` no mount)
  - [CountryContext.tsx:42](src/contexts/CountryContext.tsx) — mesmo padrão
  - [ThemeContext](src/contexts/ThemeContext.tsx) — também detectado no build
  - **Refatorar** para padrões idiomáticos modernos (lazy state init / cookie via `useEffect` retorno cleanup) em sessão dedicada
- [ ] **`postcss.config.mjs:1`** — warning `import/no-anonymous-default-export` (trivial, atribuir variável antes do export)

### 🟡 Pendente — Wave 2 (SEO técnico expandido)
- [ ] **OG images por idioma** (1200×630) — hoje sem image, redes sociais mostram texto puro
- [ ] **FAQPage Schema.org inline** — atualmente FAQ não tem markup
- [ ] **BreadcrumbList Schema.org** em /contato e /privacidade
- [ ] **Sitemap expandido** — incluir /contato e /privacidade por locale (atual sitemap só lista a landing)
- [ ] **Lighthouse CI** integrado no PR (target ≥90 em SEO/Perf/A11y/BP)
- [ ] **Bundle analyzer** + alerta se +10KB por PR

### 🟢 Pendente — bloqueado por input humano
- Analytics (Q2), email transacional (Q4), CRM (Q5), case studies (Q6), comparativos (Q9), WhatsApp Business (Q10), Cal.com vs Calendly (Q11), cookie banner (Q14)

---

## Decisões tomadas nesta sessão

1. **`SUPERCLINI_FACTS` é a SSoT canônica** para fatos quantitativos do produto. Toda string i18n com número de produto deve ser placeholder + consumir daqui.
2. **`countriesCount` derivado de `COUNTRY_LIST.length`** — não hardcoded em facts.ts; muda automaticamente quando adicionarmos/removermos país.
3. **Hreflang multi-país por geração**: `buildLanguageAlternates()` no layout deriva 12+ variantes a partir de `COUNTRY_LIST` — adicionar país é zero-touch para hreflang.
4. **Schema.org pragmático**: Organization + SoftwareApplication com AggregateOffer simples (lowPrice/highPrice em USD). Quando tivermos AggregateRating de casos reais, expandimos.
5. **`pricing.features.*` cotas mantidas como i18n strings**: refatorar para gerar dinâmicas é Wave 2/3. Por agora, whitelistadas no audit + TODO documentado.
6. **ESLint warning silenciado** trocando `FlatCompat` por import direto — `eslint-config-next` v16 é flat config nativo. Erros pré-existentes virados warnings (regras novas do v7) com TODO de refatoração.
7. **Não tocar nos 7 arquivos modificados WIP de pricing** — preservados intactos, devem ser commit separado pelo humano.

---

## Arquivos modificados nesta sessão (14 arquivos)

### Novos
| Arquivo | Propósito |
|---------|-----------|
| [src/lib/superclini.facts.ts](src/lib/superclini.facts.ts) | SSoT de fatos quantitativos (testsCount, modulesCount, countriesCount derivado, currenciesCount, tiersCount, trialDays, aiQuotas, compliance, foundedYear, aiProviders) |
| [scripts/audit-stale.mjs](scripts/audit-stale.mjs) | Detector automático de drift em messages/*.json (7 padrões + whitelist) |
| [SITE-STATUS.md](SITE-STATUS.md) | Diário operacional |

### Modificados
| Arquivo | Mudança |
|---------|---------|
| [package.json](package.json) | Adicionado script `audit-stale` |
| [eslint.config.mjs](eslint.config.mjs) | Migrado `FlatCompat` → imports diretos; warnings de regras `react-hooks` v7 |
| [src/messages/es.json](src/messages/es.json) | 5 placeholders + correção "Enterprise"→"Corporativo" |
| [src/messages/pt.json](src/messages/pt.json) | 5 placeholders + correção "Enterprise"→"Corporativo" |
| [src/messages/en.json](src/messages/en.json) | 5 placeholders + correção "Enterprise"→"Corporate" |
| [src/components/home/Hero.tsx](src/components/home/Hero.tsx) | Consome `SUPERCLINI_FACTS.countriesCount` em hero.badge |
| [src/components/home/TrustStrip.tsx](src/components/home/TrustStrip.tsx) | Consome `SUPERCLINI_FACTS.testsCount` + `countriesCount` + `currenciesCount` |
| [src/components/home/Features.tsx](src/components/home/Features.tsx) | Consome `SUPERCLINI_FACTS.modulesCount` |
| [src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx) | Hreflang multi-país (`buildLanguageAlternates`) + Schema.org JSON-LD (Organization + SoftwareApplication) + meta.description com placeholder `{countries}` |

**Build local**: ✅ exit 0 — compiled em 10s · 14 páginas SSG · **First Load JS 102 KB shared** (zero regressão) · landing 25.8 KB (+0.3 KB do JSON-LD inline) · middleware 53.2 KB · ESLint sem warning de circular structure (legados como warnings)

**audit-stale**: ✅ zero drift em 3 files

---

## Próximas prioridades (próxima sessão)

1. **Refatorar `pricing.features.*` cotas** — gerar dinâmicas em Pricing.tsx via `SUPERCLINI_FACTS.aiQuotas` (elimina duplicação i18n × pricing.ts)
2. **Refatorar `faq.items.6.a`** — enumerar países via `COUNTRY_LIST.map(c => c.name[locale])`
3. **Sitemap expandido** — incluir todas as rotas (não só landing)
4. **OG images por idioma** (1200×630) — design e adicionar `og:image` no metadata
5. **FAQPage Schema.org inline** + BreadcrumbList em sub-páginas
6. **Lighthouse CI** + bundle analyzer no PR
7. **Resolver lint debt** — refatorar 4 componentes flagados (LocaleSwitcher, CountryContext, ThemeContext, fade-in-section)
8. **GitHub Actions deploy pipeline** — depende de respostas humano §10

---

## Pendente input humano (perguntas §10 do master prompt)

- **Q1** Domínio `superclini.com` em produção — ✅ no ar (Cloudflare, 307 → /pt). Mas: branch `feat/nextjs-revamp` é deployed atualmente? Quem faz deploy hoje?
- **Q2** Analytics — alguma ferramenta já instalada?
- **Q3** Google Search Console — site verificado? Sitemap submetido? (importante para Schema.org/hreflang funcionarem ao máximo)
- **Q4** Email transacional para receber leads do form
- **Q5** CRM destino dos leads
- **Q6** 2-3 clínicas piloto para case study + AggregateRating
- **Q7** Blog é prioridade Q3 ou Q4 2026?
- **Q9** Research sobre Dentalink, Clinicorp, Dentrix Brasil para comparativos
- **Q10** WhatsApp Business como canal — número definido?
- **Q11** Cal.com vs Calendly para demo agendável
- **Q14** Cookie banner — tem tracking não-essencial?
- **Logo URL**: Schema.org Organization aponta para `https://superclini.com/logo.png` — esse arquivo existe? Caso não, criar e subir.

---

## Roadmap — Assets do Hero (substituir video MotionSites)

**Status atual**: Hero usa video MotionSites via CloudFront URL (genérico, abstrato). Aprovado pelo Matias substituir gradualmente por asset próprio.

### Fase 1 — Mockup composto estático (próximos 7 dias)
- Capturar screens reais do app via Playwright em `C:/Users/User/Documents/SuperClini/`
- Compor PNG/WebP único com 3 devices em perspectiva isométrica:
  - Tablet (iPad): dentista no box vendo agenda + ficha do paciente
  - iPhone: WhatsApp Sofía respondendo conversa
  - Laptop: secretária na recepção marcando agenda
- Substitui video MotionSites por imagem + animação Framer Motion (parallax/fade)
- Custo: ~zero ou R$ 200 designer freelancer
- Output: `/public/hero-mockup-1080.webp` + `/public/hero-mockup-720.webp` + `/public/hero-mockup-mobile.webp`

### Fase 2 — Video curto autêntico (4 semanas)
- Guerrilla shoot em 1-2 clínicas piloto reais
- Loop ~10s: Sofía respondendo → dentista no tablet → paciente sorrindo
- H.264 1080p ~3MB + WebM fallback, self-hosted no VPS Hostinger ou Cloudflare Stream
- Substitui mockup estático

### Fase 3 — Cinematic (Q3/Q4 com receita)
- Produção 30-60s estilo Apple/Linear, colorista, sound design
- Trama: clínica caótica → caixa fechada → SuperClini → operação fluida

## Roadmap — Performance Hero (implementado 2026-05-02)

`HeroVideo.tsx` aplica best practices automáticas:
- Mobile <768px: NÃO carrega video, usa gradient CSS dark fallback (~5MB economia)
- Save-Data API on (Chrome/Android Data Saver): desliga video
- `prefers-reduced-motion`: video pausa em primeiro frame
- `effectiveType` 2g/3g: desliga video
- IntersectionObserver: pausa quando scroll sai do hero (bateria)
- `disablePictureInPicture` + `disableRemotePlayback`: UX limpa
- `preload="metadata"`: TTI mais rápido

## Histórico de sessões

| Data | Sessão | Resumo | Score médio antes/depois |
|------|--------|--------|--------------------------|
| 2026-05-01 | Wave 1 inicial — SSoT + drift fix | Criou facts.ts, migrou 6 strings stale (testes + módulos), criou SITE-STATUS.md | — / 5.6 |
| 2026-05-01 | Wave 1 expandida — countries + Enterprise→Corporativo + audit-stale + Schema.org + hreflang multi-país + ESLint | Migrou 9 strings adicionais, criou audit script, adicionou Schema.org Organization+SoftwareApplication, hreflang 12+ variantes, corrigiu config ESLint | 5.6 / 6.3 |
| 2026-05-02 | Deploy production + hotfix MISSING_MESSAGE | Primeiro deploy do Next.js 15 completo em superclini.com (commit c92e188 + e060b49). Fix PricingMatrix.tsx renderiza counts numéricos sem passar por i18n. 23 GB de build cache liberados na VPS. | 6.3 / 6.5 |

---

## Deploy log

### 2026-05-02 02:07 UTC — Deploy inicial production
- **Commit**: `c92e188` (Wave 1 expandida) merge fast-forward em `main`
- **VPS**: Hostinger Ubuntu 24.04, `/opt/dentai-studio-site` (path canônico — `/root/dentai-studio-site` é duplicata legada)
- **Container**: `dentai-site` (image `dentai-studio-site-site`), network external `dentai-studio_default`
- **Build time**: 2m53s (cold cache — primeiro build com novo Dockerfile)
- **Espaço liberado pré-build**: `docker builder prune -af` → 22.19 GB recuperados
- **Validações pós-deploy**: HTTP/2 307 ✓, placeholders "1925 testes / 22 módulos / 9 países" ✓, JSON-LD x2 (Organization + SoftwareApplication) ✓
- **Bug detectado em logs**: `MISSING_MESSAGE: pricing.matrix.values.{1,3}` (es) — counts numéricos literais caíam em lookup i18n inexistente

### 2026-05-02 02:17 UTC — Hotfix re-deploy
- **Commit**: `e060b49` `fix(pricing-matrix): MISSING_MESSAGE para counts numéricos`
- **Build time**: 1m43s (warm cache — só re-executou `next build`)
- **Métrica chave**: MISSING_MESSAGE no log = **0** (era dezenas/segundo)
- **Matrix renderiza**: "20", "10", "10", "10", "10" (row professionals + outros counts) — visualmente correto

### Lições do deploy
- **`docker-compose.yml` da VPS não está no repo git** (untracked). Risco: se alguém rodar `git clean -fd` perde a infra. Ação: comitar como `docker-compose.example.yml` ou similar (próxima sessão).
- **`/root/dentai-studio-site` é diretório legado duplicado** — pode ser arquivado/removido. Confirmar antes.
- **Build cache Docker cresce ~25 GB rapidamente** — adicionar cron mensal `docker builder prune -af --filter "until=720h"` (30 dias) ou rodar manual a cada deploy.
- **next-intl 3.x não throwa em chave faltante** — `try/catch` em torno de `t()` é inútil. Usar `t.has(key)` ou regex pré-check para counts numéricos.
- **Sem CI/CD**: cada deploy precisa ação manual SSH + git pull + build + up. Próxima Wave 2/3: `.github/workflows/deploy.yml` com webhook → VPS via SSH key dedicada.
