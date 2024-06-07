import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addCartItem = (item) => {
    setCart((prevCart) => {
      const productId = item._id;
      const existingItem = prevCart.find((itm) => itm._id === productId);

      let newCart;

      if (existingItem) {
        newCart = prevCart.map((itm) => {
          if (itm._id === productId) {
            return { ...itm, quantity: itm.quantity + 1 };
          }
          return itm;
        });
      } else {
        newCart = [...prevCart, { ...item, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const incrementItem = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((itm) => {
        if (itm._id === productId) {
          return { ...itm, quantity: itm.quantity + 1 };
        }
        return itm;
      });

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const decrementItem = (productId) => {
    setCart((prevCart) => {
      let newCart = prevCart
        .map((itm) => {
          if (itm._id === productId) {
            return { ...itm, quantity: Math.max(itm.quantity - 1, 1) };
          }
          return itm;
        })
        .filter((itm) => itm.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeItemFromCart = (productId) => {
    setCart((prevState) => {
      let newCart = prevState.filter((itm) => itm._id !== productId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCartItem,
        incrementItem,
        decrementItem,
        clearCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => React.useContext(CartContext);
