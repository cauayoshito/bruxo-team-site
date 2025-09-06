"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Img = { src: string; alt?: string; width?: number; height?: number };

type Props = {
  images: Img[];
  /** ms entre slides (default 3500) */
  interval?: number;
  /** proporção visual do slide (default 4/3) */
  aspect?: `${number} / ${number}` | string;
  /** tamanho do Image.sizes (default 100vw) */
  sizes?: string;
};

export default function GalleryCarousel({
  images,
  interval = 3500,
  aspect = "4 / 3",
  sizes = "100vw",
}: Props) {
  const safe = useMemo(() => images.filter(Boolean), [images]);
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);
  const hovering = useRef(false);

  // autoplay
  useEffect(() => {
    stop();
    if (safe.length <= 1) return;
    timer.current = window.setInterval(() => {
      if (!hovering.current) setI((p) => (p + 1) % safe.length);
    }, interval);
    return stop;
  }, [safe.length, interval]);

  function stop() {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }

  function go(n: number) {
    setI((p) => {
      const next = (p + n + safe.length) % safe.length;
      return next;
    });
  }

  if (!safe.length) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-white/5"
      style={{ aspectRatio: aspect }}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      {/* Slides */}
      {safe.map((img, idx) => (
        <div
          key={(img.src ?? "img") + idx}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === idx ? 1 : 0 }}
          aria-hidden={i !== idx}
        >
          <Image
            src={img.src}
            alt={img.alt || `Imagem ${idx + 1}`}
            fill
            className="object-cover"
            sizes={sizes}
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Controles */}
      {safe.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/55"
            onClick={() => go(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Próxima"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/55"
            onClick={() => go(1)}
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {safe.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Ir para imagem ${idx + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === idx ? "bg-white" : "bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => setI(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
