'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import CartDrawer from '../components/ui/cart-drawer';
import { useCart } from '../context/cart-context';

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary-600 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Image
                    src="/images/logo.svg"
                    alt="MasterFerri Logo"
                    width={60}
                    height={60}
                    className="w-40 h-40"
                  />
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-white hover:text-secondary-500 px-3 py-2 text-sm font-medium"
              >
                Início
              </Link>
              <Link
                href="/catalogo"
                className="text-white hover:text-secondary-500 px-3 py-2 text-sm font-medium"
              >
                Catálogo
              </Link>
              <Link
                href="/sobre"
                className="text-white hover:text-secondary-500 px-3 py-2 text-sm font-medium"
              >
                Sobre
              </Link>
              <Link
                href="/contato"
                className="text-white hover:text-secondary-500 px-3 py-2 text-sm font-medium"
              >
                Contato
              </Link>
            </nav>

            {/* Cart Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-white hover:text-secondary-500"
              >
                <span className="sr-only">Ver carrinho</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary-500 flex items-center justify-center text-xs font-medium text-primary-600">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-700">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              className="block text-white hover:text-secondary-500 px-3 py-2 text-base font-medium"
            >
              Início
            </Link>
            <Link
              href="/catalogo"
              className="block text-white hover:text-secondary-500 px-3 py-2 text-base font-medium"
            >
              Catálogo
            </Link>
            <Link
              href="/sobre"
              className="block text-white hover:text-secondary-500 px-3 py-2 text-base font-medium"
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className="block text-white hover:text-secondary-500 px-3 py-2 text-base font-medium"
            >
              Contato
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">MasterFerri</h3>
              <p className="text-gray-300 mb-4">
                Especialista em peças automotivas com qualidade e preços
                competitivos. Atendemos todo o Brasil com entrega rápida e
                segura.
              </p>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📞 (19) 97413-9793</p>
                <p>📧 contato@masterferri.com.br</p>
                <p>📍 São Paulo, SP</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-md font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/catalogo" className="hover:text-white">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" className="hover:text-white">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="hover:text-white">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politica-privacidade"
                    className="hover:text-white"
                  >
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-md font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link
                    href="/catalogo?categoria=freios"
                    className="hover:text-white"
                  >
                    Sistema de Freios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalogo?categoria=suspensao"
                    className="hover:text-white"
                  >
                    Suspensão
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalogo?categoria=motor"
                    className="hover:text-white"
                  >
                    Motor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalogo?categoria=eletrica"
                    className="hover:text-white"
                  >
                    Parte Elétrica
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              © 2024 MasterFerri. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297C4.198 14.895 3.686 13.744 3.686 12.447c0-1.297.512-2.448 1.435-3.328.922-.88 2.031-1.32 3.328-1.32 1.297 0 2.407.44 3.328 1.32.922.88 1.435 2.031 1.435 3.328 0 1.297-.513 2.448-1.435 3.328-.921.88-2.031 1.32-3.328 1.32z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
