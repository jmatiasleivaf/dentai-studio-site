import type { CountryCode } from "@/lib/countries";

/**
 * Bandeiras em SVG por código de país.
 *
 * Por que não emoji: além da regra de marca (iconografia é vetorial, nunca
 * emoji), há um bloqueio técnico real. O Chromium no Windows NÃO renderiza
 * bandeira emoji: mostra as letras do código ("CL") em vez da bandeira. A
 * memória do estúdio de vídeo registra o mesmo. Um site que serve 70% de
 * tráfego mobile e roda em navegadores variados não pode depender disso.
 *
 * Desenho: proporção 3:2, cantos levemente arredondados, traço fiel o
 * suficiente para reconhecimento em tamanho pequeno. Cada bandeira é um grupo
 * de formas simples, sem imagem externa, sem dependência de pacote.
 */

const VIEW = "0 0 30 20";

function base(children: React.ReactNode, extra?: React.ReactNode) {
  return (
    <>
      {extra}
      {children}
    </>
  );
}

const FLAGS: Record<CountryCode, React.ReactNode> = {
  // Chile: branco em cima, vermelho embaixo, cantón azul com estrela
  CL: (
    <>
      <rect width="30" height="10" fill="#fff" />
      <rect y="10" width="30" height="10" fill="#d52b1e" />
      <rect width="10" height="10" fill="#0039a6" />
      <path
        d="M5 2.6l.8 2.4h2.5l-2 1.5.8 2.4-2-1.5-2 1.5.8-2.4-2-1.5H4.2z"
        fill="#fff"
      />
    </>
  ),
  // Brasil: verde, losango amarelo, círculo azul
  BR: (
    <>
      <rect width="30" height="20" fill="#009c3b" />
      <path d="M15 3l11 7-11 7-11-7z" fill="#ffdf00" />
      <circle cx="15" cy="10" r="4" fill="#002776" />
    </>
  ),
  // Colômbia: amarelo (metade), azul, vermelho
  CO: (
    <>
      <rect width="30" height="10" fill="#fcd116" />
      <rect y="10" width="30" height="5" fill="#003893" />
      <rect y="15" width="30" height="5" fill="#ce1126" />
    </>
  ),
  // Argentina: celeste, branco, celeste, sol
  AR: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.7" fill="#74acdf" />
      <rect y="13.3" width="30" height="6.7" fill="#74acdf" />
      <circle cx="15" cy="10" r="2.2" fill="#f6b40e" />
    </>
  ),
  // México: verde, branco, vermelho
  MX: (
    <>
      <rect width="10" height="20" fill="#006847" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#ce1126" />
      <circle cx="15" cy="10" r="1.8" fill="#8b5a2b" />
    </>
  ),
  // Peru: vermelho, branco, vermelho (vertical)
  PE: (
    <>
      <rect width="10" height="20" fill="#d91023" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#d91023" />
    </>
  ),
  // EUA: listras + cantón (simplificado)
  US: (
    <>
      <rect width="30" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((y) => (
        <rect key={y} y={(y * 20) / 13} width="30" height={20 / 13} fill="#b22234" />
      ))}
      <rect width="13" height={(20 / 13) * 7} fill="#3c3b6e" />
    </>
  ),
  // Espanha: vermelho, amarelo (dobro), vermelho
  ES: (
    <>
      <rect width="30" height="20" fill="#c60b1e" />
      <rect y="5" width="30" height="10" fill="#ffc400" />
    </>
  ),
  // Portugal: verde (2/5), vermelho, escudo
  PT: (
    <>
      <rect width="30" height="20" fill="#da291c" />
      <rect width="12" height="20" fill="#046a38" />
      <circle cx="12" cy="10" r="2.6" fill="#ffe600" stroke="#fff" strokeWidth="0.4" />
    </>
  ),
};

export function Flag({
  code,
  className = "",
  title,
}: {
  code: CountryCode;
  className?: string;
  title?: string;
}) {
  const shape = FLAGS[code];
  if (!shape) return null;
  return (
    <svg
      viewBox={VIEW}
      className={`inline-block h-3.5 w-[21px] shrink-0 rounded-[2px] ${className}`}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {base(shape)}
    </svg>
  );
}
