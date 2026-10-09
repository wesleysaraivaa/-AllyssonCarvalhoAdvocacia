import { useEffect, useRef } from "react";
import portrait from "@/assets/allysson-carvalho.jpg";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Parallax de scroll + tilt sutil de mouse no retrato (desktop, sem reduced-motion)
  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tiltX = 0;
    let tiltY = 0;
    let curX = 0;
    let curY = 0;
    let parallax = 0;

    const render = () => {
      raf = 0;
      // lerp para movimento amanteigado
      curX += (tiltX - curX) * 0.08;
      curY += (tiltY - curY) * 0.08;
      img.style.transform = `translate3d(0, ${parallax.toFixed(1)}px, 0) scale(1.07) rotateX(${curY.toFixed(2)}deg) rotateY(${curX.toFixed(2)}deg)`;
      if (Math.abs(tiltX - curX) > 0.01 || Math.abs(tiltY - curY) > 0.01) {
        raf = requestAnimationFrame(render);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      parallax = progress * 42;
      schedule();
    };

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      tiltX = nx * 2.2; // ±1.1deg
      tiltY = -ny * 1.8;
      schedule();
    };

    const onLeave = () => {
      tiltX = 0;
      tiltY = 0;
      schedule();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="topo" ref={sectionRef} className="relative border-b border-rule overflow-hidden">
      <div aria-hidden className="hero-seal hidden lg:grid">
        AC
      </div>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 md:min-h-[88vh] flex flex-col md:flex-row">
        {/* Left Branding & Info */}
        <div className="flex-1 md:pr-16 pt-12 pb-10 md:py-20 flex flex-col justify-between">
          <div>
            <span className="hero-intro inline-block px-3 py-1.5 border border-ink text-[10px] tracking-[0.18em] uppercase font-mono mb-8 md:mb-14">
              OAB/CE 44.325
            </span>
            <h1 className="font-display text-ink text-[3.25rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] md:leading-[0.88] tracking-tight">
              <span className="hero-line">
                <span>Allysson</span>
              </span>
              <span className="hero-line">
                <span>Carvalho</span>
              </span>
              <span className="hero-line hero-line--role mt-3 md:mt-5 text-[1.6rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-[0.01em]">
                <span>Advocacia</span>
              </span>
            </h1>
            <p className="hero-copy mt-6 md:mt-10 max-w-md text-lg md:text-2xl font-light leading-relaxed italic font-display text-ink-2">
              Excelência jurídica em Ubajara, com foco dedicado ao Direito Previdenciário e
              assistência social.
            </p>
          </div>

          {/* Mobile portrait: framed, never cropped awkwardly */}
          <div className="md:hidden mt-8 relative border-t border-rule">
            <div className="relative aspect-[4/5] bg-paper-2 overflow-hidden">
              <img
                src={portrait}
                alt="Allysson Carvalho, advogado, OAB/CE 44.325"
                className="absolute inset-0 w-full h-full object-cover object-[50%_18%]"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <p className="text-[10px] uppercase tracking-[0.25em] opacity-60 font-mono">
                  Sede Própria
                </p>
                <p className="font-display italic text-base">Ubajara, Ceará</p>
              </div>
            </div>
          </div>

          <div className="hero-actions mt-10 md:mt-12 space-y-5">
            <a href="#contato" className="hover-rule group flex items-center justify-between">
              <span className="uppercase tracking-widest text-[11px] font-mono font-medium">
                Agendar atendimento
              </span>
              <span aria-hidden className="btn-arrow font-display italic">
                →
              </span>
            </a>
            <a href="#atuacao" className="hover-rule group flex items-center justify-between">
              <span className="uppercase tracking-widest text-[11px] font-mono font-medium">
                Conhecer áreas de atuação
              </span>
              <span aria-hidden className="btn-arrow font-display italic">
                ↘
              </span>
            </a>
          </div>
        </div>

        {/* Right Image/Portrait (desktop) */}
        <div
          className="hero-portrait hidden md:flex flex-1 bg-paper-2 relative overflow-hidden items-end justify-center"
          style={{ perspective: "900px" }}
        >
          <img
            ref={imgRef}
            src={portrait}
            alt="Allysson Carvalho, advogado, OAB/CE 44.325"
            className="hero-portrait-img absolute inset-0 w-full h-full object-cover object-[50%_20%]"
            loading="eager"
            fetchPriority="high"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper/90 to-transparent z-[1]"
          />
          <div className="absolute bottom-8 right-8 text-right z-10">
            <p className="text-[10px] uppercase tracking-[0.25em] opacity-60 font-mono">
              Sede Própria
            </p>
            <p className="font-display italic text-lg">Ubajara, Ceará</p>
          </div>
        </div>
      </div>
    </section>
  );
}
