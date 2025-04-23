import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

interface BDIDataPoint {
  level: string;
  count: number;
  color: string;
}

interface ChartState {
  series: number[];
  options: ApexOptions;
}

export default function PatientsLevelChart() {
  const [chartData, setChartData] = useState<ChartState>({
    series: [0, 0, 0, 0],
    options: {
      chart: {
        type: "pie",
        height: 350,
      },
      labels: [
        "Level 1: Normal",
        "Level 2: Mild",
        "Level 3: Moderate",
        "Level 4: Severe",
      ],
      colors: ["#4CAF50", "#8BC34A", "#FFC107", "#F44336"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return value + " 명";
          },
        },
      },
      dataLabels: {
        enabled: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: function (val: any, opts) {
          return (
            opts.w.globals.series[opts.seriesIndex] +
            "명 (" +
            val.toFixed(1) +
            "%)"
          );
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  // 샘플 데이터를 생성하는 함수
  const generateSampleData = (): BDIDataPoint[] => {
    return [
      {
        level: "Level 1: Normal",
        count: Math.floor(Math.random() * 100) + 50,
        color: "#4CAF50",
      },
      {
        level: "Level 2: Mild",
        count: Math.floor(Math.random() * 80) + 30,
        color: "#8BC34A",
      },
      {
        level: "Level 3: Moderate",
        count: Math.floor(Math.random() * 60) + 20,
        color: "#FFC107",
      },
      {
        level: "Level 4: Severe",
        count: Math.floor(Math.random() * 40) + 10,
        color: "#F44336",
      },
    ];
  };

  useEffect(() => {
    // 샘플 데이터 생성
    const data = generateSampleData();

    // 차트 데이터 업데이트
    setChartData((prev) => ({
      ...prev,
      series: data.map((item) => item.count),
    }));
  }, []);

  // const regenerateData = () => {
  //   const data = generateSampleData();
  //   setChartData({
  //     ...chartData,
  //     series: data.map((item) => item.count),
  //   });
  // };
  return (
    <div className="flex flex-col items-center w-full h-[ 100%-32px-45px ] ">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          // height="100%"
        />
      {/* <div className="mt-6 text-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={regenerateData}
        >
          데이터 업데이트
        </button>
      </div> */}
    </div>
  );
}
