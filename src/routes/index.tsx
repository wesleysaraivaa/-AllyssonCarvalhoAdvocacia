import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Practice } from "@/components/site/Practice";
import { Approach } from "@/components/site/Approach";
import { ContactSection } from "@/components/site/ContactSection";

const TITLE = "Allysson Carvalho Advocacia | Advogado em Ubajara–CE";
const DESC =
  "Atuação jurídica em Direito Previdenciário, Criminal, Tribunal do Júri, Família, Civil, Consumidor e Trabalhista em Ubajara–CE.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <About />
      <Practice />
      <Approach />
      <ContactSection />
    </PageShell>
  );
}
