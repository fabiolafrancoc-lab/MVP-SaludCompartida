import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salud Compartida - Servicios de Salud para Migrantes y sus Familias",
  description: "Conectamos a migrantes en USA con servicios de salud de calidad para sus familias en México. Telemedicina 24/7, farmacia con descuentos, consultas psicológicas y más.",
  keywords: "salud migrantes, telemedicina México, farmacia descuentos, consultas psicológicas, servicios salud familia México",
  metadataBase: new URL('https://saludcompartida.app'),
  openGraph: {
    title: "Salud Compartida",
    description: "Servicios de salud para migrantes y sus familias",
    url: "https://saludcompartida.app",
    siteName: "Salud Compartida",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salud Compartida",
    description: "Servicios de salud para migrantes y sus familias",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
