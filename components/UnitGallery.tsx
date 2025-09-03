// components/UnitGallery.tsx
"use client";

import Image from "next/image";
import type { UnitDetail } from "@/data/units";

export default function UnitGallery({ unit }: { unit: UnitDetail }) {
  const items = unit.gallery ?? [];
  if (!items.length) return null;

  return (
    <section className="container py-12">
      <h2 className="h2">Galeria</h2>

      {/* Carrossel horizontal com scroll-snap */}
      <div className="mt-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
        {items.map((item, i) => {
          const src = item.src;
          const alt =
            item.alt ?? `${unit.shortName ?? unit.name} — foto ${i + 1}`;
          const hasDim =
            Number.isFinite(item.width) && Number.isFinite(item.height);

          return (
            <div
              key={i}
              className="relative min-w-[260px] sm:min-w-[320px] snap-start rounded-xl overflow-hidden bg-white/5 aspect-[4/3] flex-shrink-0"
            >
              {hasDim ? (
                <Image
                  src={src}
                  alt={alt}
                  width={item.width as number}
                  height={item.height as number}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
