// app/projetos-sociais/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PROJECTS,
  PROJECTS_INDEX,
  type ProjectSlug,
  type ProjectDetail,
} from "@/data/projects";

import ProjectHeader from "@/components/ProjectHeader";
import ProjectInstructors from "@/components/ProjectInstructors";
import ProjectSchedule from "@/components/ProjectSchedule";
import ProjectGallery from "@/components/ProjectGallery";

type Props = { params: { slug: ProjectSlug } };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = PROJECTS_INDEX[params.slug];
  if (!project) {
    const title = "Bruxo Team";
    const description = "Projeto não encontrado.";
    return {
      title,
      description,
      openGraph: { title, description, type: "website" },
    };
  }
  const title = project.seo?.title ?? `${project.name} — Bruxo Team`;
  const description =
    project.seo?.description ?? `Página do projeto ${project.name}.`;
  const images = project.heroImage ? [project.heroImage] : [];
  return {
    title,
    description,
    openGraph: { title, description, images, type: "website" },
  };
}

export default function ProjectPage({ params }: Props) {
  const project: ProjectDetail | undefined = PROJECTS_INDEX[params.slug];
  if (!project) return notFound();

  return (
    <main>
      <ProjectHeader project={project} />
      <ProjectInstructors project={project} />
      <ProjectSchedule project={project} />
      <ProjectGallery project={project} />
    </main>
  );
}
