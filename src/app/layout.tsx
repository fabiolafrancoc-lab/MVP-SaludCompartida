import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SaludCompartida - Salud para tu familia en México',
  description: 'Transforma tus remesas en acceso a salud. Telemedicina 24/7, descuentos en farmacias y más para tu familia en México por solo $12-18/mes.',
  keywords: 'remesas, salud, telemedicina, México, migrantes, farmacia, descuentos',
  authors: [{ name: 'SaludCompartida' }],
  openGraph: {
    title: 'SaludCompartida - Salud para tu familia',
    description: 'Cuida a tu familia en México desde Estados Unidos. Telemedicina ilimitada 24/7 y hasta 75% de descuento en farmacias.',
    url: 'https://saludcompartida.app',
    siteName: 'SaludCompartida',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaludCompartida',
    description: 'Salud para tu familia en México',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#06B6D4" />
      </head>
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
