'use client';
import { ProdutosDadosBaseDTO } from '@/app/entities/DTO/blinq-product';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({
  product,
}: {
  product: ProdutosDadosBaseDTO;
}) {
  if (product === undefined) {
    return null;
  }

  if (product.estoque === undefined) {
    product.estoque = { saldoVirtualTotal: 0 };
  }

  const saldoVirtualTotal = product.estoque?.saldoVirtualTotal || 0;

  const isOutOfStock = saldoVirtualTotal === 0;
  const hasDiscount = false;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative">
        <Link href={`/produto/${product.id}`}>
          <Image
            src={product.imagemURL || '/images/no-image.png'}
            alt={product.nome}
            width={50}
            height={50}
            className="object-cover hover:scale-105 transition-transform cursor-pointer"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 right-2 space-y-1">
          {isOutOfStock && (
            <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
              Sem Estoque
            </span>
          )}
        </div>

        {/* Stock indicator */}
        {!isOutOfStock && product.estoque?.saldoVirtualTotal <= 5 && (
          <div className="absolute top-2 right-2">
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              Últimas {product.estoque?.saldoVirtualTotal}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}

        {/* Product Name */}
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 hover:text-primary-600 cursor-pointer">
            {product.nome}
          </h3>
        </Link>

        {/* Product Code */}
        {product.codigo && (
          <p className="text-xs text-gray-500 mb-2">Cód: {product.codigo}</p>
        )}

        {/* Price */}
        <div className="mb-3">
          {hasDiscount ? (
            <div>
              <span className="text-sm text-gray-500 line-through">
                R$ {product.preco.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              R$ {product.preco.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock info */}
        <div className="mb-3">
          <span className="text-xs text-gray-500">
            {isOutOfStock ? 'Sem estoque' : `${saldoVirtualTotal} em estoque`}
          </span>
        </div>

        {/* Add to Cart Section */}

        {/* Out of Stock Button */}
        {isOutOfStock && (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded-lg cursor-not-allowed text-sm"
          >
            Produto Indisponível
          </button>
        )}
      </div>
    </div>
  );
}
