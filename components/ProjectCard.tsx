"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import type { ProjectDetail } from "@/data/projects";

export default function ProjectCard({ project }: { project: ProjectDetail }) {
  const wa = project.whatsapp ? `https://wa.me/${project.whatsapp}` : null;

  return (
    <div className="rounded-2xl bg-neutral-900 p-5 shadow-lg flex flex-col">
      <Link href={`/projetos-sociais/${project.slug}`} className="group block">
        {project.heroImage && (
          <div className="relative overflow-hidden rounded-xl mb-4 h-48">
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        <h3 className="text-lg font-bold group-hover:underline">
          {project.name}
        </h3>

        {project.description && (
          <p className="text-sm text-white/70 mt-1">{project.description}</p>
        )}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold bg-red-600 hover:bg-red-700 transition"
          >
            WhatsApp
          </a>
        )}

        {project.instagram && (
          <a
            href={project.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram de ${project.name}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition"
            title="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
}
