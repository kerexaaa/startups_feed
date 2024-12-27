import Hero from "@/components/Hero";
import { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

export const experimental_ppr = true;
const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post: StartupCardType = await client.fetch(STARTUPS_BY_ID_QUERY, {
    id,
  });

  const parsedContent = md.render(post?.pitch || "");

  if (!post)
    return (
      <>
        <Hero primaryHeader="Startup doesn't exist"></Hero>
      </>
    );

  return (
    <>
      <div className="flex flex-col items-center bg-hero-default bg-pink justify-center gap-8 py-8 px-5 md:py-16 md:px-10">
        <Hero
          topHeader={formatDate(post._createdAt)}
          primaryHeader={post.title}
          bottomHeader={post.description}
        />
      </div>
      <div className="px-10 py-12">
        <img
          src={post.image}
          className="w-full mx-auto h-auto rounded-xl object-cover max-w-6xl"
        />
        <div className="space-y-5 mt-10 max-w-5xl mx-auto">
          <div className="flex justify-between items-center gap-5">
            <Link
              className="flex gap-2 items-center mb-3"
              href={`/user/${post.author?._id}`}
            >
              <Image
                src={post.author?.image as string}
                alt="profile picture"
                width={64}
                height={64}
                className="aspect-square object-cover rounded-full drop-shadow-lg"
              ></Image>
              <div>
                <p className="text-xl">{post.author?.name}</p>
                <p className="text-gray-600">@{post.author?.username}</p>
              </div>
            </Link>

            <p className="py-2 px-4 bg-pink/10 font-bold rounded-full">
              {post.category}
            </p>
          </div>

          <h3 className="text-3xl font-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl font-worksans break-all"
            />
          ) : (
            <p className="">No details provided</p>
          )}
        </div>

        <hr />

        <Suspense fallback={<Skeleton />}>
          <View id={post._id} />
        </Suspense>
      </div>
      {/* maybe add recomended startups on slug == slug */}
    </>
  );
};

export default Page;
