import Image from "next/image";

export default function Turmas() {
  return (
    <section id="turmas" className="section container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Nossas Turmas</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Stiep */}
        <div className="card overflow-hidden hover:translate-y-[-2px] transition-all">
          <Image
            src="/stiep.jpg"
            alt="Turma da Unidade Stiep"
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            priority
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg">Stiep</h3>
            <p className="text-sm text-white/80">Treinos para iniciantes e avançados.</p>
          </div>
        </div>

        {/* Itapuã */}
        <div className="card overflow-hidden hover:translate-y-[-2px] transition-all">
          <Image
            src="/itapua.jpg"
            alt="Turma da Unidade Itapuã"
            width={600}
            height={400}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg">Itapuã</h3>
            <p className="text-sm text-white/80">Treinos voltados para performance.</p>
          </div>
        </div>

        {/* Stella */}
        <div className="card overflow-hidden hover:translate-y-[-2px] transition-all">
          <Image
            src="/stella.jpg"
            alt="Turma da Unidade Stella Maris"
            width={600}
            height={400}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg">Stella Maris</h3>
            <p className="text-sm text-white/80">Turmas para todas as idades.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

