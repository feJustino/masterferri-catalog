'use client';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
}: PaginationProps) {
  // Não renderizar se houver apenas uma página
  if (totalPages <= 1) return null;

  // Calcular páginas visíveis
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Ajustar se estivermos no início
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages);
    }

    // Ajustar se estivermos no final
    if (currentPage + halfVisible >= totalPages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    // Adicionar primeira página e ellipsis se necessário
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // Adicionar páginas do meio
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Adicionar ellipsis e última página se necessário
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-6 sm:px-6">
      {/* Mobile: Navegação simples */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>

      {/* Desktop: Navegação completa */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Botão Primeira Página */}
            {showFirstLast && currentPage > 2 && (
              <button
                onClick={() => onPageChange(1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Primeira página</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                <ChevronLeft className="h-5 w-5 -ml-1" aria-hidden="true" />
              </button>
            )}

            {/* Botão Anterior */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                !showFirstLast || currentPage <= 2 ? 'rounded-l-md' : ''
              }`}
            >
              <span className="sr-only">Página anterior</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Páginas numeradas */}
            {visiblePages.map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(page)}
                disabled={page === '...'}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
                  page === currentPage
                    ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                    : page === '...'
                      ? 'text-gray-700 cursor-default'
                      : 'text-gray-900 hover:bg-gray-50 cursor-pointer'
                }`}
              >
                {page === '...' ? <MoreHorizontal className="h-5 w-5" /> : page}
              </button>
            ))}

            {/* Botão Próxima */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                !showFirstLast || currentPage >= totalPages - 1
                  ? 'rounded-r-md'
                  : ''
              }`}
            >
              <span className="sr-only">Próxima página</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Botão Última Página */}
            {showFirstLast && currentPage < totalPages - 1 && (
              <button
                onClick={() => onPageChange(totalPages)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Última página</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                <ChevronRight className="h-5 w-5 -ml-1" aria-hidden="true" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
