// components/ProjectHeader.tsx
import Image from "next/image";
import { waLink } from "@/lib/whatsapp";
import type { ProjectDetail } from "@/data/projects";

export default function ProjectHeader({ project }: { project: ProjectDetail }) {
  const mapHref =
    project.mapQuery && project.mapQuery.trim()
      ? `https://www.google.com/maps?q=${encodeURIComponent(project.mapQuery)}`
      : null;

  const waHref = project.whatsapp
    ? waLink(
        project.whatsapp,
        `Olá! Quero informações sobre o projeto ${project.name}.`
      )
    : null;

  return (
    <section className="container py-8 grid md:grid-cols-12 gap-6 items-center">
      <div className="md:col-span-5">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5">
          {project.heroImage ? (
            <Image
              src={project.heroImage}
              alt={project.name}
              width={1200}
              height={900}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full grid place-items-center opacity-70 text-sm">
              Sem imagem
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-7">
        <h1 className="h1">{project.name}</h1>
        {project.description && <p className="p mt-2">{project.description}</p>}
        {(project.address || project.city || project.state) && (
          <p className="p mt-2 opacity-80">
            {project.address}
            {project.city ? (project.address ? " — " : "") + project.city : ""}
            {project.state
              ? (project.city ? " - " : " — ") + project.state
              : ""}
          </p>
        )}

        {(waHref || project.instagram || mapHref) && (
          <div className="mt-4 flex gap-3 flex-wrap">
            {waHref && (
              <a className="btn-primary" href={waHref} target="_blank">
                Falar no WhatsApp
              </a>
            )}
            {project.instagram && (
              <a
                className="btn-secondary"
                href={project.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
            {mapHref && (
              <a
                className="btn-secondary"
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver no mapa
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
