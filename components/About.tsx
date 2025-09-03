// components/About.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

// 👉 coloque as imagens em /public e ajuste os nomes aqui:
const SLIDES = [
  { src: "/s.jpeg", alt: "Treino na Bruxo Team" },
  { src: "/s2.jpeg", alt: "Equipe reunida" },
  { src: "/s3.jpeg", alt: "Aula em andamento" },
  { src: "/s4.jpeg", alt: "Treino na Bruxo Team" },
  { src: "/s5.jpeg", alt: "Equipe reunida" },
];

const AUTOPLAY_MS = 5000;

export default function About() {
  const [i, setI] = useState(0);
  const count = SLIDES.length;

  // timer no browser + cleanup seguro
  const timerRef = useRef<number | null>(null);
  const hoverRef = useRef(false);

  const next = () => setI((v) => (v + 1) % count);
  const prev = () => setI((v) => (v - 1 + count) % count);

  // autoplay (pausa em hover/aba oculta)
  useEffect(() => {
    const tick = () => {
      if (!hoverRef.current && document.visibilityState === "visible") next();
    };
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = window.setInterval(tick, AUTOPLAY_MS);
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [i, count]);

  // ids p/ acessibilidade
  const ids = useMemo(() => SLIDES.map((_, k) => `about-slide-${k}`), []);

  // swipe touch
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) dx > 0 ? prev() : next();
    startX.current = null;
  };

  return (
    <section id="sobre" className="container py-16 section">
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* texto */}
        <div className="md:col-span-7">
          <h2 className="h2">Quem somos</h2>
          <p className="p mt-4">
            <strong>
              Fundada em 2019 pelo professor Tiago Ferreira “Bruxo”, a Bruxo
              Team Jiu-Jitsu nasceu do sonho de construir mais do que uma
              academia: uma verdadeira família dentro das artes marciais.
            </strong>{" "}
            Com uma trajetória que começou em 1995, Tiago mergulhou no universo
            do Jiu-Jitsu com disciplina e paixão, trilhando um longo caminho
            como aluno, competidor e professor.
          </p>
          <p className="p mt-4">
            Guiada por valores como{" "}
            <strong>respeito, humildade e persistência</strong>, a equipe{" "}
            <strong>cresceu e se consolidou em Salvador</strong>, reunindo
            alunos de diferentes idades e histórias, sempre com o objetivo de
            <strong> transformar vidas por meio do esporte</strong>.
          </p>
          <p className="p mt-4">
            Hoje, a Bruxo Team representa um{" "}
            <strong>movimento de fortalecimento pessoal e coletivo</strong>,
            onde cada treino é uma oportunidade de evolução
            <strong> dentro e fora do tatame</strong>.
          </p>
        </div>

        {/* carrossel (sem cortar rostos) */}
        <div className="md:col-span-5">
          <div
            className="relative w-full rounded-2xl overflow-hidden border bg-black/20"
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            aria-roledescription="carousel"
            aria-label="Galeria — Sobre a Bruxo Team"
          >
            {/* mantém proporção e usa object-contain */}
            <div className="relative aspect-[4/3] md:aspect-[4/3]">
              {SLIDES.map((s, k) => (
                <div
                  key={s.src}
                  id={ids[k]}
                  aria-hidden={k !== i}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    k === i ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-contain"
                    priority={k === 0}
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {SLIDES.map((_, k) => (
                <button
                  key={k}
                  aria-label={`Ir para imagem ${k + 1}`}
                  aria-controls={ids[k]}
                  onClick={() => setI(k)}
                  className={`h-2 rounded-full transition-all ${
                    i === k
                      ? "w-8 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA → scroll para Unidades */}
          <Link href="/#unidades" className="btn-primary mt-4 inline-flex">
            Quero me matricular agora
          </Link>
        </div>
      </div>
    </section>
  );
}
