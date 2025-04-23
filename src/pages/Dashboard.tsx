import BDIApp from "@/components/Dashboard/BDIApp";
import DepressionChartsSection from "@/components/Dashboard/DepressionChartsSection";
import EmotionSection from "@/components/Dashboard/EmotionSection";
import SearchbarSection from "@/components/Dashboard/SearchbarSection";
import PageTitle from "@/components/PageTitle";
import SectionTitle from "@/components/SectionTitle";
import usePatientsStore from "@/store/patients";

export default function Dashboard() {
  const { selectedPatientsName } = usePatientsStore();
  return (
    <div className="h-full w-full  max-w-[1280px] mx-auto flex flex-col gap-8">
      <PageTitle title="Dashboard" />
      <SearchbarSection />
      {selectedPatientsName !== "" && (
        <div className="flex flex-col gap-6">
          {/* depression 4 chart section */}
          <div className="flex flex-col gap-4">
            <SectionTitle
              title="Depression"
              subTitle="it can see Depression Information"
            />
            <DepressionChartsSection />
          </div>
          {/* depression table section */}
          <div className="flex flex-col gap-4">
            <SectionTitle
              title="Diagnosis Result"
              subTitle="it can see Depression Information"
            />
            <BDIApp />
          </div>
          {/* emotion section */}
          <div className="flex flex-col gap-4">
            <SectionTitle
              title="Emotion"
              subTitle="it can see Depression Information"
            />
            <EmotionSection />
          </div>
        </div>
      )}
    </div>
  );
}
