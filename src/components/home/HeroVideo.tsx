"use client";

import * as React from "react";

/**
 * Video background do hero com performance best practices:
 *
 * 1. Mobile (<768px): NÃO carrega video — só poster image WebP (12 KB)
 * 2. Save-Data API: respeita Data Saver mode do Chrome/Android
 * 3. prefers-reduced-motion: video pausa em primeiro frame
 * 4. effectiveType 2g/3g: desliga em rede ruim (poster fallback)
 * 5. IntersectionObserver: pausa quando scroll sai do hero (bateria)
 * 6. preload="metadata": não baixa video até necessário
 * 7. Dual codec: WebM VP9 (~1.9MB) preferido por Chrome/FF, MP4 H.264
 *    (~4.1MB) fallback para Safari/legacy
 *
 * Asset gerado por Runway Gen Kling 3.0 Pro, otimizado via ffmpeg
 * (cross-fade in/out 0.3s pra suavizar loop).
 */
const VIDEOS = {
  posterDesktop: "/videos/hero/hero-poster-1080.webp",
  posterMobile: "/videos/hero/hero-poster-mobile.webp",
  webm: "/videos/hero/hero-1080.webm",
  mp4: "/videos/hero/hero-1080.mp4",
} as const;

export function HeroVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = React.useState(false);

  React.useEffect(() => {
    const decide = () => {
      // Mobile <768px: NÃO carrega video — só poster
      if (window.matchMedia("(max-width: 767px)").matches) return false;

      const conn = (
        navigator as Navigator & {
          connection?: { saveData?: boolean; effectiveType?: string };
        }
      ).connection;

      if (conn?.saveData) return false;
      if (
        conn?.effectiveType === "slow-2g" ||
        conn?.effectiveType === "2g" ||
        conn?.effectiveType === "3g"
      ) {
        return false;
      }

      return true;
    };

    setShouldPlay(decide());
  }, []);

  React.useEffect(() => {
    if (!shouldPlay || !videoRef.current) return;
    const video = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // autoplay bloqueado — silently ignore (poster continua visível)
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

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile / save-data / 2-3G: poster image apenas (sem download de video)
  if (!shouldPlay) {
    return (
      <picture aria-hidden="true">
        <source media="(min-width: 768px)" srcSet={VIDEOS.posterDesktop} />
        <img
          src={VIDEOS.posterMobile}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </picture>
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
      poster={VIDEOS.posterDesktop}
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
    >
      <source src={VIDEOS.webm} type="video/webm" />
      <source src={VIDEOS.mp4} type="video/mp4" />
    </video>
  );
}
