# CLAUDE.md — SuperClini Site Institucional

> Regras operacionais e contexto do **site institucional** SuperClini.
> Para regras do app SaaS (`dentai-studio`), ver `../dentai-studio/CLAUDE.md`.
> Para missão estratégica completa (escopo, waves, princípios), ver
> `C:\Users\User\Documents\SuperClini\PROMPT-SITE-INSTITUCIONAL-MASTER.md`.

---

## 0. Identidade

- **Repo**: `C:\Users\User\Documents\dentai-studio-site` · GitHub: `jmatiasleivaf/dentai-studio-site`
- **Domínio prod**: `https://superclini.com` (Cloudflare, no ar)
- **Sem ambiente staging** — merge para `main` vai direto produção (deploy manual via SSH na VPS Hostinger)
- **Stack**: Next.js 15.5 · React 19 · TypeScript strict · next-intl 3 · Tailwind 3 · Radix · Framer Motion · Lucide
- **Branch de trabalho**: `feat/nextjs-revamp` (rebaseado em `main` após cada merge)

---

## 1. Comandos essenciais

```bash
npm run dev             # http://localhost:3000 (redireciona pra /es, /pt ou /en)
npm run build           # build standalone (Docker)
npm run lint            # ESLint flat config (eslint-config-next v16)
npm run audit-stale     # detector de drift em messages/*.json (zero drift = ok)
```

**Pre-commit checklist**:
1. `npm run audit-stale` (zero drift)
2. `npm run build` (exit 0)
3. `git status` (sem arquivos de teste/lixo)

**NUNCA** `git commit --no-verify`.

---

## 2. Single Source of Truth (SSoT) inviolável

| Fato | Fonte única | Site importa de |
|------|-------------|-----------------|
| Tests count, módulos, cotas IA, foundedYear, providers IA | `src/lib/superclini.facts.ts` | i18n via placeholder `{count}` |
| Preços por país | `src/lib/pricing.ts` (PRICING) | Pricing.tsx via PRICING import |
| Países / moedas / locales | `src/lib/countries.ts` (COUNTRY_LIST) | tudo que precisa enumerar países |
| Tier names + features matrix | `src/lib/pricing.ts` (PLANS, PLAN_MATRIX) | Pricing.tsx, PricingMatrix.tsx |
| Estrutura de navegação landings | `src/lib/site-nav.ts` (NAV_RESOURCES) | NavBar dropdown + Footer |
| Strings de UI multi-idioma | `src/messages/{es,pt,en}.json` | next-intl `useTranslations` |
| Schema lead form | `src/lib/lead-schema.ts` | ContactForm |

**REGRA INVIOLÁVEL**: nunca hardcode número de produto em string i18n. Sempre placeholder `{count}` consumido via `t(key, { count: SUPERCLINI_FACTS.x })`. O `npm run audit-stale` falha se detectar drift.

---

## 3. Padrões obrigatórios

### Server Components default
- `"use client"` apenas quando precisa state, effects, browser API, ou ContactDialog
- Server pages que precisam abrir ContactDialog usam `<ContactCTAButton>` (wrapper Client) — **nunca passar função `trigger` direto** (RSC error)

### i18n PT/ES/EN
- Toda string nova **obrigatoriamente** nos 3 idiomas
- Chaves estruturadas por feature/page (`hero.*`, `sofiaPage.*`, `clinicoPage.*`, etc.)
- Pluralização via ICU MessageFormat (next-intl suporta)
- Datas/moedas via `formatCurrency` em `lib/countries.ts`

### Mobile-first
- Design começa em 375px viewport
- Tap targets ≥44px (44×44 mínimo iOS, 48×48 Android material)
- Tipografia fluida (`text-fluid-base`, etc.)
- 70%+ tráfego LATAM é mobile — site que quebra em mobile é site morto

