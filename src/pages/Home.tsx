import NormalCard from "../components/NormalCard";

export default function Home() {
  return (
    <div className="w-full max-w-[1280px] mx-auto flex flex-col">
      <div>home</div>
      <div className="h-full flex gap-4">
        <NormalCard>
          <h3>관리 환자 수</h3>
        </NormalCard>
        <NormalCard>
          <h3>호전 환자 수</h3>
        </NormalCard>
        <NormalCard>
          <h3>시간대별 문진 수</h3>
        </NormalCard>
      </div>
    </div>
  );
}
