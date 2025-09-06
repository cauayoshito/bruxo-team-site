// components/UnitCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { UnitDetail } from "@/data/units";

type Props = {
  unit: UnitDetail;
  /** para forçar o link do card */
  hrefOverride?: Route;
  /** preview = só “Ver informações” | full = + botões Whats/IG */
  variant?: "preview" | "full";
};

export default function UnitCard({
  unit,
  hrefOverride,
  variant = "preview",
}: Props) {
  const href = hrefOverride ?? (`/unidades/${unit.slug}/detalhes` as Route);
  const hasActions = variant === "full";

  const waHref = unit.whatsapp
    ? (`https://wa.me/${unit.whatsapp.replace(/\D/g, "")}` as Route)
    : undefined;

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
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/40">
              sem imagem
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold leading-snug">
            {unit.name}
          </h3>
          {unit.description && (
            <p className="text-sm text-white/70 mt-1">{unit.description}</p>
          )}
        </div>
      </Link>

      {/* ações do card (full) */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          {hasActions && waHref && (
            <a
              className="btn-primary"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          )}

          {hasActions && unit.instagram && (
            <a
              className="btn-secondary"
              href={unit.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          )}

          {/* sempre mostra “Ver informações” */}
          <Link href={href} className="btn-secondary">
            Ver informações
          </Link>
        </div>
      </div>
    </article>
  );
}