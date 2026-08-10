export interface ContactChannel {
  id: "discord" | "linkedin" | "email";
  label: string;
  handle: string;
  href: string;
}

export const contactChannels: ContactChannel[] = [
  {
    id: "discord",
    label: "Discord",
    handle: "@fulano.dev",
    href: "https://discord.com/users/000000000000000000",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "/in/fulano-da-silva",
    href: "https://www.linkedin.com/in/fulano-da-silva",
  },
  {
    id: "email",
    label: "Email",
    handle: "ola@fulano.dev",
    href: "mailto:ola@fulano.dev",
  },
];
