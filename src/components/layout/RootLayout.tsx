import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import useSettingsStore from "@/store/settings";
import { cn } from "@/lib/utils";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { sidebarState } = useSettingsStore();
  return (
    <div className="flex ">
      <Sidebar />
      <main
        className={cn(
          sidebarState === "OPEN" ? "ml-[240px]" : "ml-[70px]",
          "w-full min-h-screen bg-gray-100 p-6 transition-all duration-300 ease-in-out"
        )}
      >
        {children}
      </main>
    </div>
  );
}
