// components/ProjectCard.tsx
// Card padronizado para projetos e também para a "sede" (unidade) via hrefOverride.
import Link from "next/link";
import Image from "next/image";
import type { UrlObject } from "url";

type MinimalProject = {
  slug: string;
  name: string;
  description?: string;
  heroImage?: string;
  whatsapp?: string;
  instagram?: string;
};

type Props = {
  project: MinimalProject;
  /** Quando definido, o card aponta para este href (ex.: "/projetos/stella-maris-mma" ou "/unidades/itapua/detalhes") */
  hrefOverride?: string;
};

export default function ProjectCard({ project, hrefOverride }: Props) {
  // Para evitar o erro com "typedRoutes" do Next, passamos um UrlObject no href
  const hrefObj: UrlObject = hrefOverride
    ? { pathname: hrefOverride }
    : { pathname: `/nucleos/${project.slug}` };

  const cover = project.heroImage;

  return (
    <div className="rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition">
      <Link href={hrefObj} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white/5">
          {cover && (
            <Image
              src={cover}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 400px"
              priority={false}
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

      {/* Ação principal no card (home/listas): apenas "Ver informações" */}
      <div className="mt-3">
        <Link
          href={hrefObj}
          className="inline-block rounded-lg bg-white/10 hover:bg-white/15 px-3 py-1.5 text-sm font-medium"
        >
          Ver informações
        </Link>
      </div>
    </div>
  );
}
