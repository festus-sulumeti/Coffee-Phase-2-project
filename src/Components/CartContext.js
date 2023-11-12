// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  const addToCart = (coffee) => {
    setCartData([...cartData, { ...coffee, quantity: 1 }]);
  };

  const removeFromCart = (coffee) => {
    const updatedCart = cartData.filter((item) => item.id !== coffee.id);
    setCartData(updatedCart);
  };

  const updateQuantity = (coffee, quantity) => {
    const updatedCart = cartData.map((item) => {
      if (item.id === coffee.id) {
        return { ...item, quantity: item.quantity + quantity };
      }
      return item;
    });
    setCartData(updatedCart);
  };

  // Adding the clearCart function to clear the cart
  const clearCart = () => {
    setCartData([]);
  };

  return (
    <CartContext.Provider
      value={{ cartData, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
