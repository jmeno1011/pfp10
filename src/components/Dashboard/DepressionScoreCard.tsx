import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import CustomTooltip from "./CustomTooltip";

interface DepressionScoreData {
  date: string;
  value: number;
}

interface DepressionScoreCard {
  title: string;
  chartColor: string;
  // iconType: "plus" | "heart" | "bulb" | "body";
  latestValue: number;
  maxScore: number;
  data: DepressionScoreData[];
  // tooltipContent: ReactNode;
  tooltipName: string;
}

export default function DepressionScoreCard({
  title,
  chartColor,
  latestValue,
  maxScore,
  data,
  tooltipName,
}: DepressionScoreCard) {
  // 차트 옵션
  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 80,
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [chartColor],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: () => title,
        },
      },
      marker: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
    },
  };

  // 차트 시리즈 데이터
  const series = [
    {
      name: title,
      data: data.map((item) => ({
        x: new Date(item.date).getTime(),
        y: item.value,
      })),
    },
  ];

  // 백분율 계산
  const percentage = Math.round((latestValue / maxScore) * 100);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <h3 className="font-medium text-gray-700">{title}</h3>
        </div>
        <div className="flex items-center">
          <CustomTooltip tooltipName={tooltipName}>
            <svg
              className="w-4 h-4 text-gray-400 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </CustomTooltip>
        </div>
      </div>
      <div className="text-sm text-gray-500">Latest: {percentage}%</div>
      <div className="mt-2">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="line"
          height={80}
        />
      </div>
    </div>
  );
}
