import { useState } from "react";
// import { toast } from "react-toastify";
import { CheckIcon } from "@heroicons/react/20/solid";

export const CommentEditor = ({
  onSave,
  userName,
}: {
  onSave: (comment: { author: string; content: string }) => void;
  userName: string | null | undefined;
}) => {
  const [code, setCode] = useState<string>("");
  const [author, setAuthor] = useState(`${userName}`);

  return (
    <div className="card border border-gray-200 bg-base-100 shadow-xl">
      <div className="ml-2 flex w-full flex-row px-8 py-4">
        <textarea
          className="mx-auto w-full rounded-lg border border-slate-300/60 text-center"
          placeholder="Leave a comment!"
          value={code}
          onChange={(e) => setCode(e.currentTarget.value)}
        />
        <CheckIcon
          className="w-10 self-center hover:cursor-pointer"
          onClick={() => {
            onSave({
              author,
              content: code,
            });
            setCode("");
            setAuthor("");
          }}
        />
      </div>
    </div>
  );
};
