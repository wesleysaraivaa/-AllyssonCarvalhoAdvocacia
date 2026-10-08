# Allysson Carvalho — Advocacia

Landing page institucional do advogado **Allysson Carvalho** (OAB/CE 44.325), com sede em Ubajara, Ceará.

Site de página única, sem banco de dados e sem backend: toda a captura de contatos acontece via **WhatsApp**, com mensagens pré-formatadas abertas diretamente no aplicativo do visitante.

## Seções

- **Abertura** — retrato interativo, título em três linhas e chamada para agendamento
- **Sobre** — dossiê com três cartões (trajetória, método e diferenciais)
- **Áreas de atuação** — índice interativo; no celular abre em formato acordeão
- **Abordagem** — processo de trabalho apresentado como documentos de caso
- **Contato** — formulário que monta a mensagem e abre o WhatsApp
- **Política de Privacidade** (`/privacidade`) — página única separada, para LGPD

## Captura de contatos

- **Triagem** (botão flutuante) — coleta área, situação e contato, e abre o WhatsApp
- **Popup de saída** — aparece uma vez por sessão quando o visitante vai sair (desktop)
- **Formulário de contato** — mesma lógica, na seção final

O número do WhatsApp fica centralizado em `src/lib/whatsapp.ts`.

## Tecnologias

- [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7)
- Tailwind CSS v4
- Lenis (rolagem suave)
- Tipografia: Cormorant Garamond
