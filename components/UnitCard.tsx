// components/UnitCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { UnitDetail } from "@/data/units";
import { waLink } from "@/lib/whatsapp";

type Props = {
  unit: UnitDetail & { subtitle?: string };
  /**
   * preview  -> botão único "Ver informações" (Home)
   * full     -> WhatsApp + Instagram + Ver informações (/unidades/[slug])
   */
  variant?: "preview" | "full";
  /** Rota de destino do "Ver informações". Se não vier, uso /unidades/[slug]/detalhes */
  href?: Route;
};

export default function UnitCard({ unit, variant = "preview", href }: Props) {
  const detailsHref =
    href ?? (`/unidades/${unit.slug}/detalhes` as Route);

  const waHref = unit.whatsapp
    ? waLink(
        unit.whatsapp,
        `Olá! Quero informações sobre a unidade ${unit.name}.`
      )
    : null;

  return (
    <article className="rounded-2xl bg-white/5 overflow-hidden">
      <Link href={detailsHref} className="block">
        <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
          {unit.heroImage ? (
            <Image
              src={unit.heroImage}
              alt={unit.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 33vw"
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
        <p className="text-sm opacity-80 mt-1">
          {unit.description ??
            unit.subtitle ??
            "Selecione para ver horários, instrutores, galeria e contato."}
        </p>

        {/* Ações */}
        {variant === "preview" ? (
          <div className="mt-3">
            <Link
              href={detailsHref}
              className="btn-secondary inline-flex items-center"
            >
              Ver informações
            </Link>
          </div>
        ) : (
          <div className="mt-3 flex gap-2 flex-wrap">
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
                className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white"
                style={{
                  background:
                    "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                }}
              >
                Instagram
              </a>
            )}

            <Link href={detailsHref} className="btn-secondary">
              Ver informações
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
