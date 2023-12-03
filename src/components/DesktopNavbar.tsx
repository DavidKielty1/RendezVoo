/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Transition } from "@headlessui/react";

export default function DesktopNavbar() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const isHomePage = router.pathname === "/" || router.pathname === "";
  const textColorClass = isHomePage ? "text-white" : "text-slate-600";
  const isMeetupsPage = router.pathname === "/Meetups";
  const isNewMeetupPage = router.pathname === "/NewMeetUp";

  function newMeetupHandler() {
    if (sessionData?.user.id) {
      void router.push("/NewMeetUp");
    } else {
      void signIn();
    }
  }

  const [showMenu, setShowMenu] = useState(false);
  let leaveTimeout: string | number | NodeJS.Timeout | undefined;

  const handleMouseEnter = () => {
    clearTimeout(leaveTimeout);
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    leaveTimeout = setTimeout(() => {
      setShowMenu(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      clearTimeout(leaveTimeout);
    };
  }, [leaveTimeout]);

  return (
    <>
      <div className="flex  w-6/12 flex-row gap-8 text-2xl font-bold">
        <div
          className={`${textColorClass} z-50 cursor-pointer hover:text-purple-400`}
          onClick={() => void router.push("/")}
        >
          RendezVoo
        </div>
        {!isHomePage && !isMeetupsPage && (
          <Link
            href="/Meetups"
            className="hidden cursor-pointer hover:text-purple-400 xl:flex"
          >
            Meetups
          </Link>
        )}
        {!isHomePage && !isNewMeetupPage && (
          <div
            className="hidden cursor-pointer hover:text-purple-400 xl:flex"
            onClick={newMeetupHandler}
          >
            New Meetup
          </div>
        )}
      </div>
      <div
        className="hidden w-6/12 items-center justify-end xl:flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {sessionData && (
          <span
            className={`z-50 cursor-pointer text-right text-2xl font-bold  hover:text-purple-400 ${textColorClass} `}
          >
            {sessionData?.user.name}
          </span>
        )}
        <div className="z-50 flex-none gap-2 ">
          {sessionData?.user ? (
            <label className="avatar btn btn-circle btn-ghost">
              <div className="w-10 rounded-full">
                <img
                  className="rounded-full "
                  src={sessionData?.user?.image ?? ""}
                  alt={sessionData?.user?.name ?? ""}
                />
              </div>
            </label>
          ) : (
            <button
              className={`${textColorClass} btn btn-ghost rounded-btn text-2xl capitalize hover:text-purple-400`}
              onClick={() => void signIn()}
            >
              Sign In
            </button>
          )}

          {/* Profile menu */}
          {/* Profile menu */}
          {/* Profile menu */}

          {sessionData?.user && (
            <Transition
              show={showMenu}
              enter="transition duration-300 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-200 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <div className="relative flex w-full items-center justify-center">
                <div
                  className={`text-bold absolute  top-2 z-50 ${
                    showMenu ? "" : "hidden"
                  } w-32 flex-col rounded-md bg-slate-300 bg-slate-300/30 bg-opacity-95 text-center text-lg font-bold ${textColorClass} backdrop-blur-sm`}
                >
                  <Link
                    href={`/Profile/@${sessionData.user.name!}`}
                    className="block w-full rounded-md py-1 hover:bg-slate-900/60 hover:text-white"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={async () => {
                      await router.push("/");
                      void signOut();
                    }}
                    className="block w-full rounded-md py-1 hover:bg-slate-900/60 hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </Transition>
          )}
        </div>
      </div>
    </>
  );
}
