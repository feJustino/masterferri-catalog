'server-only';
import httpClient from '@/lib/httpClient';
import {
  ProdutosResponseDTO,
  SingleProdutoResponseDTO,
  ProdutosDadosBaseDTO,
  ProdutosDadosDTO,
} from '@/app/entities/DTO/blinq-product';
import { BLING_API_CONFIG } from './config';
import {
  isValidProductId,
  sanitizeProductFilters,
  buildBlingQueryParams,
  retryWithBackoff,
} from './utils';

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

export class BlingApiService {
  /**
   * Busca produtos com paginação e filtros
   */
  static async getProducts(
    filters: ProductFilters = {}
  ): Promise<PaginatedResponse<ProdutosDadosBaseDTO>> {
    try {
      // Sanitizar e validar filtros
      const sanitizedFilters = sanitizeProductFilters({
        page: filters.page || 1,
        limit: filters.limit || BLING_API_CONFIG.PAGINATION.DEFAULT_LIMIT,
        ...filters,
      });

      // Construir query params para o Bling
      const params = buildBlingQueryParams(sanitizedFilters);

      const response = await retryWithBackoff(async () => {
        return await httpClient.get<ProdutosResponseDTO>(
          `${BLING_API_CONFIG.ENDPOINTS.PRODUTOS}?${params.toString()}`
        );
      });

      if (!response.data?.data) {
        throw new Error(BLING_API_CONFIG.ERRORS.FETCH_FAILED);
      }

      let products = response.data.data;

      // Aplicar filtros de preço no lado do cliente (API Bling não suporta)
      if (
        sanitizedFilters.priceMin !== undefined ||
        sanitizedFilters.priceMax !== undefined
      ) {
        products = products.filter(product => {
          if (
            sanitizedFilters.priceMin !== undefined &&
            product.preco < sanitizedFilters.priceMin
          ) {
            return false;
          }
          if (
            sanitizedFilters.priceMax !== undefined &&
            product.preco > sanitizedFilters.priceMax
          ) {
            return false;
          }
          return true;
        });
      }

      // Calcular paginação
      const hasMore = products.length >= sanitizedFilters.limit;
      const totalPages = hasMore
        ? sanitizedFilters.page + 1
        : sanitizedFilters.page;

      return {
        data: products,
        pagination: {
          page: sanitizedFilters.page,
          limit: sanitizedFilters.limit,
          total: products.length,
          totalPages,
          hasMore,
        },
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw this.handleError(error, BLING_API_CONFIG.ERRORS.FETCH_FAILED);
    }
  }

  /**
   * Busca um produto específico por ID
   */
  static async getProduct(id: string): Promise<ProdutosDadosDTO> {
    try {
      if (!isValidProductId(id)) {
        throw new Error(BLING_API_CONFIG.ERRORS.INVALID_ID);
      }

      const response = await retryWithBackoff(async () => {
        return await httpClient.get<SingleProdutoResponseDTO>(
          `${BLING_API_CONFIG.ENDPOINTS.PRODUTOS}/${id}`
        );
      });

      if (!response.data?.data) {
        throw new Error(BLING_API_CONFIG.ERRORS.PRODUCT_NOT_FOUND);
      }

      return response.data.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw this.handleError(error, BLING_API_CONFIG.ERRORS.FETCH_FAILED);
    }
  }

  /**
   * Busca categorias de produtos
   */
  static async getCategories() {
    try {
      const response = await retryWithBackoff(async () => {
        return await httpClient.get(BLING_API_CONFIG.ENDPOINTS.CATEGORIAS);
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw this.handleError(error, 'Failed to fetch categories');
    }
  }

  /**
   * Tratamento centralizado de erros
   */
  private static handleError(error: unknown, defaultMessage: string): Error {
    if (error instanceof Error) {
      return error;
    }

    if (typeof error === 'object' && error !== null) {
      const err = error as any;

      // Erro da resposta HTTP
      if (err.response?.data?.error) {
        return new Error(err.response.data.error);
      }

      // Erro de status HTTP
      if (err.response?.status) {
        if (err.response.status === 404) {
          return new Error(BLING_API_CONFIG.ERRORS.PRODUCT_NOT_FOUND);
        }
        if (err.response.status === 401) {
          return new Error(BLING_API_CONFIG.ERRORS.TOKEN_EXPIRED);
        }
        return new Error(`API Error: ${err.response.status}`);
      }

      // Erro de rede
      if (err.code === 'ECONNABORTED' || err.code === 'NETWORK_ERROR') {
        return new Error(BLING_API_CONFIG.ERRORS.NETWORK_ERROR);
      }
    }

    return new Error(defaultMessage);
  }
}
