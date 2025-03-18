import { describe, expect, it, vi } from "vitest";
import { actionGetEntries, actionGetEntry } from "./entry";

const user = "user1";
const entryId = "entry1";

const mockEntryService = vi.hoisted(() => ({
  getUserEntries: vi.fn().mockResolvedValue([]),
  getUserEntry: vi.fn(),
}));
const mockUserService = vi.hoisted(() => ({
  getUser: vi.fn(),
}));

vi.mock("@/services/entry-service", () => {
  return {
    default: mockEntryService,
  };
});
vi.mock("@/services/user-service", () => ({
  getUser: mockUserService.getUser,
}));

describe("entry actions success", () => {
  it("get entries", async () => {
    mockUserService.getUser.mockResolvedValueOnce(user);
    const response = await actionGetEntries();
    expect(mockEntryService.getUserEntries).toHaveBeenCalledWith(user);
    expect(response).toMatchObject({
      success: true,
      data: [],
    });
  });
  it("get entry", async () => {
    mockUserService.getUser.mockResolvedValueOnce(user);
    mockEntryService.getUserEntry.mockResolvedValueOnce({
      id: entryId,
    });
    const response = await actionGetEntry(entryId);

    expect(mockEntryService.getUserEntry).toHaveBeenCalledWith(user, entryId);
    expect(response).toMatchObject({
      success: true,
      data: {
        id: entryId,
      },
    });
  });
});

describe("entry actions error", () => {
  it("get entry without user", async () => {
    mockUserService.getUser.mockRejectedValue(new Error("User not found"));
    const response = await actionGetEntry(entryId);

    expect(response).toMatchObject({
      success: false,
      error: "User not found",
    });
  });
});
