import { Metadata } from 'next';
import { ReactNode } from 'react';
import { FloatingCartButton } from '../components/commons/cart-button';
import { Footer } from '../components/commons/footer';
import { Header } from '../components/commons/header';
import { CartProvider } from '../context/cart-context';
import { QueryProvider } from '../context/tanstack-context';
import './globals.css';

export interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'MasterFerri Store',
  description: 'Loja virtual de ferramentas e equipamentos',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="pt-BR">
      <body className=" bg-gray-100 relative">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <QueryProvider>
          <CartProvider>
            <main className="flex-1">{children}</main>
            <FloatingCartButton />
          </CartProvider>
        </QueryProvider>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
