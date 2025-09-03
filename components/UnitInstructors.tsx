// components/UnitInstructors.tsx
import Image from "next/image";
import { type UnitDetail } from "@/data/units";

export default function UnitInstructors({ unit }: { unit: UnitDetail }) {
  const list = unit.instructors ?? [];
  if (!list.length) return null;

  return (
    <section className="container py-12">
      <h2 className="h2">Mestres & Instrutores</h2>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p, idx) => (
          <div key={idx} className="border rounded-2xl overflow-hidden">
            {/* Imagem sem corte (retrato) */}
            {p.image ? (
              <div className="relative aspect-[4/5] bg-white/5">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={idx === 0}
                />
              </div>
            ) : (
              <div className="relative aspect-[4/5] bg-white/5" />
            )}

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
                  rel="noopener noreferrer"
                  className="text-sm underline mt-2 inline-block"
                  aria-label={`Instagram de ${p.name}`}
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
