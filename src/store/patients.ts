import { create } from "zustand";

type PatientsStore = {
  selectedPatientsName: string;
  patientsNameList: { value: string; label: string; }[];
}

const usePatientsStore = create<PatientsStore & { setPatientsName: (name: string) => void }>(
  set => ({
    selectedPatientsName: "",
    patientsNameList: [
      { value: "john_doe", label: "John Doe" },
      { value: "jane_smith", label: "Jane Smith" },
      { value: "robert_johnson", label: "Robert Johnson" },
      { value: "emily_davis", label: "Emily Davis" },
      { value: "michael_brown", label: "Michael Brown" },
      { value: "sarah_wilson", label: "Sarah Wilson" },
      { value: "david_lee", label: "David Lee" },
      { value: "sophia_miller", label: "Sophia Miller" },
      { value: "james_taylor", label: "James Taylor" },
      { value: "olivia_martinez", label: "Olivia Martinez" }
    ],
    setPatientsName: (name: string) => set({ selectedPatientsName: name })
  })
);

export default usePatientsStore;