import { useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

const AREAS = [
  {
    title: "Direito Previdenciário",
    desc: "Planejamento de aposentadorias, revisão de benefícios e orientação diante de indeferimentos do INSS.",
    situation: "Para quem precisa compreender o melhor momento e o caminho mais seguro para requerer um benefício.",
    mark: "P",
    featured: true,
  },
  {
    title: "BPC / LOAS",
    desc: "Assistência jurídica a idosos e pessoas com deficiência em situação de vulnerabilidade.",
    situation: "Para famílias que tiveram o pedido negado ou precisam organizar documentos e avaliação social.",
    mark: "B",
  },
  {
    title: "Direito Criminal e Júri",
    desc: "Defesa técnica em investigações, processos criminais e atuação perante o Tribunal do Júri.",
    situation: "Para situações que exigem resposta imediata, estratégia cuidadosa e acompanhamento próximo.",
    mark: "C",
  },
  {
    title: "Família e Civil",
    desc: "Orientação em divórcios, guarda, inventários, contratos e conflitos patrimoniais.",
    situation: "Para decisões pessoais e patrimoniais que pedem clareza jurídica e condução sensível.",
    mark: "F",
  },
  {
    title: "Consumidor e Trabalhista",
    desc: "Análise de relações de consumo e trabalho, com avaliação objetiva de direitos e riscos.",
    situation: "Para quem enfrenta cobrança indevida, falha de serviço ou conflito na relação de trabalho.",
    mark: "T",
  },
];

type Area = (typeof AREAS)[number];

function AreaDetail({ area, variant }: { area: Area; variant: "inline" | "aside" }) {
  return (
    <div
      className={`practice-detail relative border-l border-paper/20 pl-6 md:pl-12 ${
        variant === "inline" ? "min-h-0 py-8 md:py-10" : "min-h-[360px]"
      }`}
    >
      <span aria-hidden className="font-display text-[6rem] md:text-[8rem] leading-none text-paper/5 absolute -top-6 right-0 select-none">{area.mark}</span>
      <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-brass-light">Atuação em destaque</p>
      <h3 className="mt-6 md:mt-8 font-display text-2xl md:text-4xl leading-tight">{area.title}</h3>
      <p className="mt-5 md:mt-7 text-[15px] leading-[1.8] text-paper/65 max-w-[40ch]">{area.desc}</p>
      <div className="mt-8 md:mt-10 pt-6 md:pt-7 border-t border-paper/15">
        <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-paper/40 mb-3">Quando procurar orientação</p>
        <p className="font-display italic text-lg md:text-xl leading-relaxed text-paper/85">{area.situation}</p>
      </div>
    </div>
  );
}

export function Practice() {
  const [active, setActive] = useState(0);

  const canHover = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  return (
    <section id="atuacao" className="bg-ink text-paper border-b border-rule">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <FadeUp className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-paper/20 pb-10">
          <h2 className="font-display text-paper text-4xl md:text-6xl leading-[1.05] max-w-[15ch]">Um índice para questões <span className="italic">da vida real.</span></h2>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-paper/50 max-w-[32ch] leading-relaxed">Selecione uma área para entender como o escritório pode orientar você.</p>
        </FadeUp>

        <div className="grid lg:grid-cols-12 lg:gap-16">
          <FadeUp stagger={90} className="lg:col-span-7" role="tablist" aria-label="Áreas de atuação">
            {AREAS.map((item, index) => (
              <div key={item.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-expanded={active === index}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => { if (canHover()) setActive(index); }}
                  className={`practice-row group w-full grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 border-b border-paper/20 py-7 md:py-9 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-paper ${active === index ? "is-active" : ""}`}
                >
                  <span className="font-display text-2xl md:text-4xl text-paper/70 group-hover:text-paper transition-colors">{item.title}</span>
                  <span aria-hidden className="font-display italic text-xl text-paper/30 transition-transform group-hover:translate-x-1">↗</span>
                </button>
                {active === index && (
                  <div className="lg:hidden" aria-live="polite">
                    <AreaDetail area={item} variant="inline" />
                  </div>
                )}
              </div>
            ))}
          </FadeUp>

          <aside className="hidden lg:block lg:col-span-5 lg:sticky lg:top-32 self-start pt-12 lg:pt-16" aria-live="polite">
            <AreaDetail area={AREAS[active]} variant="aside" />
          </aside>
        </div>
      </div>
    </section>
  );
}
