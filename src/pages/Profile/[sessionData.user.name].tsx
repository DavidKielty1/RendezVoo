/* eslint-disable @typescript-eslint/no-unsafe-assignment */ import Head from "next/head";
import ProfileOverview from "~/components/ProfileOverview";
import ProfileTabs from "~/components/ProfileTabs";
import { useState } from "react";
import { useRouter } from "next/router";
import { type User } from "~/utils/types";
import { api } from "~/utils/api";

const Profile = () => {
  const router = useRouter();
  const userNameWithAt = router.query["sessionData.user.name"];
  let userName: string;
  if (typeof userNameWithAt === "string") {
    userName = userNameWithAt.slice(1);
  } else {
    userName = "defaultUserName";
  }

  const [user, setUser] = useState<User>();
  const { data: fetchedUser } = api.user.getUserFromName.useQuery(
    { name: userName },
    {
      onSuccess: (data: User) => {
        setUser(data ?? fetchedUser);
      },
    },
  );

  return (
    <>
      <Head>
        <title>David Kielty Profile</title>
        <meta name="description" />
        <link rel="icon" href="..//favicon.ico" />
      </Head>
      <article className="flex flex-col gap-8">
        {user && <ProfileOverview user={user} />}
        {user && <ProfileTabs user={user} />}
      </article>
    </>
  );
};

export default Profile;
