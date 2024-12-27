import { auth } from "@/auth";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export const options = { next: { revalidate: 30 } };

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; error?: string }>;
}) => {
  const error = (await searchParams).error;
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  const session = await auth();

  if (session) {
    console.log(session?.id);
  }

  return (
    <>
      <div className="flex flex-col items-center bg-hero-default bg-pink justify-center gap-8 py-8 px-5 md:py-16 md:px-10">
        <Hero
          error={error}
          topHeader="pitch your startup"
          primaryHeader="Pitch Your Startup, 
Connect with Entrepreneurs"
          bottomHeader="Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions"
        />
        <SearchForm query={query} />
      </div>
      <div className="mx-5 my-6 md:mx-10 md:my-12">
        <p className="mt-7 font-semibold text-3xl">
          {query ? `Search results for "${query}"` : "All startups"}
        </p>
        <ul className="mt-7 grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-3">
          {posts.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="">No startups found</p>
          )}
        </ul>
      </div>
      <SanityLive />
    </>
  );
};

export default Home;
