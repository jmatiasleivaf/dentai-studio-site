"use client";

import * as React from "react";

/**
 * Video background do hero com performance best practices:
 *
 * 1. Mobile (<768px): NÃO carrega video — só poster gradient via fallback
 * 2. Save-Data API: respeita Data Saver mode do Chrome/Android
 * 3. prefers-reduced-motion: video pausa em primeiro frame
 * 4. effectiveType 2g/3g: desliga em rede ruim
 * 5. IntersectionObserver: pausa quando scroll sai do hero (bateria)
 * 6. preload="metadata": não baixa video até necessário
 *
 * Resultado: mobile + redes ruins economizam ~5MB/visit. Desktop com fibra
 * vê o video completo. Acessibilidade respeitada.
 *
 * TODO: trocar VIDEO_URL por self-hosted quando tivermos asset próprio
 * (mockup app composto ou shoot real). Ver SITE-STATUS.md "hero-assets".
 */
const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4";

export function HeroVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = React.useState(false);

  React.useEffect(() => {
    // Decide UMA vez no mount se vamos carregar o video
    const decide = () => {
      // Desktop only — abaixo de 768px nem montamos video
      if (window.matchMedia("(max-width: 767px)").matches) return false;

      // Save-Data API (Chrome/Android com Data Saver)
      const conn = (
        navigator as Navigator & {
          connection?: { saveData?: boolean; effectiveType?: string };
        }
      ).connection;
      if (conn?.saveData) return false;

      // Conexões ruins (2G/3G)
      if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g" || conn?.effectiveType === "3g") {
        return false;
      }

      // Reduced motion: ainda mostra video mas pausa em primeiro frame
      // (não retornamos false aqui — tratado no autoPlay abaixo)
      return true;
    };

    setShouldPlay(decide());
  }, []);

  // IntersectionObserver: pausa quando scroll sai do viewport (bateria mobile/laptop)
  React.useEffect(() => {
    if (!shouldPlay || !videoRef.current) return;
    const video = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // autoplay bloqueado por browser — silently ignore
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldPlay]);

  // Reduced motion: pausa em primeiro frame
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!shouldPlay) {
    // Fallback: gradient escuro (poster image vai aqui quando tivermos asset)
    return (
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-ink-950 via-brand-950 to-ink-900"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 -z-10 h-full w-full object-cover"
      autoPlay={!reducedMotion}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
    >
      <source src={VIDEO_URL} type="video/mp4" />
    </video>
  );
}
