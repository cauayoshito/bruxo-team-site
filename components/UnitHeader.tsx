// components/UnitHeader.tsx
import Link from "next/link";
import Image from "next/image";
import type { UnitDetail } from "@/data/units";
import { waLink } from "@/lib/whatsapp";

export default function UnitHeader({
  unit,
  slides,
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
            <Link
              href={waHref}
              target="_blank"
              className="rounded-lg bg-red-600 hover:bg-red-500 px-4 py-2 text-white font-medium"
            >
              Falar no WhatsApp
            </Link>
          )}

          {unit.instagram && (
            <Link
              href={unit.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white"
              style={{
                background:
                  "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-1"
              >
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8zm5.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
              </svg>
              Instagram
            </Link>
          )}

          {mapHref && (
            <Link
              href={mapHref}
              target="_blank"
              className="text-white/80 hover:text-white underline"
            >
              Ver no mapa
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
