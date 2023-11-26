import type { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <section className="bg-gradient-to-r from-slate-100/50 to-white bg-scroll">
      <Navbar />
      <main
        className="flex justify-center px-5 pt-7 sm:px-6"
      >
        <div className="fixed -left-[250px] top-1/2 hidden -translate-y-20 -rotate-90 transform text-8xl font-bold 2xl:flex">
          <span className="animate-gradient-x bg-gradient-to-r from-fuchsia-400  to-cyan-400 bg-clip-text text-transparent opacity-40">
            IN DEVELOPMENT
          </span>
        </div>
        <div className="w-full max-w-4xl flex-col items-center">
          {props.children}
        </div>
      </main>
    </section>
  );
};
