// app/unidades/[slug]/page.tsx
import { notFound } from "next/navigation";
import { UNITS_INDEX, type UnitSlug } from "@/data/units";
import UnitHeader from "@/components/UnitHeader";
import UnitInstructors from "@/components/UnitInstructors";
import UnitGallery from "@/components/UnitGallery";
import UnitSchedule from "@/components/UnitSchedule";
import { SCHEDULES_BY_UNIT } from "@/data/schedule";
import { toScheduleRows } from "@/lib/schedule";

export default function Page({ params }: { params: { slug: UnitSlug } }) {
  const unit = UNITS_INDEX[params.slug];
  if (!unit) return notFound();

  const gymSchedule = SCHEDULES_BY_UNIT[params.slug];
  const rows = gymSchedule ? toScheduleRows(gymSchedule) : [];

  return (
    <main>
      <UnitHeader unit={unit} />
      <UnitInstructors unit={unit} />
      <UnitSchedule rows={rows} />
      <UnitGallery unit={unit} />
      {/* mapa/endereço etc... */}
    </main>
  );
}
