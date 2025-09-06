// components/ProjectCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { ProjectDetail } from "@/data/projects";
import { waLink } from "@/lib/whatsapp";

type Props = {
  project: ProjectDetail & { subtitle?: string };
  /**
   * preview -> botão único "Ver informações"
   * full    -> WhatsApp + Instagram + Ver informações
   */
  variant?: "preview" | "full";
  /** Rota de destino do "Ver informações" (ex.: /nucleos/slug ou /projetos/slug) */
  href?: Route;
};

export default function ProjectCard({
  project,
  variant = "full",
  href,
}: Props) {
  const detailsHref =
    href ?? (`/nucleos/${project.slug}` as Route);

  const waHref = project.whatsapp
    ? waLink(
        project.whatsapp,
        `Olá! Quero informações sobre o projeto ${project.name}.`
      )
    : null;

  return (
    <article className="rounded-2xl bg-white/5 overflow-hidden">
      <Link href={detailsHref} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white/5">
          {project.heroImage ? (
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/40">
              sem imagem
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="text-sm opacity-80 mt-1">
          {project.description ??
            project.subtitle ??
            "Selecione para ver horários, instrutores, galeria e contato."}
        </p>

        {variant === "preview" ? (
          <div className="mt-3">
            <Link href={detailsHref} className="btn-secondary">
              Ver informações
            </Link>
          </div>
        ) : (
          <div className="mt-3 flex gap-2 flex-wrap">
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                WhatsApp
              </a>
            )}

            {project.instagram && (
              <a
                href={project.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white"
                style={{
                  background:
                    "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                }}
              >
                Instagram
              </a>
            )}

            <Link href={detailsHref} className="btn-secondary">
              Ver informações
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
