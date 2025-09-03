export default function Testimonials(){
  const items = [
    { name: "Aline (mãe do aluno)", text: "Meu filho ganhou foco e disciplina treinando aqui."},
    { name: "Rafael (aluno)", text: "Voltei a competir com confiança."},
    { name: "Marta (aluna)", text: "Ambiente família, evolução de verdade."},
  ];
  return (
    <section className="container py-16">
      <h2 className="h2">Depoimentos</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {items.map((it)=>(
          <div key={it.name} className="card p-6">
            <p className="italic">&ldquo;{it.text}&rdquo;</p>
            <p className="mt-4 text-sm text-muted">— {it.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
