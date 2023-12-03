/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { CommentCard } from "./CommentCard";
import { CommentEditor } from "./CommentEditor";

import { type CommentWithUserInfo } from "~/utils/types";

import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

import "react-toastify/dist/ReactToastify.css";

type Props = {
  meetupId: string;
  userId: string;
  userName: string;
};

export default function CommentsSection({ meetupId, userId, userName }: Props) {
  const { data: sessionData } = useSession();

  const [meetupComments, setMeetupComments] = useState<CommentWithUserInfo[]>(
    [],
  );
  const { data: fetchedComments, refetch: refetchComments } =
    api.comment.getAll.useQuery<CommentWithUserInfo[]>(
      { meetupId },
      {
        onSuccess: (data: CommentWithUserInfo[]) => {
          setMeetupComments(data ?? fetchedComments ?? []);
        },
      },
    );

  const createComment = api.comment.create.useMutation({
    onSuccess: () => {
      void refetchComments();
    },
  });

  return (
    <section>
      {meetupComments ? (
        <section className="flex flex-col gap-8 text-slate-500">
          {sessionData && (
            <CommentEditor
              onSave={({ author, content }) => {
                void createComment.mutate({
                  author,
                  content,
                  meetupId,
                  userId,
                });
              }}
              userName={userName}
            />
          )}
          <div className="flex flex-col gap-8">
            {meetupComments?.map((meetupComment) => (
              <div key={meetupComment.id}>
                <CommentCard
                  meetupComment={meetupComment}
                  refetchComments={refetchComments}
                  userId={userId}
                  userName={userName}
                />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div> Loading comments...</div>
      )}
    </section>
  );
}
