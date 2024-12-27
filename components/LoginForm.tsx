"use client";

import { FormEvent, useEffect, useState } from "react";
import Button from "./Button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/hooks/useAuthModal";
import { Tooltip } from "@nextui-org/tooltip";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [error, setError] = useState("");
  const session = useSession();
  const router = useRouter();
  const { close } = useAuthModal();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session, router]);

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
      setError("password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      console.log(res);
      setError("hover me to read what's wrong!");
      if (res.url) router.replace("/");
    } else {
      setError("");
      close();
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="email"
        required
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none text-md"
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
        required
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none text-md"
      />
      <Button
        className="w-full bg-red text-white py-2 rounded hover:bg-black focus:bg-black transition text-xl"
        type="submit"
      >
        Sign in
      </Button>
      {error && (
        <Tooltip
          content={
            <>
              <p className="text-lg text-red">Possible reasons</p>
              <ul>
                <li>This account is registered with a provider.</li>
                <li>Password is incorrect.</li>
                <li>This account is not registered.</li>
              </ul>
            </>
          }
        >
          <p className="text-red my-2">{error && error}</p>
        </Tooltip>
      )}
    </form>
  );
};

export default LoginForm;
