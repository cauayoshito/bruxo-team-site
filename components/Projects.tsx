// components/Projects.tsx
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="projetos-sociais" className="container py-16 section">
      <h2 className="h2">Projetos Sociais</h2>
      <p className="p mt-3 max-w-3xl">
        Iniciativas comunitárias apoiadas pela Bruxo Team. Acesse a página de
        cada projeto para ver horários, localização e como participar.
      </p>

      {PROJECTS.length === 0 ? (
        <p className="p mt-8 opacity-80">Nenhum projeto cadastrado ainda.</p>
      ) : (
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link href="/projetos-sociais" className="btn-secondary">
          Ver todos os projetos
        </Link>
      </div>
    </section>
  );
}
