'use server';
import {
  BlingApiService,
  ProductFilters,
  PaginatedResponse,
} from '@/app/services/bling/api.service';
import {
  ProdutosDadosBaseDTO,
  ProdutosDadosDTO,
} from '@/app/entities/DTO/blinq-product';

/**
 * Server function para buscar produtos (usa a API route como fallback)
 */
export async function getProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResponse<ProdutosDadosBaseDTO>> {
  try {
    // Tenta usar o serviço diretamente primeiro
    return await BlingApiService.getProducts(filters);
  } catch (error) {
    // Fallback para a API route se houver problemas
    console.warn('Direct service failed, falling back to API route:', error);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(
      `${baseUrl}/api/bling/products?${params.toString()}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products from API route');
    }

    return await response.json();
  }
}

/**
 * Server function para buscar um produto específico
 */
export async function getProduct(id: string): Promise<ProdutosDadosDTO> {
  try {
    return await BlingApiService.getProduct(id);
  } catch (error) {
    console.error(`Error getting product ${id}:`, error);
    throw error instanceof Error ? error : new Error('Failed to get product');
  }
}
