// components/ScheduleTable.tsx
import type { GymSchedule, DayKey } from "@/data/schedule";

const DAY_LABEL: Record<DayKey, string> = {
  seg: "Seg", ter: "Ter", qua: "Qua", qui: "Qui", sex: "Sex", sab: "Sáb",
};

export default function ScheduleTable({ schedule, title = "Horários" }:{
  schedule: GymSchedule; title?: string;
}) {
  const rows = (Object.keys(schedule) as DayKey[]).flatMap((d) =>
    schedule[d].map(s => ({ day: DAY_LABEL[d], title: s.title, time: s.time }))
  );

  return (
    <section id="horarios" className="section container">
      <h2 className="h2">{title}</h2>
      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="text-white/80">
            <tr className="[&>th]:py-3 [&>th]:px-4">
              <th>Dia</th><th>Turma</th><th>Horário</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.length === 0 && (
              <tr><td colSpan={3} className="py-6 px-4 text-white/60">
                Em breve atualizaremos os horários desta unidade.
              </td></tr>
            )}
            {rows.map((r, i) => (
              <tr key={i} className="[&>td]:py-3 [&>td]:px-4">
                <td className="font-medium">{r.day}</td>
                <td>{r.title}</td>
                <td>{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
