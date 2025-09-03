"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";
import type { UnitDetail } from "@/data/units";

export default function UnitCard({ unit }: { unit: UnitDetail }) {
  return (
    <div className="rounded-2xl bg-neutral-900 p-5 shadow-lg flex flex-col">
      <Link href={`/unidades/${unit.slug}`} className="group block">
        {unit.heroImage && (
          <div className="overflow-hidden rounded-xl mb-4">
            <img
              src={unit.heroImage}
              alt={unit.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <h3 className="text-lg font-bold group-hover:underline">{unit.name}</h3>
        {unit.description && (
          <p className="text-sm text-white/70 mt-1">{unit.description}</p>
        )}
      </Link>

      <div className="mt-4 flex items-center justify-between">
        {unit.whatsapp && (
          <Link
            href={`https://wa.me/${unit.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold bg-red-600 hover:bg-red-700 transition"
          >
            WhatsApp
          </Link>
        )}

        {unit.instagram && (
          <a
            href={unit.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram da ${unit.name}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition"
            title="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
}
