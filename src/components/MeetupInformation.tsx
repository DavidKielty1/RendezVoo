import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import { type Meetup } from "~/utils/types";

import { toast } from "react-toastify";
import MeetupDetailMap from "~/components/MeetupDetailMap";

type Props = {
  selectedMeetup: Meetup;
  userId: string;
};

export default function MeetupInformation({ selectedMeetup, userId }: Props) {
  const myLoader = ({ src }: { src: string; width: number }) => {
    return `${src}?w=${200}`;
  };

  const { data: sessionData } = useSession();
  const router = useRouter();
  const meetupId = selectedMeetup.id;

  const { mutate } = api.savedmeetup.create.useMutation({});
  const saveHandler = () => {
    mutate({
      userId,
      meetupId,
    });
  };

  const deleteMeetupHandler = api.meetup.delete.useMutation({});

  return (
    <section className="items-left card flex max-h-[1000px] justify-between border-gray-200 text-slate-500 shadow-xl md:max-h-[900px]">
      <div className="relative h-[200px] max-w-full overflow-hidden opacity-80 2xl:h-[300px]">
        <Image
          loader={myLoader}
          className="rounded-t-md"
          src={selectedMeetup.image}
          alt="selectedMeetup image"
          style={{ objectFit: "cover" }}
          fill
          priority
        />
      </div>
      <div className="flex flex-col gap-2 px-3 pt-3 text-center">
        <div className="flex w-full flex-col md:flex-row">
          <p className="mr-3 hidden w-full font-bold text-slate-600 md:text-right 2xl:inline 2xl:w-3/12">
            Title:
          </p>
          <p className="line-clamp-1 w-full 2xl:w-9/12 2xl:text-left ">
            {selectedMeetup.title}
          </p>
        </div>
        <div className="line-clamp-8 flex flex-col justify-between md:flex-row">
          <p className="mr-3 hidden w-full overflow-hidden truncate font-bold text-slate-600 md:text-right 2xl:inline 2xl:w-3/12">
            Description:
          </p>
          <p className="line-clamp-6 w-full overflow-hidden 2xl:w-9/12 2xl:text-left">
            {selectedMeetup.description}
          </p>
        </div>
        <div className="flex flex-col justify-between md:flex-row">
          <p className="mr-3 hidden w-full font-bold text-slate-600 md:text-right 2xl:inline 2xl:w-3/12">
            Location:
          </p>
          <p className="line-clamp-1 w-full 2xl:w-9/12 2xl:text-left ">
            {selectedMeetup.location}
          </p>
        </div>
        <div className="flex flex-col justify-between md:flex-row">
          <p className="mr-3 line-clamp-1 hidden w-full font-bold text-slate-600 md:text-right 2xl:inline 2xl:w-3/12">
            Time:
          </p>
          <p className="w-full 2xl:w-9/12 2xl:text-left">
            {selectedMeetup.time}
          </p>
        </div>
        <div className="mt-5">
          <MeetupDetailMap {...selectedMeetup} />
        </div>
        <div className="w-full py-2 text-end">
          <span className="italic">
            {`Posted at: ${selectedMeetup?.createdAt.toLocaleString()}`}
          </span>
        </div>
      </div>
      <div className="flex justify-center py-2">
        <button
          className="border-1 btn btn-xs mr-2 w-36 border-slate-500 bg-slate-400 px-8 py-2 text-justify capitalize text-white"
          onClick={() => {
            void router.push("/" + meetupId + "/edit");
          }}
          disabled={selectedMeetup.userId !== sessionData?.user.id}
        >
          Edit
        </button>
        {selectedMeetup.userId !== sessionData?.user.id && (
          <button
            className="border-1 btn btn-xs mr-2 w-36 border-slate-500 bg-slate-400 px-8 py-2 text-center capitalize text-white"
            onClick={() => {
              saveHandler();
              toast(`You're attending ${selectedMeetup.title}!`);
            }}
          >
            Save Meetup
          </button>
        )}
        {selectedMeetup.userId === sessionData?.user.id && (
          <button
            className="border-1 btn btn-xs mr-2 w-36 border-slate-500 bg-slate-400 px-8 py-2 text-center capitalize text-white"
            data-id={selectedMeetup.id}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              const button = event.target as HTMLButtonElement;
              const params = { id: button.dataset.id ?? "" };
              deleteMeetupHandler.mutate(params);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </section>
  );
}
