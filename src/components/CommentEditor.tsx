import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

export const CommentEditor = ({
  onSave,
}: {
  onSave: (comment: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <div className="card border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-0 ">
        <h2 className="card-title ">
          <input
            type="text"
            placeholder="Comment Title"
            className="input input-primary input-lg w-full border-slate-300 font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <CodeMirror
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
            disabled={title.trim().length === 0 || code.trim().length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
