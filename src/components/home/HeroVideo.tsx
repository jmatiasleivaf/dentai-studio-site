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
 * O `videoRef` e `shouldPlay` vêm do parent (Hero) via `useVideoBgPolicy`,
 * permitindo que o Hero leia `currentTime` do video pra sincronizar copy.
 */
const VIDEOS = {
  posterDesktop: "/videos/hero/hero-poster-1080.webp",
  posterMobile: "/videos/hero/hero-poster-mobile.webp",
  webm: "/videos/hero/hero-1080.webm",
  mp4: "/videos/hero/hero-1080.mp4",
} as const;

type Props = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  shouldPlay: boolean;
};

export function HeroVideo({ videoRef, shouldPlay }: Props) {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
