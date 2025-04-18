import { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex ">
      <Sidebar />
      <main className="ml-[240px] w-full min-h-screen bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}

