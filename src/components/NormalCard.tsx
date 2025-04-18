import { ReactNode } from "react";

interface NormalCardProps {
  children: ReactNode;
}

export default function NormalCard({ children }: NormalCardProps) {
  return <div className="shadow-2xs bg-white p-4 rounded-2xl">{children}</div>;
}
