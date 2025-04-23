import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartData {
  options: ApexOptions;
  series: {
    name: string;
    data: number[];
  }[];
}
export default function HourlySurveyChart() {
  const [chartData, setChartData] = useState<ChartData>({
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: Array.from({ length: 24 }, (_, i) => `${i}시`),
        // title: {
        //   text: "시간",
        // },
        tickAmount: 8
      },
      yaxis: {
        min: 0,
        max: 20,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: function (val: any) {
            return val.toString()+"개";
          },
        },
      },
      // theme: {
      //   mode: "light",
      // },
    },
    series: [
      {
        name: "시간별 데이터",
        data: Array.from({ length: 24 }, () => 0),
      },
    ],
  });
  useEffect(() => {
    // 0~20 사이의 랜덤 숫자 생성
    const randomData = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 21)
    );

    setChartData((prevState) => ({
      ...prevState,
      series: [
        {
          name: "시간별 데이터",
          data: randomData,
        },
      ],
    }));
  }, []);

  const generateNewData = () => {
    const randomData = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 21)
    );

    setChartData((prevState) => ({
      ...prevState,
      series: [
        {
          name: "시간별 데이터",
          data: randomData,
        },
      ],
    }));
  };

  return (
    <div className="flex flex-col items-center w-full">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
        />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={generateNewData}
      >
        새로운 데이터 생성
      </button>
    </div>
  );
}
