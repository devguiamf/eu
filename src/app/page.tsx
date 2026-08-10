import { SectionNav, type SectionNavItem } from "@/components/layout/SectionNav";
import { HomeSection } from "@/components/sections/HomeSection";
import { TrajetoriaSection } from "@/components/sections/TrajetoriaSection";
import { TecnologiaSection } from "@/components/sections/TecnologiaSection";
import { ProjetosSection } from "@/components/sections/ProjetosSection";
import { ContatoSection } from "@/components/sections/ContatoSection";

const NAV_ITEMS: SectionNavItem[] = [
  { id: "home", label: "Início" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "tecnologia", label: "Tecnologia" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

export default function HomePage() {
  return (
    <main className="relative">
      <SectionNav items={NAV_ITEMS} />
      <HomeSection />
      <TrajetoriaSection />
      <TecnologiaSection />
      <ProjetosSection />
      <ContatoSection />
    </main>
  );
}
