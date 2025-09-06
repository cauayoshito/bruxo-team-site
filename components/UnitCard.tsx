import Image from "next/image";
import Link from "next/link";
import type { UnitDetail } from "@/data/units";

type Props = {
  unit: UnitDetail;
  /** "preview" = home (só CTA Ver informações) | "full" = páginas internas com botões */
  variant?: "preview" | "full";
};

export default function UnitCard({ unit, variant = "full" }: Props) {
  const href = `/unidades/${unit.slug}`;
  const showFull = variant === "full";

  return (
    <article className="rounded-2xl bg-white/5 overflow-hidden">
      <Link href={href as any} className="block">
        <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
          {unit.heroImage ? (
            <Image
              src={unit.heroImage}
              alt={unit.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 400px"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/40">
              sem imagem
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{unit.name}</h3>
        {unit.description && (
          <p className="text-sm opacity-80 mt-1">{unit.description}</p>
        )}

        {/* CTAs */}
        <div className="mt-3 flex gap-2 flex-wrap">
          {showFull ? (
            <>
              {unit.whatsapp && (
                <a
                  href={`https://wa.me/${unit.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-red-600 hover:bg-red-500 px-3 py-1.5 text-sm font-medium text-white"
                >
                  WhatsApp
                </a>
              )}
              {unit.instagram && (
                <a
                  href={unit.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-white"
                  style={{
                    background:
                      "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                  }}
                >
                  Instagram
                </a>
              )}
              <Link
                href={href as any}
                className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                Ver informações
              </Link>
            </>
          ) : (
            <Link
              href={href as any}
              className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10"
            >
              Ver informações
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
