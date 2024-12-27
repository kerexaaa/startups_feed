import { auth } from "@/auth";
import Hero from "@/components/Hero";
import { Skeleton } from "@/components/ui/skeleton";
import UserStartups from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID, AUTHOR_BY_SESSION } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID, { id });

  console.log(user);

  if (!user) {
    return (
      <>
        <Hero primaryHeader="User doesn't exist"></Hero>
      </>
    );
  }

  return (
    <>
      <div className="pb-10 pt-20 px-10 max-w-7xl mx-auto lg:flex-row flex-col flex gap-10">
        <div className="px-6 pb-6 pt-20 flex flex-col border-b-[7px] border-r-[7px] justify-center items-center bg-pink border-[5px] border-black shadow-100 rounded-[30px] relative z-0 h-fit max-lg:w-full">
          <div className="w-11/12 bg-white border-[5px] border-black rounded-[20px] px-5 py-3 absolute -top-9 after:absolute after:content-[''] after:-top-1 after:right-0 after:-skew-y-6 after:bg-black after:-z-[1] after:rounded-[20px] after:w-full after:h-[60px] before:absolute before:content-[''] before:-bottom-1 before:left-0  before:-skew-y-6 before:w-full before:h-[60px] before:bg-black  before:-z-[1] before:rounded-[20px] shadow-100">
            <h3 className="text-2xl text-black font-bold uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>
          <Image
            src={user.image}
            alt={user.image}
            width={220}
            height={220}
            className="rounded-full object-cover border-3 border-black"
          ></Image>
          <p className="text-3xl font-bold mt-7 text-center">
            @{user.username}
          </p>
          <p className="mt-1 text-center">{user?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-3xl font-bold">
            {session?.id == id ? "Your" : "All"} Startups
          </p>
          <ul className="flex flex-col gap-5 md:grid-cols-2 md:grid md:gap-5">
            <Suspense fallback={<Skeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Page;
