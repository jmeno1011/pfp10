import { useEffect, useState } from "react";
// import CardSubTitle from "../CardSubTitle";
// import CardTitle from "../CardTitle";
// import NormalCard from "../NormalCard";
import DepressionScoreCard from "./DepressionScoreCard";

interface BDIScoreData {
  date: string;
  value: number;
}

export default function DepressionChartsSection() {
  const [bdiData, setBdiData] = useState({
    bdisum: [] as BDIScoreData[],
    affective: [] as BDIScoreData[],
    cognitive: [] as BDIScoreData[],
    somatic: [] as BDIScoreData[],
  });

  // 툴팁 내용
  // const bdisumTooltip = (
  //   <div className="text-xs">
  //     <p className="font-semibold">Beck Depression Inventory (BDI) 총점</p>
  //     <p className="mt-1">
  //       BDI는 우울증의 심각도를 평가하는 21개 문항으로 구성됩니다.
  //     </p>
  //     <p className="mt-1">총점 해석:</p>
  //     <ul className="list-disc pl-4 mt-1">
  //       <li>0-9: 정상</li>
  //       <li>10-15: 가벼운 우울</li>
  //       <li>16-23: 중등도 우울</li>
  //       <li>24-63: 심한 우울</li>
  //     </ul>
  //   </div>
  // );

  // const affectiveTooltip = (
  //   <div className="text-xs">
  //     <p className="font-semibold">*BDISUM에 대한 비율</p>
  //     <p className="mt-2">Affective 문항:</p>
  //     <p>
  //       슬픔(bdi01), 즐거움 상실(bdi04), 울음(bdi10), 우유부단(bdi13),
  //       초조(bdi11), 흥미상실(bdi12)
  //     </p>
  //   </div>
  // );

  // const cognitiveTooltip = (
  //   <div className="text-xs">
  //     <p className="font-semibold">*BDISUM에 대한 비율</p>
  //     <p className="mt-2">Cognitive 문항:</p>
  //     <p>
  //       비관주의(bdi02), 실패감(bdi03), 죄책감(bdi05), 벌 받는 느낌(bdi06),
  //       자기혐오(bdi07), 자기비난(bdi08), 자살사고(bdi09), 무가치함(bdi14)
  //     </p>
  //   </div>
  // );

  // const somaticTooltip = (
  //   <div className="text-xs">
  //     <p className="font-semibold">*BDISUM에 대한 비율</p>
  //     <p className="mt-2">Somatic 문항:</p>
  //     <p>
  //       사회적 위축(bdi15), 수면문제(bdi16), 피로감(bdi17), 식욕변화(bdi18),
  //       집중력저하(bdi19), 체중변화(bdi20), 성적관심 감소(bdi21)
  //     </p>
  //   </div>
  // );

  useEffect(() => {
    // 더미 데이터 생성
    const generateDummyData = () => {
      const dates = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return date.toISOString().split("T")[0];
      });

      // 각 카테고리별 더미 데이터 생성
      const affectiveData = dates.map((date) => ({
        date,
        value: Math.floor(Math.random() * 10) + 5, // 0-18점 (6문항 * 0-3점)
      }));

      const cognitiveData = dates.map((date) => ({
        date,
        value: Math.floor(Math.random() * 14) + 6, // 0-24점 (8문항 * 0-3점)
      }));

      const somaticData = dates.map((date) => ({
        date,
        value: Math.floor(Math.random() * 12) + 5, // 0-21점 (7문항 * 0-3점)
      }));

      // BDISUM은 세 카테고리의 합
      const bdisumData = dates.map((date, index) => ({
        date,
        value:
          affectiveData[index].value +
          cognitiveData[index].value +
          somaticData[index].value,
      }));

      setBdiData({
        bdisum: bdisumData,
        affective: affectiveData,
        cognitive: cognitiveData,
        somatic: somaticData,
      });
    };

    generateDummyData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <DepressionScoreCard
        title="BDISUM"
        chartColor="#008FFB"
        // iconType="plus"
        latestValue={
          bdiData.bdisum.length > 0
            ? bdiData.bdisum[bdiData.bdisum.length - 1].value
            : 0
        }
        maxScore={63}
        data={bdiData.bdisum}
        // tooltipContent={bdisumTooltip}
        tooltipName="bdisum"
      />
      <DepressionScoreCard
        title="Affective"
        chartColor="#F04438"
        // iconType="heart"
        latestValue={
          bdiData.affective.length > 0
            ? bdiData.affective[bdiData.affective.length - 1].value
            : 0
        }
        maxScore={18}
        data={bdiData.affective}
        // tooltipContent={affectiveTooltip}
        tooltipName="affective"
      />
      <DepressionScoreCard
        title="Cognitive"
        chartColor="#F79009"
        // iconType="bulb"
        latestValue={
          bdiData.cognitive.length > 0
            ? bdiData.cognitive[bdiData.cognitive.length - 1].value
            : 0
        }
        maxScore={24}
        data={bdiData.cognitive}
        // tooltipContent={cognitiveTooltip}
        tooltipName="cognitive"
      />
      <DepressionScoreCard
        title="Somatic"
        chartColor="#10B981"
        // iconType="body"
        latestValue={
          bdiData.somatic.length > 0
            ? bdiData.somatic[bdiData.somatic.length - 1].value
            : 0
        }
        maxScore={21}
        data={bdiData.somatic}
        // tooltipContent={somaticTooltip}
        tooltipName="somatic"
      />
    </div>
  );
}
