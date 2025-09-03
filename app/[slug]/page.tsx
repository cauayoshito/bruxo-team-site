// app/[slug]/page.tsx
import { redirect } from "next/navigation";

export default function LegacySlugPage({ params }: { params: { slug: string } }) {
  // Redireciona os slugs antigos para a nova rota de projetos sociais
  redirect(`/projetos-sociais/${params.slug}`);
}
