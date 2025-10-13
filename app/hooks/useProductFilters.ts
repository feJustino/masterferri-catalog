import { ProductFilters } from '@/app/server/get-products';
import { useMemo, useState } from 'react';

interface PriceRange {
  min: string;
  max: string;
}

export function useProductFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: '',
    max: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  // Construir filtros para a API
  const filters = useMemo<ProductFilters>(
    () => ({
      page,
      limit,
      search: searchTerm || undefined,
      priceMin: priceRange.min ? parseFloat(priceRange.min) : undefined,
      priceMax: priceRange.max ? parseFloat(priceRange.max) : undefined,
    }),
    [searchTerm, priceRange, page, limit]
  );

  // Limpar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange({ min: '', max: '' });
    setPage(1);
  };

  const hasActiveFilters = Boolean(
    searchTerm || priceRange.min || priceRange.max
  );
  const activeFiltersCount = [
    searchTerm,

    priceRange.min,
    priceRange.max,
  ].filter(Boolean).length;

  return {
    searchTerm,
    setSearchTerm,

    priceRange,
    setPriceRange,
    showFilters,
    setShowFilters,
    page,
    setPage,
    limit,
    filters,
    clearFilters,
    hasActiveFilters,
    activeFiltersCount,
  };
}
