import { lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ErrorComponentProps,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

import { ChatbotWidget } from "@/components/leads/ChatbotWidget";
import { ExitIntentPopup } from "@/components/leads/ExitIntentPopup";




function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-ink">
      <div className="max-w-md">
        <span className="font-mono text-[10px] tracking-mono uppercase text-ink-muted">Erro 404</span>
        <h1 className="mt-5 font-display" style={{ fontSize: "clamp(2.2rem,6vw,3.6rem)", lineHeight: 1.05 }}>
          Página não encontrada
        </h1>
        <p className="mt-5 font-sans text-[15px] leading-[1.8] text-ink-2">
          O endereço acessado não existe ou foi movido.
        </p>
        <div className="mt-9">
          <Link to="/" className="btn-solid">
            Voltar ao início <span aria-hidden className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

const ErrorComponent = lazy(async () => ({
  default: function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-ink">
      <div className="max-w-md">
        <span className="font-mono text-[10px] tracking-mono uppercase text-ink-muted">Erro</span>
        <h1 className="mt-5 font-display" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", lineHeight: 1.08 }}>
          Esta página não carregou
        </h1>
        <p className="mt-5 font-sans text-[15px] leading-[1.8] text-ink-2">
          Ocorreu um problema ao exibir o conteúdo. Tente novamente ou volte ao início.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-solid"
          >
            Tentar novamente <span aria-hidden className="btn-arrow">→</span>
          </button>
          <a href="/" className="btn-ghost">
            Início <span aria-hidden className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
}));



export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#f5f3ee" },
      { property: "og:site_name", content: "Allysson Carvalho Advocacia" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:image", content: "/og-image.jpg" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Attorney",
          name: "Allysson Carvalho — Advocacia",
          description:
            "Advogado em Ubajara/CE. Direito Previdenciário (BPC/LOAS e aposentadoria), Criminal, Tribunal do Júri, Família, Civil, Consumidor e Trabalhista.",
          url: "/",
          priceRange: "$$",
          areaServed: { "@type": "State", name: "Ceará" },
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua 31 de Dezembro, 41",
            addressLocality: "Ubajara",
            addressRegion: "CE",
            addressCountry: "BR",
          },
          knowsAbout: [
            "Direito Previdenciário",
            "Direito Criminal",
            "Tribunal do Júri",
            "Direito de Família",
            "Direito Civil",
            "Direito do Consumidor",
            "Direito Trabalhista",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <div aria-hidden className="paper-grain" />
      <Outlet />
      <ChatbotWidget />
      <ExitIntentPopup />
    </QueryClientProvider>
  );
}
