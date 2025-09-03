// components/ProjectGallery.tsx
import Image from "next/image";
import type { ProjectDetail } from "@/data/projects";

export default function ProjectGallery({
  project,
}: {
  project: ProjectDetail;
}) {
  const items = project.gallery ?? [];
  if (!items.length) return null;

  return (
    <section id="galeria" className="container pb-16">
      <h2 className="h2">Galeria</h2>

      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-4 snap-x snap-mandatory pr-2">
          {items.map((g, i) => (
            <div
              key={g.src + i}
              className="relative snap-start w-[360px] h-[240px] md:w-[420px] md:h-[280px] rounded-xl overflow-hidden bg-white/5 border shrink-0"
            >
              <Image
                src={g.src}
                alt={g.alt ?? `${project.name} — foto ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 420px"
                priority={i < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
