// data/projects.ts
import type { ScheduleRow, Instructor } from "@/data/units";

export type ProjectSlug =
  | "alto-do-macaco"
  | "rua-da-ilha"
  | "nova-brasilia-de-itapua";

export type ProjectDetail = {
  slug: ProjectSlug;
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  whatsapp?: string;
  instagram?: string;
  heroImage?: string;
  mapQuery?: string;
  gallery?: Array<{
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  }>;
  seo?: { title: string; description: string };

  // 👇 adicionados para ficar igual unidade
  instructors?: Instructor[];
  schedule?: ScheduleRow[];
};

export const PROJECTS: ProjectDetail[] = [
  {
    slug: "alto-do-macaco",
    name: "Projeto Social — Alto do Macaco",
    description: "Projeto social do núcleo Alto do Macaco.",
    address: "2ª Travessa 17 de Setembro, 12 — Itapuã",
    city: "Salvador",
    state: "BA",
    whatsapp: "5571991505420",
    instagram: "https://instagram.com/bruxoteam_itapuaaltodomacaco",
    heroImage: "/itapua3.jpeg",
    mapQuery: "2ª Travessa 17 de Setembro, 12, Itapuã, Salvador - BA",
    seo: {
      title: "Projeto Social — Alto do Macaco",
      description: "Conheça o projeto social Alto do Macaco da Bruxo Team.",
    },
    // horários passados por você
    schedule: [
      { day: "seg", label: "Kids", time: "18:00" },
      { day: "seg", label: "Kids", time: "19:00" },
      { day: "seg", label: "Mista", time: "20:00" },
      { day: "ter", label: "60+", time: "08:00" },
      { day: "ter", label: "Mista", time: "09:00" },
      { day: "ter", label: "Competição", time: "18:00" },
      { day: "qua", label: "Kids", time: "18:00" },
      { day: "qua", label: "Kids", time: "19:00" },
      { day: "qua", label: "Mista", time: "20:00" },
      { day: "qui", label: "60+", time: "08:00" },
      { day: "qui", label: "Mista", time: "09:00" },
      { day: "qui", label: "Competição", time: "18:00" },
    ],
    // preencha quando tiver as fotos da equipe
    instructors: [
      { name: "Lucas Ratto", role: "Professor", image: "/rato.jpg" },
    ],
    gallery: [
      { src: "/alto.jpg", alt: "Aula no Alto do Macaco" },
      { src: "/alto2.jpg", alt: "Aula no Alto do Macaco" },
      { src: "/itapua.jpeg", alt: "Aula no Alto do Macaco" },
      { src: "/itapua2.jpeg", alt: "Aula no Alto do Macaco" },
    ],
  },

  {
    slug: "rua-da-ilha",
    name: "Projeto Social — Rua da Ilha",
    description: "Projeto social do núcleo Rua da Ilha (Estação Cidadania).",
    address: "Rua da Ilha, 374 — Itapuã",
    city: "Salvador",
    state: "BA",
    whatsapp: "5571991843706",
    instagram: "https://instagram.com/bruxoteam_ruadailha",
    heroImage: "/p2.jpeg",
    mapQuery: "Rua da Ilha, 374, Itapuã, Salvador - BA",
    seo: {
      title: "Projeto Social — Rua da Ilha",
      description: "Conheça o projeto social Rua da Ilha da Bruxo Team.",
    },
    // seg & qua 19–21
    schedule: [
      { day: "seg", label: "Mista", time: "19:00" },
      { day: "seg", label: "Mista", time: "20:00" },
      { day: "qua", label: "Mista", time: "19:00" },
      { day: "qua", label: "Mista", time: "20:00" },
    ],
    instructors: [
      { name: "Tiago Ferreira", role: "Mestre", image: "/bruxo.jpeg" },
    ],
    gallery: [
      { src: "/x.jpeg", alt: "Aula no Alto do Macaco" },
      { src: "/p2.jpeg", alt: "Aula no Alto do Macaco" },
    ],
  },

  {
    slug: "nova-brasilia-de-itapua",
    name: "Projeto Social — Nova Brasília de Itapuã",
    description: "Projeto social do núcleo Nova Brasília de Itapuã.",
    address: "Travessa Primeiro de Novembro, 1-69 — Nova Brasília de Itapuã",
    city: "Salvador",
    state: "BA",
    whatsapp: "5571991843706",
    instagram: "https://instagram.com/bruxoteam_novabrasiliadeitapua",
    heroImage: "/c2.jpeg",
    mapQuery:
      "Travessa Primeiro de Novembro, 1-69, Nova Brasília de Itapuã, Salvador - BA",
    seo: {
      title: "Projeto Social — Nova Brasília de Itapuã",
      description:
        "Conheça o projeto social Nova Brasília de Itapuã da Bruxo Team.",
    },
    // seg a qua: 20–21 Kids, 21–22 Mista
    schedule: [
      { day: "seg", label: "Kids", time: "20:00" },
      { day: "seg", label: "Mista", time: "21:00" },
      { day: "qua", label: "Kids", time: "20:00" },
      { day: "qua", label: "Mista", time: "21:00" },
    ],
    instructors: [
      { name: "Matheus Andrade", role: "Professor", image: "/cho.jpg" },
    ],
    gallery: [
      { src: "/c.jpeg", alt: "Aula no Alto do Macaco" },
      { src: "/c2.jpeg", alt: "Aula no Alto do Macaco" },
    ],
  },
];

export const PROJECTS_INDEX: Record<ProjectSlug, ProjectDetail> =
  PROJECTS.reduce((acc, p) => {
    acc[p.slug] = p;
    return acc;
  }, {} as Record<ProjectSlug, ProjectDetail>);