### Inviáveis
- **NUNCA** mexer no app SaaS (`dentai-studio/*`) — escopo é apenas o site institucional
- **NUNCA** `--no-verify` no commit
- **NUNCA** subir mudança sem build local OK
- **NUNCA** adicionar tracking sem consent (LGPD/GDPR)
- **NUNCA** hardcode fact em messages/*.json — sempre placeholder + facts.ts
- **NUNCA** mudar URL de página existente sem 301 redirect (mata SEO)
- **NUNCA** subir código em produção sem alguém revisar (não há CI gate, gate é humano)
- **SEMPRE** confirmar com humano antes de: redesign visual, mudança de copy estratégica, nova página, mudança de arquitetura, deploy production

---

## 4. Estrutura de pastas

```
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx                    ← home (Hero, AISection, Features, Personas, Pricing, etc.)
│   │   ├── sofia/page.tsx              ← landing /sofia (WhatsApp Sofía)
│   │   ├── ia-clinica/page.tsx         ← landing /ia-clinica (Simulação + Análise Radiográfica)
│   │   ├── clinico/page.tsx            ← landing /clinico (Odontograma + DICOM + Exames)
│   │   ├── totem/page.tsx              ← landing /totem (Recepção autoatendimento)
│   │   ├── automatizacoes/page.tsx     ← landing /automatizacoes (Caixa + Liquidações + Memberships + Cobrança)
│   │   ├── contato/page.tsx
│   │   ├── privacidade/page.tsx
│   │   └── layout.tsx                  ← html lang dinâmico, fonts, JSON-LD Organization+SoftwareApplication, hreflang multi-país
│   ├── layout.tsx                      ← root mínimo (só metadata, sem html — está em [locale]/layout)
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts                      ← 5 rotas × 3 locales + utility (24 URLs)
├── components/
│   ├── home/                           ← seções da home (Hero, HeroVideo, AISection, Pricing, etc.)
│   ├── landing/                        ← framework reutilizável de landings
│   │   ├── LandingHero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── FeatureBlock.tsx
│   │   ├── UseCases.tsx
│   │   ├── Comparison.tsx
│   │   ├── LandingFAQ.tsx
│   │   ├── LandingCTA.tsx
│   │   ├── ChatMockup.tsx
│   │   ├── ContactCTAButton.tsx        ← wrapper Client de ContactDialog (resolve RSC error)
│   │   └── ShinyText.tsx               ← efeito gradient sweep framer-motion
│   ├── forms/ContactForm.tsx
│   ├── layout/                         ← NavBar (com dropdown Recursos), Footer (cross-linking SEO)
│   └── ui/                             ← primitivos (Container, Section, Badge, Button)
├── contexts/
│   ├── CountryContext.tsx              ← detecção + persistência geo
│   └── ThemeContext.tsx
├── i18n/
│   ├── routing.ts                      ← next-intl config (LOCALES = es | pt | en)
│   ├── navigation.ts                   ← Link tipado para locale-aware
│   └── request.ts
├── lib/
│   ├── countries.ts                    ← 9 países (codes, currencies, flags, formatters)
│   ├── pricing.ts                      ← 4 tiers + matrix + per-país (Esencial/Profesional/Avanzado/Corporativo)
│   ├── superclini.facts.ts             ← SSoT fatos quantitativos
│   ├── site-nav.ts                     ← SSoT estrutura nav (NAV_RESOURCES)
│   ├── lead-schema.ts                  ← Zod schema do form
│   └── utils.ts
├── messages/
│   ├── es.json                         ← ~700+ chaves (default LATAM)
│   ├── pt.json                         ← ~700+ chaves (BR)
│   └── en.json                         ← ~700+ chaves (US/global)
└── middleware.ts                       ← next-intl locale + geo redirect

public/
├── icon-superclini.svg
├── logo-superclini.svg
├── logo-superclini-white.svg
├── showcase/                           ← screenshots reais (smile-antes.png, smile-depois.png)
└── videos/hero/                        ← assets do hero video
    ├── hero-1080.mp4                   ← H.264 desktop fallback (4.1MB)
    ├── hero-1080.webm                  ← VP9 Chrome/FF preferido (1.9MB)
    ├── hero-720.mp4                    ← tablet alt (1.3MB, disponível)
    ├── hero-poster-1080.webp           ← poster desktop (32KB)
    ├── hero-poster-mobile.webp         ← poster mobile + fallback (12KB)
    └── runway-narrativa-v1.mp4         ← source local (18MB, NÃO comitar — gitignored)

scripts/
└── audit-stale.mjs                     ← detector de drift (npm run audit-stale)

eslint.config.mjs                       ← flat config nativo eslint-config-next v16
.gitignore                              ← inclui /public/videos/hero/runway-*.mp4
docker-compose.example.yml              ← referência infra (real fica na VPS)
SITE-STATUS.md                          ← diário operacional vivo (LER ANTES DE QUALQUER SESSÃO)
```

---

## 5. Deploy ops (VPS Hostinger)

**Sem CI/CD** — deploy manual via SSH. Detalhes completos em memory `project_superclini_site_deploy_ops.md`.

**Procedimento condensado**:
```bash
# Sempre dentro de tmux (terminal web Hostinger cai)
tmux new -s deploy-site

# Comando deploy:
cd /opt/dentai-studio-site && \
git pull origin main --ff-only && \
time docker compose build site && \
docker compose up -d --no-deps site && \
sleep 35 && docker ps --filter "name=dentai-site" --format "{{.Names}}: {{.Status}}" && \
docker logs --since 90s dentai-site 2>&1 | grep -ciE "(MISSING_MESSAGE|error)" | xargs echo "Erros:"
```

- Path canônico VPS: `/opt/dentai-studio-site` (path `/root/dentai-studio-site` é duplicata legada — IGNORAR)
- Container: `dentai-site` (image `dentai-studio-site-site`)
- Network: `dentai-studio_default` (external, compartilhada com app DentAI)
- Reverse proxy: container `dentai-nginx` (porta 80) → `/etc/nginx/sites-enabled/superclini` → `dentai-site:3000`
- `docker-compose.yml` na VPS é UNTRACKED no git (referência committed em `docker-compose.example.yml`)
- Build cache cresce ~25GB rapidamente — `docker builder prune -af` quando disco passar 70%

**Tempos típicos**:
- Build cold cache (após prune): ~3min
- Build warm cache (só `next build`): ~1m30s-2min
- Container ready: ~140ms
- Healthcheck: ~40s (start_period configurado)

---

## 6. Validações pós-deploy padrão

```bash
# 1. Health
curl -sI https://superclini.com/ | head -3

# 2. Zero MISSING_MESSAGE
docker logs --since 90s dentai-site | grep -c MISSING_MESSAGE

# 3. Placeholders SSoT renderizam
curl -s https://superclini.com/pt | grep -oE "(1925 testes|22 módulos|9 países)"

# 4. Landings respondem
curl -sI https://superclini.com/pt/sofia | head -1
curl -sI https://superclini.com/pt/ia-clinica | head -1
curl -sI https://superclini.com/pt/clinico | head -1
curl -sI https://superclini.com/pt/totem | head -1
curl -sI https://superclini.com/pt/automatizacoes | head -1

# 5. Sitemap
curl -s https://superclini.com/sitemap.xml | grep -c "<loc>"  # esperado 24

# 6. Hreflang multi-país
curl -s https://superclini.com/pt | grep -oE 'lang="[a-z]{2}"' | head -1  # esperado lang="pt"

# 7. Schema.org
curl -s https://superclini.com/pt | grep -c "FAQPage"  # esperado >0

# 8. Hero video
curl -sI https://superclini.com/videos/hero/hero-1080.webm | head -1
```

---

## 7. Estado atual (2026-05-02)

- **5 landing pages live** (`/sofia`, `/ia-clinica`, `/clinico`, `/totem`, `/automatizacoes`)
- **Hero próprio** com vídeo Runway/Kling 3.0 Pro (15s, 4 cenas narrativas, 6 otimizações ffmpeg)
- **NavBar dropdown** "Recursos" + **Footer cross-linking** SEO
- **24 URLs no sitemap** com hreflang multi-país (12+ variantes)
- **Schema.org** Organization + SoftwareApplication + FAQPage por landing
- **First Load JS shared 102 KB** (mantido estável)
- Score médio: **7.4/10**

---

## 8. Workflow recorrente

1. **Início da sessão**: ler `SITE-STATUS.md` (diário vivo) + esta CLAUDE.md
2. **Antes de mudar copy estratégico/visual**: confirmar com humano
3. **Toda mudança em UI**: mobile-first verificado
4. **Toda mudança em messages**: PT/ES/EN simultâneos
5. **Toda mudança em facts**: rodar `npm run audit-stale` antes de commit
6. **Toda landing nova**: adicionar em `lib/site-nav.ts` (`available: true`) + `app/sitemap.ts`
7. **Final da sessão**: atualizar `SITE-STATUS.md` com tudo entregue + scores + próximas prioridades

---

## 9. 🤝 Divisão de responsabilidades — Matias só VPS, Claude todo o resto

**TRANSVERSAL** a este projeto e qualquer outro. Cravado 2026-05-03.

**Matias executa APENAS:**
- Comandos na VPS Hostinger via console SSH (cam.hostingervps.com) — só ele tem acesso físico
- Decisões de produto/copy/visual que precisam aprovação dele
- Cliques em UI quando exigem credenciais físicas (login OAuth, 2FA, re-auth bcrypt)

**Claude executa TUDO o resto sozinho — NUNCA pedir pra Matias:**

| Tarefa | Como Claude faz |
|--------|-----------------|
| `npm run dev` local | `Bash run_in_background` + curl localhost:3000 pra validar |
| `npm run build` / `npm run lint` / `npm run audit-stale` | `Bash` direto |
| Capturar screenshot de página | Playwright headless (instalado em `C:/Users/User/Documents/SuperClini/`) — salva em path destino, converte pra WebP via sharp |
| Otimizar imagem (resize, WebP, AVIF) | `sharp` CLI ou `npx @squoosh/cli` |
| Pipeline de vídeo (H.264, WebM, posters WebP, 720p alt) | `ffmpeg` direto via Bash |
| Baixar URL CloudFront/S3 | `curl -O` |
| Push pra GitHub, criar PR, comentar | Git local + GitHub API com PAT cacheado (Git Credential Manager) |
| Validar deploy do site | curl externo `https://superclini.com/{es,pt,en}` + grep `MISSING_MESSAGE` |
| Ler logs do container `dentai-site` | precisa Matias: `docker logs dentai-site --tail 100` (VPS-only) |

**Quando precisar de algo da VPS:** Claude manda **UM** bloco copia-cola completo, com saída esperada. Tmux obrigatório se >10s.

**Memória**: ver `~/.claude/projects/.../memory/feedback_responsabilidades_deploy.md` (transversal a todos projetos).
