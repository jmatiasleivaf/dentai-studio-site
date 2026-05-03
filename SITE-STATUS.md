# SuperClini Site — Status Vivo

**Última atualização**: 2026-05-03 — sessão BRUTAL PREMIUM Wave 4 (Hero reconceito Linear/Stripe + Dashboard preview)

## Wave 4 — Hero reconceito (2026-05-03 sessão tarde)

**Inspiração**: reference Nexora (SaaS landing Apple/Linear/Stripe vibe) — adaptado pro branding SuperClini.

**Decisões cravadas (não re-abrir)**:
- Dark cinematográfico mantido (não trocou pra light/branco do Nexora — preserva identidade)
- Space Grotesk + italic na palavra-destaque (não trocou pra Instrument Serif — mudaria identidade global)
- Brand cyan #0ea5e9 + accent #06b6d4 (não trocou pro indigo #6366f1 do Nexora)
- Tracker de cenas removido — só fazia sentido com video Runway narrativo de 4 cenas mapeadas
- topPitch + topStat + h1Line1/Line2 + scenes.* removidos do i18n (info já vive no Proof section)
- Mobile = só texto + CTAs (zero video, zero dashboard preview) — alinhado com "hero apenas desktop"
- Dashboard preview desktop-only (`hidden md:block`), clipped por baixo via `overflow-hidden` da seção
- Video atual (Runway local) mantido — trocar URL CloudFront sem self-host quebra LCP em produção; pipeline ffmpeg roda quando file local chegar

**Mudanças de arquivo**:
| Arquivo | Tipo | Mudança |
|---------|------|---------|
| [src/components/home/Hero.tsx](src/components/home/Hero.tsx) | refator | Removido tracker de cenas + 2 hooks complexos + top section. Adicionado eyebrow pill + headline 1-linha com italic+ShinyText + brand radial accent. Mobile-aware via `useVideoBgPolicy` simplificada |
| [src/components/home/HeroDashboard.tsx](src/components/home/HeroDashboard.tsx) | novo | Glassmorphism wrapper + Image (Next.js otimizada) + glow ring brand atrás + framer fade-up. `hidden md:block` |
| [public/showcase/hero-saas-placeholder.svg](public/showcase/hero-saas-placeholder.svg) | novo | SVG mock 1440×900 de agenda dental (sidebar + KPIs + grid de horários × 4 dentistas + card Sofía + chart). Substituível por screenshot real. ~10 KB |
| [src/messages/{pt,es,en}.json](src/messages/) | refator | Chaves `hero.*` enxutas: `eyebrow`, `h1Prefix/Highlight/Suffix`, `sub` (com `{countries}`), `dashboardAlt`, mantidos `ctaPrimary/Secondary` + `trustItems` |

**Métricas**:
- Build: ✅ exit 0
- audit-stale: ✅ zero drift em 3 files
- First Load JS shared: **102 kB MANTIDO** (zero regressão do budget)
- Home page-specific: 52.7 → **51.3 kB** (−1.4 kB pelo cleanup do tracker + hooks)

