import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SidebarMODE } from "../types/settings";

type SettingsStore = {
  sidebarState: SidebarMODE;
  setSidebarState: (mode: SidebarMODE) => void;
}

const useSettingsStore = create(
  persist<SettingsStore>(
    set => ({
      sidebarState: "OPEN",
      setSidebarState: (mode: SidebarMODE) => set({ sidebarState: mode })
    }),
    {
      name: "pfp10-settings"
    }
  )
)

export default useSettingsStore;