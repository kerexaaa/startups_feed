"use client";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID } from "@/sanity/lib/queries";

const Header = ({ session }: { session: any }) => {
  const { open, changeModal } = useAuthModal();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const id = session.id;
      if (id) {
        const user = await client.fetch(AUTHOR_BY_ID, { id });
        setUser(user);
      }
      setLoading(false);
      if (session?.id) {
        fetchUser();
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex px-3 sm:px-10 justify-between items-center py-5 h-[70px] bg-white">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={143} height={30} />
      </Link>
      <div className="flex gap-2 sm:gap-10">
        {loading ? (
          <>
            <Button disabled>Loading...</Button>
          </>
        ) : user ? (
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
            <Link href={`/user/${user._id}`}>
              <Image
                src={(user.image as string) || "/default.jpg"}
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
