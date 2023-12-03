import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "~/utils/api";

import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { Disclosure } from "@headlessui/react";
import {
  ChevronRightIcon,
  PlusIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import styles from "./../styles/sparklyGradient.module.css";

import { type CommentWithUserInfo } from "~/utils/types";

export const CommentCard = ({
  meetupComment,
  refetchComments,
  userId,
  userName,
}: {
  meetupComment: CommentWithUserInfo;
  refetchComments: () => void;
  userId: string;
  userName: string;
}) => {
  const [isReplySectionVisible, setIsReplySectionVisible] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const meetupCommentId = meetupComment.id;
  const meetupId = meetupComment.meetupId;

  const toggleReplySection = () => {
    setIsReplySectionVisible(!isReplySectionVisible);
  };

  const deleteComment = api.comment.delete.useMutation({
    onSuccess: () => {
      void refetchComments();
    },
  });

  const { data: replies } = api.reply.getAllReplies.useQuery({
    parentId: meetupComment.id,
  });

  useEffect(() => {
    console.log(replyContent);
  }, [replyContent]);

  const createReply = api.reply.create.useMutation({
    onSuccess: () => {
      void refetchComments();
    },
  });

  const createHandler = () => {
    createReply.mutate({
      userId,
      author: userName,
      meetupId,
      parentId: meetupCommentId,
      content: replyContent,
    });
    setReplyContent("");
  };

  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={`${styles.myUniqueGradient} card border border-gray-200 bg-base-100 shadow-xl`}
        >
          <div className="card-body ml-2 flex w-full py-2 text-center">
            <Disclosure.Button className=" flex flex-col">
              <div className="relative flex max-h-[30px] w-full flex-row ">
                <Link
                  href={`/Profile/@${meetupComment.user.name}`}
                  className="b-0 collapse-title max-h-[30px] p-0 text-xl font-bold hover:text-purple-400"
                >
                  {meetupComment.author}
                </Link>
                <div className="absolute -right-5 top-0 flex h-full scale-75 flex-row">
                  {meetupComment.userId === userId && (
                    <PencilIcon className="scale-75" />
                  )}
                  {userId === meetupComment.userId && (
                    <XMarkIcon
                      onClick={() => {
                        toast(`Comment deleted!`);
                        void deleteComment.mutate({ id: meetupComment.id });
                      }}
                    >
                      Delete
                    </XMarkIcon>
                  )}
                  <PlusIcon
                    className="scale-100"
                    onClick={toggleReplySection}
                  />
                  {replies && replies?.length > 0 && (
                    <ChevronRightIcon
                      className={`mt-0.5 w-6 scale-125 ${
                        open ? "rotate-90 transform" : ""
                      }`}
                    />
                  )}
                </div>
              </div>
              <article className="lg:prose-md prose w-full pl-4">
                <ReactMarkdown>{meetupComment.content}</ReactMarkdown>
              </article>
            </Disclosure.Button>
            {replies &&
              replies?.length > 0 &&
              open &&
              replies.map((reply, idx) => (
                <div key={idx}>
                  <Disclosure.Panel className="text-center">
                    <div className="mx-auto my-2 h-1 w-40 items-center self-center border-2 border-slate-300/10"></div>
                    <div className="flex flex-col gap-2"></div>
                    <Link
                      href={`/Profile/@${reply.user.name}`}
                      className="collapse-title p-0 text-xl font-bold hover:text-purple-400"
                    >
                      {reply.author}
                    </Link>
                    <ReactMarkdown>{reply.content}</ReactMarkdown>
                  </Disclosure.Panel>
                </div>
              ))}
            <div
              id="replyCommentSection"
              className={`${
                isReplySectionVisible ? "flex" : "hidden"
              } flex-col gap-1`}
            >
              <label htmlFor="replyComment font-bold text-3xl">Reply:</label>
              <div className="t flex w-full  flex-row self-center">
                <textarea
                  name="replyComment"
                  id="replyComment"
                  value={replyContent}
                  onChange={(e) => {
                    setReplyContent(e.currentTarget.value);
                  }}
                  className="w-full rounded-lg border-2 border-slate-300/60"
                />
                <CheckIcon
                  className="w-10 self-center hover:cursor-pointer"
                  onClick={createHandler}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
};
