// components/UnitCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { UnitDetail } from "@/data/units";
import { waLink } from "@/lib/whatsapp";

type Props = {
  unit: UnitDetail;
  /** sobrescreve o href padrão do card */
  hrefOverride?: Route;
  /** preview: apenas “Ver informações”; default: CTAs (Whats/IG) */
  variant?: "preview" | "default";
};

export default function UnitCard({
  unit,
  hrefOverride,
  variant = "default",
}: Props) {
  const href = (hrefOverride ?? (`/unidades/${unit.slug}` as Route)) as Route;

  const waHref = unit.whatsapp
    ? waLink(unit.whatsapp, `Olá! Gostaria de informações da ${unit.name}.`)
    : null;

  return (
    <article className="rounded-2xl bg-white/5 overflow-hidden">
      <Link href={href} className="block">
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

        {/* Rodapé do card */}
        <div className="mt-3 flex gap-2 flex-wrap">
          {variant === "preview" ? (
            <Link href={href} className="btn-secondary">
              Ver informações
            </Link>
          ) : (
            <>
              {waHref && (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  WhatsApp
                </a>
              )}
              {unit.instagram && (
                <a
                  href={unit.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Instagram
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
