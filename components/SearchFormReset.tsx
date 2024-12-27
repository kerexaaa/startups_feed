"use client";

import Link from "next/link";
import { IoMdClose } from "react-icons/io";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;

    console.log(form);

    if (form) {
      form.reset();
    }
  };

  return (
    <button
      className="text-white bg-black w-12 h-12 flex items-center justify-center rounded-full"
      type="reset"
      onClick={reset}
    >
      <Link href="/">
        <IoMdClose size={24} />
      </Link>
    </button>
  );
};

export default SearchFormReset;
