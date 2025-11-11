import { NextRequest, NextResponse } from 'next/server';
import { BlingProductsService } from '@/app/server/get-products';
import { ApiErrorHandler } from '@/lib/api-error-handler';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await BlingProductsService.getProductById(id);
    return NextResponse.json(result);
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
}
