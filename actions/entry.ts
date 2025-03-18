"use server";

import EntryService from "@/services/entry-service";
import { getUser } from "@/services/user-service";
import { revalidatePath } from "next/cache";
import actionWithUser from "./query";
import { analyze } from "@/lib/ai";

export const actionCreateEntry = async () => {
  try {
    const user = await getUser();

    if (!user) {
      return {
        success: false,
        error: "Not accessed",
      };
    }

    const entry = await EntryService.createUserEntry(user);
    await EntryService.createEntryAnalyze(entry.id);

    revalidatePath("/journal");
    return {
      success: true,
      data: entry,
    };
  } catch {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const acitonUpdateEntry = async (id: string, content: string) => {
  return actionWithUser(async (userId) => {
    const data = await analyze(content);

    await EntryService.updateUserEntry(userId, id, content);
    if (data) {
      await EntryService.updateAnalysis(id, data);
    }

    revalidatePath(`/journal/${id}`, "page");
  });
};

export const actionGetEntries = async () => {
  return actionWithUser((userId) => EntryService.getUserEntries(userId));
};

export const actionGetEntry = async (id: string) => {
  return actionWithUser((userId) => EntryService.getUserEntry(userId, id));
};
