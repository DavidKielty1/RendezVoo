import Image from "next/image";
import { Transition } from "@headlessui/react";

import Link from "next/link";
import { useRouter } from "next/router";
import { type Meetup } from "~/utils/types";
import { useCallback, useEffect, useState } from "react";

type Props = {
  meetups: Meetup[];
  onPageChange: (currentPage: number) => void;
};

export const MeetupsList = ({ meetups, onPageChange }: Props) => {
  const myLoader = ({ src }: { src: string; width: number }) => {
    return `${src}?w=${200}`;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageIncrement = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  const handlePageDecrement = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  const router = useRouter();

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const handleLiClick = useCallback(
    (meetupId: string) => {
      if (isLargeScreen) {
        void router.push(`/${meetupId}`);
      }
    },
    [isLargeScreen],
  );

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsLargeScreen(window.innerWidth > 1024); // xl breakpoint
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

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
            <li
              className="hover:shadow-glow  rounded-xl transition duration-300 ease-in-out xl:hover:cursor-pointer"
              key={meetup?.id}
              onClick={() => handleLiClick(meetup.id)}
            >
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
                          <Link
                            className="line-clamp-1 hover:text-purple-400"
                            href={`/${meetup.id}`}
                          >
                            {meetup?.title}
                          </Link>
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
                        <Link
                          className="btn btn-sm border-0 bg-green-200 capitalize text-slate-600 hover:bg-green-300"
                          href={`/${meetup.id}`}
                        >
                          Details
                        </Link>
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
              onClick={handlePageDecrement}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              className="hover:cursor-pointer hover:text-slate-300"
              disabled={!meetups}
              onClick={handlePageIncrement}
            >
              Next
            </button>
          </div>
        </Transition>
      </div>
    </>
  );
};
