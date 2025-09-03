// app/loja/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loja — Bruxo Team",
  description: "Vitrine de produtos oficiais com compra via WhatsApp.",
};

const produtos = [
  { slug: "kimono", name: "Kimono Bruxo Team", price: "R$ 499", desc: "Kimono oficial resistente.", image: "/images/loja/kimono.jpg" },
  { slug: "rash-guard", name: "Rash Guard", price: "R$ 169", desc: "Performance e proteção.", image: "/images/loja/rash-guard.jpg" },
  { slug: "camiseta", name: "Camiseta Oficial", price: "R$ 79", desc: "Dia a dia com estilo.", image: "/images/loja/camiseta.jpg" },
];

export default function LojaPage() {
  return (
    <main className="container py-12">
      <h1 className="h1 mb-6">Loja</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((p) => (
          <div key={p.slug} className="card overflow-hidden">
            <div className="aspect-[4/3] bg-black/10" aria-hidden />
            <div className="p-4">
              <h3 className="h3">{p.name}</h3>
              <p className="p">{p.desc}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-medium">{p.price}</span>
                <a className="text-sm underline"
                   href={`https://wa.me/5571XXXXXXXXX?text=Tenho%20interesse%20em%20${encodeURIComponent(p.name)}`}
                   target="_blank">
                  Comprar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
