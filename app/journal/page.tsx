import NewEntryCard from "@/components/entry/NewEntryCard";
import EntryCard from "@/components/entry/EntryCard";
import Link from "next/link";
import { actionGetEntries } from "@/actions/entry";

export default async function JournalPage() {
  const resposne = await actionGetEntries();

  return (
    <div className="p-10 overflow-auto h-full">
      <h2 className="text-2xl mb-8"> Journal page</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {!resposne.success && <div>Error while loading </div>}
        {resposne.success &&
          resposne.data.map((entry) => (
            <Link href={`/journal/${entry.id}`} key={entry.id}>
              <EntryCard entry={entry} />
            </Link>
          ))}
      </div>
    </div>
  );
}
