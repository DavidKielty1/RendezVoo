import Image from "next/image";
import { type User } from "~/utils/types";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

interface Props {
  user: User;
}

export default function ProfileOveriew({ user }: Props) {
  const createdAt = user.createdAt.toLocaleDateString();

  return (
    <section>
      <div className="z-1 relative mb-1 h-[100px] rounded-t-xl bg-slate-600 lg:h-[200px]">
        <div className="lg:text-md absolute right-4 top-4 flex flex-row gap-1 text-lg text-white">
          <h3 className="self-center">Add to contacts</h3>
          <PlusCircleIcon className="w-6 lg:w-7" />
        </div>
        <div className="z-2 absolute left-10 top-1/2 aspect-square h-[100px] overflow-auto rounded-full border-4 border-slate-50 bg-slate-50 lg:h-[200px]">
          <Image
            className="rounded-full"
            src={user.image ?? ""}
            alt={user.name ?? ""}
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="z-1 flex h-[200px] flex-col rounded-b-xl bg-slate-200 shadow-md lg:h-[300px]">
        <div className="line-clamp-6  flex flex-col gap-1 overflow-clip px-6 pt-12 lg:pt-24">
          <h2 className=" left-10 top-14 text-xl text-darktext lg:top-28 lg:text-4xl">
            {user.name}
          </h2>
          <p className="text-base lg:text-lg">{user.description}</p>
          <p className="text-xs lg:text-base">{user.location}</p>
          <p className="text-xs lg:text-base">Account created {createdAt}</p>
        </div>
      </div>
    </section>
  );
}
