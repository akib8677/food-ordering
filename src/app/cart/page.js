"use client";
import { CartContext } from "@/components/AppContext";
import SectionHeader from "@/components/sectionHeader/index ";
import React, { useContext } from "react";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CalcTotalPrice } from "@/components/AppContext";

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  console.log(cartProducts);
  let total = 0;
  if (cartProducts.length > 0) {
    for (const product of cartProducts) {
      total += CalcTotalPrice(product);
    }
  }

  return (
    <div className="mt-4">
      <SectionHeader mainHeader={"Cart"} />
      {cartProducts.length === 0 && (
        <h1 className="text-center mt-6 font-bold text-xl">
          No item in the cart!
        </h1>
      )}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          {cartProducts.length > 0 &&
            cartProducts.map((product, index) => (
              <div key={index}>
                <div className="flex items-center gap-4 border-b my-4">
                  <div>
                    <Image
                      src={product.imageUrl}
                      className="mx-auto block"
                      alt="Pizza"
                      width={150}
                      height={50}
                    />
                  </div>
                  <div className="ml-2 font-semibold grow">
                    <div>{product.name}</div>
                    {product.size && (
                      <div className=" text-sm text-gray-500">
                        Size: {product.size.name}
                      </div>
                    )}
                    <div>
                      {product.extras.length > 0 &&
                        product.extras.map((extra) => (
                          <div key={extra._id}>
                            <div className=" text-sm text-gray-500">
                              Extra: {extra.name}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="font-semibold">{CalcTotalPrice(product)}</div>
                  <div className="bg-white shadow-lg rounded-lg border text-red-600 ml-2">
                    <button
                      type="button"
                      className="p-2"
                      onClick={() => removeCartProduct(index)}
                    >
                      <RiDeleteBin5Line size={25} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          <div className="text-right pr-[55px]">
            <span className="text-gray-700 font-bold">Total Price: </span>
            <span className="pl-2 text-xl font-semibold">${total}</span>
          </div>
        </div>

        <div>right</div>
      </div>
    </div>
  );
};

export default CartPage;
