// components/ScheduleTable.tsx
import type { GymSchedule, DayKey, Session } from "@/data/schedule";

const DAY_LABEL: Record<DayKey, string> = {
  seg: "Seg",
  ter: "Ter",
  qua: "Qua",
  qui: "Qui",
  sex: "Sex",
  sab: "Sáb",
  dom: "Dom",
};

// Nem todos os schedules usam as mesmas chaves.
// Este helper torna o render tolerante a variações (label/title/name e time/hour).
type AnySession = Session & {
  label?: string;
  title?: string;
  name?: string;
  time?: string;
  hour?: string;
};

function isSessionArray(v: unknown): v is AnySession[] {
  return Array.isArray(v) && v.every((x) => x && typeof x === "object");
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
              content =
                value.length > 0 ? (
                  <ul className="space-y-1">
                    {value.map((raw, i) => {
                      const s = raw as unknown as AnySession;
                      const label = s.label ?? s.title ?? s.name ?? "Aula";
                      const time = s.time ?? s.hour ?? "";
                      return (
                        <li
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <span className="opacity-80">{label}</span>
                          <span className="font-medium">{time}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <span className="opacity-60">-</span>
                );
            } else if (typeof value === "string") {
              content = value || <span className="opacity-60">-</span>;
            } else if (value == null) {
              content = <span className="opacity-60">-</span>;
            } else {
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
