import { auth } from "@/auth";
import Hero from "@/components/Hero";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <div className="flex flex-col items-center bg-hero-default bg-pink justify-center gap-8 py-16 px-10">
        <Hero primaryHeader="Submit your startup" />
      </div>
      <StartupForm />
    </>
  );
};

export default Page;
