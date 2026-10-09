import { useState, useEffect, useRef } from "react";
import { openWhatsApp } from "@/lib/whatsapp";

const STORAGE_KEY = "exit-intent-state";

export function ExitIntentPopup() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [situacao, setSituacao] = useState("");
  const [consentimento, setConsentimento] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const firedRef = useRef(false);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // Only on desktop / pointer devices with mouse support
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const stateRaw = sessionStorage.getItem(STORAGE_KEY);
    const state = stateRaw ? JSON.parse(stateRaw) : null;
    if (state?.submitted || state?.dismissedAt) return;

    // Wait a few seconds so it doesn't fire immediately
    const timer = setTimeout(() => {
      const onLeave = (e: MouseEvent) => {
        if (firedRef.current) return;
        if (e.clientY < 12) {
          firedRef.current = true;
          setVisible(true);
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ shownAt: Date.now() }));
        }
      };

      document.addEventListener("mouseout", onLeave);
      return () => document.removeEventListener("mouseout", onLeave);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      // focus first input after animation
      setTimeout(() => firstInputRef.current?.focus(), 120);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consentimento) return;
    setSending(true);
    setErr(null);
    try {
      if (!website)
        openWhatsApp(`Olá! Meu nome é ${nome}.\nContato: ${contato}\nSituação: ${situacao}`);
      setDone(true);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ submitted: true }));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erro ao enviar.");
    } finally {
      setSending(false);
    }
  }

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissedAt: Date.now() }));
  }

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fale com o escritório"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-5 transition-opacity duration-500 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Fechar"
        onClick={dismiss}
        className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
      />

      {/* Panel */}
      <div
        className={`relative w-full max-w-[560px] bg-paper border border-rule shadow-[0_40px_100px_-40px_rgba(0,0,0,0.55)] overflow-hidden transition-transform duration-500 ease-out ${
          visible ? "translate-y-0" : "translate-y-8"
        }`}
      >
        {/* Hairline top accent */}
        <div className="h-[2px] w-full bg-ink" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-7 pt-7 pb-6 border-b border-rule">
          <div>
            <p className="font-mono text-[10px] tracking-mono uppercase text-ink-muted">
              Sua situação importa
            </p>
            <h2 className="mt-2 font-display text-[26px] leading-[1.15] tracking-[-0.02em] text-ink">
              Conte o que aconteceu
            </h2>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Fechar formulário"
            className="shrink-0 w-9 h-9 flex items-center justify-center border border-rule text-ink-muted hover:text-ink hover:border-ink transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-7">
          {!done ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="font-sans text-[14px] leading-[1.7] text-ink-2">
                Preencha rapidamente e receba uma análise inicial do escritório em até 1 dia útil.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="exit-nome" className="sr-only">
                    Nome
                  </label>
                  <input
                    ref={firstInputRef}
                    id="exit-nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome completo"
                    required
                    minLength={2}
                    maxLength={120}
                    className="input-line font-sans text-[15px]"
                  />
                </div>

                <div>
                  <label htmlFor="exit-contato" className="sr-only">
                    Contato
                  </label>
                  <input
                    id="exit-contato"
                    type="text"
                    value={contato}
                    onChange={(e) => setContato(e.target.value)}
                    placeholder="E-mail ou WhatsApp com DDD"
                    required
                    minLength={5}
                    maxLength={180}
                    className="input-line font-sans text-[15px]"
                  />
                </div>

                <div>
                  <label htmlFor="exit-situacao" className="sr-only">
                    Situação
                  </label>
                  <textarea
                    id="exit-situacao"
                    value={situacao}
                    onChange={(e) => setSituacao(e.target.value)}
                    placeholder="Descreva brevemente sua situação jurídica"
                    required
                    minLength={10}
                    maxLength={1200}
                    rows={3}
                    className="w-full bg-transparent border-b border-rule py-3 text-ink placeholder:text-ink-muted focus:outline-none focus:border-ink transition-colors resize-none font-sans text-[15px]"
                  />
                </div>
              </div>

              {/* Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="absolute -left-[9999px] opacity-0 pointer-events-none"
                aria-hidden
              />

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consentimento}
                  onChange={(e) => setConsentimento(e.target.checked)}
                  required
                  className="mt-[3px] h-4 w-4 accent-ink shrink-0"
                />
                <span className="font-sans text-[12px] leading-[1.6] text-ink-muted">
                  Concordo em receber o contato do escritório e com os termos da{" "}
                  <a href="/privacidade" className="underline underline-offset-2 hover:text-ink">
                    política de privacidade
                  </a>
                  .
                </span>
              </label>

              {err && (
                <p className="font-mono text-[10px] tracking-mono uppercase text-brass">{err}</p>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={sending || !consentimento}
                  className="btn-solid disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {sending ? "Enviando…" : "Receber análise"}{" "}
                  <span aria-hidden className="btn-arrow">
                    →
                  </span>
                </button>
                <button type="button" onClick={dismiss} className="btn-ghost">
                  Agora não
                </button>
              </div>
            </form>
          ) : (
            <div className="py-6">
              <p className="font-mono text-[10px] tracking-mono uppercase text-brass mb-3">
                Mensagem enviada
              </p>
              <h3 className="font-display text-[22px] leading-tight tracking-[-0.02em] text-ink mb-3">
                Recebemos o seu relato.
              </h3>
              <p className="font-sans text-[15px] leading-[1.7] text-ink-2">
                A equipe do escritório vai analisar a situação e retornar no contato informado em
                até 1 dia útil.
              </p>
              <button type="button" onClick={dismiss} className="mt-6 btn-solid">
                Voltar ao site{" "}
                <span aria-hidden className="btn-arrow">
                  →
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Footer rule */}
        <div className="px-7 py-3 border-t border-rule bg-paper-2/30">
          <p className="font-mono text-[9px] tracking-mono uppercase text-ink-muted">
            Allysson Carvalho · Advocacia · OAB/CE 44.325
          </p>
        </div>
      </div>
    </div>
  );
}
