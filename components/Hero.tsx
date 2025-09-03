// components/Hero.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { UNITS } from "@/data/units";
import { waLink } from "@/lib/whatsapp";

export default function Hero() {
  // destaca a matriz se houver featured; senão a primeira
  const defaultUnit = useMemo(() => {
    const featured = UNITS.find((u) => u.featured);
    return featured ?? UNITS[0];
  }, []);

  const [unitSlug, setUnitSlug] = useState(defaultUnit.slug);
  const unit = useMemo(
    () => UNITS.find((u) => u.slug === unitSlug) ?? defaultUnit,
    [unitSlug, defaultUnit]
  );

  // links dinâmicos da unidade
  const wa = unit.whatsapp ?? "5571991843706";
  const waMsg = `Olá! Quero fazer uma aula experimental na ${unit.name}.`;
  const waUrl = waLink(wa, waMsg);

  // ❗ Link com hash precisa ser UrlObject quando typedRoutes está ativo
  const horariosHref = {
    pathname: `/unidades/${unit.slug}`,
    hash: "horarios",
  } as const;

  const mapUrl = unit.mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(unit.mapQuery)}`
    : undefined;

  return (
    <section className="container py-16 section overflow-visible">
      {/* chips de prova social */}
      <div className="flex flex-wrap gap-2 text-xs mb-3">
        <span className="px-2 py-1 rounded-full bg-white/5 border">
          Desde 2019
        </span>
        <span className="px-2 py-1 rounded-full bg-white/5 border">
          +3 unidades
        </span>
        <span className="px-2 py-1 rounded-full bg-white/5 border">
          +20 atletas competindo
        </span>
        <span className="px-2 py-1 rounded-full bg-white/5 border">
          Ambiente família
        </span>
      </div>

      <h1 className="h1">
        Força, Técnica e União <br className="hidden md:block" />
        Bruxo Team
      </h1>

      <p className="p mt-4 max-w-2xl">
        Jiu-Jitsu para <strong>iniciantes, Kids e competidores</strong> em
        Salvador. Treinos pela manhã, tarde e noite em{" "}
        <strong>Bruxo Team Matriz (Stella Maris)</strong>,{" "}
        <strong>Stiep</strong> e <strong>Itapuã</strong><strong>Itacaré</strong>.
        <span className="ml-1 font-semibold">Primeira aula gratuita.</span>
      </p>

      {/* seletor de unidade + CTAs */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-end">
        {/* z-index alto só no bloco do select pra não ficar atrás de nada */}
        <div className="text-sm opacity-80 relative z-50">
          <label className="block mb-1">Escolher unidade</label>
          <select
            className="px-3 py-2 rounded-lg bg-white/5 border w-[240px]"
            value={unitSlug}
            onChange={(e) => setUnitSlug(e.target.value as typeof unitSlug)}
          >
            {UNITS.map((u) => (
              <option key={u.slug} value={u.slug}>
                {u.shortName ?? u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3 relative z-0">
          <a
            className="btn-primary"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar aula experimental
          </a>

          <Link href={horariosHref} className="btn-secondary">
            Ver horários
          </Link>

          {mapUrl && (
            <a
              className="btn-secondary"
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver no mapa
            </a>
          )}
        </div>
      </div>

      {/* bullets curtas de benefícios */}
      <ul className="mt-6 grid md:grid-cols-3 gap-3 text-sm opacity-90 relative z-0">
        <li className="card p-3">✔️ Aulas para iniciantes e retornantes</li>
        <li className="card p-3">✔️ Kids, Feminino, Mista e Competição</li>
        <li className="card p-3">✔️ 1ª aula grátis + suporte no WhatsApp</li>
      </ul>
    </section>
  );
}
