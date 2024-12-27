"use client";

import { FormEvent, useState } from "react";
import Button from "./Button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const [error, setError] = useState("");
  const { close } = useAuthModal();
  const router = useRouter();

  const validEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!validEmail(email)) {
      setError("just make sure you write email right");
      return;
    }

    if (!password || password.length < 8) {
      setError("password is invalid, be more creative");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setError("crap, this email is registered");
      }
      if (res.status === 200) {
        setError("");
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        toast.success("Signed up successfully!");
        if (res?.error) {
          setError("make sure you write it right");
          if (res.url) router.replace("/");
        } else {
          setError("");
          close();
        }
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="email"
        placeholder="email"
        id="email"
        name="email"
        required
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none text-md"
      />
      <input
        type="password"
        placeholder="password"
        id="password"
        name="password"
        required
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none text-md"
      />
      <Button
        className="w-full bg-red text-white py-2 rounded hover:bg-black focus:bg-black transition text-xl"
        type="submit"
      >
        Sign up
      </Button>
      <p className="text-red my-2">{error && error}</p>
    </form>
  );
};

export default RegistrationForm;
