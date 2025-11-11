'use client';

import { AddToCartButton } from '@/app/components/commons/add-to-cart-button';
import { ExpandableDescription } from '@/app/components/ui/expandable-text';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { useParams, notFound } from 'next/navigation';
import { ProductImageGallery } from './components/product-image-gallery';
import { ProdutosDadosDTO } from '@/app/entities/DTO/blinq-product';

// Client-side function to fetch product data
async function fetchProduct(id: string): Promise<ProdutosDadosDTO> {
  const response = await fetch(`/api/bling/products/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error('Failed to fetch product');
  }

  const data = await response.json();
  return data.data;
}

// Loading component
function ProductPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 overflow-hidden">
      <div className="flex gap-8">
        <div className="space-y-6 w-full">
          {/* Title skeleton */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Price skeleton */}
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded"></div>

          {/* Image gallery skeleton */}
          <div className="h-96 w-full bg-gray-200 animate-pulse rounded"></div>

          {/* Card skeleton */}
          <div className="h-32 w-full bg-gray-200 animate-pulse rounded"></div>

          {/* Button skeleton */}
          <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Error component
function ProductError({ error }: { error: Error }) {
  if (error.message === 'Product not found') {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-red-500 mb-4">Erro ao carregar o produto</p>
          <p className="text-muted-foreground">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Tentar novamente
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    notFound();
  }

  // Use React Query to fetch product data
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Handle loading state
  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  // Handle error state
  if (error) {
    return <ProductError error={error as Error} />;
  }

  // Handle no product found
  if (!product) {
    notFound();
  }

  const formatPrice = (price?: number) => {
    if (!price) return 'Preço não disponível';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getStatusBadge = (situacao: string) => {
    return situacao === 'A' ? (
      <Badge variant="default" className="bg-green-500">
        Ativo
      </Badge>
    ) : (
      <Badge variant="secondary">Inativo</Badge>
    );
  };

  const allImages = [
    ...(product.imagemURL
      ? [{ link: product.imagemURL, alt: product.nome }]
      : []),
    ...(product.midia?.imagens?.internas || []),
  ];

  return (
    <div className="container mx-auto px-4 py-8 overflow-hidden">
      <div className="flex gap-8">
        {/* Informações do Produto */}
        <div className="space-y-6 w-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{product.nome}</h1>
              {getStatusBadge(product.situacao || 'I')}
            </div>

            {product.codigo && (
              <p className="text-muted-foreground">Código: {product.codigo}</p>
            )}
          </div>

          {/* Preço */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">
              {formatPrice(product.preco)}
            </div>
          </div>

          {/* Galeria de Imagens */}
          <ProductImageGallery images={allImages} productName={product.nome} />

          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.descricaoCurta && (
                <ExpandableDescription content={product.descricaoCurta} />
              )}
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex gap-3 flex-col sm:flex-row">
            <AddToCartButton
              product={{
                id: parseInt(id),
                nome: product.nome,
                preco: product.preco || 0,
                imagemURL: product.imagemURL,
                codigo: product.codigo,
                descricao: product.descricaoCurta,
              }}
            />
          </div>
        </div>
      </div>

      {/* Tabs com informações detalhadas */}
      <div className="mt-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="flex w-full gap-3 justify-start">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="dimensions">Dimensões</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.marca && (
                  <div>
                    <span className="text-sm text-muted-foreground">Marca</span>
                    <p className="font-semibold">{product.marca}</p>
                  </div>
                )}

                {product.estoque && (
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Disponível:
                    </span>
                    <p className="font-semibold">
                      {product.estoque.saldoVirtualTotal}
                    </p>
                  </div>
                )}
                {product.estoque && (
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Localização:
                    </span>
                    <p className="font-semibold">
                      {product.estoque.localizacao}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dimensions">
            {product.dimensoes ? (
              <Card>
                <CardHeader>
                  <CardTitle>Dimensões e Peso</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {product.dimensoes.largura && (
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Largura
                      </span>
                      <p className="font-semibold">
                        {product.dimensoes.largura} cm
                      </p>
                    </div>
                  )}
                  {product.dimensoes.altura && (
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Altura
                      </span>
                      <p className="font-semibold">
                        {product.dimensoes.altura} cm
                      </p>
                    </div>
                  )}
                  {product.dimensoes.profundidade && (
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Profundidade
                      </span>
                      <p className="font-semibold">
                        {product.dimensoes.profundidade} cm
                      </p>
                    </div>
                  )}
                  {product.pesoLiquido && (
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Peso Líquido
                      </span>
                      <p className="font-semibold">{product.pesoLiquido} kg</p>
                    </div>
                  )}
                  {product.pesoBruto && (
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Peso Bruto
                      </span>
                      <p className="font-semibold">{product.pesoBruto} kg</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    Informações de dimensões não disponíveis
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
