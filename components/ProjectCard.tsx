import Image from "next/image";
import Link from "next/link";
import type { ProjectDetail } from "@/data/projects";

type Props = {
  project: ProjectDetail;
  /** "preview" = só “Ver informações” | "full" = com WhatsApp/Instagram também */
  variant?: "preview" | "full";
};

export default function ProjectCard({ project, variant = "full" }: Props) {
  const href = `/projetos/${project.slug}`;
  const showFull = variant === "full";

  return (
    <div className="rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition">
      <Link href={href as any} className="block">
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
      </Link>

      <div className="mt-3">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        {project.description && (
          <p className="text-sm opacity-80 mt-1">{project.description}</p>
        )}

        <div className="mt-3 flex gap-2 flex-wrap">
          {showFull ? (
            <>
              {project.whatsapp && (
                <a
                  href={`https://wa.me/${project.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-red-600 hover:bg-red-500 px-3 py-1.5 text-sm font-medium text-white"
                >
                  WhatsApp
                </a>
              )}
              {project.instagram && (
                <a
                  href={project.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-white"
                  style={{
                    background:
                      "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                  }}
                >
                  Instagram
                </a>
              )}
              <Link
                href={href as any}
                className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Ver informações
              </Link>
            </>
          ) : (
            <Link
              href={href as any}
              className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10"
            >
              Ver informações
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
