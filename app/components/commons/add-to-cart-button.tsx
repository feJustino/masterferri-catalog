'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/cart-context';

interface Product {
  id: number;
  nome: string;
  preco: number;
  imagemURL?: string;
  codigo?: string;
  descricao?: string;
}

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({
  product,
  className = '',
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      // Adicionar ao carrinho
      addToCart({
        id: product.id,
        nome: product.nome,
        preco: product.preco,
        imagemURL: product.imagemURL || '',
        codigo: product.codigo || '',
        descricao: product.descricao || '',
      });

      // Feedback visual de sucesso
      setJustAdded(true);

      // Opcional: mostrar toast de sucesso
      // toast.success('Produto adicionado ao carrinho!');

      // Reset do estado após animação
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      // Opcional: mostrar toast de erro
      // toast.error('Erro ao adicionar produto ao carrinho');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      size="lg"
      className={`flex-1 py-3 transition-all duration-300 ${
        justAdded ? 'bg-green-600 hover:bg-green-700' : ''
      } ${className}`}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {justAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Adicionado!
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAdding ? 'Adicionando...' : 'Adicionar ao Carrinho'}
        </>
      )}
    </Button>
  );
}
