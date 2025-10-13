'use client';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function EmptyState({
  hasActiveFilters,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="text-center py-8 sm:py-12 px-4">
      <div className="text-gray-400 mb-4">
        <Search className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
      </div>
      <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
        Nenhum produto encontrado
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4 max-w-sm mx-auto">
        Tente ajustar seus filtros ou termos de busca
      </p>
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
