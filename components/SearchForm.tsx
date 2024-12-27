import Form from "next/form";
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import Button from "./Button";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query: string | undefined }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="relative px-4 sm:px-9 max-w-[688px] w-full flex items-center search-form rounded-full border-black border-[5px] focus:outline-none overflow-hidden bg-white"
    >
      <input
        name="query"
        defaultValue={query}
        placeholder="search startups"
        type="text"
        className="placeholder:text-black placeholder:font-bold font-bold w-full focus:outline-none uppercase text-lg leading-[70px] sm:leading-[70px] sm:text-2xl"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <Button className="text-white bg-black w-12 h-12 flex justify-center items-center rounded-full">
          <IoSearch size={24} />
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
