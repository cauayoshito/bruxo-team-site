"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import type { ProjectDetail } from "@/data/projects";

type Props = {
  project: Pick<ProjectDetail, "gallery">;
  title?: string;
};

export default function ProjectGallery({ project, title = "Galeria" }: Props) {
  const items = project.gallery ?? [];
  if (items.length === 0) return null;

  // Igual à galeria que você quer: 1 slide por vez (todas as larguras) e autoplay
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      renderMode: "performance",
      slides: { perView: 1, spacing: 12 }, // sempre 1
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
          timeout = setTimeout(() => slider.next(), 3000);
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
      <h2 className="h2 mb-4">{title}</h2>

      <div ref={sliderRef} className="keen-slider">
        {items.map((g, i) => (
          <div
            key={`${g.src || "img"}-${i}`}
            className="keen-slider__slide relative overflow-hidden rounded-xl bg-white/5"
            // Aspect ratio mais “cinema” (parecido com o que você mostrou).
            // Se preferir 4/3, troque para "4 / 3".
            style={{ aspectRatio: "16 / 9" }}
          >
            {g.src ? (
              <Image
                src={g.src}
                alt={g.alt || `Imagem ${i + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-white/40">
                sem imagem
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
