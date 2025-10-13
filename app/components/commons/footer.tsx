'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">MasterFerri</h3>
            <p className="text-gray-300 mb-4">
              Especialista em peças automotivas com qualidade e preços
              competitivos. Atendemos todo o Brasil com entrega rápida e segura.
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
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297C4.198 14.895 3.686 13.744 3.686 12.447c0-1.297.512-2.448 1.435-3.328.922-.88 2.031-1.32 3.328-1.32 1.297 0 2.407.44 3.328 1.32.922.88 1.435 2.031 1.435 3.328 0 1.297-.513 2.448-1.435 3.328-.921.88-2.031 1.32-3.328 1.32z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
