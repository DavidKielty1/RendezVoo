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
};

export default function CommentsSection({ meetupId, userId }: Props) {
  const { data: sessionData } = useSession();
  const userName = sessionData?.user.name;
  const sessionUserId = sessionData?.user.id;

  const [meetupComments, setMeetupComments] = useState<CommentWithUserInfo[]>(
    [],
  );

  const { data: fetchedComments, refetch: refetchComments } =
    api.comment.getAll.useQuery<CommentWithUserInfo[]>(
      { meetupId },
      {
        enabled: sessionData?.user !== undefined && meetupId !== null,
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
        <section className="text-slate-500">
          <div>
            <CommentEditor
              onSave={({ title, content }) => {
                void createComment.mutate({
                  title,
                  content,
                  meetupId,
                  userId,
                });
              }}
              userName={userName}
            />
          </div>
          <div>
            {meetupComments?.map((meetupComment) => (
              <div key={meetupComment.id}>
                <CommentCard
                  meetupComment={meetupComment}
                  refetchComments={refetchComments}
                  sessionUserId={sessionUserId}
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
