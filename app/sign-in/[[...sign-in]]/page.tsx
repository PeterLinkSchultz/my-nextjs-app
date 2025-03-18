import { authConfig } from "@/auth.config";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = (await getServerSession(authConfig)) as {
    user?: { id: string };
  };

  if (session?.user?.id) {
    redirect("/journal");
  }

  return <LoginForm />;
}
