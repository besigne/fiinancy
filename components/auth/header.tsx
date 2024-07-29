import { Inconsolata } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Inconsolata({
  subsets: ["latin"]
})

interface HeaderProps {
  label: string;
};

export const Header = ({
  label,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn(
        "text-3xl font-semibold",
        font.className
        )}>
          Financy
        </h1>
        <p className={cn(
          "text-muted-foreground text-sm",
          font.className
        )}>
          {label}
        </p>
    </div>
  );
};