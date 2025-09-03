// data/schedule.ts
import type { UnitSlug } from "@/data/units";

export type Session = { title: string; time: string; note?: string };
export type DayKey = "seg" | "ter" | "qua" | "qui" | "sex" | "sab";
export type GymSchedule = Record<DayKey, Session[]>;

// ---------- BRUXO TEAM — STELLA (Matriz) ----------
export const scheduleStella: GymSchedule = {
  seg: [
    { title: "MISTA", time: "06:00" },
    { title: "KIDS", time: "10:00" },
    { title: "MISTA", time: "12:00" },
    { title: "INICIANTES", time: "15:00" },
    { title: "KIDS", time: "16:00" },
    { title: "MISTA", time: "20:15" },
  ],
  ter: [
    { title: "MISTA", time: "06:00" },
    { title: "NO-GI", time: "12:00" },
    { title: "INICIANTES", time: "15:00" },
    { title: "KIDS", time: "16:00" },
  ],
  qua: [
    { title: "KIDS", time: "10:00" },
    { title: "MISTA", time: "12:00" },
    { title: "MISTA", time: "20:15" },
  ],
  qui: [
    { title: "MISTA", time: "06:00" },
    { title: "NO-GI", time: "12:00" },
    { title: "INICIANTES", time: "15:00" },
    { title: "KIDS", time: "16:00" },
  ],
  sex: [
    { title: "KIDS", time: "10:00" },
    { title: "MISTA", time: "12:00" },
    { title: "KIDS", time: "16:00" },
    { title: "MISTA", time: "20:15" },
  ],
  sab: [{ title: "OPEN-MAT", time: "10:00" }],
};

// ---------- BRUXO TEAM — STIEP ----------
export const scheduleStiep: GymSchedule = {
  seg: [
    { title: "MISTA", time: "07:00–09:00" },
    { title: "MISTA", time: "20:00–22:00" },
  ],
  ter: [
    { title: "KIDS", time: "18:00–19:00" },
    { title: "Feminino", time: "19:00–20:00" },
    { title: "NO-GI", time: "20:00–22:00" },
  ],
  qua: [
    { title: "MISTA", time: "07:00–09:00" },
    { title: "MISTA", time: "20:00–22:00" },
  ],
  qui: [
    { title: "KIDS", time: "18:00–19:00" },
    { title: "Feminino", time: "19:00–20:00" },
    { title: "NO-GI", time: "20:00–22:00" },
  ],
  sex: [],
  sab: [],
};

// ---------- BRUXO TEAM — ITAPUÃ ----------
export const scheduleItapua: GymSchedule = {
  seg: [],
  ter: [{ title: "MISTA", time: "20:00–21:20" }],
  qua: [],
  qui: [{ title: "MISTA", time: "20:00–21:20" }],
  sex: [],
  sab: [],
};

// ---------- BRUXO TEAM — ITACARÉ ----------
export const scheduleItacare: GymSchedule = {
  seg: [
    { title: "MISTA", time: "12:00" },
    { title: "MISTA", time: "19:00" },
    { title: "KIDS",  time: "10:00" },
    { title: "KIDS",  time: "16:00–16:45" }, // BABY
    { title: "KIDS",  time: "18:00" },       // KIDS 1
  ],
  ter: [
    { title: "MISTA", time: "06:00" },
    { title: "KIDS",  time: "15:00–16:00" }, // INFANTIL 11–15
    { title: "KIDS",  time: "18:00–19:00" }, // KIDS 2
  ],
  qua: [
    { title: "MISTA", time: "12:00" },
    { title: "MISTA", time: "19:00" },
    { title: "KIDS",  time: "10:00" },
    { title: "KIDS",  time: "16:00–16:45" }, // BABY
    { title: "KIDS",  time: "18:00" },       // KIDS 1
  ],
  qui: [
    { title: "MISTA", time: "06:00" },
    { title: "KIDS",  time: "15:00–16:00" }, // INFANTIL 11–15
    { title: "KIDS",  time: "18:00–19:00" }, // KIDS 2
  ],
  sex: [
    { title: "MISTA", time: "12:00" },
    { title: "MISTA", time: "19:00" },
  ],
  sab: [
    { title: "OPEN-MAT", time: "08:00", note: "Treino coletivo" },
  ],
};

// ---------- MAPA POR UNIDADE ----------
export const SCHEDULES_BY_UNIT: Record<UnitSlug, GymSchedule> = {
  matriz: scheduleStella, // Matriz usa a grade de Stella
  stiep: scheduleStiep,
  itapua: scheduleItapua,
  itacare: scheduleItacare, // ✅ incluído
};
