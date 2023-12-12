import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "~/utils/api";

import { toast } from "react-toastify";
import { Disclosure } from "@headlessui/react";
import {
  //   PlusIcon,
  PencilIcon,
  XMarkIcon,
  //   CheckIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";

import { type ReplyType } from "~/utils/types";

const ReplyComponent = ({
  reply,
  userId,
  refetchReplies,
}: {
  reply: ReplyType;
  userId: string;
  refetchReplies: () => void;
}) => {
  const { data: likedReply, refetch: refetchLikeStatus } =
    api.likes.getLikedCommentForSinglePost.useQuery({
      commentId: reply.id,
      userId,
    });

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likedReply !== null);
  }, [likedReply]);

  const likeCommentMutation = api.likes.likeComment.useMutation({
    onSuccess: () => {
      setIsLiked(true);
      refetchReplies();
    },
    onError: () => {
      toast.error("Error liking the comment");
    },
  });

  const removeCommentLikeMutation = api.likes.removeCommentLike.useMutation({
    onSuccess: () => {
      setIsLiked(false);
      refetchReplies();
    },
    onError: () => {
      toast.error("Error unliking the comment");
    },
  });

  const handleLikeClick = () => {
    if (isLiked) {
      removeCommentLikeMutation.mutate({ commentId: reply.id, userId });
    } else {
      likeCommentMutation.mutate({ commentId: reply.id, userId });
    }
  };

  const deleteComment = api.comment.delete.useMutation({
    onSuccess: () => {
      void refetchReplies();
    },
  });

  return (
    <div key={reply.id}>
      <Disclosure.Panel className="text-center">
        <div className="mx-auto my-2 h-0.5 w-60 items-center self-center bg-slate-300/20"></div>
        <div className="relative flex max-h-[30px] w-full flex-row">
          <Link
            href={`/Profile/@${reply.userId}`}
            className="collapse-title max-h-[30px] p-0 text-base font-bold hover:text-purple-400"
          >
            {reply.author}
          </Link>
          <div className="absolute -right-5 top-0 flex h-full scale-50 flex-row">
            {userId === reply.userId && (
              <PencilIcon className=" hover:cursor-pointer" />
            )}
            <HeartIcon
              className={`${
                isLiked ? "text-fuchsia-400" : "text-darktext"
              } scale-75 hover:cursor-pointer`}
              onClick={handleLikeClick}
            />
            {userId === reply.userId && (
              <XMarkIcon
                className="scale-125"
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
  );
};

export default ReplyComponent;
