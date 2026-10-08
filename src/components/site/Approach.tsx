import { useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";

const STEPS = [
  {
    k: "Primeiro contato",
    d: "Você apresenta a sua situação. A conversa inicial serve para entender o contexto e verificar se há caminho jurídico possível.",
  },
  {
    k: "Análise dos documentos",
    d: "Leitura atenta dos documentos relevantes, com esclarecimento das dúvidas antes de qualquer decisão.",
  },
  {
    k: "Orientação clara",
    d: "Explicação em linguagem acessível sobre alternativas, prazos e riscos — sem promessas de resultado.",
  },
  {
    k: "Acompanhamento próximo",
    d: "Condução do caso com informação sobre cada etapa relevante, do início ao desfecho.",
  },
];

export function Approach() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-b border-rule overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-20 md:py-32">
        <FadeUp className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-ink-muted mb-6">Forma de atendimento</p>
            <h2 className="font-display text-ink text-4xl md:text-6xl leading-[1.05]">Um caso não passa por uma linha de produção.</h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 font-sans text-[16px] leading-[1.8] text-ink-2">Atendimento individual: quem escuta a sua história é quem define e conduz a estratégia.</p>
        </FadeUp>

        <div className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 relative min-h-[430px] hidden lg:block" aria-hidden>
            {STEPS.map((step, index) => (
              <div key={step.k} className={`case-sheet absolute inset-x-0 top-0 border border-ink bg-paper p-9 min-h-[320px] transition-all duration-700 ${index <= active ? "is-sorted" : ""}`} style={{ transform: `translate(${index * 14}px, ${index * 18}px) rotate(${(index - 1.5) * 0.7}deg)`, zIndex: index <= active ? 10 + index : 4 - index }}>
                <div className="flex justify-between border-b border-rule pb-4 font-mono text-[9px] tracking-[0.18em] uppercase text-ink-muted"><span>Registro de atendimento</span><span>AC / 44.325</span></div>
                <p className="mt-12 font-display text-4xl">{step.k}</p>
                <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-ink-2">{step.d}</p>
                <span className="absolute bottom-8 right-8 h-14 w-14 rounded-full border border-brass text-brass grid place-items-center font-display italic">AC</span>
              </div>
            ))}
          </div>

          <FadeUp stagger={90} delay={100} className="lg:col-span-6 lg:col-start-7 border-t border-ink">
            {STEPS.map((step, index) => (
              <button key={step.k} type="button" onClick={() => setActive(index)} aria-expanded={active === index} className="w-full text-left border-b border-rule py-6 md:py-7 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink">
                <div className="flex items-center justify-between gap-6">
                  <h3 className={`font-display text-xl md:text-2xl transition-colors ${active === index ? "text-ink" : "text-ink-muted"}`}>{step.k}</h3>
                  <span aria-hidden className={`text-brass transition-transform duration-500 ${active === index ? "rotate-45" : ""}`}>＋</span>
                </div>
                <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${active === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden"><p className="pt-5 pr-10 text-sm leading-[1.8] text-ink-2">{step.d}</p></div>
                </div>
              </button>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
