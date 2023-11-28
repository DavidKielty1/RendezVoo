import { useState } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import Image from "next/image";
import { Transition } from "@headlessui/react";

import { type Meetup } from "~/utils/types";

export const MeetupsList = () => {
  const myLoader = ({ src }: { src: string; width: number }) => {
    return `${src}?w=${200}`;
  };

  const router = useRouter();

  const [meetups, setMeetups] = useState<Meetup[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const { data: fetchedMeetups } = api.meetup.getAll.useQuery(
    { page: currentPage },
    {
      onSuccess: (data: Meetup[]) => {
        setMeetups(data ?? fetchedMeetups);
      },
    },
  );

  return (
    <>
      <Transition
        appear={true}
        show={true}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <div id="cluster-map"></div>
      </Transition>
      {meetups ? (
        <ul className="mb-10 flex w-full flex-col gap-10">
          {meetups?.map((meetup) => (
            <li key={meetup?.id}>
              <section className="card border border-slate-200 shadow-2xl">
                <article className="flex flex-col justify-center lg:flex-row">
                  <div className="relative h-[249px] overflow-hidden rounded-tl-xl rounded-tr-xl opacity-80 lg:w-5/12 lg:rounded-bl-xl lg:rounded-tr-none xl:w-4/12">
                    {meetup && (
                      <Image
                        loader={myLoader}
                        src={meetup.image}
                        alt="Meetup Image"
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 400px)"
                        priority
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between rounded-xl rounded-bl-none bg-white lg:w-7/12 xl:w-8/12 ">
                    <section className="flex flex-col xl:h-[208px]">
                      <div className="flex justify-center ">
                        <p className="w-full overflow-clip bg-slate-100/50 py-2 pl-4 text-left font-sans text-lg font-bold capitalize text-darktext lg:rounded-t-xl lg:rounded-tl-none lg:py-3 lg:text-xl">
                          <span className="line-clamp-1 ">{meetup?.title}</span>
                        </p>
                      </div>
                      <div className="mx-2 flex max-w-full flex-col justify-between gap-1">
                        <div className="flex w-full flex-col text-center lg:flex-row">
                          <p className="text-bottom text-md line-clamp-6 w-full text-slate-500 lg:mx-3 lg:line-clamp-3 lg:text-left lg:text-lg ">
                            {meetup?.description}
                          </p>
                        </div>
                        <div className="flex w-full flex-col text-center ">
                          <p className="text-md line-clamp-1 w-full text-slate-500 lg:mx-3 lg:text-left lg:text-lg">
                            {meetup?.location}
                          </p>
                        </div>
                        <div className="flex w-full flex-col text-center ">
                          <p className="text-md w-full text-slate-500 sm:mt-0 lg:mx-3 lg:text-left lg:text-lg">
                            {meetup?.time}
                          </p>
                        </div>
                      </div>
                    </section>

                    <div className="mb-2 flex flex-col py-4 lg:py-0">
                      <div className="flex gap-2 self-center xl:self-start xl:pl-4">
                        <button
                          className="btn btn-sm border-0 bg-green-200 capitalize text-slate-600 hover:bg-green-300"
                          onClick={(evt) => {
                            evt.preventDefault();
                            void router.push(`/${meetup.id}`);
                          }}
                        >
                          Details
                        </button>
                      </div>
                      <div className="w-full text-end">
                        <span className="absolute bottom-0.5 right-2 text-xs">
                          Post created: {meetup?.createdAt.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </section>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-screen py-10 text-center text-lg">
          View your submitted meetups here!
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
    </>
  );
};
