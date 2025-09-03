// components/CompetitorsCTA.tsx
import Link from "next/link";

export default function CompetitorsCTA({ whatsapp }: { whatsapp?: string }) {
  const wa = whatsapp ? `https://wa.me/${whatsapp}` : null;

  return (
    <section className="container py-16 section">
      <div className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-7">
          <h2 className="h2">Vem competir com a gente</h2>
          <p className="p mt-4">
            Competir acelera sua evolução: foco nos treinos, estratégia e um
            time inteiro do seu lado no dia da luta.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="p">• Acompanhamento dos professores</li>
            <li className="p">• Planejamento de treinos e categoria</li>
            <li className="p">• Ambiente motivador e respeitoso</li>
          </ul>

          <div className="mt-6 flex gap-3">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Quero me preparar
              </a>
            )}
            <Link href="/#horarios" className="btn-secondary">
              Ver horários de treino
            </Link>
          </div>
        </div>

        <div className="md:col-span-5 grid gap-4">
          <div className="card p-5">
            <p className="text-lg font-semibold">
              “Venci o medo do primeiro campeonato.”
            </p>
            <p className="p opacity-80 mt-1">— Aluno(a) Bruxo Team</p>
          </div>
          <div className="card p-5">
            <p className="text-lg font-semibold">
              “Nunca treinei com tanto foco e propósito.”
            </p>
            <p className="p opacity-80 mt-1">— Competidor(a)</p>
          </div>
          <div className="card p-5">
            <p className="text-lg font-semibold">
              “A energia do time no dia é surreal.”
            </p>
            <p className="p opacity-80 mt-1">— Atleta Bruxo Team</p>
          </div>
        </div>
      </div>
    </section>
  );
}
