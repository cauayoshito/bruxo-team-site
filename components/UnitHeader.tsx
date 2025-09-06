// components/UnitHeader.tsx
import Image from "next/image";
import type { UnitDetail } from "@/data/units";
import { waLink } from "@/lib/whatsapp";

export default function UnitHeader({
  unit,
  slides, // (não usado aqui, mas mantido para compatibilidade de props)
  showMeta,
}: {
  unit: UnitDetail;
  slides?: string[];
  showMeta?: boolean;
}) {
  const waHref = unit.whatsapp
    ? waLink(unit.whatsapp, `Olá! Gostaria de informações da ${unit.name}.`)
    : null;

  const mapHref = unit.mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(unit.mapQuery)}`
    : null;

  return (
    <section className="container py-10 grid md:grid-cols-12 gap-6 items-start">
      {/* Imagem principal */}
      <div className="md:col-span-5">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5 relative">
          {unit.heroImage ? (
            <Image
              src={unit.heroImage}
              alt={unit.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 600px"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white/40">
              sem imagem
            </div>
          )}
        </div>
      </div>

      {/* Título + CTA */}
      <div className="md:col-span-7 flex flex-col gap-4">
        <h1 className="h1">{unit.name}</h1>

        {unit.description && <p className="opacity-80">{unit.description}</p>}

        {unit.address && <p className="opacity-60">{unit.address}</p>}

        <div className="flex gap-4 flex-wrap">
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-red-600 hover:bg-red-500 px-4 py-2 text-white font-medium"
            >
              Falar no WhatsApp
            </a>
          )}

          {unit.instagram && (
            <a
              href={unit.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline"
            >
              Instagram
            </a>
          )}

          {mapHref && (
            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline"
            >
              Ver no mapa
            </a>
          )}
        </div>
      </div>
    </section>
  );
}