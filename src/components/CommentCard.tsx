import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { api } from "~/utils/api";
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

  console.log(userId);

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 ml-2 p-0 pt-2">
        <div>
          <Link
            href={`/Profile/@${meetupComment.user.name}`}
            className="collapse-title text-xl font-bold  hover:text-purple-400"
          >
            {meetupComment.title}
          </Link>
          <article className="lg:prose-md prose pl-4">
            <ReactMarkdown>{meetupComment.content}</ReactMarkdown>
          </article>
        </div>
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
      </div>
    </div>
  );
};
