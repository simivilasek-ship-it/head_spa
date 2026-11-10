import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Procedures } from "@/components/Procedures";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { SectionDivider } from "@/components/SectionDivider";
import { Voucher } from "@/components/Voucher";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Procedures />
        <Process />
        <SectionDivider from="mist" to="forest" />
        <About />
        <SectionDivider from="forest" to="ivory" flip />
        <Gallery />
        <Reviews />
        <Voucher />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
