// app/unidades/[slug]/page.tsx
import { notFound } from "next/navigation";
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
          subtitle:
            unit.description ??
            "Unidade Stella Maris da Bruxo Team. Clique para ver informações completas.",
        }
      : unit;

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
          {/* card da própria unidade (leva para a página completa da unidade) */}
          <UnitCard
            unit={sedeCardData as any}
            hrefOverride={`/unidades/${unit.slug}/detalhes`}
          />

          {/* cards dos filhos */}
          {childProjects.map((project) => {
            // Itapuã → projetos; demais (ex.: Stella Maris/“matriz”) → núcleos
            const href =
              unit.slug === "itapua"
                ? `/projetos/${project.slug}`
                : `/nucleos/${project.slug}`;

            // garante breve descrição no card (se faltar)
            const projectForCard = {
              ...project,
              description:
                project.description ??
                "Selecione para ver horários, instrutores, galeria e contato.",
            };

            return (
              <ProjectCard
                key={project.slug}
                project={projectForCard as any}
                hrefOverride={href}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
