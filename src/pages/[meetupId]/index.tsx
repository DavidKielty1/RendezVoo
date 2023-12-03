import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { type Meetup } from "~/utils/types";

import CommentsSection from "~/components/CommentsSection";
import MeetupInformation from "~/components/MeetupInformation";

function MeetupDetails() {
  const router = useRouter();

  const { data: sessionData } = useSession();

  const meetupIdQuery = router.query.meetupId as string;
  let meetupId: string;
  if (typeof meetupIdQuery === "string") {
    meetupId = meetupIdQuery;
  } else {
    meetupId = "defaultId";
  }

  const userIdOrUndefined = sessionData?.user?.id;
  let userId: string;
  if (typeof userIdOrUndefined === "string") {
    userId = userIdOrUndefined;
  } else {
    userId = "defautId";
  }

  const userNameOrUndefined = sessionData?.user?.name;
  let userName: string;
  if (typeof userNameOrUndefined === "string") {
    userName = userNameOrUndefined;
  } else {
    userName = "defautId";
  }

  const [selectedMeetup, setSelectedMeetup] = useState<Meetup>();
  api.meetup.getOne.useQuery(
    { meetupId },
    {
      onSuccess: (data: Meetup) => {
        setSelectedMeetup(data);
      },
    },
  );

  return (
    <>
      <Head>
        <title>David Kielty Meetup Detail</title>
        <meta name="description" content="" />
        <link rel="icon" href="..//favicon.ico" />
      </Head>
      {selectedMeetup ? (
        <div className="grid gap-8 pb-10 md:grid-cols-2">
          <MeetupInformation selectedMeetup={selectedMeetup} userId={userId} />
          <CommentsSection meetupId={meetupId} userId={userId}  userName={userName}/>
        </div>
      ) : (
        <div className="h-screen pt-72 text-center text-2xl font-bold text-darktext">
          Loading Meetup Details
        </div>
      )}
    </>
  );
}

export default MeetupDetails;
