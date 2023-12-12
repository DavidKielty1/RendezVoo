import { useState } from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import CommentReplyCard from "./CommentReplyCard";

import { toast } from "react-toastify";
import { Disclosure } from "@headlessui/react";
import {
  ChevronRightIcon,
  PlusIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon,
  HeartIcon,
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
      void refetchReplies();
    },
  });

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

  const { data: likedMainComment, refetch: refetchMainCommentLike } =
    api.likes.getLikedCommentForSinglePost.useQuery({
      commentId: meetupComment.id,
      userId,
    });

  const { data: replies, refetch: refetchReplies } =
    api.reply.getAllReplies.useQuery({ parentId: meetupComment.id });

  const likeComment = api.likes.likeComment.useMutation({
    onSuccess: () => {
      void refetchMainCommentLike();
    },
  });
  const removeCommentLike = api.likes.removeCommentLike.useMutation({
    onSuccess: () => {
      void refetchMainCommentLike();
    },
  });

  const handleLikeMainComment = () => {
    if (!likedMainComment) {
      likeComment.mutate({ commentId: meetupComment.id, userId });
    } else {
      removeCommentLike.mutate({ commentId: meetupComment.id, userId });
    }
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
                    <PencilIcon className="scale-75 hover:cursor-pointer" />
                  )}
                  <HeartIcon
                    className={`${
                      likedMainComment ? "text-fuchsia-400" : "text-darktext"
                    } scale-75 hover:cursor-pointer`}
                    onClick={handleLikeMainComment}
                  />
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
              replies.map((reply) => (
                <CommentReplyCard
                  key={reply.id}
                  reply={reply}
                  userId={userId}
                  refetchReplies={refetchReplies}
                />
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
