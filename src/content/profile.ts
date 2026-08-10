export interface Profile {
  name: string;
  role: string;
  welcome: string;
  tagline: string;
  location: string;
  bio: string[];
  /** Optional path under /public, e.g. "/media/portrait.jpg". */
  portraitSrc?: string;
  /** Optional path under /public for the hero background loop (gif/webm). */
  heroMediaSrc?: string;
  heroMediaType?: "video" | "gif";
}

export const profile: Profile = {
  name: "Fulano da Silva",
  role: "Desenvolvedor Full-Stack & Criador Digital",
  welcome: "Bem-vindo",
  tagline: "Eu construo interfaces que respiram — onde código e narrativa se encontram.",
  location: "São Paulo, Brasil",
  bio: [
    "Sou um desenvolvedor apaixonado por interfaces cinematográficas e experiências que contam histórias através do movimento.",
    "Nos últimos anos venho unindo engenharia de front-end com direção de arte, buscando sempre o equilíbrio entre performance e emoção.",
  ],
  heroMediaSrc: "/media/hero-loop.gif",
  heroMediaType: "gif",
  portraitSrc: "/media/perfil.png",
};
