import {
  CategoriasResponseDTO,
  CategoryFilters,
  PaginatedCategoriesResponse,
} from '../entities/DTO/blinq-categories';
import httpClient from '../../lib/httpClient';

export async function getCategories(
  filters: CategoryFilters = {}
): Promise<PaginatedCategoriesResponse> {
  try {
    const { page = 1, limit = 100 } = filters;

    // Construir parâmetros da query baseado na API v3 do Bling
    const params = {
      pagina: page,
      limite: Math.min(limit, 100), // API v3 tem limite máximo de 100
    };

    console.log('Fetching categories from Bling API v3', { params });

    // Buscar token de autorização das variáveis de ambiente
    const token = process.env.BLING_API_TOKEN;
    if (!token) {
      throw new Error('BLING_API_TOKEN is not configured');
    }

    const response = await httpClient.get<CategoriasResponseDTO>(
      '/Api/v3/categorias/produtos',
      {
        params,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Bling API v3 categories response received', {
      status: response.status,
      dataLength: response.data?.data?.length,
    });

    // Verificar se há erros na resposta
    if (response.status !== 200 || !response.data) {
      throw new Error(
        `Bling API v3 Error: ${response.status} - ${response.statusText}`
      );
    }

    const categories = response.data.data || [];
    const total = categories.length;
    const totalPages = Math.ceil(total / limit);

    const result: PaginatedCategoriesResponse = {
      data: categories,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    console.log('Categories fetched successfully from Bling API v3', {
      count: categories.length,
      total: result.pagination.total,
      page,
      totalPages: result.pagination.totalPages,
    });

    return result;
  } catch (error) {
    console.error('Error fetching categories from Bling API v3', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to fetch categories from Bling API v3');
  }
}
