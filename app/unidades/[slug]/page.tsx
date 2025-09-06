// app/unidades/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Route } from "next";
import Link from "next/link";
import Image from "next/image";

import { UNITS_INDEX, type UnitSlug } from "@/data/units";
import { getProjectsByParentUnit } from "@/data/projects";
import UnitCard from "@/components/UnitCard";
import ProjectCard from "@/components/ProjectCard";

type Props = { params: { slug: UnitSlug } };
export const revalidate = 120;

export default function Page({ params }: Props) {
  const unit = UNITS_INDEX[params.slug];
  if (!unit) return notFound();

  const childProjects = getProjectsByParentUnit(unit.slug);

  // Título do hub: para "matriz" exibimos "Unidade Stella Maris"
  const displayTitle =
    unit.slug === "matriz" ? "Unidade Stella Maris" : unit.name;

  // No HUB da matriz, o card da própria sede deve aparecer como "Bruxo Team Matriz"
  const sedeCardData =
    unit.slug === "matriz"
      ? {
          ...unit,
          name: "Bruxo Team Matriz",
          description:
            unit.description ??
            "Unidade Stella Maris da Bruxo Team. Clique para ver informações completas.",
        }
      : unit;

  const sedeHref = `/unidades/${unit.slug}/detalhes` as Route;

  return (
    <main>
      {/* Cabeçalho MINIMALISTA: somente o título */}
      <section className="container py-8">
        <h1 className="h1">{displayTitle}</h1>
      </section>

      {/* Grid de seleção: sede + filhos */}
      <section className="container py-10">
        <h2 className="h2">Núcleos</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card da própria unidade (leva para a página completa da unidade) */}
          <UnitCard unit={sedeCardData as any} hrefOverride={sedeHref} variant="preview" />

          {/* Cards dos filhos */}
          {childProjects.map((project) => {
            // Breve descrição caso falte
            const projectForCard = {
              ...project,
              description:
                project.description ??
                "Selecione para ver horários, instrutores, galeria e contato.",
            };

            // Itapuã → PROJETOS (rota /projetos/[slug])
            if (unit.slug === "itapua") {
              const href = `/projetos/${project.slug}` as Route;
              return (
                <article key={project.slug} className="rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition">
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
                      <h3 className="text-lg font-semibold leading-snug">{project.name}</h3>
                      {projectForCard.description && (
                        <p className="text-sm text-white/70 mt-1">
                          {projectForCard.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </article>
              );
            }

            // Demais unidades (ex.: Matriz) → NÚCLEOS (rota padrão interna do ProjectCard)
            return (
              <ProjectCard key={project.slug} project={projectForCard as any} />
            );
          })}
        </div>
      </section>
    </main>
  );
}
