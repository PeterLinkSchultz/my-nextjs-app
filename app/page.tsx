import { authConfig } from "@/auth.config";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authConfig);
  const href = session?.user ? "/journal" : "sign-in";

  return (
    <div className="w-screen h-screen bg-black flex">
      <div className="m-auto text-white">
        <h1 className="text-5xl mb-2">Welcome to app</h1>
        <Link href={href}>
          <button className="bg-blue-800 rounded-md p-2">Get started</button>
        </Link>
      </div>
    </div>
  );
}
