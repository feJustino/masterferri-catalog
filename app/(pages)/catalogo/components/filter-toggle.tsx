'use client';
import { Filter, X, ChevronDown } from 'lucide-react';

interface FilterToggleProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  hasActiveFilters: boolean;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

export default function FilterToggle({
  showFilters,
  onToggleFilters,
  hasActiveFilters,
  activeFiltersCount,
  onClearFilters,
}: FilterToggleProps) {
  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <button
        onClick={onToggleFilters}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white mb-3"
      >
        <Filter className="h-4 w-4" />
        <span>Filtros</span>
        {hasActiveFilters && (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-1">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg bg-white border border-red-200"
        >
          <X className="h-4 w-4" />
          <span>Limpar filtros</span>
        </button>
      )}
    </div>
  );
}
