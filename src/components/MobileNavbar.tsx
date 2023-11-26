import React, { useState, useRef, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Transition } from "@headlessui/react";

export default function MobileNavbar() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  async function signOutHandler() {
    await router.push("/");
    void signOut();
  }

  function newMeetupHandler() {
    if (sessionData?.user.id) {
      closeMobileMenu();
      void router.push("/NewMeetUp");
    } else {
      void signIn();
    }
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        closeMobileMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef]);

  const isHomePage = router.pathname === "/" || router.pathname === "";
  const textColorClass = isHomePage ? "text-white" : "text-slate-600";
  const strokeColorClass = isHomePage ? "white" : "black";

  return (
    <div className="align-end z-50 flex w-6/12 items-end justify-end xl:hidden">
      <div ref={mobileMenuRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${textColorClass} h-8 w-8 cursor-pointer`}
          onClick={toggleMobileMenu}
          fill="none"
          viewBox="0 0 24 24"
          stroke={`${strokeColorClass}`}
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <div className="flex w-full items-center justify-center group-active:visible">
          <div
            className={`text-bold absolute left-0 top-0 ${
              isMobileMenuOpen ? "" : "hidden"
            } w-screen flex-col bg-slate-300/30 bg-opacity-95 text-center text-2xl font-bold ${textColorClass} backdrop-blur-md`}
          >
            <Transition
              show={isMobileMenuOpen}
              enter="transition duration-500 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-500 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <div
                className={`block w-full bg-slate-600 py-6 font-serif text-4xl font-normal text-white`}
              >
                RendezVoo
              </div>
              {sessionData && (
                <Link
                  href={`/Profile/@${sessionData?.user.name as string}`}
                  className={`block w-full py-6 hover:bg-slate-400/40`}
                  onClick={closeMobileMenu}
                >
                  {sessionData?.user.name}
                </Link>
              )}
              <Link
                href="/Meetups"
                className={`block w-full py-6 hover:bg-slate-400/40`}
                onClick={closeMobileMenu}
              >
                Meetups
              </Link>
              <div
                onClick={newMeetupHandler}
                className={`block w-full py-6 hover:bg-slate-400/40`}
              >
                New Meetup
              </div>
              {sessionData ? (
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    void signOutHandler();
                  }}
                  className={`block w-full py-6 hover:bg-slate-400/40`}
                >
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    void signIn();
                  }}
                  className={`block w-full py-6 hover:bg-slate-400/40`}
                >
                  Sign In
                </button>
              )}
            </Transition>
          </div>
        </div>
      </div>
    </div>
  );
}
