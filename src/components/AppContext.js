"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export const CalcTotalPrice = (product) => {
  let totalPrice = product.basePrice;
  if (product.size) {
    totalPrice += product.size.price;
  }
  if (product.extras.length > 0) {
    for (const extra of product.extras) {
      totalPrice += extra.price;
    }
  }
  return totalPrice;
};


const AppContext = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const localStorage =
    typeof window != "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (localStorage && localStorage.getItem("cart"))
      setCartProducts(JSON.parse(localStorage.getItem("cart")));
  }, [localStorage]);

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
      const newCartProducts = preProducts.filter((item, i) => i != indexToRemove);
      saveCardProductToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product removed')
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
