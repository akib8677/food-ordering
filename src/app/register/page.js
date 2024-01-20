"use client";
import Button from "@/components/sheared/button";
import Input from "@/components/sheared/input";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [createdUser, setCreatedUser] = useState(false);
  const [error, setError] = useState(false);
  const register = async (e) => {
    setCreatingUser(true);
    setCreatedUser(false);
    e.preventDefault();
    setError(false);
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setCreatedUser(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  };

  return (
    <div className="mx-auto text-center w-80 mt-10">
      <h1 className="text-primary text-2xl font-medium">Register</h1>
      {createdUser && (
        <div className="my-4 text-center text-green-300">
          User created. <br />
          Now you can{" "}
          <Link className="underline" href="/login">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center text-red-600">
          An error has occurred.
          <br />
          plese try again later
        </div>
      )}
      <div className="flex flex-col">
        <Input
          className="border p-2 my-3 w-full rounded-lg bg-gray-200"
          type="email"
          disabled={creatingUser}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <Input
          className="border w-full p-2 rounded-lg bg-gray-200"
          placeholder="password"
          disabled={creatingUser}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button
          disabled={creatingUser}
          styleName="bg-primary text-white border py-2 px-8 rounded-lg mt-3"
          label="Register"
          type="button"
          onClick={register}
        />
        <div className="text-gray-400 my-3">or login with provider</div>
          <Button
            onClick={() => signIn('google',{callbackUrl:'/'})}
            iconLeft={<FcGoogle size={30} />}
            styleName="flex justify-center items-center gap-4 text-gray-800 font-semibold border-2 p-2 rounded-lg"
            label="Login with google"
            type="button"
          />
        <div className="my-4  text-gray-500">
          Exiting account? {' '} <Link className="underline" href="/login">Login here &raquo;</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
