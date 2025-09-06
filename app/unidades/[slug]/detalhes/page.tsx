// app/unidades/[slug]/detalhes/page.tsx
import { notFound } from "next/navigation";
import { UNITS_INDEX, type UnitSlug } from "@/data/units";
import { SCHEDULES_BY_UNIT } from "@/data/schedule";
import { toScheduleRows } from "@/lib/schedule";
import UnitHeader from "@/components/UnitHeader";
import UnitInstructors from "@/components/UnitInstructors";
import UnitSchedule from "@/components/UnitSchedule";
import UnitGallery from "@/components/UnitGallery";

type Props = { params: { slug: UnitSlug } };
export const revalidate = 120;

export default function DetalhesPage({ params }: Props) {
  const unit = UNITS_INDEX[params.slug];
  if (!unit) return notFound();

  // Aqui forçamos o título da página de detalhes da matriz para "Bruxo Team Matriz"
  const headerUnit =
    unit.slug === "matriz" ? { ...unit, name: "Bruxo Team Matriz" } : unit;

  const gymSchedule = SCHEDULES_BY_UNIT[params.slug];
  const rows = gymSchedule ? toScheduleRows(gymSchedule) : [];

  return (
    <main>
      {/* Header usa o nome sobrescrito quando for a matriz */}
      <UnitHeader
        unit={headerUnit}
        slides={unit.gallery?.map((g) => g.src)}
        showMeta
      />

      {/* Restante permanece igual */}
      <UnitInstructors unit={unit} />
      <UnitSchedule rows={rows} />
      <UnitGallery unit={unit} />
    </main>
  );
}
