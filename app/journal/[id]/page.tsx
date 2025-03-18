import { FC } from "react";

import Editor from "@/components/entry/Editor";

import { notFound } from "next/navigation";
import { actionGetEntry } from "@/actions/entry";
import { Analysis } from "@prisma/client";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const EntryPage: FC<Props> = async ({ params }) => {
  const id = (await params).id;
  const response = await actionGetEntry(id);

  if (!response.success) {
    return response.error;
  }

  const { mood, summary, subject, negative, color } = response.data
    ?.analysis as Analysis;
  const analysis = [
    {
      name: "Summary",
      value: summary,
    },
    {
      name: "Subject",
      value: subject,
    },
    {
      name: "Mood",
      value: mood,
    },
    {
      name: "Negative",
      value: negative ? "Yes" : "No",
    },
  ];

  return response.data ? (
    <div className="w-full h-full grid grid-cols-3">
      <div className="w-full h-full p-8 col-span-2 border-r">
        <Editor entry={response.data} />
      </div>
      <div>
        <div className="px-6 py-10" style={{ background: color }}>
          <h2 className="text-2xl text-black">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysis.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between p-2 border-b"
              >
                <span>{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    notFound()
  );
};

export default EntryPage;
