import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";

const NAV = [
  { label: "Início", href: "#topo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Áreas de atuação", href: "#atuacao" },
  { label: "Contato", href: "#contato" },
];

export function Header({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => {
      const top =
        window.scrollY ??
        window.pageYOffset ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;
      setScrolled(top > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  // mount / unmount with exit animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    if (!mounted) return;
    const t = setTimeout(() => {
      setMounted(false);
      triggerRef.current?.focus();
    }, 420);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // scroll lock, Esc, focus trap
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
    };
  }, [mounted, closeMenu]);

  const isSolid = light || scrolled;
  const bgClass = isSolid
    ? "bg-paper border-b border-rule shadow-xs"
    : "bg-transparent border-b border-transparent";

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${bgClass}`}
      style={{
        backgroundColor: isSolid ? "var(--paper, #f5f3ee)" : "transparent",
      }}
    >
      <div
        className={`mx-auto max-w-[1400px] flex items-center justify-between px-6 md:px-10 lg:px-16 transition-[padding] duration-500 ${scrolled ? "py-3.5" : "py-5"}`}
      >
        <Wordmark />

        <nav className="hidden md:flex items-center gap-10 font-mono text-[11px] tracking-mono uppercase text-ink-2">
          {NAV.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="link-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
            >
              {i.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="hidden md:inline-flex btn-solid !py-3 !px-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Falar com o advogado
          <span aria-hidden className="btn-arrow">
            →
          </span>
        </a>

        <button
          ref={triggerRef}
          type="button"
          className="md:hidden font-mono text-[11px] tracking-mono uppercase border-b border-ink pb-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label="Abrir menu de navegação"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {mounted && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            aria-hidden="true"
            onClick={closeMenu}
            className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-[420ms] motion-reduce:duration-150 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navegação principal"
            style={{ backgroundColor: "var(--paper, #f5f3ee)" }}
            className={`absolute inset-y-0 right-0 w-full max-w-[420px] bg-paper flex flex-col shadow-2xl will-change-transform transition-[transform,opacity] duration-[420ms] motion-reduce:transition-opacity motion-reduce:duration-150 motion-reduce:translate-x-0 ${
              visible
                ? "translate-x-0 opacity-100 ease-[cubic-bezier(0.16,1,0.3,1)]"
                : "translate-x-6 opacity-0 ease-[cubic-bezier(0.7,0,0.84,0)]"
            }`}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center px-6 py-5 border-b border-rule gap-4">
              <Wordmark />
              <button
                ref={closeRef}
                type="button"
                onClick={closeMenu}
                aria-label="Fechar menu de navegação"
                className="p-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span className="flex items-center justify-center w-9 h-9 border border-ink text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="square"
                    aria-hidden="true"
                  >
                    <path d="M2 2L12 12" />
                    <path d="M12 2L2 12" />
                  </svg>
                </span>
              </button>
            </div>

            <nav
              className="flex-1 flex flex-col justify-center px-6 gap-1"
              aria-label="Navegação móvel"
            >
              {NAV.map((i, idx) => (
                <a
                  key={i.href}
                  href={i.href}
                  onClick={closeMenu}
                  className={`font-display text-ink py-5 border-b border-rule transition-[opacity,transform] duration-500 motion-reduce:transition-opacity motion-reduce:duration-150 motion-reduce:translate-y-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{
                    fontSize: "clamp(2rem,9vw,3rem)",
                    transitionDelay: visible ? `${120 + idx * 60}ms` : "0ms",
                  }}
                >
                  {i.label}
                </a>
              ))}
            </nav>

            <div className="px-6 pb-10">
              <a
                href="#contato"
                onClick={closeMenu}
                className={`btn-solid w-full justify-center transition-[opacity,transform] duration-500 motion-reduce:translate-y-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: visible ? `${120 + NAV.length * 60}ms` : "0ms" }}
              >
                Falar com o advogado
                <span aria-hidden className="btn-arrow">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
