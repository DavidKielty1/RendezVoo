/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { Tab } from "@headlessui/react";

import { SubmittedMeetups } from "~/components/SubmittedMeetups";
import SavedMeetupsList from "~/components/SavedMeetupsList";
import ProfileContacts from "~/components/ProfileContacts";
import ProfileCommentsList from "~/components/ProfileCommentsList";

import { type User } from "~/utils/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Category {
  id: number;
  title: string;
}

interface Props {
  user: User;
}

export default function ProfileTabs({ user }: Props) {
  const [categories] = useState<Category[]>([
    {
      id: 1,
      title: "Submitted Meetups",
    },
    {
      id: 2,
      title: "Saved Meetups",
    },
    {
      id: 3,
      title: "Comments",
    },
    {
      id: 4,
      title: "Contacts",
    },
  ]);

  return (
    <section className="mb-10 flex h-[500px] w-full flex-col gap-8 text-darktext">
      <Tab.Group>
        <Tab.List className="px-4 flex flex-col justify-evenly gap-2 rounded-lg bg-slate-100/70 text-base shadow-xl lg:flex-row lg:text-lg">
          {categories.map((category) => (
            <Tab
              key={category.id}
              className={({ selected }) =>
                classNames(
                  "w-2/3 self-center rounded-lg hover:bg-slate-200/60 hover:text-purple-400 lg:my-4 lg:w-full lg:p-4",
                  selected
                    ? "bg-darktext text-white"
                    : "border-darktext  text-darktext"
                )
              }
            >
              {category.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>{user && <SubmittedMeetups user={user} />}</Tab.Panel>
          <Tab.Panel>{user && <SavedMeetupsList user={user} />}</Tab.Panel>
          <Tab.Panel>
            <ProfileCommentsList />
          </Tab.Panel>
          <Tab.Panel>
            <ProfileContacts />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}