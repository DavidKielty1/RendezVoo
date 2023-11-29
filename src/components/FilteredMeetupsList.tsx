import { Transition } from "@headlessui/react";
import router from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import { type Meetup } from "~/utils/types";
import Image from "next/image";

type Props = {
  searchInput: string;
};

export default function FilteredMeetupsList({ searchInput }: Props) {
  const myLoader = ({ src }: { src: string; width: number }) => {
    return `${src}?w=${200}`;
  };

  const [currentPage, setCurrentPage] = useState(1);

  const [filteredMeetups, setFilteredMeetups] = useState<Meetup[]>();
  const { data: filteredData } = api.meetup.searchFilter.useQuery<Meetup[]>(
    { searchInput },
    {
      onSuccess: (data: Meetup[]) => {
        setFilteredMeetups(data ?? filteredData);
      },
    },
  );

  function showDetailsHandler(meetup: Meetup) {
    if (filteredMeetups) {
      void router.push(`/${meetup.id}`);
    }
  }

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
      {filteredMeetups ? (
        <ul className="mb-10 flex w-full flex-col gap-10">
          {filteredMeetups?.map((filteredMeetup) => (
            <li key={filteredMeetup?.id}>
              <section className="card border border-slate-200 shadow-2xl">
                <article className="flex flex-col justify-center lg:flex-row">
                  <div className="relative h-[249px] overflow-hidden rounded-tl-xl rounded-tr-xl opacity-80 lg:w-5/12 lg:rounded-bl-xl lg:rounded-tr-none xl:w-4/12">
                    {filteredMeetup && (
                      <Image
                        loader={myLoader}
                        src={filteredMeetup.image}
                        alt="filteredMeetup Image"
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
                          <span className="line-clamp-1 ">
                            {filteredMeetup?.title}
                          </span>
                        </p>
                      </div>
                      <div className="mx-2 flex max-w-full flex-col justify-between gap-1">
                        <div className="flex w-full flex-col text-center lg:flex-row">
                          <p className="text-bottom text-md line-clamp-6 w-full text-slate-500 lg:mx-3 lg:line-clamp-3 lg:text-left lg:text-lg ">
                            {filteredMeetup?.description}
                          </p>
                        </div>
                        <div className="flex w-full flex-col text-center ">
                          <p className="text-md line-clamp-1 w-full text-slate-500 lg:mx-3 lg:text-left lg:text-lg">
                            {filteredMeetup?.location}
                          </p>
                        </div>
                        <div className="flex w-full flex-col text-center ">
                          <p className="text-md w-full text-slate-500 sm:mt-0 lg:mx-3 lg:text-left lg:text-lg">
                            {filteredMeetup?.time}
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
                            showDetailsHandler(filteredMeetup);
                          }}
                        >
                          Details
                        </button>
                      </div>
                      <div className="w-full text-end">
                        <span className="absolute bottom-0.5 right-2 text-xs">
                          Post created:{" "}
                          {filteredMeetup?.createdAt.toLocaleString()}
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
          View your submitted filteredMeetups here!
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
              disabled={!filteredMeetups}
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
}
