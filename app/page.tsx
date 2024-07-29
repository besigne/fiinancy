import { cn } from "@/lib/utils";
import { Inconsolata } from "next/font/google";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Inconsolata({
  subsets: ["latin"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-300">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-gray-800 drop-shadow-md", font.className)}>
          Fiinancy
        </h1>
        <p className={cn("text-lg text-gray-800", font.className)}>
          A simple way to manage your money.
        </p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" className="lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
