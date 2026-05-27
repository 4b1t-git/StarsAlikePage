import type { Metadata } from "next";
import { Fraunces, Inter, VT323 } from "next/font/google";
import "./globals.css";
import CosmicSubstrate from "@/components/CosmicSubstrate";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Stars Alike — Una app de notas con personalidad",
  description:
    "Diario, Constelación, Tu Historia. Una app de notas que crece con vos. Sin algoritmo, sin feed. Lo importante es lo que dejás escrito.",
  openGraph: {
    title: "Stars Alike",
    description:
      "Una app de notas con personalidad. Diario, Constelación, Tu Historia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} ${vt323.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cosmos-void text-paper-bright">
        <CosmicSubstrate />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
