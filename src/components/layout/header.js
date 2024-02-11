"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CartContext } from "../AppContext";
import { useContext } from 'react';

const Header = () => {
  const { cartProducts } = useContext(CartContext);
  const session = useSession();
  const status = session.status;
  const userName = session?.data?.user?.name;

  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 font-semibold text-gray-500">
        <Link className=" text-primary text-2xl font-semibold" href="/">
          ST PIZZA
        </Link>

        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <nav className="flex items-center gap-8">
        {status === "authenticated" && (
          <>
            <Link href="/profile" className="font-bold text-gray-500">
              Hello, {userName.split(" ")[0]}
            </Link>
            <button
              className="bg-primary text-white border py-2 px-8 rounded-full"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              className="bg-primary text-white border py-2 px-8 rounded-full"
              href={"/register"}
            >
              Register
            </Link>
          </>
        )}
        <Link href={'/cart'}>Cart({cartProducts.length})</Link>
      </nav>
    </header>
  );
};

export default Header;
