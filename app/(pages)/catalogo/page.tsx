'use client';
import Pagination from '@/app/components/commons/pagination';
import { useProductFilters } from '@/app/hooks/useProductFilters';
import { getProducts } from '@/app/server/get-products';
import { useQuery } from '@tanstack/react-query';
import CatalogHeader from './components/catalog-header';
import EmptyState from './components/empty-state';
import ProductsGrid from './components/products-grids';
import SearchBar from './components/search-bar';

export default function Catalogo() {
  const {
    searchTerm,
    setSearchTerm,
    setPage,
    filters,
    clearFilters,
    hasActiveFilters,
  } = useProductFilters();

  const { data: productsResponse, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const products = productsResponse?.data || [];
  const pagination = productsResponse?.pagination;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-4 sm:px-6 lg:px-8 lg:py-8 max-w-7xl mx-auto">
        <CatalogHeader />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {products.length === 0 && !isLoading ? (
          <EmptyState
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />
        ) : (
          <>
            <ProductsGrid products={products} isLoading={isLoading} />
          </>
        )}
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
