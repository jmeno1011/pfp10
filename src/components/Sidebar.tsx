import { Link, useLocation } from "react-router-dom";
import { DashboardIcon, PeopleIcon } from "../assets/icons";
import useSettingsStore from "../store/settings";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const pages = [
  { id: 1, name: "Overview", path: "/", icon: <DashboardIcon /> },
  { id: 2, name: "Dashboard", path: "/dashboard", icon: <PeopleIcon /> },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { sidebarState, setSidebarState } = useSettingsStore();
  const toggleSidebar = () => {
    setSidebarState(sidebarState === "OPEN" ? "CLOSE" : "OPEN");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setSidebarState("CLOSE");
      } else {
        setSidebarState("OPEN");
      }
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Check on resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, [setSidebarState]);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        sidebarState === "CLOSE" ? "w-16" : "w-60"
      }`}
    >
      <div className="flex justify-between items-center p-4">
        {sidebarState === "OPEN" && <h2>PFP-10</h2>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded bg-gray-700 cursor-pointer"
        >
          {sidebarState === "OPEN" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          )}
        </button>
      </div>
      <div className="divider my-4 bg-gray-600 h-px" />
      <ul className="space-y-4">
        {pages.map((page) => (
          <li key={page.id}>
            <Link
              to={page.path}
              className={cn(
                "flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 transition duration-200 select-none",
                pathname === page.path && "text-white bg-gray-700",
                sidebarState !== "OPEN" && "justify-center"
              )}
            >
              <span className={cn(sidebarState === "OPEN" && "mr-3")}>
                {page.icon}
              </span>
              {sidebarState === "OPEN" && <span>{page.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
