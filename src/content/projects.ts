import type { MediaVariant } from "@/components/motion/MediaSlot";

export interface Project {
  slug: string;
  title: string;
  year: string;
  role: string;
  description: string;
  tags: string[];
  href?: string;
  /** Optional path under /public, e.g. "/media/projects/aurora.mp4". */
  mediaSrc?: string;
  mediaType?: "video" | "gif";
  mediaVariant: MediaVariant;
}

export const projects: Project[] = [
  {
    slug: "aurora-dashboard",
    title: "Aurora Dashboard",
    year: "2025",
    role: "Product Engineer",
    description:
      "Plataforma de analytics em tempo real com visualizações interativas e um sistema de temas totalmente customizável.",
    tags: ["Next.js", "TypeScript", "D3.js"],
    mediaVariant: "aurora",
  },
  {
    slug: "nomad-travel",
    title: "Nomad",
    year: "2024",
    role: "Full-Stack Developer",
    description:
      "Aplicativo de planejamento de viagens com roteiros gerados por IA e sincronização colaborativa em tempo real.",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    mediaVariant: "conic",
  },
  {
    slug: "studio-os",
    title: "Studio OS",
    year: "2024",
    role: "Front-End Lead",
    description:
      "Sistema operacional visual para estúdios criativos gerenciarem projetos, ativos e feedback de clientes.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    mediaVariant: "grid",
  },
  {
    slug: "ember-commerce",
    title: "Ember Commerce",
    year: "2023",
    role: "Full-Stack Developer",
    description:
      "E-commerce headless com checkout otimizado e uma experiência de vitrine editorial, cinematográfica.",
    tags: ["Next.js", "Stripe", "Sanity"],
    mediaVariant: "ember",
  },
];
