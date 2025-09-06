// components/UnitGallery.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import type { UnitDetail } from "@/data/units";

export default function UnitGallery({ unit }: { unit: UnitDetail }) {
  if (!unit.gallery || unit.gallery.length === 0) return null;

  // Configura carrossel automático
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1, spacing: 15 },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000); // 3 segundos por slide
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
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
            style={{ aspectRatio: "4 / 3" }}
          >
            <Image
              src={g.src}
              alt={g.alt || `Imagem ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 400px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
