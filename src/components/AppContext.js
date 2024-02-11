"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

const AppContext = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const localStorage =
    typeof window != "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (localStorage && localStorage.getItem("cart"))
      setCartProducts(JSON.parse(localStorage.getItem("cart")));
  }, []);

  const saveCardProductToLocalStorage = (cartProduct) => {
    if (localStorage) {
      localStorage.setItem("cart", JSON.stringify(cartProduct));
    }
  };

  const clearCart = () => {
    setCartProducts([]);
    saveCardProductToLocalStorage([]);
  };

  const removeCartProduct = (indexToRemove) => {
    setCartProducts((preProducts) => {
      const newCartProducts = preProducts.filter(_, (i) => i != indexToRemove);
      saveCardProductToLocalStorage(newCartProducts);
      return newCartProducts;
    });
  };

  const addToCart = (product, size = null, extras = []) => {
    setCartProducts((preProducts) => {
      const newProducts = [...preProducts, { ...product, size, extras }];
      saveCardProductToLocalStorage(newProducts);
      return newProducts;
    });
  };
  return (
    <div>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        <SessionProvider>{children}</SessionProvider>
      </CartContext.Provider>
    </div>
  );
};

export default AppContext;
