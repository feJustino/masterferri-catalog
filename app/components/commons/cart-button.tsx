'use client';

import { useCart } from '@/app/context/cart-context';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import CartDrawer from '../ui/cart-drawer';

export function FloatingCartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { totalItems, totalPrice } = useCart();

  // Não mostrar o botão se não há itens no carrinho

  return (
    <>
      {/* Botão Flutuante */}
      <div
        className="fixed right-4 bottom-4 z-50 group"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={() => setIsCartOpen(true)}
      >
        <div
          className={`
            bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl 
            transition-all duration-300 hover:scale-105 cursor-pointer
            ${isExpanded ? 'w-auto pr-4' : 'w-14'}
            h-14 flex items-center overflow-hidden
          `}
        >
          {/* Ícone do carrinho */}
          <div className="relative flex items-center justify-center w-14 h-14 flex-shrink-0">
            <ShoppingCart className="h-6 w-6" />
          </div>

          {/* Informações expandidas */}
          <div
            className={`
              flex flex-col justify-center text-sm font-medium whitespace-nowrap
              transition-all duration-300 ml-2
              ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
            `}
          >
            <span>
              {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </span>
            <span className="text-xs opacity-90">
              R$ {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
