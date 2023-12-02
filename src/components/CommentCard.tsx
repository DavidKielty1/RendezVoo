import Link from "next/link";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";

import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import styles from "./../styles/sparklyGradient.module.css";

import { type CommentWithUserInfo } from "~/utils/types";

export const CommentCard = ({
  meetupComment,
  refetchComments,
  userId,
}: {
  meetupComment: CommentWithUserInfo;
  refetchComments: () => void;
  userId: string | undefined;
}) => {
  const deleteComment = api.comment.delete.useMutation({
    onSuccess: () => {
      void refetchComments();
    },
  });

  // useEffect(() => {
  //   console.log("MeetupComment", meetupComment);
  // }, [meetupComment]);
  // let parentId;
  // if (meetupComment.parentId) {
  //   const parentId = meetupComment.parentId as string;
  //   return parentId;
  // } else {
  //   parentId = "defaultId";
  // }

  const { data: replies, isLoading: isLoadingReplies } =
    api.reply.getAllReplies.useQuery({
      parentId: meetupComment.id,
    });

  console.log("replies", replies);

  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={`${styles.myUniqueGradient} card border border-gray-200 bg-base-100 shadow-xl`}
        >
          <div className="card-body ml-2 flex w-full py-2 text-center">
            <Disclosure.Button className=" flex flex-col">
              <div className="flex max-h-[30px] w-full flex-row">
                <Link
                  href={`/Profile/@${meetupComment.user.name}`}
                  className="b-0 collapse-title max-h-[30px] p-0 text-xl font-bold hover:text-purple-400"
                >
                  {meetupComment.title}
                </Link>
                {replies && replies?.length > 0 && (
                  <ChevronRightIcon
                    className={`ml-0.5 mt-1 w-6 scale-125 ${
                      open ? "rotate-90 transform" : ""
                    }`}
                  />
                )}
              </div>
              <article className="lg:prose-md prose pl-4">
                <ReactMarkdown>{meetupComment.content}</ReactMarkdown>
              </article>
            </Disclosure.Button>
            {replies &&
              replies?.length > 0 &&
              replies.map((reply) => (
                <>
                  <Disclosure.Panel className="text-center">
                    <div className="mx-auto my-2 h-1 w-40 items-center self-center border-2 border-slate-300/10"></div>
                    <div className="flex flex-col gap-2"></div>
                    <Link
                      href={`/Profile/@${reply.user.name}`}
                      className="collapse-title p-0 text-xl font-bold hover:text-purple-400"
                    >
                      {meetupComment.title}
                    </Link>
                    <ReactMarkdown>{reply.content}</ReactMarkdown>
                  </Disclosure.Panel>
                </>
              ))}
            <div className="mx-2 flex justify-end">
              {userId === meetupComment.userId && (
                <button
                  className="btn btn-xs mb-2 mr-2 mt-1 w-20 bg-slate-400 px-8 capitalize text-white"
                  onClick={() => {
                    toast(`Comment deleted!`);
                    void deleteComment.mutate({ id: meetupComment.id });
                  }}
                >
                  Delete
                </button>
              )}
            </div>
            {/*How would I show ${liked.user.id} */}
          </div>
        </div>
      )}
    </Disclosure>
  );
};
