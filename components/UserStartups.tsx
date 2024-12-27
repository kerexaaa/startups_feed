import { client } from "@/sanity/lib/client";
import { USER_STARTUPS_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupCardType } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(USER_STARTUPS_QUERY, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard key={startup._id} post={startup}></StartupCard>
        ))
      ) : (
        <p className="">Lazy! This user doesn't have any startups yet.</p>
      )}
    </>
  );
};

export default UserStartups;
