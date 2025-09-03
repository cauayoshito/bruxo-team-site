// lib/schedule-adapter.ts
import type {
  GymSchedule,
  DayKey as DayKeyGym,
  Session,
} from "@/data/schedule";
import type {
  ScheduleRow,
  DayKey as DayKeyUnits,
  ClassLabel,
} from "@/data/units";

const DAY_MAP: Record<DayKeyGym, DayKeyUnits> = {
  seg: "seg",
  ter: "ter",
  qua: "qua",
  qui: "qui",
  sex: "sex",
  sab: "sab",
};

// mapeia títulos livres do schedule → labels do tipo ClassLabel
function mapTitleToClassLabel(title: string): ClassLabel {
  const t = title.trim().toLowerCase();

  if (t === "no-gi" || t === "nogi" || t === "no gi")
    return "No-Gi (sem kimono)";
  if (t === "gi" || t === "jiu-jitsu" || t === "jiu jitsu" || t === "kimono")
    return "Jiu-Jitsu (com kimono)";
  if (t === "mista" || t === "misto") return "Mista";
  if (t === "kids" || t.startsWith("kids")) return "Kids";
  if (t === "feminino") return "Feminino";
  if (t === "competição" || t === "competicao") return "Competição";
  if (t === "60+" || t === "idosos" || t === "master") return "60+";
  if (t === "open-mat" || t === "open mat" || t === "open") return "Open Mat";
  if (t === "avançado" || t === "avancado") return "Avançado";

  // mantém o texto que você usa (ex.: "INICIANTES") sem quebrar o tipo
  return title as unknown as ClassLabel;
}

export function toScheduleRows(schedule: GymSchedule): ScheduleRow[] {
  const rows: ScheduleRow[] = [];

  (Object.keys(schedule) as DayKeyGym[]).forEach((dayGym) => {
    const sessions: Session[] = schedule[dayGym] || [];
    const dayUnits = DAY_MAP[dayGym];

    sessions.forEach((s) => {
      rows.push({
        day: dayUnits,
        label: mapTitleToClassLabel(s.title),
        time: s.time,
      });
    });
  });

  return rows;
}
