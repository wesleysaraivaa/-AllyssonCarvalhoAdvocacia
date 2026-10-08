import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";

const NAV = [
  { label: "Início", href: "#topo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Áreas", href: "#atuacao" },
  { label: "Contato", href: "#contato" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 border-b border-paper/10 pb-16">
          <div className="lg:col-span-5">
            <Wordmark light />
            <p className="mt-8 max-w-[36ch] text-paper/60 text-[15px] leading-relaxed">
              Atendimento jurídico em Ubajara/CE com dedicação às causas previdenciárias, criminais, de família e cíveis.
            </p>
          </div>

          <div className="lg:col-span-3">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/40 block mb-6">
              Navegação
            </span>
            <nav className="flex flex-col gap-3">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="font-sans text-[15px] text-paper/80 hover:text-paper transition-colors"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/40 block mb-6">
              Endereço
            </span>
            <address className="not-italic font-display text-paper/90 text-lg leading-relaxed">
              Rua 31 de Dezembro, 41
              <br />
              Centro — Ubajara, Ceará
            </address>
            <p className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-paper/40">
              OAB/CE 44.325
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-paper/40 text-[12px]">
          <p className="font-mono tracking-[0.05em]">
            © {new Date().getFullYear()} Allysson Carvalho Advocacia
          </p>
          <Link to="/privacidade" className="font-sans text-[13px] text-paper/60 hover:text-paper transition-colors">
            Política de Privacidade
          </Link>
          <p className="font-sans text-[13px]">
            Site criado com critério e discrição.
          </p>
        </div>
      </div>
    </footer>
  );
}
