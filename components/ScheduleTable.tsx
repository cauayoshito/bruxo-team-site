// components/ScheduleTable.tsx
import type { GymSchedule, DayKey, Session } from "@/data/schedule";

const DAY_LABEL: Record<DayKey, string> = {
  seg: "Seg",
  ter: "Ter",
  qua: "Qua",
  qui: "Qui",
  sex: "Sex",
  sab: "Sab",
  dom: "Dom",
};

function isSessionArray(v: unknown): v is Session[] {
  return Array.isArray(v);
}

export default function ScheduleTable({ schedule }: { schedule: GymSchedule }) {
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr>
          {Object.keys(DAY_LABEL).map((d) => (
            <th key={d} className="border px-2 py-1 text-left">
              {DAY_LABEL[d as DayKey]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.keys(DAY_LABEL).map((d) => {
            const day = d as DayKey;
            const value = schedule[day];

            let content: React.ReactNode;

            if (isSessionArray(value)) {
              // Renderiza cada sessão (label/time) em linhas
              content =
                value.length > 0 ? (
                  <ul className="space-y-1">
                    {value.map((s, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <span className="opacity-80">{s.label}</span>
                        <span className="font-medium">{s.time}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="opacity-60">-</span>
                );
            } else if (typeof value === "string") {
              // Compatibilidade caso seja string (ex.: "19:00 - Mista")
              content = value || <span className="opacity-60">-</span>;
            } else if (value == null) {
              content = <span className="opacity-60">-</span>;
            } else {
              // Qualquer formato inesperado vira "-"
              content = <span className="opacity-60">-</span>;
            }

            return (
              <td key={d} className="border px-2 py-1 align-top">
                {content}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}
