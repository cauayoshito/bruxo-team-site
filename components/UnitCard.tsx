// components/UnitCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { UnitDetail } from "@/data/units";
import { waLink } from "@/lib/whatsapp";

type Props = {
  unit: UnitDetail;
  /** Quando informado, substitui o href padrão do card */
  hrefOverride?: string;
  /** Texto extra (opcional) para aparecer embaixo do título */
  subtitle?: string;
  /** Na home mostramos só “Ver informações” (sem CTAs) */
  variant?: "default" | "preview";
};

export default function UnitCard({
  unit,
  hrefOverride,
  subtitle,
  variant = "default",
}: Props) {
  const href = hrefOverride ?? `/unidades/${unit.slug}`;
  const hasCtas = !!unit.whatsapp || !!unit.instagram;

  const whatsappHref = unit.whatsapp
    ? waLink(unit.whatsapp, `Olá! Gostaria de informações da ${unit.name}.`)
    : null;

  const mapDescription =
    unit.description ?? `Unidade ${unit.shortName ?? unit.name} da Bruxo Team.`;

  const showPreviewButton = variant === "preview";
  const showCtas = !showPreviewButton && hasCtas;

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
              sizes="(max-width:768px) 100vw, 600px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/40">
              sem imagem
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={href} className="block">
          <h3 className="text-lg font-semibold">{unit.name}</h3>
          {subtitle ? (
            <p className="mt-1 text-sm opacity-80">{subtitle}</p>
          ) : (
            <p className="mt-1 text-sm opacity-80">{mapDescription}</p>
          )}
        </Link>

        {/* HOME: apenas “Ver informações” */}
        {showPreviewButton && (
          <div className="mt-3">
            <Link
              href={href}
              className="rounded-md bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm font-medium"
            >
              Ver informações
            </Link>
          </div>
        )}

        {/* Demais lugares: CTAs padrão */}
        {showCtas && (
          <div className="mt-3 flex items-center gap-3">
            {whatsappHref && (
              <Link
                href={whatsappHref}
                target="_blank"
                className="rounded-md bg-red-600 hover:bg-red-500 px-3 py-1.5 text-sm font-medium text-white"
              >
                WhatsApp
              </Link>
            )}

            {unit.instagram && (
              <Link
                href={unit.instagram}
                target="_blank"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-white"
                style={{
                  background:
                    "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                }}
                title="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="opacity-90"
                >
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8zm5.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
                </svg>
                Instagram
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
