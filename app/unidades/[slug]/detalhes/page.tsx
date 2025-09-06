import { notFound } from "next/navigation";
import { UNITS_INDEX, type UnitSlug, type UnitDetail } from "@/data/units";
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

  // Na página de DETALHES da matriz o título deve ser "Bruxo Team Matriz".
  const headerUnit: UnitDetail =
    unit.slug === "matriz" ? { ...unit, name: "Bruxo Team Matriz" } : unit;

  const gymSchedule = SCHEDULES_BY_UNIT[params.slug];
  const rows = gymSchedule ? toScheduleRows(gymSchedule) : [];

  return (
    <main>
      {/* Header simples: APENAS o que o componente aceita (unit) */}
      <UnitHeader unit={headerUnit} />

      {/* Seções completas */}
      <UnitInstructors unit={unit} />
      <UnitSchedule rows={rows} />
      <UnitGallery unit={unit} />
    </main>
  );
}