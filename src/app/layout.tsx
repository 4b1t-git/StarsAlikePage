import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CosmicSubstrate from "@/components/CosmicSubstrate";
import ScrollProgress from "@/components/ScrollProgress";
import { SITE_NAME, SITE_URL } from "@/lib/site";


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

const DESCRIPTION =
  "Diario, Constelación, Tu Historia. Una app de notas que crece contigo. Sin algoritmo, sin feed. Lo importante es lo que dejas escrito.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Stars Alike — Una app de notas con personalidad",
    template: "%s · Stars Alike",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "app de notas",
    "diario",
    "journaling",
    "notas personales",
    "wikilinks",
    "constelación de notas",
    "Stars Alike",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Stars Alike",
    description:
      "Una app de notas con personalidad. Diario, Constelación, Tu Historia.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stars Alike",
    description:
      "Una app de notas con personalidad. Diario, Constelación, Tu Historia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
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

        {children}
        <Analytics />
      </body>
    </html>
  );
}
