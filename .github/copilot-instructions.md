# MasterFerri Catalog - AI Coding Instructions

## Architecture Overview

This is a **Next.js 15 App Router** e-commerce platform for automotive parts, integrating with **Bling ERP v3** for product management. The app uses a WhatsApp-first checkout flow instead of traditional payments.

### Key Architecture Patterns

- **Next.js 15 + React 19**: Uses App Router with server actions and improved hydration
- **Bling API Integration**: All product data comes from Bling ERP v3 with OAuth 2.0 + auto-refresh tokens
- **WhatsApp Checkout**: Cart generates formatted WhatsApp messages instead of payment processing
- **TypeScript DTOs**: Strict typing for all Bling API responses in `app/entities/DTO/`
- **Client-Side State**: TanStack Query for server state + Context API for cart management
- **Mobile-First Design**: Responsive layouts using TailwindCSS with shadcn/ui components

## Critical Components

### HTTP Client (`lib/httpClient.ts`)

- **Auto-refresh tokens**: Intercepts 401s, refreshes tokens, retries requests
- **Rate limiting**: Handles Bling's 1000 req/day limit with exponential backoff
- **Queue system**: Prevents multiple simultaneous refresh attempts
- **Error boundaries**: Uses `try`/`catch` for expected errors, avoids throwing for predictable failures

### Cart Context (`app/context/cart-context/`)

- **localStorage persistence**: Cart survives page reloads using React hydration patterns
- **WhatsApp message generation**: Formats cart for messaging via `generateWhatsAppMessage()`
- **No payment processing**: Cart finalizes through WhatsApp, not checkout pages
- **Global state**: Uses useReducer for cart operations and state management

### API Route Handlers (`app/api/bling/`)

- **Products**: `/api/bling/products` - paginated product listing with search/filters
- **Individual**: `/api/bling/products/[id]` - single product details with full schema
- **Rate limiting**: Built-in delays and retry logic for API limits
- **Backend for Frontend**: Acts as proxy layer between client and Bling ERP

### TanStack Query + Server Functions

- **Client-side data fetching**: Uses `@tanstack/react-query` for caching and synchronization
- **Server functions**: Marked with `'use server'` for data fetching operations
- **Optimistic updates**: Built-in error handling and retry logic for API failures
- **Request deduplication**: Automatic caching with configurable stale times

## Development Workflows

### Environment Setup

```bash
# Install dependencies (uses npm, note: pnpm-lock.yaml exists but npm is primary)
npm install

# Environment variables required:
# BLINQ_API_URL - Bling ERP v3 base URL
# BLING_CLIENT_ID, BLING_CLIENT_SECRET - OAuth 2.0 credentials
# FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY - Token storage
# WHATSAPP_NUMBER - Business WhatsApp for checkout flow

# Development server
npm run dev  # http://localhost:3000

# Build and production
npm run build
npm start

# Docker deployment
docker-compose up --build
```

### Bling Token Management

- **Server-side storage**: Tokens stored in Firebase Admin, managed by `httpClient`
- **Auto-refresh**: Interceptor handles 401 responses and token refresh automatically
- **Dev testing**: Use `/api/bling/products` endpoint to verify API connectivity
- **Token debugging**: Check `lib/httpClient.ts` for refresh logic and error logging

### Adding Product Features

1. **New filters**: Extend `useProductFilters` hook and update `getProducts` server function
2. **Display fields**: Reference `app/entities/DTO/blinq-product.ts` for available Bling data
3. **Cart integration**: Use `useCart()` hook from context, follow existing `addToCart` patterns
4. **Loading states**: Implement skeleton components with `animate-pulse` for better UX

## Bling API v3 Integration

### Core Product Endpoints

- **GET /produtos**: List products with pagination, filters, and search
- **GET /produtos/{id}**: Get single product with full details
- **GET /categorias/produtos**: Product categories for filtering
- **GET /estoques/saldos**: Stock levels by deposit/warehouse
- **GET /contatos**: Customer/supplier management

### Product Query Parameters

