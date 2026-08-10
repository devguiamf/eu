import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { MotionPreferenceProvider } from "@/components/providers/MotionPreferenceProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guilherme de Almeida — Portfólio",
  description:
    "Tem umas coisa minha ai, pode olhar eu deixo!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="h-full overflow-x-hidden antialiased">
        <MotionPreferenceProvider>
          <SmoothScrollProvider>
            {children}
            <GrainOverlay />
          </SmoothScrollProvider>
        </MotionPreferenceProvider>
      </body>
    </html>
  );
}
