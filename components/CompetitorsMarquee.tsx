// components/CompetitorsMarquee.tsx
"use client";

import Image from "next/image";

type Img = { src: string; alt?: string };

export default function CompetitorsMarquee({
  images,
  height = 220,       // altura dos cards (px)
  speed = 45,         // “velocidade” relativa (quanto maior, mais rápido)
}: {
  images: Img[];
  height?: number;
  speed?: number;
}) {
  // Duração da animação baseada no número de imagens e na “speed”
  const durationSec = Math.max(12, Math.round((images.length * 300) / speed));
  const cardWidth = Math.round(height * 0.75); // proporção ~3:4

  return (
    <div className="relative overflow-hidden w-full" style={{ height }}>
      <div
        className="marquee-track"
        style={{
          animation: `marquee ${durationSec}s linear infinite`, // autoplay sempre ligado
          gap: "12px",
        }}
      >
        {/* Duplicamos as imagens para dar o loop infinito suave */}
        {[...images, ...images].map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative shrink-0 rounded-xl overflow-hidden border"
            style={{ width: cardWidth, height }}
          >
            <Image src={img.src} alt={img.alt ?? ""} fill className="object-cover" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
