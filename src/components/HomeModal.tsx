/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import React from "react";
import Image from "next/image";
import ModalImage from "../../public/images/ModalImage.jpg";

export default function HomeModal() {
  return (
    <div className="fixed left-0 top-0 z-40 h-full w-full bg-zinc-950">
      <div className="align-center absolute flex h-full place-items-center justify-center">
        <div className="absolute left-0 top-0 z-0 h-full w-full bg-cover">
          {ModalImage && (
            <Image
              className="z-0 opacity-20"
              alt="RendezVou"
              fill
              style={{ objectFit: "cover" }}
              src={ModalImage}
              priority
            ></Image>
          )}
        </div>
        <div className="relative top-[-60px] z-50 flex w-screen flex-col gap-8 text-center text-white">
          <h1 className="text-6xl xl:text-8xl">RendezVue</h1>
          <h2 className="text-2xl xl:text-4xl">
            Connect, Meet, Discover: Making Tomorrow&apos;s Best Moments
          </h2>
          <Link
            href="/Meetups"
            className="transform self-center rounded-md bg-white px-6 py-1 text-xl text-black transition duration-100 hover:bg-purple-200 xl:px-8 xl:text-2xl"
          >
            View Meetups
          </Link>
        </div>
      </div>
    </div>
  );
}
