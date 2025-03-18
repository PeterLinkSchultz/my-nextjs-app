import { JournalEntry } from "@prisma/client";
import { FC } from "react";

type Props = {
  entry: JournalEntry;
};

const EntryCard: FC<Props> = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <div
      role="article"
      className="divide-y divide-accent overflow-hidden rounded-lg bg-secondary shadow text-accent"
    >
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">Summary</div>
      <div className="px-4 py-4 sm:px-6">Mood</div>
    </div>
  );
};

export default EntryCard;
