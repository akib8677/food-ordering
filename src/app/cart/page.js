"use client";
import { CartContext } from "@/components/AppContext";
import SectionHeader from "@/components/sectionHeader/index ";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CalcTotalPrice } from "@/components/AppContext";
import Input from "@/components/sheared/input";
import useProfile from "@/components/customHook/use-profile";

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const { isLoading, data: profileData } = useProfile();
  const [adressData, setAdressData] = useState({
    phone: profileData?.phone || "",
    streatAddress: profileData?.streatAdress,
    postalCode: profileData?.postalCode || "",
    city: profileData?.city || "",
    country: profileData?.country || ""
  });

  console.log(profileData)

  useEffect(() => {
    if(profileData){
      setAdressData(profileData)
    }
  }, [profileData]);

  let subtotal = 0;
  if (cartProducts.length > 0) {
    for (const product of cartProducts) {
      subtotal += CalcTotalPrice(product);
    }
  }

  const proccedToCheckout = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {"Content-type:": "application-json"},
      body: JSON.stringify({
        adressData,
        cartProducts
      })
    });
   const link = await response.json();
    window.location = link
  }

  const handleOnChange = (e) => {
    setAdressData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  };

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
          {cartProducts.length > 0 && (
            <div className="flex justify-end pr-[55px]">
              <div className="text-gray-700 font-bold">
                Subtotal: <br />
                Delivery: <br />
                Total:
              </div>
              <div className="pl-2 text-xl font-semibold">
                ${subtotal} <br/>
                $5<br/>
                ${subtotal+5}
                </div>
            </div>
          )}
        </div>
        <div className="bg-gray-200 rounded-lg p-4 mt-10">
          <h1 className="font-semibold text-lg">Checkout</h1>
          <label className="font-medium text-gray-600 mb-2">Phone Number</label>
          <Input
            className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
            type="tel"
            name="phone"
            value={adressData.phone}
            onChange={(e) => handleOnChange(e)}
            placeholder="Phone Number"
          />
          <label className="font-medium text-gray-600 mb-2">
            Streat Adress
          </label>
          <Input
            className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
            type="text"
            name="streetAddress"
            value={adressData.streatAddress}
            onChange={(e) => handleOnChange(e)}
            placeholder="Streat Adress"
          />
          <div className="flex gap-2 items-center justify-center">
            <div>
              <label className="font-medium text-gray-600 mb-2">
                Postal Code
              </label>
              <Input
                className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
                type="number"
                name="postalCode"
                value={adressData.postalCode}
                onChange={(e) => handleOnChange(e)}
                placeholder="Postal Code"
              />
            </div>
            <div className="">
              <label className="font-medium text-gray-600 mb-2">City</label>
              <Input
                className="border mb-1 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
                type="text"
                name="city"
                value={adressData.city}
                onChange={(e) => handleOnChange(e)}
                placeholder="City"
              />
            </div>
          </div>
          <label className="font-medium text-gray-600 mb-2">Country</label>
          <Input
            className="border mb-2 text-gray-400 p-2 w-full rounded-lg bg-gray-100"
            type="text"
            name="country"
            value={adressData.country}
            onChange={(e) => handleOnChange(e)}
            placeholder="Country"
          />
          <button
            type="button"
            className="p-2 mt-4 bg-primary w-full text-center text-white rounded-lg"
            onClick={proccedToCheckout}
          >
            pay ${subtotal + 5}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
