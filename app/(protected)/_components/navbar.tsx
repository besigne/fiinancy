"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageEnum, UserRole } from "@prisma/client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { dateStringToday } from "@/lib/format-date";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Navbar = () => {
  const pathname = usePathname();
  const user = useCurrentUser();
  const role = useCurrentRole();
  const date = dateStringToday(user?.language as LanguageEnum);

  return (
    <nav className="bg-white flex justify-between items-center p-4 m-4 rounded-xl w-9/12 shadow-sm">
      <div className="flex gap-x-4">
        <Button
          asChild
          variant={pathname === "/dashboard" ? "outline" : "ghost"}
        >
          <Link href="/dashboard">
            Dashboard
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/transactions" ? "outline" : "ghost"}
        >
          <Link href="/transactions">
            Mensal
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/goals" ? "outline" : "ghost"}
        >
          <Link href="/goals">
            Objetivos
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/income" ? "outline" : "ghost"}
        >
          <Link href="/income">
            Ganhos
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/expenses" ? "outline" : "ghost"}
        >
          <Link href="/expenses">
            Despesas
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "outline" : "ghost"}
        >
          <Link href="/settings">
            Configurações
          </Link>
        </Button>
        {role === UserRole.ADMIN && (
          <Button
            asChild
            variant={pathname === "/admin" ? "outline" : "ghost"}
          >
            <Link href="/admin">
              API Test
            </Link>
          </Button>
        )}
      </div>
      <div className="flex flex-row space-x-3 justify-center items-center">
        <p className="text-muted-foreground hover:cursor-default">{date}</p>
        <UserButton />
      </div>
    </nav>
  )

}