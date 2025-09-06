// components/ProjectCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import type { ProjectDetail } from "@/data/projects";

type Props = {
  project: ProjectDetail;
  hrefOverride?: Route;
  variant?: "preview" | "full";
};

export default function ProjectCard({
  project,
  hrefOverride,
  variant = "preview",
}: Props) {
  const href = hrefOverride ?? (`/projetos/${project.slug}` as Route);
  const hasActions = variant === "full";

  const waHref = project.whatsapp
    ? (`https://wa.me/${project.whatsapp.replace(/\D/g, "")}` as Route)
    : undefined;

  return (
    <article className="rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white/5">
          {project.heroImage ? (
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 400px"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/40">
              sem imagem
            </div>
          )}
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-semibold leading-snug">
            {project.name}
          </h3>
          {project.description && (
            <p className="text-sm text-white/70 mt-1">{project.description}</p>
          )}
        </div>
      </Link>

      <div className="mt-3 flex flex-wrap gap-2">
        {hasActions && waHref && (
          <a
            className="btn-primary"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        )}

        {hasActions && project.instagram && (
          <a
            className="btn-secondary"
            href={project.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        )}

        <Link href={href} className="btn-secondary">
          Ver informações
        </Link>
      </div>
    </article>
  );
}