import { getUser } from "@/services/user-service";

export type ActionResponse<T> =
  | {
      success: true;
      data: Awaited<T>;
    }
  | {
      success: false;
      error: string;
    };

export default async function actionWithUser<T>(
  queryFunction: (userId: string) => Promise<T>
): Promise<ActionResponse<T>> {
  try {
    const userId = await getUser();
    const resposne = await queryFunction(userId);

    return {
      success: true,
      data: resposne,
    };
  } catch (e) {
    return {
      success: false,
      error: (e as { message: string }).message,
    };
  }
}
