import { useState } from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

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
  const { data: sessionData } = useSession();

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
      void refetchReplies();
    },
  });

  const [replies, setReplies] = useState<CommentWithUserInfo[]>();
  const { data: fetchedReplies, refetch: refetchReplies } =
    api.reply.getAllReplies.useQuery(
      {
        parentId: meetupCommentId,
      },
      {
        onSuccess: (data: CommentWithUserInfo[]) => {
          setReplies(data ?? fetchedReplies);
        },
      },
    );

  const createReply = api.reply.create.useMutation({
    onSuccess: () => {
      void refetchReplies();
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
    void refetchReplies();
    setIsReplySectionVisible(!isReplySectionVisible);
    setReplyContent("");
  };
  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={`${styles.myUniqueGradient} card border border-gray-200 bg-base-100 shadow-xl`}
        >
          <div className="card-body ml-2 flex w-full py-2 text-center">
            <div className="flex flex-col">
              <div className="relative flex max-h-[30px] w-full flex-row">
                <Link
                  href={`/Profile/@${meetupComment.user.name}`}
                  className="b-0 mx-auto max-h-[30px] p-0 text-base font-bold hover:text-purple-400"
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
                  {sessionData && (
                    <PlusIcon
                      className="scale-100"
                      onClick={toggleReplySection}
                    />
                  )}

                  {replies && replies?.length > 0 && (
                    <Disclosure.Button>
                      <ChevronRightIcon
                        className={`mt-0.5 w-6 scale-125 ${
                          open ? "rotate-90 transform" : ""
                        }`}
                      />
                    </Disclosure.Button>
                  )}
                </div>
              </div>
              <article className="lg:prose-md prose w-full text-base">
                <span>{meetupComment.content}</span>
              </article>
            </div>
            {replies &&
              replies?.length > 0 &&
              open &&
              replies.map((reply, idx) => (
                <div key={idx}>
                  <Disclosure.Panel className="text-center">
                    <div className="mx-auto my-2 h-0.5 w-60 items-center self-center bg-slate-300/20"></div>
                    <div className="relative flex max-h-[30px] w-full flex-row">
                      <Link
                        href={`/Profile/@${reply.userId}`}
                        className="collapse-title max-h-[30px] p-0 text-base font-bold hover:text-purple-400"
                      >
                        {reply.author}
                      </Link>
                      <div className="absolute -right-5 top-0 flex h-full scale-75 flex-row">
                        {userId === reply.userId && (
                          <XMarkIcon
                            onClick={() => {
                              deleteComment.mutate({
                                id: reply.id,
                              });
                              toast(`Comment deleted!`);
                            }}
                          >
                            Delete
                          </XMarkIcon>
                        )}
                      </div>
                    </div>

                    <span className="text-base">{reply.content}</span>
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
              <div className="flex w-full flex-row self-center">
                <textarea
                  autoFocus
                  className="my-2 w-full rounded-lg border-2 border-slate-300/60"
                  name="replyComment"
                  id="replyComment"
                  value={replyContent}
                  onChange={(e) => {
                    setReplyContent(e.currentTarget.value);
                  }}
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
