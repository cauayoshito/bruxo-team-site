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
      {/* Imagem de capa */}
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

      {/* Conteúdo */}
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
            {/* WhatsApp */}
            {waHref && (
              <a
                className="btn-primary"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            )}

            {/* Instagram */}
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
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-1"
                >
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8zm5.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
                </svg>
                Instagram
              </a>
            )}

            {/* Mapa */}
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
