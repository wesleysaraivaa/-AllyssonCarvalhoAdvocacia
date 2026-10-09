import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 text-ink min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
