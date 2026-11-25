import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alina & Adonis | Urban Wear',
  description: 'Tienda online de streetwear, buzos, remeras y pantalones.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}