```typescript
interface BlingProductFilters {
  pagina?: number; // Page number (1-based)
  limite?: number; // Results per page (max 100)
  criterio?: 1 | 2 | 3 | 4 | 5; // 1=Latest, 2=Active, 3=Inactive, 4=Deleted, 5=All
  tipo?: 'T' | 'P' | 'S' | 'E' | 'PS' | 'C' | 'V'; // Product types
  idCategoria?: number; // Category filter
  filtroSaldoEstoque?: 1; // Include stock data
  filtroSaldoEstoqueDeposito?: number; // Specific warehouse
  dataInclusaoInicial?: string;
  dataInclusaoFinal?: string;
  dataAlteracaoInicial?: string;
  dataAlteracaoFinal?: string;
}
```

### Core Bling DTOs

```typescript
// Base Product Response (GET /produtos)
interface ProdutosDadosBaseDTO {
  id: number;
  idProdutoPai?: number; // Parent product for variations
  nome: string; // Product name (max 120 chars)
  codigo?: string; // SKU/Product code
  preco: number; // Sale price
  precoCusto?: number; // Cost price (readonly)
  estoque?: EstoqueGetAllResponseDTO;
  tipo: 'S' | 'P' | 'N'; // Service | Product | Service 06 21 22
  situacao: 'A' | 'I'; // Active | Inactive
  formato: 'S' | 'V' | 'E'; // Simple | Variations | Composition
  descricaoCurta?: string;
  imagemURL?: string; // Auto-generated image URL (readonly)
}

// Stock Information
interface EstoqueGetAllResponseDTO {
  saldoFisicoTotal?: number;
  saldoVirtualTotal?: number;
  saldoFisico?: number;
  saldoVirtual?: number;
  deposito?: {
    id: number;
    nome: string;
  };
}

// Category Structure
interface CategoriaProdutoDTO {
  id: number;
  descricao: string;
  categoriaPai?: {
    id: number;
    descricao: string;
  };
}

// Product Variations
interface ProdutoVariacao {
  id: number;
  nome: string;
  codigo?: string;
  preco: number;
  estoque?: EstoqueGetAllResponseDTO;
  atributos?: ProdutoAtributo[];
}

interface ProdutoAtributo {
  id: number;
  nome: string;
  valor: string;
}

// Full Product Details (GET /produtos/{id})
interface ProdutoCompleto extends ProdutosDadosBaseDTO {
  descricao?: string; // Full description/HTML
  observacoes?: string; // Internal notes
  categoria?: CategoriaProdutoDTO;
  marca?: string;
  gtin?: string; // Barcode/EAN
  gtinEmbalagem?: string;
  tipoProducao?: string;
  condicao?: number; // Product condition
  freteGratis?: boolean;
  linkExterno?: string;
  midia?: {
    imagem?: {
      linkExterno?: string;
    };
    video?: {
      linkExterno?: string;
    };
  };
  dimensoes?: {
    largura?: number;
    altura?: number;
    profundidade?: number;
    unidadeMedida?: number;
  };
  tributacao?: {
    origem?: number;
    nFCI?: string;
    ncm?: string;
    cest?: string;
  };
  variacoes?: ProdutoVariacao[];
}

// API Response Wrapper
interface BlingApiResponse<T> {
  data: T;
}

interface BlingApiErrorResponse {
  error: {
    type: string;
    message: string;
    description?: string;
  };
}
```

### Rate Limiting & Authentication

```typescript
interface BlingTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  scope: string;
  refresh_token: string;
}

// Rate limits: 1000 requests per day
// Implement exponential backoff: 1s, 2s, 4s, 8s delays
// Auto-refresh tokens on 401 responses
```

## Project-Specific Conventions

### File Organization

- **DTOs**: All Bling API types in `app/entities/DTO/blinq-*.ts` - never modify, only extend
- **Components**: Feature-specific components in `app/(pages)/[route]/components/`
- **Shared UI**: Reusable components in `app/components/commons/` and `components/ui/`
- **Hooks**: Custom hooks in `app/hooks/` for filters, debouncing, etc.
- **Route Handlers**: API endpoints in `app/api/` following Backend for Frontend pattern
- **Server Functions**: Data fetching functions in `app/server/` with `'use server'`
- **Dynamic Routes**: Use `[slug]` for dynamic segments, `[...slug]` for catch-all

### Next.js 15 App Router Structure

