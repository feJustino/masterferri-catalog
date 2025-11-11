import { NextRequest, NextResponse } from 'next/server';
import { BlingApiService } from '@/app/services/bling/api.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '30'),
      search: searchParams.get('search') || undefined,
      priceMin: searchParams.get('priceMin')
        ? parseFloat(searchParams.get('priceMin')!)
        : undefined,
      priceMax: searchParams.get('priceMax')
        ? parseFloat(searchParams.get('priceMax')!)
        : undefined,
      idCategoria: searchParams.get('idCategoria')
        ? parseInt(searchParams.get('idCategoria')!)
        : undefined,
    };

    const result = await BlingApiService.getProducts(filters);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in products API route:', error);

    const message =
      error instanceof Error ? error.message : 'Internal server error';
    const status = message.includes('Invalid') ? 400 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
