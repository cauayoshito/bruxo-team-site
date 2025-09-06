// app/unidades/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Route } from "next";
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

  // título do hub
  const displayTitle =
    unit.slug === "matriz" ? "Unidade Stella Maris" : unit.name;

  // card da própria sede (mantém nome custom da matriz se quiser)
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

  const sedeHref = (`/unidades/${unit.slug}/detalhes` as Route);

  return (
    <main>
      <section className="container py-8">
        <h1 className="h1">{displayTitle}</h1>
      </section>

      <section className="container py-10">
        <h2 className="h2">Núcleos</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sede: agora FULL (Whats/IG + Ver informações) */}
          <UnitCard unit={sedeCardData as any} hrefOverride={sedeHref} variant="full" />

          {/* Filhos: sempre FULL (Whats/IG + Ver informações) */}
          {childProjects.map((project) => {
            // para Itapuã os filhos são “projetos” (rota /projetos/..)
            // nos demais hubs são “núcleos” (rota /nucleos/..)
            const href =
              unit.slug === "itapua"
                ? (`/projetos/${project.slug}` as Route)
                : (`/nucleos/${project.slug}` as Route);

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
                variant="full"
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}