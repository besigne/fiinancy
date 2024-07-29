import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { Inconsolata } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/app/(protected)/_components/navbar";

const font = Inconsolata({
  subsets: ["latin"]
})

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className={cn("h-full w-full flex flex-col gap-y-10 items-center justify-start bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-300", font.className)}>
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  )
}