'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-primary-600 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" onClick={closeMobileMenu}>
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Image
                    src="/logo.svg"
                    alt="MasterFerri Logo"
                    width={60}
                    height={60}
                    className="w-40 h-40"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-white hover:text-secondary-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Início
              </Link>
              <Link
                href="/catalogo"
                className="text-white hover:text-secondary-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Catálogo
              </Link>
              <Link
                href="/sobre"
                className="text-white hover:text-secondary-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Sobre
              </Link>
              <Link
                href="/contato"
                className="text-white hover:text-secondary-500 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contato
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-secondary-500 p-2 rounded-md transition-colors"
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden border-t border-gray-700 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-64 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block text-white hover:text-secondary-500 hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Início
            </Link>
            <Link
              href="/catalogo"
              onClick={closeMobileMenu}
              className="block text-white hover:text-secondary-500 hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href="/sobre"
              onClick={closeMobileMenu}
              className="block text-white hover:text-secondary-500 hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              onClick={closeMobileMenu}
              className="block text-white hover:text-secondary-500 hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>

        {/* Overlay para fechar menu mobile quando clicar fora */}
      </header>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
