import { useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/motion/FadeUp";
import officePhoto from "@/assets/adv-Alisson-2.jpg";

const CARDS = [
  {
    key: "Raízes",
    label: "01",
    lines: [
      "Nasci e cresci em Ubajara. Conheço de perto a dignidade e as dificuldades da nossa região.",
      "Por isso atendo pessoalmente: do primeiro contato ao desfecho, sem intermediários.",
    ],
    kind: "photo" as const,
  },
  {
    key: "Escolha",
    label: "02",
    lines: [
      "Escolhi o Direito para defender causas reais e devolver segurança a quem precisa.",
      "Advocacia, para mim, é técnica aplicada com responsabilidade e proximidade.",
    ],
    kind: "monogram" as const,
  },
  {
    key: "Propósito",
    label: "03",
    lines: [
      "Dedico atenção especial ao Direito Previdenciário: uma decisão correta muda uma família inteira.",
      "Cada processo é uma pessoa. E toda pessoa merece ser ouvida.",
    ],
    kind: "note" as const,
  },
];

export function About() {
  const [active, setActive] = useState(0);
  const [canHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches,
  );
  const sectionRef = useRef<HTMLElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    if (!section || !photo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = section.getBoundingClientRect();
        const progress = 1 - (rect.top + rect.height / 2) / window.innerHeight;
        photo.style.transform = `translate3d(0, ${(progress * 46).toFixed(1)}px, 0) scale(1.08)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onKeyNav = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % CARDS.length);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + CARDS.length) % CARDS.length);
    }
  };

  return (
    <section id="sobre" ref={sectionRef} className="relative border-b border-rule overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div ref={photoRef} className="absolute inset-0 will-change-transform">
          <img
            src={officePhoto}
            alt=""
            className="h-full w-full object-cover object-[40%_35%]"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-paper/75" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-20 md:py-32">
        <FadeUp
          as="h2"
          className="font-display text-ink text-[2.6rem] md:text-7xl lg:text-[5.6rem] leading-[1.02] max-w-[18ch] text-balance"
        >
          Direito começa quando alguém se dispõe a{" "}
          <span className="italic">escutar de verdade.</span>
        </FadeUp>
        <FadeUp
          delay={80}
          className="mt-6 font-mono text-[10px] tracking-[0.22em] uppercase text-ink-muted"
        >
          Allysson Carvalho · OAB/CE 44.325
        </FadeUp>

        {/* Dossiê */}
        <FadeUp className="mt-14 md:mt-24">
          <div
            role="tablist"
            aria-label="Dossiê do advogado"
            onKeyDown={onKeyNav}
            className="mt-14 flex flex-col gap-3 md:mt-24 md:grid md:grid-cols-3 md:gap-0"
          >
            {CARDS.map((card, index) => {
              const isActive = active === index;
              return (
                <button
                  key={card.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(index)}
                  onMouseEnter={canHover ? () => setActive(index) : undefined}
                  onFocus={() => setActive(index)}
                  className={`dossier-card relative w-full border border-ink bg-paper/95 p-6 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink md:min-h-[380px] md:w-auto md:bg-paper md:p-8 ${isActive ? "is-active pb-20" : "min-h-[116px]"}`}
                  style={{ zIndex: isActive ? 20 : 10 - index }}
                >
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-muted">
                    {card.label}
                  </span>
                  <h3 className="mt-4 font-display text-3xl leading-tight md:mt-8 md:text-4xl">
                    {card.key}
                  </h3>

                  <div
                    className={`dossier-body grid ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-6 text-[15px] leading-[1.8] text-ink-2 max-w-[32ch]">
                        {card.lines[0]}
                      </p>
                      <p className="pt-3 text-[15px] leading-[1.8] text-ink-2 max-w-[32ch]">
                        {card.lines[1]}
                      </p>
                    </div>
                  </div>

                  <span
                    aria-hidden
                    className="absolute bottom-6 left-6 right-6 flex items-end justify-between md:bottom-7 md:left-7 md:right-7"
                  >
                    {card.kind === "note" && isActive && (
                      <span className="font-display italic text-brass text-lg leading-tight max-w-[16ch]">
                        com técnica e presença
                      </span>
                    )}
                    <span
                      className={`font-display italic text-ink-muted transition-transform duration-500 ${isActive ? "translate-x-1" : ""}`}
                    >
                      ↘
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </FadeUp>

        <FadeUp delay={120} className="mt-16 md:mt-28 max-w-[46ch]">
          <blockquote className="font-display italic text-2xl md:text-4xl leading-[1.35]">
            “Cada processo carrega uma vida real. É por isso que nenhuma estratégia pode começar
            antes da escuta.”
          </blockquote>
          <a
            href="#atuacao"
            className="hover-rule mt-10 inline-flex w-full items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-ink"
          >
            Conheça minha atuação <span aria-hidden>↘</span>
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
