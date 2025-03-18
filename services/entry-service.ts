import client from "@/db/client";
import { Analysis, JournalEntry } from "@prisma/client";

export class EntryService {
  client: typeof client;

  constructor() {
    this.client = client;
  }

  async getUserEntries(userId: string): Promise<JournalEntry[]> {
    return this.client.journalEntry.findMany({
      where: {
        userId,
      },
    });
  }
  getUserEntry(userId: string, id: string) {
    return this.client.journalEntry.findUnique({
      where: {
        userId,
        id,
      },
      include: {
        analysis: true,
      },
    }) as Promise<(JournalEntry & { analysis: Analysis }) | null>;
  }
  createUserEntry(userId: string) {
    return this.client.journalEntry.create({
      data: {
        userId,
        content: "Write about your day!",
      },
    });
  }
  createEntryAnalyze(id: string) {
    return this.client.analysis.create({
      data: {
        entryId: id,
        mood: "neutral",
        summary: "none",
        color: "#000000",
        negative: false,
        subject: "no-subject",
      },
    });
  }
  updateUserEntry(userId: string, id: string, content: string) {
    return this.client.journalEntry.update({
      where: {
        userId,
        id,
      },
      data: {
        content,
      },
    });
  }
  updateAnalysis(entryId: string, analysis: Record<string, string | boolean>) {
    return this.client.analysis.update({
      where: {
        entryId,
      },
      data: analysis,
    });
  }
}

const entryService = new EntryService();

export default entryService;
