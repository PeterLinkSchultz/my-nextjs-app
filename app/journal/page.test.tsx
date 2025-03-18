import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import JournalPage from "./page";
import { JSX } from "react";

async function renderAsync(Component: () => Promise<JSX.Element>) {
  const html = await Component();

  return render(html);
}
vi.mock("@/actions/entry", () => ({
  actionGetEntries: () => ({
    success: true,
    data: [
      {
        id: "1",
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        content: "Content 1",
        userId: 1,
      },
      {
        id: "2",
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        content: "Content 2",
        userId: 1,
      },
    ],
  }),
}));

describe("entities page", () => {
  it("render entities page", async () => {
    renderAsync(JournalPage);

    expect(await screen.findByText("Journal page")).toBeDefined();
    expect((await screen.findAllByRole("article")).length).toEqual(2);
    expect(await screen.findByText("New Entry")).toBeDefined();
  });
});
