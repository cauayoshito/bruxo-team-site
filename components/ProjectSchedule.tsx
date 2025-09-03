// components/ProjectSchedule.tsx
import type { ProjectDetail } from "@/data/projects";
import type { DayKey } from "@/data/units";

const ORDER: DayKey[] = ["seg", "ter", "qua", "qui", "sex", "sab"];
const LABEL: Record<DayKey, string> = {
  seg: "Seg",
  ter: "Ter",
  qua: "Qua",
  qui: "Qui",
  sex: "Sex",
  sab: "Sáb",
};

export default function ProjectSchedule({
  project,
}: {
  project: ProjectDetail;
}) {
  const rows = (project.schedule ?? []).slice().sort((a, b) => {
    const da = ORDER.indexOf(a.day as DayKey);
    const db = ORDER.indexOf(b.day as DayKey);
    return da - db || a.time.localeCompare(b.time);
  });

  if (!rows.length) return null;

  return (
    <section className="container py-12">
      <h2 className="h2">Horários</h2>

      <div className="mt-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left px-4 py-3">Dia</th>
              <th className="text-left px-4 py-3">Turma</th>
              <th className="text-left px-4 py-3">Horário</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{LABEL[r.day as DayKey] ?? r.day}</td>
                <td className="px-4 py-2">{r.label}</td>
                <td className="px-4 py-2">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
