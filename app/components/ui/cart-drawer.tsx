'use client';

import { useCart } from '@/app/context/cart-context';
import { ShippingOption } from '@/app/entities/shipping';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import WhatsAppButton from './whatsapp-button';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [shippingCEP, setShippingCEP] = useState<string>('');
  const [shippingOptions, setShippingOptions] = useState<
    ShippingOption[] | null
  >(null);
  const [isCalculatingShipping, setIsCalculatingShipping] =
    useState<boolean>(false);

  const handleQuantityChange = (
    productId: number,
    newQuantity: number
  ): void => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const calculateShipping = async (): Promise<void> => {
    if (!shippingCEP || shippingCEP.length !== 9) {
      alert('Por favor, insira um CEP válido');
      return;
    }

    setIsCalculatingShipping(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setShippingOptions([
        {
          service: 'PAC',
          price: 15.5,
          days: '8-12 dias úteis',
        },
        {
          service: 'SEDEX',
          price: 25.8,
          days: '3-5 dias úteis',
        },
      ]);
    } catch (error) {
      console.error('Error calculating shipping:', error);
      alert('Erro ao calcular frete. Tente novamente.');
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const formatCEP = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) {
      return numbers;
    } else {
      return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
    }
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatCEP(e.target.value);
    setShippingCEP(formatted);

    if (shippingOptions) {
      setShippingOptions(null);
    }
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-full w-full md:w-[400px] ml-auto">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrinho ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
          </DrawerTitle>
          <DrawerDescription>
            Revise seus itens antes de finalizar
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-semibold mb-2">Carrinho vazio</p>
              <p className="text-muted-foreground">
                Adicione produtos para continuar
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Lista de itens */}
              {items.map(item => (
                <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                        <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      R$ {item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cálculo de frete */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Calcular Frete</h4>
                <div className="flex flex-col md:-flex-row gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="00000-000"
                    value={shippingCEP}
                    onChange={handleCEPChange}
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                    maxLength={9}
                  />
                  <Button
                    onClick={calculateShipping}
                    disabled={isCalculatingShipping}
                  >
                    {isCalculatingShipping ? 'Calculando...' : 'Calcular'}
                  </Button>
                </div>

                {shippingOptions && (
                  <div className="space-y-2">
                    {shippingOptions.map(option => (
                      <div
                        key={option.service}
                        className="flex justify-between items-center p-2 border rounded text-sm"
                      >
                        <div>
                          <p className="font-medium">{option.service}</p>
                          <p className="text-muted-foreground">{option.days}</p>
                        </div>
                        <p className="font-semibold">
                          R$ {option.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DrawerFooter className="border-t w-full flex flex-col gap-4 p-4">
          {items.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold">
                  R$ {totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <WhatsAppButton />
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full"
                >
                  Limpar Carrinho
                </Button>
              </div>
            </>
          )}

          <DrawerClose asChild>
            <Button variant="secondary" className="w-full ">
              Continuar Comprando
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
