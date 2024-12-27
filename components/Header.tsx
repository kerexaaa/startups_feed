"use client";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { toast } from "react-toastify";

const Header = () => {
  const { data: session, status } = useSession();
  const { open, changeModal } = useAuthModal();

  return (
    <div className="flex px-5 sm:px-10 justify-between items-center py-5 h-[70px] bg-white">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={143} height={30} />
      </Link>
      <div className="flex gap-2 sm:gap-10">
        {session?.user ? (
          <>
            <Link href="/create" className="flex items-center">
              <Button>Create</Button>
            </Link>
            <Button
              className="text-red"
              onClick={() => {
                signOut();
                toast.success("Logged out!", {
                  autoClose: false,
                });
              }}
            >
              Logout
            </Button>
            <Link href={`/user/${session.id}`}>
              <Image
                src={session.user.image as string}
                alt="Profile pic"
                width={36}
                height={36}
              />
            </Link>
          </>
        ) : (
          <>
            <Button
              className="text-red"
              onClick={() => {
                changeModal(false);
                open();
              }}
            >
              Sign in
            </Button>
            <Button
              className="text-red"
              onClick={() => {
                changeModal(true);
                open();
              }}
            >
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
