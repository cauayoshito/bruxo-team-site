// --------------------------------------
// Dias da semana (chaves do cronograma)
// --------------------------------------
export type DayKey = "seg" | "ter" | "qua" | "qui" | "sex" | "sab";

// --------------------------------------
// Nomes oficiais das aulas (padronizados)
// --------------------------------------
export type ClassLabel =
  | "Jiu-Jitsu (com kimono)"
  | "No-Gi (sem kimono)"
  | "Mista"
  | "Kids"
  | "Feminino"
  | "Competição"
  | "60+"
  | "Open Mat"
  | "Avançado";

// --------------------------------------
// Linha de horário (já padronizada)
// --------------------------------------
export type ScheduleRow = {
  day: DayKey;
  label: ClassLabel;
  time: string;
};

// --------------------------------------
// Tipos de Unidade / Instrutor
// --------------------------------------
export type UnitSlug = "matriz" | "stiep" | "itapua" | "itacare";

export type Instructor = {
  name: string;
  role?: string;
  image?: string; // /images/...
  bio?: string;
  instagram?: string; // @usuario
  imagePos?: string; // CSS object-position
};

export type UnitDetail = {
  slug: UnitSlug;
  name: string;
  shortName?: string;

  // Endereço/contato (opcionais)
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  whatsapp?: string;
  /** URL do Instagram da unidade */
  instagram?: string;

  // Texto/SEO (opcionais)
  description?: string;
  seo?: { title: string; description: string };

  // Mídia e mapa (opcionais)
  heroImage?: string;
  mapQuery?: string;

  // Galeria (opcional)
  gallery?: Array<{
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  }>;

  // Destaque
  featured?: boolean;

  // Instrutores (opcional)
  instructors?: Instructor[];
};

