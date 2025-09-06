"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

type GalleryItem = { src: string; alt?: string; width?: number; height?: number };

export default function UnitGallery({ gallery }: { gallery: GalleryItem[] }) {
  if (!gallery || gallery.length === 0) return null;

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      renderMode: "performance",
      slides: { perView: 1, spacing: 12 },
      breakpoints: {
        "(min-width: 640px)": { slides: { perView: 2, spacing: 16 } },
        "(min-width: 1024px)": { slides: { perView: 3, spacing: 16 } },
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        const clearNextTimeout = () => clearTimeout(timeout);
        const nextTimeout = () => {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => slider.next(), 3000);
        };

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
        {gallery.map((g, i) => (
          <div
            key={`${g.src || "img"}-${i}`}
            className="keen-slider__slide relative overflow-hidden rounded-xl bg-white/5"
            style={{ aspectRatio: "4 / 3" }}
          >
            <Image
              src={g.src}
              alt={g.alt || `Imagem ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}