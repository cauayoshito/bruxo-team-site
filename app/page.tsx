// app/page.tsx
import Hero from "@/components/Hero";
import UnitCard from "@/components/UnitCard";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { UNITS } from "@/data/units";

export default function Page() {
  // Matriz (featured: true) aparece primeiro
  const ordered = [...UNITS].sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured)
  );

  return (
    <main>
      <Hero />

      <section id="unidades" className="container py-16 section">
        <h2 className="h2">Nossas Unidades</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {ordered.map((u) => (
            <UnitCard key={u.slug} unit={u} variant="preview" />
          ))}
        </div>
      </section>

      <About />
      <Testimonials />
      <Footer />
    </main>
  );
}
