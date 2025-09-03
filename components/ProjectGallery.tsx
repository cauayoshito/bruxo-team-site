// components/ProjectGallery.tsx
"use client";

import Image from "next/image";
import type { ProjectDetail } from "@/data/projects";

export default function ProjectGallery({ project }: { project: ProjectDetail }) {
  if (!project.gallery || project.gallery.length === 0) return null;

  return (
    <section id="galeria" className="container pb-16">
      <h2 className="h2">Galeria</h2>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {project.gallery.map((g, idx) => (
          <div
            key={g.src + idx}
            className="relative w-full overflow-hidden rounded-xl aspect-[4/3] bg-black"
          >
            <Image
              src={g.src}
              alt={g.alt || `Imagem ${idx + 1} do ${project.name}`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}