```
app/
├── (pages)/                 # Route group for user-facing pages
│   ├── layout.tsx           # Shared layout with navigation
│   ├── page.tsx             # Homepage (/)
│   ├── catalogo/            # Products listing (/catalogo)
│   │   ├── page.tsx         # Products grid with filters
│   │   └── components/      # Catalog-specific components
│   ├── produto/             # Product pages (/produto/[id])
│   │   └── [id]/            # Individual product details
│   ├── sobre/               # About page (/sobre)
│   └── contato/             # Contact page (/contato)
├── api/                     # Route handlers (Backend for Frontend)
│   └── bling/               # Bling API proxy routes
│       ├── products/        # GET /api/bling/products
│       └── products/[id]/   # GET /api/bling/products/[id]
├── components/
│   ├── commons/             # Shared UI components
│   ├── landing-page/        # Homepage components
│   └── ui/                  # Custom UI components
├── context/
│   ├── cart-context/        # Global cart state management
│   └── tanstack-context/    # React Query provider
├── entities/
│   └── DTO/                 # Bling API type definitions
├── hooks/                   # Custom React hooks
├── server/                  # Server functions (use server)
└── utils/                   # Utility functions
components/
└── ui/                      # shadcn/ui components
lib/
├── httpClient.ts            # Bling API client with auth
├── cache.ts                 # Node cache for API responses
├── utils.ts                 # General utilities
└── firebase.ts              # Firebase configuration
```

### Styling Patterns

- **Responsive mobile-first**: Grid layouts use `grid-cols-2 sm:grid-cols-2 lg:grid-cols-4`
- **Loading states**: Skeleton loaders with `animate-pulse` for all data fetching
- **TailwindCSS + shadcn/ui**: Use existing component library, extend with `cn()` utility
- **Custom components**: Built with Vaul for drawers, Radix UI primitives
- **Meaningful fallbacks**: Provide loading UI that matches final content structure

### Data Flow & Rendering Strategy

1. **Client Components**: Most pages are client-side rendered with TanStack Query
2. **TanStack Query** fetches from `/api/bling/*` routes for dynamic data
3. **API routes** proxy to Bling with `httpClient` (handles auth/retries)
4. **Server Functions**: `getProducts` and data fetching marked with `'use server'`
5. **Components** use typed DTOs, never assume data structure
6. **Cart context** provides global state, localStorage persistence
7. **Loading patterns**: Skeleton components while data loads asynchronously

### Error Handling Strategy

```typescript
// Expected errors - model as return values, not exceptions
export async function createProduct(formData: FormData) {
  'use server';

  if (!formData.get('name')) {
    return { error: 'Product name is required' };
  }

  try {
    const result = await blingApi.createProduct(data);
    return { success: true, data: result };
  } catch (error) {
    return { error: 'Failed to create product' };
  }
}

// Uncaught exceptions - use error boundaries
// API routes: Always return structured errors
return NextResponse.json({ error: 'Description' }, { status: 500 });

// Components: Use TanStack Query error boundaries
const { data, isLoading, error } = useQuery(/* ... */);
```

## Integration Points

### Bling ERP Dependencies

- **Product sync**: Products come from Bling, never stored locally long-term
- **Stock levels**: Real-time via `filtroSaldoEstoque=1` parameter in API calls
- **Images**: Hosted on `orgbling.s3.amazonaws.com` (configured in `next.config.ts`)
- **Rate limiting**: 1000 requests/day - implement caching and request optimization
- **OAuth 2.0**: Auto-refresh tokens stored in Firebase, handled by `httpClient`

### WhatsApp Business Flow

- **No payment gateway**: Cart generates WhatsApp message with product details
- **Customer data**: Collected in cart drawer, formatted for business communication
- **Phone number**: Configured in `WHATSAPP_NUMBER` environment variable
- **Message format**: Structured product list with quantities, prices, and customer info

### Firebase Integration

- **Token storage**: Bling OAuth tokens stored in Firebase Admin (server-side only)
- **Admin SDK**: Server-side operations via `firebase-admin` package
- **Authentication**: Token refresh handled server-side, not client-facing auth
- **Security**: No client-side Firebase auth, only backend token management

## Common Patterns

### TanStack Query Implementation

