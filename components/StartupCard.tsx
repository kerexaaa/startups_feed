import { formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "./Button";
import { Author, Startup } from "@/sanity/types";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="p-3 md:p-6 justify-between border-4 border-black h-fit rounded-xl border-r-8 border-b-8 transition ease-linear group hover:border-pink hover:bg-pink/10">
      <div className="flex justify-between">
        <p className="font-normal">{formatDate(_createdAt as string)}</p>
        <div className="flex gap-1.5">
          <MdOutlineRemoveRedEye className="text-pink" size={24} />
          <span className="font-semibold">{views ? views : 0}</span>
        </div>
      </div>
      <div className="flex justify-between my-2 md:my-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="font-semibold line-clamp-1 break-words">
              {author?.name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-lg md:text-2xl font-semibold line-clamp-1 break-words">
              {title}
            </h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image as string}
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="my-3 line-clamp-1 break-words">{description}</p>
        <img
          src={image}
          alt="Feed"
          className="rounded-xl w-full h-auto max-h-[200px] object-cover"
        />
      </Link>
      <div className="flex font-semibold justify-between gap-3 mt-5 items-center">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p>{category}</p>
        </Link>
        <Button className="text-white bg-black py-2 px-6 text-lg rounded-full hover:bg-pink transition ease-in-out">
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
