import React, { useEffect } from "react";
import { type User, type Comment } from "~/utils/types";
import { api } from "~/utils/api";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export type CommentWithMeetupTitle = Omit<Comment, "meetup"> & {
  meetup: {
    title: string;
  };
};

type Props = {
  user: User;
};

export default function ProfileCommentsList({ user }: Props) {
  const userId = user.id;

  const { data: fetchedUserComments, isLoading: loadingComments } =
    api.comment.getAllFromUser.useQuery({
      userId,
    });

  function formatCreatedAtInArray(
    comments: CommentWithMeetupTitle[] | undefined,
  ) {
    if (comments) {
      return comments.map((comment) => {
        const createdAtDate = new Date(comment.createdAt);
        const day = createdAtDate.getDate().toString().padStart(2, "0");
        const month = (createdAtDate.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        const year = createdAtDate.getFullYear();
        const hours = createdAtDate.getHours().toString().padStart(2, "0");
        const minutes = createdAtDate.getMinutes().toString().padStart(2, "0");
        return {
          ...comment,
          createdAt: `${day}/${month}/${year}, ${hours}:${minutes}`,
        };
      });
    }
    return comments;
  }
  const formattedComments = formatCreatedAtInArray(
    fetchedUserComments as CommentWithMeetupTitle[],
  );

  return (
    <section className="py-2 text-center text-lg">
      {loadingComments ? (
        <div>`Loading ${user.name}'s comments...`</div>
      ) : formattedComments && formattedComments.length > 0 ? (
        <div className="flex flex-col gap-10 ">
          {formattedComments.map((comment) => (
            <div
              key={comment.id}
              className="w-full justify-evenly self-center rounded-lg bg-slate-100/70 py-6 text-base shadow-md hover:shadow-glow lg:w-4/6 lg:text-lg xl:px-4"
            >
              <Link
                className="flex flex-row justify-center"
                href={`/${comment.meetupId}`}
              >
                <h2 className="font-bold">{comment.meetup.title}</h2>
                <ArrowRightOnRectangleIcon className="ml-2 w-5 xl:ml-10" />
              </Link>
              <p>{comment.content}</p>
              <p className="text-base text-darktext/60">
                Posted on {comment.createdAt}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>Nothing to see here.</div>
      )}
    </section>
  );
}