```typescript
// Client component with data fetching
'use client';
export default function ProductsPage() {
  const { data: productsResponse, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const products = productsResponse?.data || [];

  return (
    <div>
      <ProductsGrid products={products} isLoading={isLoading} />
    </div>
  );
}
```

### Loading States with Skeletons

```typescript
// Standard loading grid pattern
export function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 aspect-square rounded-lg"></div>
          <div className="mt-2 bg-gray-200 h-4 rounded"></div>
          <div className="mt-1 bg-gray-200 h-3 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

// Server function with 'use server'
'use server';
export async function getProducts(filters) {
  // Fetch data from Bling API
  const response = await httpClient.get('/produtos', { params: filters });
  return response.data;
}
```

### Route Handler Patterns

```typescript
// Backend for Frontend pattern
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const products = await blingApi.getProducts({
      pagina: page,
      limite: limit,
      filtroSaldoEstoque: 1,
    });

    return NextResponse.json({ data: products });
  } catch (error) {
    if (error.status === 401) {
      // Token refresh handled by httpClient
      throw error;
    }

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// Proxy pattern with validation
export async function POST(request: Request) {
  const clonedRequest = request.clone();

  try {
    const body = await request.json();
    const validatedData = validateProductData(body);

    const response = await blingApi.createProduct(validatedData);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid product data' },
      { status: 400 }
    );
  }
}
```

### Cart Operations with Context

```typescript
const { addToCart, removeFromCart, generateWhatsAppMessage } = useCart();

// Always use context methods for cart operations
addToCart(product, quantity);
removeFromCart(productId);

// WhatsApp message generation
const message = generateWhatsAppMessage({
  customerName: 'João Silva',
  customerPhone: '11999999999',
  observations: 'Entrega urgente',
});

// Opens WhatsApp with pre-filled message
window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`);
```

### Dynamic Imports for Client Components

```typescript
// Lazy load heavy client components
import dynamic from 'next/dynamic';

const ProductConfigurator = dynamic(
  () => import('./ProductConfigurator'),
  {
    loading: () => <div>Loading configurator...</div>,
    ssr: false // Client-side only
  }
);
```

## Performance Optimization Guidelines

### Caching Best Practices

1. **TanStack Query caching**: Configure appropriate `staleTime` and `cacheTime` for API responses
2. **Node cache**: Use `lib/cache.ts` for server-side caching of frequently accessed data
3. **Static data optimization**: Pre-fetch product catalogs and categories when possible
4. **Request deduplication**: TanStack Query automatically deduplicates identical requests
5. **Meaningful loading states**: Show skeleton UI that matches final content structure

### Bling API Optimization

1. **Batch requests**: Combine multiple product fetches when possible
2. **Use filters**: Apply server-side filtering to reduce payload size
3. **Cache responses**: Implement request memoization with React `cache()`
4. **Monitor rate limits**: Track API usage and implement client-side caching
5. **Optimize images**: Use Next.js Image optimization for Bling's S3 URLs

## Development Guidelines

### Code Quality Standards

1. **TypeScript strict mode**: Enable all strict type checking options
2. **Error boundaries**: Use `error.tsx` files for graceful error handling
3. **Loading states**: Always provide fallback UI for async operations
4. **Responsive design**: Mobile-first approach with Tailwind breakpoints
5. **Accessibility**: Use semantic HTML and ARIA attributes
6. **Performance**: Monitor Core Web Vitals, optimize images and bundles

### Security Considerations

1. **No client-side secrets**: All Bling credentials server-side only
2. **Input validation**: Validate all user inputs before API calls
3. **Rate limiting**: Respect Bling API limits, implement backoff
4. **Error messages**: Don't expose sensitive information in errors
5. **CORS handling**: Proper CORS configuration for API routes

When modifying this codebase:

- **Always check Bling API limits** before making requests
- **Maintain TypeScript strict typing** for all Bling DTOs
- **Ensure mobile responsiveness** in all layouts
- **Use TanStack Query patterns** for consistent data fetching and caching
- **Implement proper error boundaries** for graceful failures
- **Follow Next.js 15 App Router patterns** for routing and data fetching
- **Optimize for Core Web Vitals** with proper loading states and caching
