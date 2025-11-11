import { BLING_API_CONFIG } from './config';

/**
 * Valida se um ID de produto é válido
 */
export function isValidProductId(id: string | number): boolean {
  if (typeof id === 'number') {
    return id > 0 && Number.isInteger(id);
  }

  if (typeof id === 'string') {
    const numId = parseInt(id, 10);
    return !isNaN(numId) && numId > 0;
  }

  return false;
}

/**
 * Sanitiza e valida filtros de produtos
 */
export function sanitizeProductFilters(filters: any) {
  const sanitized: any = {};

  // Página
  if (filters.page !== undefined) {
    const page = parseInt(filters.page, 10);
    sanitized.page = page > 0 ? page : 1;
  }

  // Limite
  if (filters.limit !== undefined) {
    const limit = parseInt(filters.limit, 10);
    sanitized.limit = Math.min(
      Math.max(1, limit),
      BLING_API_CONFIG.PAGINATION.MAX_LIMIT
    );
  }

  // Busca por nome
  if (filters.search && typeof filters.search === 'string') {
    sanitized.search = filters.search.trim();
  }

  // Preços
  if (filters.priceMin !== undefined) {
    const price = parseFloat(filters.priceMin);
    if (!isNaN(price) && price >= 0) {
      sanitized.priceMin = price;
    }
  }

  if (filters.priceMax !== undefined) {
    const price = parseFloat(filters.priceMax);
    if (!isNaN(price) && price >= 0) {
      sanitized.priceMax = price;
    }
  }

  // Categoria
  if (filters.idCategoria !== undefined) {
    const categoryId = parseInt(filters.idCategoria, 10);
    if (!isNaN(categoryId) && categoryId > 0) {
      sanitized.idCategoria = categoryId;
    }
  }

  return sanitized;
}

/**
 * Constrói query params para a API Bling
 */
export function buildBlingQueryParams(filters: any): URLSearchParams {
  const params = new URLSearchParams();

  // Parâmetros padrão
  Object.entries(BLING_API_CONFIG.DEFAULT_PARAMS).forEach(([key, value]) => {
    params.append(key, value);
  });

  // Paginação
  if (filters.page) {
    params.append('pagina', filters.page.toString());
  }

  if (filters.limit) {
    params.append('limite', filters.limit.toString());
  }

  // Busca
  if (filters.search) {
    params.append('nome', filters.search);
  }

  // Categoria
  if (filters.idCategoria) {
    params.append('idCategoria', filters.idCategoria.toString());
  }

  return params;
}

/**
 * Formata preço para exibição
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

/**
 * Verifica se um produto tem estoque disponível
 */
export function hasStock(product: any): boolean {
  if (!product.estoque) return false;

  const stock =
    product.estoque.saldoVirtualTotal ?? product.estoque.saldoFisicoTotal ?? 0;
  return stock > 0;
}

/**
 * Obtém a URL da imagem principal do produto
 */
export function getProductMainImage(product: any): string | null {
  // Prioridade: imagemURL > midia.imagem.linkExterno > null
  if (product.imagemURL) {
    return product.imagemURL;
  }

  if (product.midia?.imagem?.linkExterno) {
    return product.midia.imagem.linkExterno;
  }

  return null;
}

/**
 * Cria um delay para rate limiting
 */
export function createDelay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry com exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');

      // Não fazer retry no último attempt
      if (attempt === maxRetries) {
        break;
      }

      // Exponential backoff
      const delay = BLING_API_CONFIG.RATE_LIMIT.RETRY_DELAYS[attempt] || 8000;
      await createDelay(delay);
    }
  }

  throw lastError!;
}
