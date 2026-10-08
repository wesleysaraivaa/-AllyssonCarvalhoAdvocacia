import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

const TITLE = "Política de Privacidade | Allysson Carvalho Advocacia";
const DESC =
  "Como os dados pessoais enviados por meio deste site são coletados, usados e protegidos, conforme a LGPD (Lei 13.709/2018).";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/privacidade" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <PageShell>
      <article className="relative z-10 text-ink px-6 md:px-10 pt-20 md:pt-32 pb-24 max-w-[68ch] mx-auto">
        <span className="font-mono text-[10px] tracking-mono uppercase text-ink-muted">
          Privacidade
        </span>

        <h1
          className="mt-6 font-display text-ink mb-8"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.06 }}
        >
          Política de Privacidade
        </h1>

        <p className="font-mono text-[10px] tracking-mono uppercase text-ink-muted mb-12">
          Última atualização: junho de 2026
        </p>

        <Section title="1. Controlador dos dados">
          <strong>Allysson Carvalho — Advocacia</strong> (OAB/CE 44.325), com endereço na Rua 31 de
          Dezembro, 41, Centro, Ubajara/CE, é o controlador dos dados pessoais coletados neste site,
          nos termos da Lei nº 13.709/2018 (LGPD).
        </Section>

        <Section title="2. Dados que coletamos">
          Coletamos apenas os dados que você fornece voluntariamente ao preencher o formulário de
          contato:
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Nome</li>
            <li>E-mail (opcional)</li>
            <li>Conteúdo da mensagem enviada</li>
            <li>Data e horário do envio</li>
          </ul>
          Não utilizamos cookies de rastreamento, pixels publicitários ou ferramentas de análise
          comportamental.
        </Section>

        <Section title="3. Finalidade do tratamento">
          Os dados são tratados exclusivamente para responder à sua mensagem, avaliar a viabilidade
          de eventual atendimento jurídico e cumprir obrigações legais e regulatórias da advocacia.
        </Section>

        <Section title="4. Base legal">
          O tratamento se fundamenta no <strong>consentimento</strong> fornecido no formulário
          (art. 7º, I, da LGPD) e, quando aplicável, no <strong>legítimo interesse</strong>
          (art. 7º, VI e IX).
        </Section>

        <Section title="5. Compartilhamento">
          Os dados <strong>não são compartilhados com terceiros</strong> para fins comerciais. O
          site não armazena suas informações: as mensagens são enviadas diretamente ao advogado
          responsável pelo WhatsApp.
        </Section>

        <Section title="6. Retenção">
          As mensagens são mantidas pelo prazo necessário ao atendimento e, em caso de
          contratação, pelo prazo legal aplicável à conservação de documentos jurídicos. Você pode
          solicitar a exclusão a qualquer momento.
        </Section>

        <Section title="7. Seus direitos">
          Nos termos do art. 18 da LGPD, você pode solicitar confirmação da existência de tratamento,
          acesso, correção, anonimização, portabilidade, eliminação, informação sobre
          compartilhamento e revogação do consentimento.
        </Section>

        <Section title="8. Como exercer seus direitos">
          Envie sua solicitação pelo formulário da página de{" "}
          <Link to="/" hash="contato" className="link-ink inline">contato</Link> ou pessoalmente no
          endereço do escritório. Responderemos em até 15 dias úteis.
        </Section>

        <Section title="9. Segurança">
          Adotamos medidas técnicas e administrativas razoáveis para proteger os dados pessoais
          contra acessos não autorizados, perda, alteração ou destruição.
        </Section>

        <Section title="10. Alterações">
          Esta política pode ser atualizada. Mudanças relevantes serão sinalizadas com nova data de
          revisão no topo deste documento.
        </Section>

        <div className="mt-16 pt-6 border-t border-rule">
          <Link to="/" hash="contato" className="link-ink font-mono text-[11px] tracking-mono uppercase">
            ← Voltar ao site
          </Link>
        </div>
      </article>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="font-display text-ink mb-3"
        style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)" }}
      >
        {title}
      </h2>
      <div className="font-sans text-[15px] leading-[1.8] text-ink-2">{children}</div>
    </section>
  );
}
