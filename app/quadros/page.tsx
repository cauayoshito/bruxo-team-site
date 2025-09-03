import { Schedule } from "@/components/Schedule";
import { scheduleStella, scheduleStiep } from "@/data/schedule";

export default function Quadros() {
  return (
    <main>
      <Schedule title="Bruxo Team — Stella" data={scheduleStella} />
      <div className="mt-12" />
      <Schedule title="Bruxo Team — Stiep" data={scheduleStiep} />
    </main>
  );
}
