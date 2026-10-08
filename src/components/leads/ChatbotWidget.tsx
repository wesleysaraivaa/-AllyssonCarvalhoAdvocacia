import { useState, useRef, useEffect } from "react";
import { openWhatsApp } from "@/lib/whatsapp";

type Step = 0 | 1 | 2 | 3 | 4; // 0=closed welcome, 1..3=questions, 4=done

const AREAS = [
  "Previdenciário",
  "Trabalhista",
  "Família",
  "Civil",
  "Consumidor",
  "Outro",
];

/**
 * ChatbotWidget — triagem editorial em 3 perguntas.
 * Estilo Swiss: monocromático, tipografia mono, sem balões coloridos.
 */
export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [area, setArea] = useState("");
  const [situacao, setSituacao] = useState("");
  const [contato, setContato] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (open && step < 4) inputRef.current?.focus();
  }, [open, step]);

  async function finish(finalContato: string) {
    setSending(true);
    setErr(null);
    try {
      if (!website) openWhatsApp(`Olá! Vim pela triagem do site.\nÁrea: ${area}\nSituação: ${situacao}\nContato: ${finalContato}`);
      setStep(4);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erro ao enviar.");
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setStep(1);
    setArea("");
    setSituacao("");
    setContato("");
    setErr(null);
  }

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar triagem" : "Abrir triagem rápida"}
        className="fixed bottom-4 right-4 md:bottom-5 md:right-5 z-50 group"
      >
        <span className="flex items-center gap-2 md:gap-3 bg-brass text-paper px-3 py-2 md:px-4 md:py-3 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] hover:opacity-90 transition-colors">
          <span className="font-mono text-[9px] md:text-[10px] tracking-mono uppercase opacity-60">
            {open ? "fechar" : "triagem"}
          </span>
          <span className="font-display text-[11px] md:text-[13px] tracking-[-0.01em]">
            {open ? "—" : "Falar com o escritório"}
          </span>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Triagem rápida"
          className="fixed bottom-20 right-5 z-50 w-[min(380px,calc(100vw-2.5rem))] bg-paper border border-rule shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-ink">
            <span className="font-mono text-[10px] tracking-mono uppercase text-ink-muted">
              Triagem · 3 perguntas
            </span>
          </div>

          {/* Body */}
          <div className="px-5 py-6 min-h-[230px] flex flex-col">
            {step === 1 && (
              <>
                <p className="font-mono text-[10px] tracking-mono uppercase text-ink-muted mb-2">
                  Pergunta 01
                </p>
                <h3 className="font-display text-[20px] leading-tight tracking-[-0.02em] text-ink mb-4">
                  Qual área do direito?
                </h3>
                <div className="flex flex-wrap gap-2">
                  {AREAS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => {
                        setArea(a);
                        setStep(2);
                      }}
                      className="font-mono text-[11px] tracking-mono uppercase border border-rule px-3 py-1.5 hover:bg-brass hover:text-paper transition-colors"
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="font-mono text-[10px] tracking-mono uppercase text-ink-muted mb-2">
                  Pergunta 02 · {area}
                </p>
                <h3 className="font-display text-[20px] leading-tight tracking-[-0.02em] text-ink mb-4">
                  O que aconteceu?
                </h3>
                <textarea
                  ref={(el) => {
                    inputRef.current = el;
                  }}
                  value={situacao}
                  onChange={(e) => setSituacao(e.target.value)}
                  rows={4}
                  maxLength={1500}
                  placeholder="Descreva em poucas linhas a sua situação."
                  className="w-full bg-transparent border border-rule p-3 font-sans text-[14px] text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-brass resize-none"
                />
                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="font-mono text-[10px] tracking-mono uppercase text-ink-muted hover:text-ink"
                  >
                    ← voltar
                  </button>
                  <button
                    type="button"
                    disabled={situacao.trim().length < 5}
                    onClick={() => setStep(3)}
                    className="font-mono text-[10px] tracking-mono uppercase bg-brass text-paper px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                  >
                    Próximo →
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p className="font-mono text-[10px] tracking-mono uppercase text-ink-muted mb-2">
                  Pergunta 03
                </p>
                <h3 className="font-display text-[20px] leading-tight tracking-[-0.02em] text-ink mb-4">
                  Qual o melhor contato?
                </h3>
                <input
                  ref={(el) => {
                    inputRef.current = el;
                  }}
                  type="text"
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                  placeholder="E-mail ou WhatsApp com DDD"
                  maxLength={180}
                  className="w-full bg-transparent border border-rule p-3 font-sans text-[14px] text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-brass"
                />

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

                <p className="mt-3 font-mono text-[9px] tracking-mono uppercase text-ink-muted leading-relaxed">
                  Ao enviar você concorda com a{" "}
                  <a href="/privacidade" className="underline underline-offset-2">
                    política de privacidade
                  </a>
                  .
                </p>

                {err && (
                  <p className="mt-2 font-mono text-[10px] tracking-mono uppercase text-brass">
                    {err}
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="font-mono text-[10px] tracking-mono uppercase text-ink-muted hover:text-ink"
                  >
                    ← voltar
                  </button>
                  <button
                    type="button"
                    disabled={contato.trim().length < 5 || sending}
                    onClick={() => finish(contato.trim())}
                    className="font-mono text-[10px] tracking-mono uppercase bg-brass text-paper px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                  >
                    {sending ? "Enviando…" : "Enviar →"}
                  </button>
                </div>
              </>
            )}

            {step === 4 && (
              <div className="flex-1 flex flex-col justify-center">
                <p className="font-mono text-[10px] tracking-mono uppercase text-brass mb-3">
                  Recebido
                </p>
                <h3 className="font-display text-[22px] leading-tight tracking-[-0.02em] text-ink mb-2">
                  Sua triagem chegou ao escritório.
                </h3>
                <p className="font-sans text-[14px] text-ink-muted leading-relaxed">
                  Retornamos no contato informado em até 1 dia útil.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 self-start font-mono text-[10px] tracking-mono uppercase text-ink underline underline-offset-4"
                >
                  Nova triagem
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
