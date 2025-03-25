import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (cartItem) => cartItem.bookId === item.bookId
      );
      if (itemIndex > -1) {
        // If the item already exists, update the quantity
        const updatedCart = [...prevCart];
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: updatedCart[itemIndex].quantity + 1,
          totalPrice:
            updatedCart[itemIndex].price *
            (updatedCart[itemIndex].quantity + 1),
        };
        return updatedCart;
      } else {
        // If the item doesn't exist, add it to the cart with quantity 1
        return [...prevCart, { ...item, quantity: 1, totalPrice: item.price }];
      }
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.bookId !== bookId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
