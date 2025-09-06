"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import type { UnitDetail } from "@/data/units";

export default function UnitGallery({ unit }: { unit: UnitDetail }) {
  if (!unit.gallery || unit.gallery.length === 0) return null;

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1, spacing: 16 },
      renderMode: "performance",
    },
    [
      (slider) => {
        let t: ReturnType<typeof setTimeout>;
        let over = false;
        const clear = () => clearTimeout(t);
        const next = () => {
          clear();
          if (over) return;
          t = setTimeout(() => slider.next(), 3000);
        };
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            over = true; clear();
          });
          slider.container.addEventListener("mouseout", () => {
            over = false; next();
          });
          next();
        });
        slider.on("dragStarted", clear);
        slider.on("animationEnded", next);
        slider.on("updated", next);
      },
    ]
  );

  return (
    <section className="container py-8">
      <h2 className="h2 mb-4">Galeria</h2>

      <div ref={sliderRef} className="keen-slider">
        {unit.gallery.map((g, i) => (
          <div
            key={(g.src ?? "img") + i}
            className="keen-slider__slide relative overflow-hidden rounded-xl bg-white/5"
            // Fallback: mantém aspect-ratio em browsers antigos
            style={{ aspectRatio: "4 / 3", paddingTop: "75%" }}
          >
            <Image
              src={g.src}
              alt={g.alt || `Imagem ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}