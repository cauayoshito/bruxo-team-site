// components/ProjectCard.tsx
// Card padronizado para projetos E também para a "sede" (unidade) via hrefOverride.
import Link from "next/link";
import Image from "next/image";
import type { ProjectDetail } from "@/data/projects";
import { FaInstagram } from "react-icons/fa"; // Ícone oficial do Instagram

type MinimalProject = {
  slug: string;
  name: string;
  description?: string;
  heroImage?: string;
  whatsapp?: string;
  instagram?: string;
};

type Props = {
  project: ProjectDetail | MinimalProject;
  /** Quando definido, o card aponta para este href (ex.: /unidades/itapua/detalhes) */
  hrefOverride?: string;
};

export default function ProjectCard({ project, hrefOverride }: Props) {
  const href = hrefOverride ?? `/nucleos/${project.slug}`;
  const cover = project.heroImage;

  return (
    <div className="rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white/5">
          {cover && (
            <Image
              src={cover}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 400px"
            />
          )}
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-semibold leading-snug">{project.name}</h3>
          {project.description && (
            <p className="text-sm text-white/70 mt-1">{project.description}</p>
          )}
        </div>
      </Link>

      {/* Ações (WhatsApp / Instagram), padronizados */}
      <div className="mt-3 flex items-center gap-2">
        {project.whatsapp && (
          <Link
            href={`https://wa.me/${project.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            className="rounded-md bg-red-600 hover:bg-red-500 px-3 py-1.5 text-sm font-medium text-white"
          >
            WhatsApp
          </Link>
        )}

        {project.instagram && (
          <Link
            href={project.instagram}
            target="_blank"
            aria-label="Instagram"
            className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white"
            style={{
              background:
                "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            }}
          >
            <FaInstagram className="mr-1 h-4 w-4" />
            Instagram
          </Link>
        )}
      </div>
    </div>
  );
}
