import { NextRequest, NextResponse } from 'next/server';
import { SingleProdutoResponseDTO } from '@/app/entities/DTO/blinq-product';
import httpClient from '@/lib/httpClient';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('Received request to fetch product from Bling API v3');
  try {
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    console.log('Fetching product from Bling API v3', { id });

    const response = await httpClient.get<SingleProdutoResponseDTO>(
      `/produtos/${id}`
    );

    if (!response.data || response.status !== 200) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch product from Bling' },
        { status: 500 }
      );
    }

    console.log('Product fetched successfully from Bling API v3', { id });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching product from Bling API v3', error);

    // Check if it's a 404 error from the external API
    if (
      error &&
      typeof error === 'object' &&
      'status' in error &&
      error.status === 404
    ) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
