// components/UnitSchedule.tsx
import { type ScheduleRow, type DayKey } from "@/data/units";

const DAY_ORDER: DayKey[] = ["seg", "ter", "qua", "qui", "sex", "sab"];
const DAY_LABEL: Record<DayKey, string> = {
  seg: "Seg",
  ter: "Ter",
  qua: "Qua",
  qui: "Qui",
  sex: "Sex",
  sab: "Sáb",
};

export default function UnitSchedule({ rows }: { rows: ScheduleRow[] }) {
  if (!rows || rows.length === 0) return null;

  const sorted = [...rows].sort((a, b) => {
    const da = DAY_ORDER.indexOf(a.day);
    const db = DAY_ORDER.indexOf(b.day);
    if (da !== db) return da - db;
    return a.time.localeCompare(b.time);
  });

  return (
    <section className="container pb-12">
      <h2 className="h2">Horários</h2>

      <div className="mt-4 overflow-x-auto rounded-2xl border bg-white/5">
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr className="[&>th]:py-3 [&>th]:px-4">
              <th className="w-[90px]">Dia</th>
              <th>Turma</th>
              <th className="w-[110px]">Horário</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sorted.map((r, i) => (
              <tr
                key={`${r.day}-${r.label}-${r.time}-${i}`}
                className="hover:bg-white/5"
              >
                <td className="py-3 px-4 opacity-80">{DAY_LABEL[r.day]}</td>
                <td className="py-3 px-4">{r.label}</td>
                <td className="py-3 px-4 tabular-nums">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
