import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface NormalCardProps {
  children: ReactNode;
  className?: string;
}

export default function NormalCard({ children, className }: NormalCardProps) {
  return (
    <div
      className={cn("p-4 w-full shadow-2xs bg-white rounded-2xl", className)}
    >
      {children}
    </div>
  );
}
