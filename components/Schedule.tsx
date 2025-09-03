// components/Schedule.tsx
import React from "react";
import type { GymSchedule, DayKey } from "@/data/schedule";

type Props = {
  title: string;
  data: GymSchedule;
};

const DAYS: { key: DayKey; label: string }[] = [
  { key: "seg", label: "SEG" },
  { key: "ter", label: "TER" },
  { key: "qua", label: "QUA" },
  { key: "qui", label: "QUI" },
  { key: "sex", label: "SEX" },
  { key: "sab", label: "SÁB" },
];

function Schedule({ title, data }: Props) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {DAYS.map(({ key, label }) => (
            <div key={key} className="card p-4">
              <div className="font-semibold mb-3 tracking-wide">{label}</div>
              <ul className="space-y-2">
                {data[key].length === 0 && (
                  <li className="text-white/50 text-sm">—</li>
                )}
                {data[key].map((s, i) => (
                  <li key={i} className="text-sm">
                    <span className="inline-block font-medium mr-2">
                      {s.title}
                    </span>
                    <span className="opacity-80">{s.time}</span>
                    {s.note && <span className="opacity-60"> — {s.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Schedule;      // <- default
export { Schedule };          // <- opcional: também exporta nomeado
