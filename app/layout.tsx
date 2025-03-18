import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/global.css";
import Provider from "./provider";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);

  return (
    <html lang="en" data-theme="abyss">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col h-screen" id="root">
          <Provider session={session}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
