// components/ProjectInstructors.tsx
import Image from "next/image";
import type { ProjectDetail } from "@/data/projects";

export default function ProjectInstructors({
  project,
}: {
  project: ProjectDetail;
}) {
  const list = project.instructors ?? [];
  if (!list.length) return null;

  return (
    <section className="container py-12">
      <h2 className="h2">Instrutores & Equipe</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p, idx) => (
          <div key={idx} className="border rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden bg-white/5">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  style={
                    p.imagePos ? { objectPosition: p.imagePos } : undefined
                  }
                />
              ) : (
                <div className="w-full h-full grid place-items-center opacity-70 text-sm">
                  Sem foto
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="font-semibold">{p.name}</div>
              {p.role && (
                <div className="text-sm text-muted-foreground">{p.role}</div>
              )}
              {p.bio && <p className="text-sm mt-2">{p.bio}</p>}
              {p.instagram && (
                <a
                  href={`https://instagram.com/${p.instagram.replace(
                    /^@/,
                    ""
                  )}`}
                  target="_blank"
                  className="text-sm underline mt-2 inline-block"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
