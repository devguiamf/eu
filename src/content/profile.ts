export interface Profile {
  name: string;
  role: string;
  welcome: string;
  tagline: string;
  location: string;
  bio: string[];
  /** Optional path under /public, e.g. "/media/portrait.jpg". */
  portraitSrc?: string;
  /** Optional path under /public for the hero corner decoration (gif/webm). */
  heroMediaSrc?: string;
  heroMediaType?: "video" | "gif";
}

export const profile: Profile = {
  name: "Guilherme de Almeida",
  role: "Desenvolvedor Full-Stack & Criador Digital",
  welcome: "Bem-vindo",
  tagline: "Eu faço de tudo e ainda fica bom :)",
  location: "Franca, São Paulo/Brasil",
  bio: [
    "Sou um desenvolvedor apaixonado por tecnologia e inovação.",
    "Trabalho com desenvolvimento web há mais de 5 anos.",
    "Atuo como desenvolvedor full-stack",
    "Sou um entusiasta de novas tecnologias e sempre em busca de novos desafios.",
  ],
  heroMediaSrc: "/media/hero-loop.gif",
  heroMediaType: "gif",
  portraitSrc: "/media/perfil.png",
};
