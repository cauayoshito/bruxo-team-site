// components/UnitHeader.tsx
import Image from "next/image";
import type { UnitDetail } from "@/data/units";
import { waLink } from "@/lib/whatsapp";

export default function UnitHeader({ unit }: { unit: UnitDetail }) {
  const wa = unit.whatsapp;
  const waHref = wa
    ? waLink(wa, `Olá! Gostaria de informações da ${unit.name}.`)
    : null;

  const mapHref = unit.mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(unit.mapQuery)}`
    : null;

  return (
    <section className="container py-10 grid md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-5">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5">
          {unit.heroImage ? (
            <Image
              src={unit.heroImage}
              alt={unit.name}
              width={1000}
              height={750}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-sm opacity-70">
              Sem imagem
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-7">
        <h1 className="h1">{unit.name}</h1>

        {unit.description && <p className="p mt-2">{unit.description}</p>}
        {(unit.address || unit.city) && (
          <p className="p mt-2 opacity-80">
            {unit.address}
            {unit.city ? (unit.address ? " – " : "") + unit.city : ""}
            {unit.state ? (unit.city ? " / " : " – ") + unit.state : ""}
          </p>
        )}

        {(waHref || unit.instagram || mapHref) && (
          <div className="mt-4 flex gap-3 flex-wrap">
            {waHref && (
              <a
                className="btn-primary"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            )}
            {unit.instagram && (
              <a
                className="btn-secondary"
                href={unit.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
            {mapHref && (
              <a
                className="btn-secondary"
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver no mapa
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