// --------------------------------------
// Lista de unidades
// --------------------------------------
export const UNITS: UnitDetail[] = [
  {
    slug: "matriz",
    name: "Unidade Matriz",
    shortName: "Matriz",
    featured: true,
    description: "A unidade principal da Bruxo Team.",
    seo: {
      title: "Unidade Matriz — Bruxo Team",
      description: "Conheça a unidade Matriz da Bruxo Team.",
    },
    heroImage: "/matriz.jpg",
    mapQuery:
      "Unidade Matriz Bruxo Team, Alameda Dilson Jatahy Fonseca 858 - Stella Maris, Salvador - BA",
    address: "Alameda Dilson Jatahy Fonseca, 858 - Stella Maris",
    city: "Salvador",
    state: "BA",
    whatsapp: "5571991843706",
    instagram: "https://instagram.com/bruxoteam_matriz",
    gallery: [
      { src: "/m1.jpg", alt: "Bruxo Team — Matriz (fachada)" },
      { src: "/m2.jpg", alt: "Bruxo Team — Matriz (tatame 1)" },
      { src: "/matriz.jpg", alt: "Bruxo Team — Matriz (aula em andamento)" },
      { src: "/m4.jpg", alt: "Bruxo Team — Matriz (fachada)" },
      { src: "/m5.jpg", alt: "Bruxo Team — Matriz (tatame 1)" },
      { src: "/m6.jpg", alt: "Bruxo Team — Matriz (aula em andamento)" },
      { src: "/m7.jpg", alt: "Bruxo Team — Matriz (fachada)" },
      { src: "/m8.jpg", alt: "Bruxo Team — Matriz (tatame 1)" },
      { src: "/m9.jpg", alt: "Bruxo Team — Matriz (aula em andamento)" },
    ],
    instructors: [
      { name: "Tiago Bruxo", role: "Mestre", image: "/bruxo.jpeg" },
      { name: "Jean Ribeiro", role: "Professor", image: "/jotape.jpeg" }, // ← ajustado
    ],
  },
  {
    slug: "stiep",
    name: "Unidade Stiep",
    shortName: "Stiep",
    description: "Unidade Stiep da Bruxo Team.",
    seo: {
      title: "Unidade Stiep — Bruxo Team",
      description: "Conheça a unidade Stiep da Bruxo Team.",
    },
    heroImage: "/stiep.jpeg",
    mapQuery: "Rua Arthur Fraga 374 - Vale dos Rios, Salvador - BA",
    address: "Rua Arthur Fraga, 374 - Vale dos Rios",
    city: "Salvador",
    state: "BA",
    whatsapp: "5571992813525",
    instagram: "https://instagram.com/bruxoteam_stiep",
    gallery: [
      { src: "/stiep.jpeg", alt: "Bruxo Team — Stiep (fachada)" },
      { src: "/stiep2.jpeg", alt: "Bruxo Team — Stiep (tatame 1)" },
      { src: "/bruxo3.jpeg", alt: "Bruxo Team — Stiep (aula em andamento)" },
      { src: "/sti.jpg", alt: "Bruxo Team — Stiep (fachada)" },
      { src: "/sti2.jpg", alt: "Bruxo Team — Stiep (tatame 1)" },
    ],
    instructors: [
      { name: "Ybere Camargo", role: "Mestre", image: "/ybere.jpg" },
    ],
  },
  {
    slug: "itapua",
    name: "Unidade Itapuã",
    shortName: "Itapuã",
    description: "Unidade Itapuã da Bruxo Team.",
    seo: {
      title: "Unidade Itapuã — Bruxo Team",
      description: "Conheça a unidade Itapuã da Bruxo Team.",
    },
    heroImage: "/tapua.jpg",
    mapQuery: "Rua Guararapes 18, Salvador - BA",
    address: "Rua Guararapes, 18",
    city: "Salvador",
    state: "BA",
    whatsapp: "5571984708998",
    instagram: "https://instagram.com/bruxoteam_itapua",
    gallery: [
      { src: "/f.jpeg", alt: "Bruxo Team — Itapuã (fachada)" },
      { src: "/f2.jpeg", alt: "Bruxo Team — Itapuã (tatame 1)" },
      { src: "/f4.jpeg", alt: "Bruxo Team — Itapuã (aula em andamento)" },
      { src: "/tapua.jpg", alt: "Bruxo Team — Itapuã (tatame 1)" },
    ],
    instructors: [
      { name: "Thiago Bruxo", role: "Mestre", image: "/bruxo.jpeg" },
      {
        name: "Flavio Barros",
        role: "Professor",
        image: "/flavio.jpeg",
        imagePos: "center top",
      },
    ],
  },
  {
    slug: "itacare",
    name: "Núcleo Itacaré",
    shortName: "Itacaré",
    description: "Núcleo da Bruxo Team em Itacaré.",
    seo: {
      title: "Núcleo Itacaré — Bruxo Team",
      description: "Conheça o Núcleo Itacaré da Bruxo Team.",
    },
    heroImage: "/y3.jpeg",
    mapQuery: "Ponta do Xaréu, Praia da concha Itacaré - BA",
    address: "Ponta do Xaréu - Itacaré",
    city: "Itacaré",
    state: "BA",
    whatsapp: "5571988644981",
    instagram: "https://instagram.com/bruxoteamitacare",
    gallery: [
      { src: "/y1.jpeg", alt: "Bruxo Team — Itacaré (fachada)" },
      { src: "/y2.jpeg", alt: "Bruxo Team — Itacaré (tatame)" },
      { src: "/ita1.jpg", alt: "Bruxo Team — Itacaré (tatame)" },
      { src: "/y3.jpeg", alt: "Bruxo Team — Itacaré (aula em andamento)" },
    ],
    instructors: [
      {
        name: "Bruno Andrade",
        role: "Mestre",
        image: "/ita.jpg",
        imagePos: "center top",
      },
    ],
  },
];

// --------------------------------------
// Índice rápido por slug
// --------------------------------------
export const UNITS_INDEX: Record<UnitSlug, UnitDetail> = UNITS.reduce(
  (acc, u) => {
    acc[u.slug] = u;
    return acc;
  },
  {} as Record<UnitSlug, UnitDetail>
);
