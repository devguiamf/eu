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
  { name: "Angular", category: "Framework" },
  { name: "Node.js", category: "Runtime" },
  { name: "NestJS", category: "Framework" },
  { name: "Tailwind CSS", category: "Estilização" },
  { name: "Framer Motion", category: "Animação" },
  { name: "PostgreSQL", category: "Banco de dados" },
  { name: "Docker", category: "Infraestrutura" },
];

export const courses: CourseItem[] = [
  { title: "Mecatronica", institution: "ETEC - Franca", year: "2015–2017" },
  { title: "DSM - Desenvolvimento de Software Multiplataforma", institution: "FATEC - Franca", year: "2021–2023" },
];

export const books: BookItem[] = [
  { title: "Use a Cabeça! Padrões de Projetos - 2° Edição revisada", author: "Eric Freeman e Elisabeth Freeman" },
  { title: "Domain Driven Design", author: "Eric Evans" },
  { title: "Clean Code", author: "Robert C. Martin" },
  { title: "Clean Architecture", author: "Robert C. Martin" },
  { title: "Refactoring", author: "Martin Fowler" },
];

export const certificates: CertificateItem[] = [
  { title: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", year: "2024" },
  { title: "Professional Scrum Master I", issuer: "Scrum.org", year: "2023" },
  { title: "Meta Front-End Developer", issuer: "Meta / Coursera", year: "2022" },
];
