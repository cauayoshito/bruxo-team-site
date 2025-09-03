// app/projetos-sociais/page.tsx
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

export const metadata = {
  title: "Projetos Sociais — Bruxo Team",
};

export default function SocialProjectsPage() {
  return (
    <main>
      <section className="container py-16 section">
        <h1 className="h1">Projetos Sociais</h1>
        <p className="p mt-3 max-w-3xl">
          Iniciativas comunitárias apoiadas pela Bruxo Team. Acesse a página de
          cada projeto para ver a grade completa, a localização e como participar.
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
      </section>
    </main>
  );
}
