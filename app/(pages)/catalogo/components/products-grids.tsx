'use client';
import { ProdutosDadosBaseDTO } from '@/app/entities/DTO/blinq-product';
import ProductCard from './product-card';

interface ProductsGridProps {
  products: ProdutosDadosBaseDTO[];
  isLoading: boolean;
}

export default function ProductsGrid({
  products,
  isLoading,
}: ProductsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
          >
            <div className="h-32 sm:h-48 bg-gray-300"></div>
            <div className="p-3 sm:p-4">
              <div className="h-3 sm:h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 sm:h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
