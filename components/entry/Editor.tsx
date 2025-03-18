"use client";

import { acitonUpdateEntry } from "@/actions/entry";
import { JournalEntry } from "@prisma/client";
import { FC, useState, useTransition } from "react";
import { useAutosave } from "react-autosave";
import Spinner from "@/components/ui/spinner";

type Props = {
  entry: JournalEntry;
};

const Editor: FC<Props> = ({ entry }) => {
  const [content, setContent] = useState(entry.content);
  const [pending, setTransition] = useTransition();

  useAutosave({
    data: content,
    onSave: (value) => {
      setTransition(async () => {
        await acitonUpdateEntry(entry.id, value);
      });
    },
  });

  return (
    <>
      <textarea
        className="textarea textarea-secondary p-4 w-full h-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {pending && <Spinner />}
    </>
  );
};

export default Editor;
