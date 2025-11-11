import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  BlingApiService,
  ProductFilters,
  PaginatedResponse,
} from '@/app/services/bling/api.service';
import {
  ProdutosDadosBaseDTO,
  ProdutosDadosDTO,
} from '@/app/entities/DTO/blinq-product';
import { BLING_API_CONFIG } from '@/app/services/bling/config';

/**
 * Hook para buscar produtos com paginação
 */
export function useProducts(
  filters: ProductFilters = {},
  options?: Omit<
    UseQueryOptions<PaginatedResponse<ProdutosDadosBaseDTO>>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => BlingApiService.getProducts(filters),
    staleTime: BLING_API_CONFIG.CACHE.PRODUCTS_STALE_TIME,
    retry: 1,
    ...options,
  });
}

/**
 * Hook para buscar um produto específico
 */
export function useProduct(
  id: string,
  options?: Omit<UseQueryOptions<ProdutosDadosDTO>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => BlingApiService.getProduct(id),
    enabled: !!id && !isNaN(Number(id)),
    staleTime: BLING_API_CONFIG.CACHE.PRODUCT_STALE_TIME,
    retry: 1,
    ...options,
  });
}

/**
 * Hook para buscar categorias
 */
export function useCategories(
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => BlingApiService.getCategories(),
    staleTime: BLING_API_CONFIG.CACHE.CATEGORIES_STALE_TIME,
    retry: 1,
    ...options,
  });
}
