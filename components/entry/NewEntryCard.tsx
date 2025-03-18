"use client";

import { useRouter } from "next/navigation";
import { actionCreateEntry } from "@/actions/entry";
import { FC } from "react";
import { alert } from "@/components/ui/toast";

const NewEntryCard: FC = () => {
  const router = useRouter();
  const handleOnClick = async () => {
    const response = await actionCreateEntry();
    if (response.success && response.data) {
      alert("success", "Entry was created");
      router.push(`/journal/${response.data.id}`);
    } else {
      alert("error", response.error);
    }
  };

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-purple-900 shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
