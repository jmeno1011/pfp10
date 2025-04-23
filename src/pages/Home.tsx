import PatientsStateSection from "@/components/home/PatientsStateSection";
import CriticalPatientsSection from "../components/home/CriticalPatientsSection";
import PageTitle from "@/components/PageTitle";

export default function Home() {
  return (
    <div className="h-full w-full  max-w-[1280px] mx-auto flex flex-col gap-8">
      <PageTitle title="Overview" />
      <PatientsStateSection />
      <CriticalPatientsSection />
    </div>
  );
}