**Pendências pra fechar a Wave 4**:
1. **Screenshot real do SaaS** (você gera): 1440×900 lógico, ideal 2880×1800 retina, WebP qualidade 85, salvar em `public/showcase/hero-saas-1440.webp`. Depois troco `DEFAULT_SRC` em [HeroDashboard.tsx:26](src/components/home/HeroDashboard.tsx#L26). Conteúdo recomendado: Agenda diária com cards coloridos por dentista (alta densidade) ou Dashboard com KPIs.
2. **Video novo** (você passa file ou autoriza download da URL CloudFront): rodo pipeline ffmpeg igual ao Runway atual (H.264 4MB + WebM 1.9MB + 720p tablet alt + posters WebP).
3. Mobile: confirmado sem screenshot algum. Hero mobile = texto + CTAs centrados ocupando viewport.

---



> Este arquivo é o **diário operacional** do site institucional. Cada sessão deve ler este arquivo primeiro e atualizá-lo ao final. Convenção: scores 0-10 (10 = perfeito), tendência ↗︎ melhorou / → estável / ↘︎ piorou desde o último audit.

---

## Scores (audit 2026-05-03 — pós Waves 1-3 brutal premium)

| Eixo | Score | Tendência | Próxima ação proposta |
|------|:-----:|:---------:|------------------------|
| Conteúdo (truth) | 9/10 | → (era 9) | Refatorar `pricing.features.casos*/radiograph*/whatsappConv*` dinâmico, `faq.items.6.a` enumerar via COUNTRY_LIST |
| SEO técnico | 8/10 | → (era 8) | OG images por landing (1200×630), BreadcrumbList em sub-páginas, sitemap pings |
| UX | 9/10 | ↗︎ (era 8) | Hero scene tracker + bento Features + Proof tile entregues. Pendente: AISection / Personas / FAQ / CtaFinal premium pass |
| Performance | 8/10 | → (era 8) | First Load JS shared **102KB MANTIDO** após 3 waves. Home page-specific 51.7→52.7kB (+1kB pelo bento). Pendente Lighthouse CI |
| Infra | 6/10 | → (era 6) | superclini.com production no ar. Pipeline manual SSH OK. Pendente CI/CD GitHub Actions |
| Acessibilidade | 8/10 | ↗︎ (era 7) | aria-live + aria-atomic no scene tracker, dl/dt/dd semântico em Proof, reduced-motion fallback robusto. Pendente axe-core CI |
| Compliance | 7/10 | → | Termos de uso ainda ausentes |
| CRO | 7/10 | ↗︎ (era 6) | Proof concreto com 4 stats SUPERCLINI_FACTS + spotlight Sofía com chat preview na home (conversion lift esperado). Pendente case studies reais + WhatsApp channel |

**Score médio: 7.75/10** (era 7.4, +0.35) — alvo §15 era 8.5+. Falta AISection/Personas/FAQ/CtaFinal/landings polish + Lighthouse CI + OG images pra fechar gap. Brutal Premium Waves 1-3 entregaram a hierarquia visual da home (Hero cinematic + Proof tangível + Features showcase).

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

## Decisões tomadas nesta sessão (Brutal Premium Waves 1-3 · 2026-05-03)

1. **Hero não é só pano de fundo cinematográfico — é narrativa sincronizada.** O video Runway/Kling 3.0 Pro (15s · 4 cenas) agora dirige o copy via `requestAnimationFrame` que lê `video.currentTime` e mapeia pra cena 0-3. Eyebrow rotativo formato "01/04 · Sofía no WhatsApp · 24/7" trocando a cada 3.75s.
2. **Decoplagem `useVideoBgPolicy` + `useHeroScene` no Hero**: dois hooks inline isolam (a) política de carga do video (mobile/save-data/2-3G/reduced-motion) e (b) scene tracker. HeroVideo virou componente "burro" que recebe `videoRef` + `shouldPlay` via props. Permite Hero ler `currentTime` sem RefForward complexo.
3. **Fallback robusto no scene tracker**: quando video não toca (mobile, save-data, autoplay bloqueado), entra cycle estático 4s. Quando `prefers-reduced-motion`, trava na cena 0 e zero animação. `aria-live="polite"` + `aria-atomic` no rotator.
4. **Proof reescrito como trust block tangível.** O componente antigo (1 ícone heart + texto vago + CTA `href="#"` morto) foi substituído por grid de 4 telemetry tiles (1.925 testes · 9 países · 8 moedas · 3 providers IA) consumindo `SUPERCLINI_FACTS`. Eliminou link quebrado, adicionou cifras verificáveis. Provider list (Anthropic/Google/OpenAI) e compliance (LGPD/Ley/GDPR/HIPAA) listados em `dl/dt/dd` semântico.
5. **Features virou bento grid com hierarquia visual**, não mais grid plano de 9 cards iguais. Spotlight Sofía 2×2 desktop (gradient brand + chat preview de 2 bubbles + CTA pra /sofia) + 8 tiles regulares 1×1. Removido `items.whatsapp` (subsumido pela spotlight). Eyebrow honesto: "9 destaques de 22 módulos" via interpolação dupla `{shown}/{total}`.
6. **Performance budget mantido**: First Load JS shared **102 KB intacto** após 3 waves. Home page-specific subiu 51.7→52.7 kB (+1 kB pelo markup do bento spotlight) — aceitável pelo design upgrade. Proof e Features são Server Components (zero peso client adicional).
7. **i18n: 18 chaves novas em PT/ES/EN** distribuídas em `hero.scenes.*`, `proof.stats|providersLabel|complianceLabel|founded`, `features.spotlight.*`. Removidas: `proof.sub`, `proof.ctaStory`, `features.items.whatsapp`. Audit-stale: zero drift através das 3 waves.

---

## Arquivos modificados nesta sessão (5 arquivos · 3 commits)

### Modificados
| Arquivo | Wave | Mudança |
|---------|:---:|---------|
| [src/components/home/Hero.tsx](src/components/home/Hero.tsx) | 1 | Eyebrow rotativo sincronizado + 2 hooks inline (`useVideoBgPolicy`, `useHeroScene`) + AnimatePresence crossfade + scene progress indicator (4 barrinhas) |
| [src/components/home/HeroVideo.tsx](src/components/home/HeroVideo.tsx) | 1 | Refactor: aceita `videoRef` + `shouldPlay` via props (lógica de policy movida pro Hero) |
| [src/components/home/Proof.tsx](src/components/home/Proof.tsx) | 2 | Reescrito: 4 stat tiles (`useFormatter` + SUPERCLINI_FACTS) + AI providers list + compliance list + founded year. Removido link `href="#"` morto |
| [src/components/home/Features.tsx](src/components/home/Features.tsx) | 3 | Bento grid: spotlight Sofía 2×2 (chat preview + CTA /sofia) + 8 tiles regulares. Eyebrow honesto "9 de 22" |
| [src/messages/pt.json](src/messages/pt.json) | 1+2+3 | +18 chaves (hero.scenes, proof.stats/labels/founded, features.spotlight). Removido proof.sub/ctaStory + features.items.whatsapp |
| [src/messages/es.json](src/messages/es.json) | 1+2+3 | idem PT |
| [src/messages/en.json](src/messages/en.json) | 1+2+3 | idem PT |
| [SITE-STATUS.md](SITE-STATUS.md) | meta | Scores recalculados, decisões e histórico atualizados |

### Commits desta sessão
- `8793f8a` Wave 1 — feat(hero): copy sincronizado às 4 cenas do video Runway
- `f401ea3` Wave 2 — feat(proof): trust block concreto consumindo SUPERCLINI_FACTS
- `95a2b0b` Wave 3 — feat(features): bento grid com spotlight Sofía

**Build local**: ✅ exit 0 · 29 páginas SSG · **First Load JS 102 KB shared MANTIDO** (zero regressão do budget crítico) · Home `/[locale]` 51.7→52.7 kB (+1 kB pelo bento spotlight)

**audit-stale**: ✅ zero drift em 3 files através das 3 waves

---

## Próximas prioridades (próxima sessão · alvo §15 score 8.5+)

Score atual: **7.75/10** · Alvo: 8.5/10 · Gap: 0.75

Pra fechar o gap de "brutal premium" no resto da home + landings:

1. **AISection premium pass** — title "Sofía + IA visual: o time de IA da sua clínica" é forte mas o layout de 3 cards pode virar showcase mais cinematográfico (talvez tabs interativas + mockups upgradados das 3 funções IA)
2. **Personas BAB** — copy "Para sua realidade" vira "Este é você, hoje" com framework Before-After-Bridge (pain mais visceral, benefit mais quantificado)
3. **CtaFinal memorável** — bg gradient brand-950, h2 maior, micro-copy específico ("Profesional · 14 dias · sem cartão · cancele em 1 click"), peso visual maior nos botões
4. **TrustStrip Bloomberg Terminal** — densidade de info, métricas vivas (já tem cifras via FACTS, falta densidade visual)
5. **FAQ reorganizado por intent** (tech / legal / pricing / onboarding) com tabs
6. **5 landings polish wave** — cada uma com mini-hero video opcional ou ilustração isométrica
7. **Refatorar `pricing.features.*` cotas** — gerar dinâmicas em Pricing.tsx via `SUPERCLINI_FACTS.aiQuotas` (elimina duplicação i18n × pricing.ts) — débito SSoT pendente
8. **Refatorar `faq.items.6.a`** — enumerar países via `COUNTRY_LIST.map(c => c.name[locale])`
9. **Sitemap expandido** + OG images por idioma (1200×630) + FAQPage Schema.org inline + BreadcrumbList sub-páginas
10. **Lighthouse CI** + bundle analyzer no PR (target ≥90)
11. **Resolver lint debt** — 4 componentes flagados (LocaleSwitcher, CountryContext, ThemeContext, fade-in-section)
12. **GitHub Actions deploy pipeline** — depende de respostas humano §10

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
| 2026-05-02 | MEGA SESSÃO — 5 landings + Hero MotionSites + Video Runway próprio + NavBar mega-menu + Footer SEO | Entregou em sequência: (1) landing /sofia + 7 componentes reutilizáveis em components/landing/; (2) landing /ia-clinica; (3) landing /clinico + NavBar dropdown "Recursos" + site-nav.ts SSoT; (4) landing /totem + Footer com cross-linking de todas landings; (5) landing /automatizacoes; (6) Hero refeito MotionSites Apple-style com ShinyText framer-motion + NavBar transparent topo da home; (7) HeroVideo com perf best practices (mobile-off, save-data, IntersectionObserver, reduced-motion); (8) Video Runway próprio (Kling 3.0 Pro, 15s, 4 cenas: WhatsApp → totem → secretária IA → dentista) com 6 otimizações ffmpeg (H.264 + WebM dual-codec + 720p tablet + posters WebP + cross-fade loop). Sitemap final: 24 URLs (5 landings × 3 locales + home + contato + privacidade + sitemap/robots). | 6.5 / 7.4 |
| 2026-05-03 | BRUTAL PREMIUM Waves 1-3 — Hero scene tracker + Proof concreto + Features bento | (1) Hero ESPECTACULAR: copy sincronizado ao video Runway via requestAnimationFrame, eyebrow rotativo formato "01/04 · Sofía no WhatsApp · 24/7" trocando a cada 3.75s, AnimatePresence crossfade 350ms, scene progress indicator 4 barrinhas, fallback cycle 4s mobile/save-data, reduced-motion trava em cena 0, aria-live polite. Refator HeroVideo aceita videoRef+shouldPlay via props. (2) Proof rebuild: substituiu "1 ícone heart + texto vago + link href=# morto" por trust block com 4 telemetry tiles consumindo SUPERCLINI_FACTS (1.925 testes / 9 países / 8 moedas / 3 providers IA) + lista AI providers + lista compliance + linha founded year. Server Component, dl/dt/dd semântico. (3) Features bento grid: spotlight Sofía 2×2 desktop com chat preview de 2 bubbles + CTA /sofia, 8 tiles regulares 1×1, removido items.whatsapp (subsumido), eyebrow honesto "9 destaques de 22 módulos". 3 commits sequenciais (8793f8a, f401ea3, 95a2b0b). First Load JS shared 102 KB MANTIDO, home +1 kB. 18 chaves i18n novas em PT/ES/EN, audit zero drift. | 7.4 / 7.75 |

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
