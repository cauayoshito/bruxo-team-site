// components/ScheduleTable.tsx
import type { GymSchedule, DayKey } from "@/data/schedule";

const DAY_LABEL: Record<DayKey, string> = {
  seg: "Seg",
  ter: "Ter",
  qua: "Qua",
  qui: "Qui",
  sex: "Sex",
  sab: "Sáb",
  dom: "Dom", // ✅ adicionado
};

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
          {Object.keys(DAY_LABEL).map((d) => (
            <td key={d} className="border px-2 py-1 align-top">
              {schedule[d as DayKey] || "-"}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
