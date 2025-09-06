// app/nucleos/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { PROJECTS_INDEX, type ProjectSlug } from "@/data/projects";
import { UNITS_INDEX } from "@/data/units";
import UnitSchedule from "@/components/UnitSchedule";
import type { ScheduleRow } from "@/data/units";
import ProjectHeader from "@/components/ProjectHeader";

type Props = { params: { slug: ProjectSlug } };
export const revalidate = 120;

export default function NucleoPage({ params }: Props) {
  const project = PROJECTS_INDEX[params.slug];
  if (!project) return notFound();

  const parentUnit = project.parentUnit
    ? UNITS_INDEX[project.parentUnit as keyof typeof UNITS_INDEX]
    : null;

  const rows: ScheduleRow[] = project.schedule ?? [];

  return (
    <main>
      {/* breadcrumb */}
      <nav className="container pt-4 pb-2 text-sm text-white/60">
        <ol className="flex items-center gap-2">
          <li>
            <Link className="hover:text-white/80" href="/unidades">
              Unidades
            </Link>
          </li>
          {parentUnit ? (
            <>
              <li>›</li>
              <li>
                <Link
                  className="hover:text-white/80"
                  href={`/unidades/${parentUnit.slug}`}
                >
                  {parentUnit.name}
                </Link>
              </li>
            </>
          ) : null}
          <li>›</li>
          <li className="text-white/80">{project.name}</li>
        </ol>
      </nav>

      {/* Header do núcleo usando ProjectHeader (inclui Instagram) */}
      <ProjectHeader project={project} />

      {/* Sobre */}
      {project.description && (
        <section className="container py-8">
          <h2 className="h2">Sobre</h2>
          <p className="p mt-2 opacity-90 whitespace-pre-line">
            {project.description}
          </p>
        </section>
      )}

      {/* Instrutores */}
      {project.instructors?.length ? (
        <section className="container py-8">
          <h2 className="h2">Instrutores</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.instructors.map((inst, i) => (
              <article
                key={inst.name + i}
                className="rounded-2xl bg-white/5 p-4"
              >
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-white/5"
                  style={{ aspectRatio: "4 / 5" }}
                >
                  {inst.image && (
                    <Image
                      src={inst.image}
                      alt={inst.name}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 300px"
                    />
                  )}
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold">{inst.name}</h3>
                  {inst.role && (
                    <p className="text-sm text-white/70">{inst.role}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Horários */}
      {rows.length > 0 && (
        <section className="container py-8">
          <UnitSchedule rows={rows} />
        </section>
      )}

      {/* Galeria */}
      {project.gallery?.length ? (
        <section className="container py-8">
          <h2 className="h2">Galeria</h2>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.gallery.map((g, i) => (
              <div
                key={(g.src ?? "img") + i}
                className="relative overflow-hidden rounded-xl bg-white/5"
                style={{ aspectRatio: "4 / 3" }}
              >
                {g.src && (
                  <Image
                    src={g.src}
                    alt={g.alt || `Imagem ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 400px"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
