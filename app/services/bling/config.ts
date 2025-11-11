/**
 * Configurações centralizadas para a API Bling
 */
export const BLING_API_CONFIG = {
  // Timeouts
  REQUEST_TIMEOUT: 10000, // 10 segundos

  // Rate limiting
  RATE_LIMIT: {
    MAX_REQUESTS_PER_DAY: 1000,
    RETRY_DELAYS: [1000, 2000, 4000, 8000], // Exponential backoff em ms
  },

  // Cache settings
  CACHE: {
    PRODUCTS_STALE_TIME: 5 * 60 * 1000, // 5 minutos
    PRODUCT_STALE_TIME: 5 * 60 * 1000, // 5 minutos
    CATEGORIES_STALE_TIME: 15 * 60 * 1000, // 15 minutos
  },

  // Pagination defaults
  PAGINATION: {
    DEFAULT_LIMIT: 30,
    MAX_LIMIT: 100,
  },

  // API endpoints
  ENDPOINTS: {
    PRODUTOS: '/produtos',
    CATEGORIAS: '/categorias/produtos',
    ESTOQUES: '/estoques/saldos',
  },

  // Default query params
  DEFAULT_PARAMS: {
    filtroSaldoEstoque: '1', // Sempre incluir informações de estoque
  },

  // Error messages
  ERRORS: {
    INVALID_ID: 'Invalid product ID',
    PRODUCT_NOT_FOUND: 'Product not found',
    FETCH_FAILED: 'Failed to fetch data from Bling API',
    NETWORK_ERROR: 'Network error occurred',
    TOKEN_EXPIRED: 'Authentication token expired',
  },
} as const;

/**
 * Tipos de critérios de busca suportados pela API Bling
 */
export const BLING_CRITERIA = {
  LATEST: 1, // Mais recentes
  ACTIVE: 2, // Ativos
  INACTIVE: 3, // Inativos
  DELETED: 4, // Deletados
  ALL: 5, // Todos
} as const;

/**
 * Tipos de produtos suportados pela API Bling
 */
export const BLING_PRODUCT_TYPES = {
  ALL: 'T', // Todos
  PRODUCT: 'P', // Produto
  SERVICE: 'S', // Serviço
  COMPOSITION: 'E', // Composição
  PRODUCT_SERVICE: 'PS', // Produto e Serviço
  COMPOSITION_SERVICE: 'C', // Composição e Serviço
  VARIATION: 'V', // Variação
} as const;
