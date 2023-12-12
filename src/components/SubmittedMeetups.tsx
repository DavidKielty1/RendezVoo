import { api } from "../utils/api";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
// import { DummyData } from "./DummyData";
import { type Meetup, type User } from "~/utils/types";
import { Transition } from "@headlessui/react";

type Props = {
  user: User;
};

export const SubmittedMeetups = ({ user }: Props) => {
  const myLoader = ({ src }: { src: string; width: number }) => {
    return `${src}?w=${200}`;
  };

  const userId = user.id;
  const router = useRouter();
  const { data: sessionData } = useSession();

  const [currentPage, setCurrentPage] = useState(1);
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const { data: fetchedMeetups, refetch: refetchMeetups } =
    api.meetup.getAllFromUser.useQuery<Meetup[]>(
      { id: userId, page: currentPage },
      {
        onSuccess: (data) => {
          setMeetups(data ?? fetchedMeetups);
        },
      },
    );

  const deleteMeetupHandler = api.meetup.delete.useMutation({
    onSuccess: () => {
      void refetchMeetups();
    },
  });

  return (
    <section>
      {meetups.length ? (
        <ul className="mb-10 flex w-full flex-col gap-10">
          {meetups?.map((meetup: Meetup) => (
            <li key={meetup.id} title={meetup.title}>
              <section className="card border border-slate-200 shadow-xl">
                <article className="flex flex-col justify-center lg:flex-row">
                  <div className="relative h-[249px] overflow-hidden rounded-tl-md rounded-tr-md opacity-80 lg:w-5/12 lg:rounded-bl-md lg:rounded-tr-none xl:w-4/12">
                    <Image
                      loader={myLoader}
                      src={meetup.image}
                      alt="Picture of the author"
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 400px)"
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-between lg:w-7/12 xl:w-8/12 ">
                    <section className="flex flex-col lg:h-[208px]">
                      <div className="flex justify-center">
                        <p className="text-md line-clamp-1 w-full overflow-clip bg-slate-100 py-1 text-center font-sans font-bold capitalize text-slate-600 lg:rounded-t-md lg:rounded-tl-none lg:py-3 lg:text-xl">
                          <span className="line-clamp-1 ">{meetup?.title}</span>
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

                    <div className="mb-2 flex justify-center gap-2">
                      <button
                        className="btn btn-sm border-0 bg-green-200 capitalize text-slate-600 hover:bg-green-300"
                        onClick={() => {
                          void router.push("/" + meetup.id);
                        }}
                      >
                        Details
                      </button>
                      {meetup.userId === sessionData?.user.id && (
                        <button
                          className="btn btn-sm border-0 bg-red-200 capitalize text-slate-600 hover:bg-red-300"
                          data-id={meetup.id}
                          onClick={(
                            event: React.MouseEvent<HTMLButtonElement>,
                          ) => {
                            const button = event.target as HTMLButtonElement;
                            const params = { id: button.dataset.id ?? "" };
                            deleteMeetupHandler.mutate(params);
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </section>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-10 text-center text-lg">
          View submitted meetups here!
        </div>
      )}
      <div className="tranform 1 m-auto w-60 pb-8 transition-opacity ease-in">
        <Transition
          appear={true}
          show={true}
          enter="transition-opacity duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <div className="flex justify-between font-bold text-slate-600">
            <button
              className="hover:cursor-pointer hover:text-slate-300"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              className="hover:cursor-pointer hover:text-slate-300"
              disabled={!meetups}
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
              }}
            >
              Next
            </button>
          </div>
        </Transition>
      </div>
    </section>
  );
};
