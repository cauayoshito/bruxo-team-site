// data/projects.ts
import type { ScheduleRow, Instructor, UnitSlug } from "@/data/units";

export type ProjectSlug =
  | "alto-do-macaco"
  | "rua-da-ilha"
  | "nova-brasilia-de-itapua"
  | "stella-maris-mma"; // novo

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

  parentUnit: UnitSlug; // de qual unidade é “filho”

  instructors?: Instructor[];
  schedule?: ScheduleRow[];
};

// normalização para buscar projetos por unidade
function normalizeSlug(s?: string) {
  return (s ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function getProjectsByParentUnit(unitSlug: UnitSlug): ProjectDetail[] {
  const u = normalizeSlug(unitSlug);
  return PROJECTS.filter((p) => normalizeSlug(p.parentUnit) === u);
}

export const PROJECTS: ProjectDetail[] = [
  {
    slug: "alto-do-macaco",
    name: "Rato de Tatame",
    parentUnit: "itapua",
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
    instructors: [
      {
        name: "Lucas Ratto",
        role: "Professor",
        image: "/rato.jpg",
        imagePos: "top center",
      },
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
    name: "Armindo Biriba",
    parentUnit: "itapua",
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
      { src: "/x.jpeg", alt: "Aula na Rua da Ilha" },
      { src: "/p2.jpeg", alt: "Aula na Rua da Ilha" },
    ],
  },

  {
    slug: "nova-brasilia-de-itapua",
    name: "Chokito Matriz BJJ",
    parentUnit: "itapua",
    description: "Projeto social do núcleo Nova Brasília de Itapuã.",
    address: "Travessa Primeiro de Novembro, 1-69 — Nova Brasília de Itapuã",
    city: "Salvador",
    state: "BA",
    whatsapp: "5571992006509",
    instagram: "https://instagram.com/bruxoteam_novabrasiliadeitapua",
    heroImage: "/c2.jpeg",
    mapQuery:
      "Travessa Primeiro de Novembro, 1-69, Nova Brasília de Itapuã, Salvador - BA",
    seo: {
      title: "Projeto Social — Nova Brasília de Itapuã",
      description:
        "Conheça o projeto social Nova Brasília de Itapuã da Bruxo Team.",
    },
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
      { src: "/c.jpeg", alt: "Aula em Nova Brasília de Itapuã" },
      { src: "/c2.jpeg", alt: "Aula em Nova Brasília de Itapuã" },
    ],
  },

  {
    slug: "stella-maris-mma",
    name: "Stella Maris 2",
    parentUnit: "matriz",
    description:
      "Treinos de MMA e Submission em Stella Maris. Escolha este núcleo para ver informações completas.",
    address: "Rua Agnaldo Azevedo, 208 — Stella Maris",
    city: "Salvador",
    state: "BA",
    whatsapp: "5571984790990", // Mestre Felipe Leão
    instagram: "https://www.instagram.com/bruxoteam_stella2",
    heroImage: "/leao.jpg",
    mapQuery: "Rua Agnaldo Azevedo, 208, Stella Maris, Salvador - BA",
    seo: {
      title: "Núcleo Stella Maris — MMA & Submission",
      description:
        "Treinos de MMA (seg/qua/sex 7h; sáb/dom 8–9h) e Submission (seg/qua 19h) em Stella Maris.",
    },
    schedule: [
      { day: "seg", label: "MMA", time: "07:00" },
      { day: "qua", label: "MMA", time: "07:00" },
      { day: "sex", label: "MMA", time: "07:00" },

      { day: "seg", label: "No-Gi (sem kimono)", time: "19:00" },
      { day: "qua", label: "No-Gi (sem kimono)", time: "19:00" },

      { day: "sab", label: "MMA", time: "08:00–09:00" },
      { day: "dom", label: "MMA", time: "08:00–09:00" },
    ],
    instructors: [
      {
        name: "Felipe Leão",
        role: "Mestre",
        image: "/felipe.jpg",
      },
    ],
    gallery: [
      {
        src: "/leao.jpg",
        alt: "Treino no núcleo Stella Maris",
      },
    ],
  },
];

export const PROJECTS_INDEX: Record<ProjectSlug, ProjectDetail> =
  PROJECTS.reduce((acc, p) => {
    acc[p.slug] = p;
    return acc;
  }, {} as Record<ProjectSlug, ProjectDetail>);
