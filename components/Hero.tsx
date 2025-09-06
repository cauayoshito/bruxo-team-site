// components/Hero.tsx
"use client";

import { useRouter } from "next/navigation";
import { UNITS } from "@/data/units";
import { getProjectsByParentUnit } from "@/data/projects";

/**
 * Hero com seletor "Escolher núcleo".
 * - Mostra todos os núcleos/projetos de cada unidade.
 * - A "sede" de cada unidade aponta para /unidades/[slug]/detalhes
 * - Projetos de Itapuã vão para /projetos/[slug]
 * - Demais filhos (ex.: Stella Maris 2 da Matriz) vão para /nucleos/[slug]
 */
export default function Hero() {
  const router = useRouter();

  // monta os grupos (unidade + filhos)
  const groups = UNITS.map((u) => {
    const children = getProjectsByParentUnit(u.slug);

    const sedeHref = `/unidades/${u.slug}/detalhes`;
    const sedeLabel =
      u.slug === "matriz" ? "Bruxo Team Matriz (sede)" : `${u.name} (sede)`;

    const childItems = children.map((p) => {
      const href =
        u.slug === "itapua" ? `/projetos/${p.slug}` : `/nucleos/${p.slug}`;
      return { label: p.name, href };
    });

    return {
      label: u.name,
      options: [{ label: sedeLabel, href: sedeHref }, ...childItems],
    };
  });

  function onChange(value: string) {
    if (!value) return;
    router.push(value as any);
  }

  return (
    <section className="container py-14">
      <div className="max-w-3xl">
        <div className="flex flex-wrap gap-2 text-xs opacity-80 mb-3">
          <span className="px-2 py-1 rounded bg-white/5">Desde 2019</span>
          <span className="px-2 py-1 rounded bg-white/5">
            {UNITS.length}+4 unidades
          </span>
          <span className="px-2 py-1 rounded bgwhite/5">
            +20 atletas competindo
          </span>
          <span className="px-2 py-1 rounded bg-white/5">Ambiente família</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Força, Técnica e União –<br /> Bruxo Team
        </h1>

        <p className="mt-4 opacity-90">
          Jiu-Jitsu para <strong>iniciantes</strong>, <strong>Kids</strong> e{" "}
          <strong>competidores</strong> em Salvador. Treinos pela manhã, tarde e
          noite nas <strong>Unidades: Stella Maris</strong>,{" "}
          <strong>Stiep</strong> , <strong>Itapuã e Itacaré</strong>.{" "}
          <strong>Primeira aula gratuita.</strong>
        </p>

        {/* Seletor de núcleos/projetos */}
        <div className="mt-6 flex items-center gap-3 flex-wrap">
          <label
            htmlFor="nucleo-select"
            className="text-sm font-medium opacity-90"
          >
            Escolher núcleo
          </label>

          <select
            id="nucleo-select"
            className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm"
            defaultValue=""
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="" disabled>
              Selecione…
            </option>
            {groups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((opt) => (
                  <option key={opt.href} value={opt.href}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3 text-xs">
          <div className="px-3 py-2 rounded bg-white/5">
            ✓ Aulas para iniciantes e retornantes
          </div>
          <div className="px-3 py-2 rounded bg-white/5">
            ✓ Kids, Feminino, Mista e Competição
          </div>
          <div className="px-3 py-2 rounded bg-white/5">
            ✓ 1ª aula grátis + suporte no WhatsApp
          </div>
        </div>
      </div>
    </section>
  );
}
