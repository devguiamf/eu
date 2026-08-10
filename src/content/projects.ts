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
    slug: "strong-now-labs",
    title: "Strong Now Labs",
    year: "2025",
    role: "Full-Stack Developer",
    description:
      "Mostruário digital para exibir produtos e serviços da Strong Now Labs.",
    tags: ["Next.js", "TypeScript", "D3.js"],
    mediaVariant: "aurora",
    mediaSrc: "/projects/strong-now-labs.webp",
    mediaType: "gif",
  },
  {
    slug: "vitrine-digital",
    title: "Vitrine Digital",
    year: "2024",
    role: "Full-Stack Developer",
    description:
      "Saas para gerenciar anunciantes e anuncios passados em uma tela publica(Tv, Painel, etc)",
    tags: ["React", "TypeScript", "NestJS"],
    mediaVariant: "conic",
    mediaSrc: "/projects/vitrine-digital.webp",
    mediaType: "gif",
  },
];
