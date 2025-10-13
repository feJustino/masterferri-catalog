'use client';

import { CustomerData } from '@/app/entities/customer';
import type { CartItem, Product } from './types';
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  generateWhatsAppMessage: (customerData: CustomerData) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'masterferri_cart';

// Actions
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';
const LOAD_CART = 'LOAD_CART';

type CartAction =
  | { type: typeof ADD_TO_CART; payload: CartItem }
  | { type: typeof REMOVE_FROM_CART; payload: number }
  | { type: typeof UPDATE_QUANTITY; payload: { id: number; quantity: number } }
  | { type: typeof CLEAR_CART }
  | { type: typeof LOAD_CART; payload: CartItem[] };

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    case LOAD_CART:
      return {
        ...state,
        items: action.payload || [],
      };

    default:
      return state;
  }
}

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
};

interface CartProviderProps {
  children: ReactNode;
}

// Provider component
export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Calculate totals
  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        dispatch({ type: LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  // Actions
  const addToCart = (product: Product, quantity = 1) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        id: product.id,
        name: product.nome,
        price: Number.parseFloat(product.preco.toString()),
        image: product.imagemURL,
        quantity,
        codigo: product.codigo,
        descricao: product.descricao,
      },
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: UPDATE_QUANTITY, payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // Generate WhatsApp message
  const generateWhatsAppMessage = (customerData: CustomerData): string => {
    const { name, phone, observations } = customerData;

    let message = 'Olá! Gostaria de fazer um pedido:\n\n';

    for (const item of state.items) {
      message += `- ${item.name} - ${item.quantity} unidade(s) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    }

    message += `\nTotal estimado: R$ ${totalPrice.toFixed(2)}\n\n`;
    message += `Meu nome: ${name}\n`;
    message += `Telefone: ${phone}\n`;

    if (observations) {
      message += `Observações: ${observations}\n`;
    }

    return encodeURIComponent(message);
  };

  const value: CartContextType = {
    items: state.items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    generateWhatsAppMessage,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook to use cart context
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
