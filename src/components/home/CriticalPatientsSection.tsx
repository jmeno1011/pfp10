import CardSubTitle from "../CardSubTitle";
import CardTitle from "../CardTitle";
import NormalCard from "../NormalCard";
import SectionTitle from "../SectionTitle";
import CritialPatientsTable from "./CritialPatientsTable";
import PatientsLevelChart from "./PatientsLevelChart";

export default function CriticalPatientsSection() {
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle
        title="Patients Statement"
        subTitle="it can see patients statement"
      />
      <div className="h-[350px] flex gap-4">
        <NormalCard className="flex-[3]">
          <CritialPatientsTable />
        </NormalCard>
        <NormalCard className="flex-[2]">
          <CardTitle title="관리 환자 수" />
          <CardSubTitle subtitle="전체 관리 환자 수" />
          <PatientsLevelChart />
        </NormalCard>
      </div>
    </div>
  );
}