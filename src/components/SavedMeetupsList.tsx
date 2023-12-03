import React, { useState } from "react";
import { type Meetup } from "~/utils/types";
import { api } from "../utils/api";
import { useSession } from "next-auth/react";
import { type User } from "~/utils/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  user: User;
};
export default function SavedMeetupsList({ user }: Props) {
  const myLoader = ({ src }: { src: string; width: number }) => {
    return `${src}?w=${200}`;
  };

  const { data: sessionData } = useSession();

  const userId = user.id;

  const [savedMeetups, setSavedMeetups] = useState<Meetup[]>([]);
  api.savedmeetup.getAllSavedMeetups.useQuery<Meetup[]>(
    { userId },
    {
      enabled: sessionData?.user !== null,
      onSuccess: (data) => {
        setSavedMeetups(data);
      },
    },
  );

  return (
    <>
      {savedMeetups.length ? (
        <div className="flex flex-col gap-8 pb-8">
          {savedMeetups.map((meetup) => (
            <li key={meetup.id} title={meetup.title} className="list-none">
              <section className="card border border-slate-200 shadow-xl">
                <article className="flex flex-col justify-center lg:flex-row">
                  <div className="relative h-[249px] overflow-hidden rounded-tl-md rounded-tr-md opacity-80 lg:w-5/12 lg:rounded-bl-md lg:rounded-tr-none xl:w-4/12">
                    <Image
                      loader={myLoader}
                      src={meetup.image}
                      alt="Picture of the author"
                      style={{ objectFit: "cover" }}
                      fill
                      sizes="(max-width: 400px)"
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-between lg:w-7/12 xl:w-8/12 ">
                    <section className="flex flex-col lg:h-[208px]">
                      <div className="flex justify-center">
                        <p className="text-md line-clamp-1 w-full overflow-clip bg-slate-100 py-1 text-center font-sans font-bold capitalize text-slate-600 lg:rounded-t-md lg:rounded-tl-none lg:py-3 lg:text-xl">
                          <Link href={`/${meetup.id}`}>
                            <span className="line-clamp-1 hover:text-purple-400">
                              {meetup?.title}
                            </span>
                          </Link>
                        </p>
                      </div>
                      <div className="mx-2 flex max-w-full flex-col justify-between py-3">
                        <div className="flex w-full flex-col text-center lg:flex-row">
                          <p className="text-bottom text-md line-clamp-6 w-full text-slate-500 lg:mx-3 lg:line-clamp-3 lg:text-left lg:text-lg ">
                            {meetup.description}
                          </p>
                        </div>
                        <div className="mt-2 flex w-full flex-col text-center sm:flex-row ">
                          <p className="text-md line-clamp-1 w-full text-slate-500 lg:mx-3 lg:text-left  lg:text-lg">
                            {meetup.location}
                          </p>
                        </div>
                        <div className="mt-2 flex w-full flex-col text-center sm:flex-row ">
                          <p className="text-md mt-2 w-full text-slate-500 sm:mt-0 lg:mx-3 lg:text-left  lg:text-lg">
                            {meetup.time}
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                </article>
              </section>
            </li>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-lg">
          View your saved meetups here!
        </div>
      )}
    </>
  );
}
