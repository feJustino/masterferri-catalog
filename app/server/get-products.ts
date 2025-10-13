'use server';
import {
  SingleProdutoResponseDTO,
  ProdutosDadosBaseDTO,
} from '../entities/DTO/blinq-product';
import httpClient from '@/lib/httpClient';

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  priceMin?: number;
  priceMax?: number;
  idCategoria?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export async function getProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResponse<ProdutosDadosBaseDTO>> {
  try {
    const {
      page = 1,
      limit = 30,
      search,
      priceMin,
      priceMax,
      idCategoria,
    } = filters;

    console.log('Getting products with filters', { page, limit, filters });

    const baseUrl = document?.location
      ? document.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Construir query params
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      params.append('search', search);
    }

    if (priceMin !== undefined) {
      params.append('priceMin', priceMin.toString());
    }

    if (priceMax !== undefined) {
      params.append('priceMax', priceMax.toString());
    }

    if (idCategoria) {
      params.append('idCategoria', idCategoria.toString());
    }

    // Buscar produtos da API route com paginação
    const response = await fetch(
      `${baseUrl}/api/bling/products?${params.toString()}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const result = await response.json();

    // Calcular total de páginas baseado no hasMore
    const totalPages = result.hasMore ? page + 1 : page;

    const paginatedResponse: PaginatedResponse<ProdutosDadosBaseDTO> = {
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages,
        hasMore: result.hasMore,
      },
    };

    console.log('Products fetched successfully', {
      page: result.page,
      total: result.total,
      hasMore: result.hasMore,
      returnedCount: result.data.length,
    });

    return paginatedResponse;
  } catch (error) {
    console.error('Error getting products', error);
    throw error instanceof Error ? error : new Error('Failed to get products');
  }
}

export async function getProduct({
  id,
}: {
  id: string;
}): Promise<SingleProdutoResponseDTO> {
  try {
    console.log('Fetching product from Bling API v3', { id });

    const response = await httpClient.get<SingleProdutoResponseDTO>(
      `/produtos/${id}`
    );

    if (!response.data || response.status !== 200) {
      throw new Error(
        `Bling API v3 Error: ${response.status} - Product not found`
      );
    }

    console.log('Product fetched successfully from Bling API v3', { id });

    return response.data;
  } catch (error) {
    console.error('Error fetching product from Bling API v3', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to fetch product from Bling API v3');
  }
}
