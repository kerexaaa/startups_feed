"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface HeroProps {
  query?: string;
  primaryHeader?: string;
  topHeader?: string;
  bottomHeader?: string;
  error?: string;
}

const Hero = ({
  query,
  primaryHeader,
  topHeader,
  bottomHeader,
  error,
}: HeroProps) => {
  const router = useRouter();
  if (error) {
    switch (error) {
      case "UserAlreadyExists":
        toast.error("This user is already registered", {
          delay: 3000,
        });
        router.replace("/");
        break;
      default:
        break;
    }
  }

  return (
    <>
      {topHeader && (
        <div className="bg-[#FBE843] py-3 px-5">
          <p className="text-lg font-bold uppercase selection:bg-red relative before:absolute before:content-[''] before:w-0 before:h-0 before:border-t-[12px] before:border-l-[12px] before:-rotate-90 before:border-t-black before:border-l-transparent before:-top-1 before:-left-3 after:absolute after:content-[''] after:w-0 after:h-0 after:border-b-[12px] after:border-r-[12px] after:-rotate-90 after:border-b-black after:border-r-transparent after:-bottom-1 after:-right-3">
            {topHeader}
          </p>
        </div>
      )}
      {primaryHeader && (
        <div className="bg-black py-5 px-8 h-auto break-words">
          <h1 className="flex flex-col text-2xl md:text-5xl font-extrabold text-white uppercase text-center max-w-[800px]">
            {primaryHeader}
          </h1>
        </div>
      )}
      {bottomHeader && (
        <div>
          <p className="text-lg md:text-xl text-white text-center">{bottomHeader}</p>
        </div>
      )}
    </>
  );
};

export default Hero;
