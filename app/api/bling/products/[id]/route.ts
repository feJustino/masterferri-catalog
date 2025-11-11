import { BlingProductsService } from '@/app/server/get-products';
import { ApiErrorHandler } from '@/lib/api-error-handler';
import { NextRequest, NextResponse } from 'next/server';

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

    const result = await BlingProductsService.getProducts(filters);

    return NextResponse.json({
      data: result.data || [],
      total: result.data?.length || 0,
      page: filters.page,
      hasMore: (result.data?.length || 0) > 0,
    });
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
}
