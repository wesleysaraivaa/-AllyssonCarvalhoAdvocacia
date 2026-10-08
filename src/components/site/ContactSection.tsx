import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FadeUp } from "@/components/motion/FadeUp";

// Número do WhatsApp do escritório (DDI + DDD + número, somente dígitos)
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

type Status = "idle" | "sent" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setErrMsg(null);

    const nome = String(fd.get("nome") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const mensagem = String(fd.get("mensagem") ?? "").trim();
    if (String(fd.get("website") ?? "").trim()) return; // honeypot

    if (!nome || !mensagem) {
      setStatus("error");
      setErrMsg("Preencha nome e mensagem para continuar.");
      return;
    }

    const texto = [
      "Olá, Dr. Allysson! Vim pelo site e gostaria de atendimento.",
      "",
      `*Nome:* ${nome}`,
      email ? `*E-mail:* ${email}` : null,
      "",
      "*Meu caso:*",
      mensagem,
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setStatus("sent");
    form.reset();
  }

  return (
    <section id="contato" className="border-b border-rule">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-y-14 lg:gap-x-16">
        <div className="lg:col-span-5">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-muted mb-6 block">
            Contato
          </span>

          <FadeUp
            as="h2"
            className="font-display text-ink"
            style={{ fontSize: "clamp(2.4rem,4.6vw,3.8rem)", lineHeight: 1.05 }}
          >
            Vamos olhar o seu caso com a atenção que ele pede.
          </FadeUp>
          <p className="mt-6 font-sans text-[16px] leading-[1.8] text-ink-2 max-w-[44ch]">
            Conte brevemente o que aconteceu. A primeira resposta será clara sobre a possibilidade de atendimento e os próximos passos.
          </p>

          <div className="mt-14 pt-10 border-t border-rule grid sm:grid-cols-2 gap-8">
            <div>
            <span className="block font-mono text-[10px] tracking-[0.25em] uppercase text-ink-muted mb-4">
              Endereço
            </span>
            <address className="not-italic font-display text-ink" style={{ fontSize: "clamp(1.2rem,2vw,1.6rem)", lineHeight: 1.35 }}>
              Rua 31 de Dezembro, 41
              <br />
              Centro — Ubajara, Ceará
            </address>
            </div>
            <div>
              <span className="block font-mono text-[10px] tracking-[0.25em] uppercase text-ink-muted mb-4">Responsável</span>
              <p className="font-display text-lg leading-relaxed">Allysson Carvalho<br /><span className="italic">OAB/CE 44.325</span></p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:border-l lg:border-rule lg:pl-16">
          <div className="mb-10 flex items-center gap-4"><span className="h-px flex-1 bg-rule" /><span className="font-display italic text-sm text-ink-muted">Mensagem confidencial</span></div>
          <FadeUp as="form" stagger={70} onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
            <Field id="c-nome" name="nome" label="Nome" required />
            <Field id="c-email" name="email" label="E-mail" type="email" />
            <Field id="c-msg" name="mensagem" label="Como podemos ajudar" textarea required />

            <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden" tabIndex={-1}>
              <label>
                Não preencher
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <label className="flex items-start gap-3 text-[13px] leading-[1.6] text-ink-2 pt-1">
              <input
                type="checkbox"
                name="consentimento_lgpd"
                required
                className="mt-1 w-4 h-4 shrink-0 accent-ink"
              />
              <span>
                Autorizo o tratamento dos meus dados conforme a{" "}
                <Link to="/privacidade" className="link-ink inline">Política de Privacidade</Link>.
              </span>
            </label>

            <div className="flex flex-wrap items-center justify-between gap-5 pt-4">
              <span
                className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted min-h-[1em]"
                role="status"
                aria-live="polite"
              >
                {status === "sent" && "Abrindo o WhatsApp…"}
                {status === "error" && (errMsg ?? "Erro ao enviar.")}
              </span>
              <button type="submit" className="btn-solid">
                {status === "sent" ? "Enviado" : "Enviar pelo WhatsApp"}
                <span aria-hidden className="btn-arrow">→</span>
              </button>
            </div>
          </FadeUp>
        </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  textarea = false,
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-2">
        {label}
        {required && <span className="text-ink ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea id={id} name={name} required={required} rows={4} className="input-line resize-none" />
      ) : (
        <input id={id} name={name} type={type} required={required} className="input-line" />
      )}
    </div>
  );
}
