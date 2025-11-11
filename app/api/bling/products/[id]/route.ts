import { NextRequest, NextResponse } from 'next/server';
import { BlingApiService } from '@/app/services/bling/api.service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await BlingApiService.getProduct(id);

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error(
      `Error in product API route for ID ${(await params).id}:`,
      error
    );

    const message =
      error instanceof Error ? error.message : 'Internal server error';

    let status = 500;
    if (message.includes('Invalid product ID')) {
      status = 400;
    } else if (message.includes('not found')) {
      status = 404;
    }

    return NextResponse.json({ error: message }, { status });
  }
}
