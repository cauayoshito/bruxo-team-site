// components/UnitCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { UrlObject } from "url";
import type { UnitDetail } from "@/data/units";

type Props = {
  unit: UnitDetail;
  /** Quando informado, substitui o href padrão do card */
  hrefOverride?: string;
  /** Texto extra (opcional) para aparecer embaixo do título */
  subtitle?: string;
};

export default function UnitCard({ unit, hrefOverride, subtitle }: Props) {
  // Compatível com experimental.typedRoutes do Next/Vercel
  const hrefObj: UrlObject = hrefOverride
    ? { pathname: hrefOverride }
    : { pathname: `/unidades/${unit.slug}` };

  const mapDescription =
    subtitle ??
    unit.description ??
    `Unidade ${unit.shortName ?? unit.name} da Bruxo Team.`;

  return (
    <article className="rounded-2xl bg-white/5 overflow-hidden">
      <Link href={hrefObj} className="block">
        <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
          {unit.heroImage ? (
            <Image
              src={unit.heroImage}
              alt={unit.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 600px"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/40">
              sem imagem
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={hrefObj} className="block">
          <h3 className="text-lg font-semibold">{unit.name}</h3>
          <p className="mt-1 text-sm opacity-80">{mapDescription}</p>
        </Link>

        {/* Home/listas/hubs: apenas "Ver informações" (CTA completo fica na página interna) */}
        <div className="mt-3">
          <Link
            href={hrefObj}
            className="inline-block rounded-lg bg-white/10 hover:bg-white/15 px-3 py-1.5 text-sm font-medium"
          >
            Ver informações
          </Link>
        </div>
      </div>
    </article>
  );
}