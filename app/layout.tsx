import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "DAVA'S — Home Colección Japón",
  description: "Propuesta navegable para el lanzamiento de la Colección Japón y la nueva entrada al catálogo de DAVA'S.",
  openGraph: {
    title: "DAVA'S — Colección Japón",
    description: "Una forma nueva de habitar el orden.",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Colección Japón de DAVA'S" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAVA'S — Colección Japón",
    description: "Una forma nueva de habitar el orden.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
