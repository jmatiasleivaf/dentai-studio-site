import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://superclini.com"),
  title: {
    default: "SuperClini",
    template: "%s — SuperClini",
  },
  icons: {
    icon: [{ url: "/icon-superclini.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

// O <html> + <body> vivem em [locale]/layout.tsx para permitir lang={locale}
// dinâmico (crítico para SEO multi-idioma — Google penaliza lang errado).
// Padrão recomendado pelo next-intl 3.x.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
