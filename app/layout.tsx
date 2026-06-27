import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Obras e Remodelações em Setúbal, Tróia e Comporta | Recrialar',
  description:
    'Remodelações, pintura, pladur, chão flutuante e pequenas reparações em Setúbal, Tróia, Comporta e arredores. Peça orçamento gratuito.',
  keywords: [
    'remodelações Setúbal',
    'obras Setúbal',
    'pintura Setúbal',
    'pladur Setúbal',
    'chão flutuante Setúbal',
    'obras Tróia',
    'obras Comporta',
    'reparações domésticas Setúbal',
    'Recrialar',
  ],
  openGraph: {
    title: 'Obras e Remodelações em Setúbal, Tróia e Comporta | Recrialar',
    description:
      'Remodelações, pintura, pladur, chão flutuante e pequenas reparações em Setúbal, Tróia, Comporta e arredores.',
    type: 'website',
    locale: 'pt_PT',
    images: [
      {
        url: 'https://recrialar.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Recrialar — Obras e Remodelações em Setúbal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Obras e Remodelações em Setúbal, Tróia e Comporta | Recrialar',
    description:
      'Remodelações, pintura, pladur, chão flutuante e pequenas reparações em Setúbal, Tróia, Comporta e arredores.',
    images: ['https://recrialar.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  name: 'Recrialar — Obras e Remodelações Profissionais',
  description:
    'Empresa especializada em remodelações, pintura, pladur, chão flutuante e reparações domésticas no Distrito de Setúbal.',
  telephone: '+351966104885',
  url: 'https://recrialar.pt',
  areaServed: [
    { '@type': 'City', name: 'Setúbal' },
    { '@type': 'Place', name: 'Tróia' },
    { '@type': 'Place', name: 'Comporta' },
    { '@type': 'City', name: 'Palmela' },
    { '@type': 'Place', name: 'Azeitão' },
    { '@type': 'City', name: 'Sesimbra' },
    { '@type': 'AdministrativeArea', name: 'Distrito de Setúbal' },
  ],
  serviceType: [
    'Remodelações completas',
    'Pintura interior',
    'Pintura exterior',
    'Pladur e tetos falsos',
    'Chão flutuante',
    'Barramento',
    'Reparações domésticas',
    'Manutenção de imóveis',
  ],
  priceRange: '€€',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
