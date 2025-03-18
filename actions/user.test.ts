import { describe, expect, it, vi } from "vitest";
import { actionSignUp } from "./user";

vi.mock("@/services/user-service", () => ({
  getExistedUser: (login: string) =>
    login === "user"
      ? {
          login,
        }
      : null,
  signUp: () => true,
}));

describe("user actions", () => {
  it("sign up user: short password", async () => {
    const response = await actionSignUp({
      login: "user",
      password: "12345",
      repeat: "12345",
    });

    expect(response.error?.length).toEqual(2);
  });
  it("sign up user: existed user", async () => {
    const response = await actionSignUp({
      login: "user",
      password: "123456",
      repeat: "123456",
    });

    const error = response.error as string[][];

    expect(error[0][0]).toEqual("login");
  });
  it("sign up user: signup", async () => {
    const response = await actionSignUp({
      login: "user1",
      password: "123456",
      repeat: "123456",
    });
    const success = response.success as boolean;

    expect(success).toEqual(true);
  });
});
