// app/competicao/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const IMAGES = [
  "/pro/1.jpeg",
  "/pro/2.jpeg",
  "/pro/3.jpeg",
  "/pro/4.jpeg",
  "/pro/5.jpeg",
  "/pro/6.jpeg",
  "/pro/7.jpeg",
  "/pro/8.jpeg",
  "/pro/9.jpeg",
  "/pro/10.jpeg",
  "/pro/11.jpeg",
  "/pro/12.jpeg",
  "/pro/13.jpeg",
];

const AUTOPLAY_MS = 4500; // 0 para desativar autoplay

export default function Page() {
  // --- slider state ---
  const [i, setI] = useState(0);
  const count = IMAGES.length;

  const next = () => setI((v) => (v + 1) % count);
  const prev = () => setI((v) => (v - 1 + count) % count);

  // swipe em touch
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) (dx > 0 ? prev : next)();
    startX.current = null;
  };

  // teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // autoplay com pausa em aba oculta
  useEffect(() => {
    if (!AUTOPLAY_MS) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") next();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, count]);

  // ids para acessibilidade
  const ids = useMemo(() => IMAGES.map((_, k) => `comp-slide-${k}`), []);

  return (
    <main>
      {/* Resumo / cards de topo */}
      <section className="container py-10">
        <h1 className="h1">Time de Competição</h1>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="card p-4">
            <div className="text-2xl font-extrabold leading-none">+20</div>
            <div className="text-xs opacity-80 mt-1">atletas ativos</div>
          </div>
          <div className="card p-4">
            <div className="text-2xl font-extrabold leading-none">100%</div>
            <div className="text-xs opacity-80 mt-1">apoio da equipe</div>
          </div>
          <div className="card p-4">
            <div className="text-base font-bold leading-tight whitespace-normal break-words">
              Todas
            </div>
            <div className="text-xs opacity-80 mt-1 leading-snug">
              as idades & níveis
            </div>
          </div>
          <div className="card p-4">
            <div className="text-base font-bold leading-tight whitespace-normal break-words">
              Calendário
            </div>
            <div className="text-xs opacity-80 mt-1 leading-snug">
              regional e nacional
            </div>
          </div>
        </div>
      </section>

      {/* SLIDER COM SETAS */}
      <section className="container pb-14">
        <h2 className="h2">Nosso time em ação</h2>
        <p className="p mt-2 opacity-80">
          Arraste pro lado no celular, use as setas no teclado, ou clique nas
          setas.
        </p>

        <div
          className="relative mt-6 rounded-2xl overflow-hidden border bg-white/5"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
          aria-label="Galeria — Time de competição"
        >
          {/* área visível do slide */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[7/3]">
            {/* transição cross-fade simples */}
            {IMAGES.map((src, k) => (
              <div
                key={src}
                id={ids[k]}
                aria-hidden={k !== i}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  k === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`Foto ${k + 1} do time em competição`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 100vw"
                  priority={k === 0}
                />
              </div>
            ))}
          </div>

          {/* botões setas */}
          <button
            aria-label="Slide anterior"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border bg-black/40 hover:bg-black/60 backdrop-blur flex items-center justify-center"
          >
            ‹
          </button>
          <button
            aria-label="Próximo slide"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border bg-black/40 hover:bg-black/60 backdrop-blur flex items-center justify-center"
          >
            ›
          </button>

          {/* indicadores (dots) */}
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
            {IMAGES.map((_, k) => (
              <button
                key={k}
                aria-label={`Ir para imagem ${k + 1}`}
                aria-controls={ids[k]}
                onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${
                  i === k ? "w-8 bg-white" : "w-2 bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="container pb-16">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Vem competir com a gente</h3>
            <p className="text-sm opacity-80 mt-1">
              Fale com seu professor: categoria, inscrição, preparação — a gente
              te guia.
            </p>
          </div>
          <a
            className="btn-primary"
            href="https://wa.me/5571991843706?text=Ol%C3%A1!%20Quero%20informacoes%20sobre%20o%20time%20de%20competicao."
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
