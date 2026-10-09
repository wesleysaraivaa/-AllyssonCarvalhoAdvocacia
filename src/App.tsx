import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Practice } from "@/components/site/Practice";
import { Approach } from "@/components/site/Approach";
import { ContactSection } from "@/components/site/ContactSection";

import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ChatbotWidget } from "@/components/leads/ChatbotWidget";
import { ExitIntentPopup } from "@/components/leads/ExitIntentPopup";

export default function App() {
  return (
    <>
      <SmoothScroll />
      <div aria-hidden="true" className="paper-grain" />

      <PageShell>
        <Hero />
        <About />
        <Practice />
        <Approach />
        <ContactSection />
      </PageShell>

      <ChatbotWidget />
      <ExitIntentPopup />
    </>
  );
}
