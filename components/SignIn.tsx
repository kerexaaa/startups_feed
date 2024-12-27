"use client";

import { useProviders } from "@/hooks/useProviders";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { providers, isLoading } = useProviders();

  const icons = [<FcGoogle size={24} />, <BsGithub size={24} />];

  if (status === "loading" || isLoading || providers === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div>
        <LoginForm />
        <div className="flex flex-col mt-4 gap-4 w-full">
          {Object.values(providers).map((provider, index) => {
            if (icons[index])
              return (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="flex flex-row items-center gap-2 text-xl border rounded-md border-black p-2 hover:bg-black/10 transition hover:border-black/10"
                >
                  {icons[index]}
                  Sign in with {provider.name}
                </button>
              );
          })}
        </div>
      </div>
    </div>
  );
}
