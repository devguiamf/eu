export interface TechItem {
  name: string;
  category: string;
}

export interface CourseItem {
  title: string;
  institution: string;
  year: string;
}

export interface BookItem {
  title: string;
  author: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  year: string;
}

export const techStack: TechItem[] = [
  { name: "TypeScript", category: "Linguagem" },
  { name: "React", category: "Framework" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Runtime" },
  { name: "Tailwind CSS", category: "Estilização" },
  { name: "Framer Motion", category: "Animação" },
  { name: "PostgreSQL", category: "Banco de dados" },
  { name: "Docker", category: "Infraestrutura" },
];

export const courses: CourseItem[] = [
  { title: "Ciência da Computação", institution: "Universidade Federal", year: "2021–2025" },
  { title: "Motion Design para Produtos Digitais", institution: "Rocketseat", year: "2024" },
  { title: "Arquitetura de Software Avançada", institution: "Alura", year: "2023" },
];

export const books: BookItem[] = [
  { title: "Refactoring", author: "Martin Fowler" },
  { title: "Designing Interfaces", author: "Jenifer Tidwell" },
  { title: "The Design of Everyday Things", author: "Don Norman" },
  { title: "Atomic Habits", author: "James Clear" },
];

export const certificates: CertificateItem[] = [
  { title: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", year: "2024" },
  { title: "Professional Scrum Master I", issuer: "Scrum.org", year: "2023" },
  { title: "Meta Front-End Developer", issuer: "Meta / Coursera", year: "2022" },
];
