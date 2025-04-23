import CardSubTitle from "../CardSubTitle";
import CardTitle from "../CardTitle";
import NormalCard from "../NormalCard";
import SectionTitle from "../SectionTitle";
import HourlySurveyChart from "./HourlySurveyChart";

export default function PatientsStateSection() {
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle
        title="Patients Statement"
        subTitle="it can see patients statement"
      />
      <div className="h-[300px] flex gap-4">
        <NormalCard className="flex-[1]">
          <CardTitle title="관리 환자 수" />
          <CardSubTitle subtitle="전체 관리 환자 수" />
          <span>100명</span>
        </NormalCard>
        <NormalCard className="flex-[1]">
          <CardTitle title="호전 환자 수" />
          <CardSubTitle subtitle="최근 3회 문진 내에 호전된 환자 수" />
          <span>10명(10%)</span>
        </NormalCard>
        <NormalCard className="flex-[2]">
          <CardTitle title="시간대별 문진 수" />
          <CardSubTitle subtitle="문진을 시행한 시간대별 문진 수" />
          <HourlySurveyChart />
        </NormalCard>
      </div>
    </div>
  );
}
