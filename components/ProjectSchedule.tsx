// components/ProjectSchedule.tsx
import type { ScheduleRow, DayKey } from "@/data/units";

type Props = {
  rows: ScheduleRow[];
};

/** Ordem e rótulos dos dias — inclui DOM para compatibilizar com DayKey */
const ORDER: DayKey[] = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
const LABEL: Record<DayKey, string> = {
  seg: "Seg",
  ter: "Ter",
  qua: "Qua",
  qui: "Qui",
  sex: "Sex",
  sab: "Sáb",
  dom: "Dom",
};

export default function ProjectSchedule({ rows }: Props) {
  if (!rows || rows.length === 0) return null;

  // agrupa por dia
  const byDay = new Map<DayKey, ScheduleRow[]>();
  for (const d of ORDER) byDay.set(d, []);
  rows.forEach((r) => {
    const day = r.day as DayKey;
    if (!byDay.has(day)) byDay.set(day, []);
    byDay.get(day)!.push(r);
  });

  // ordena por horário simples (hh:mm ou faixas "08:00–09:00" caem pro fim)
  for (const d of ORDER) {
    byDay.get(d)!.sort((a, b) => {
      const ta = a.time.split(/[^\d]/).slice(0, 2).join(":");
      const tb = b.time.split(/[^\d]/).slice(0, 2).join(":");
      return ta.localeCompare(tb);
    });
  }

  return (
    <section className="container py-8">
      <h2 className="h2">Horários</h2>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ORDER.map((d) => {
          const items = byDay.get(d)!;
          if (items.length === 0) return null;
          return (
            <div key={d} className="rounded-2xl bg-white/5 p-4">
              <h3 className="font-semibold mb-2">{LABEL[d]}</h3>
              <ul className="space-y-1 text-sm">
                {items.map((it, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="opacity-80">{it.label}</span>
                    <span className="font-medium">{it.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
