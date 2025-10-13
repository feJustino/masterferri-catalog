import { NextRequest, NextResponse } from 'next/server';
import { ProdutosResponseDTO } from '@/app/entities/DTO/blinq-product';
import httpClient from '@/lib/httpClient';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '30');
    const search = searchParams.get('search') || '';

    console.log(`Fetching page ${page} from Bling API`);

    // Construir query params para o Bling
    const blingParams = new URLSearchParams({
      pagina: page.toString(),
      limite: limit.toString(),
      filtroSaldoEstoque: '1',
    });

    if (search) {
      blingParams.append('nome', search);
    }

    // Buscar produtos do Bling com paginação
    const response = await httpClient.get<ProdutosResponseDTO>(
      `/produtos?${blingParams.toString()}`
    );

    if (response.status !== 200 || !response.data) {
      return NextResponse.json(
        { error: 'Failed to fetch products from Bling' },
        { status: 500 }
      );
    }

    const products = response.data.data || [];

    return NextResponse.json({
      data: products,
      total: products.length,
      page,
      hasMore: products.length > 0, // Simples verificação de hasMore
    });
  } catch (error) {
    console.error('Error fetching products from Bling:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
