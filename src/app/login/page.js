"use client";
import Button from "@/components/sheared/button";
import Input from "@/components/sheared/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const router = useRouter();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoginInProgress(true);

  //     const result = await signIn("credentials", { email, password });

  //     // Check the result or user object and handle accordingly
  //     console.log(result);

  //     setLoginInProgress(false);

  //     // Optionally, redirect the user after successful login
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setLoginInProgress(false);
  //   }
  // };

  return (
    <div className="mx-auto text-center w-80 mt-10">
      <h1 className="text-primary text-2xl font-medium">Login</h1>
      <div className="flex flex-col">
        <Input
          name="email"
          className="border p-2 my-3 w-full rounded-lg bg-gray-200"
          type="email"
          // disabled={loginInProgress}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <Input
          name="password"
          className="border w-full p-2 rounded-lg bg-gray-200"
          placeholder="password"
          // disabled={loginInProgress}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button
          type="button"
          disabled={loginInProgress}
          styleName="bg-primary text-white border py-2 px-8 rounded-lg mt-3"
          label="Login"
          onClick={() => signIn("credentials", { email, password })}
        />
        <div className="text-gray-400 my-3">or login with provider</div>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          iconLeft={<FcGoogle size={30} />}
          styleName="flex justify-center items-center gap-4 text-gray-800 font-semibold border-2 p-2 rounded-lg"
          label="Login with google"
          type="button"
        />
        <div className="my-4  text-gray-500">
          If you dont have account?{" "}
          <Link className="underline" href="/register">
            Register here &raquo;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
