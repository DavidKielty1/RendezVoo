import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

export const CommentEditor = ({
  onSave,
  userName,
}: {
  onSave: (comment: { title: string; content: string }) => void;
  userName: string | null | undefined;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState(`${userName}`);

  return (
    <div className="card border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-0 ">
        <label className="mt-2 px-8 py-1 text-xl font-bold text-darktext">
          {userName}
        </label>
        <CodeMirror
          placeholder="Leave a comment!"
          value={code}
          width="max-w-500px"
          height="10vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="border border-gray-300"
        />
        <div className="card-actions justify-end">
          <button
            onClick={() => {
              onSave({
                title,
                content: code,
              });
              setCode("");
              setTitle("");
            }}
            className="border-1 btn btn-xs mb-2 mr-2 mt-1 w-20 border-slate-500 bg-slate-400 px-8 capitalize text-white"
            disabled={code.trim().length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
