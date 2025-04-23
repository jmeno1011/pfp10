import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// 타입 정의
interface SessionData {
  sequence: number;
  emotion: string;
  endDate: string;
  bdiEntries: BdiEntry[];
  emotionData: EmotionData[];
}

interface BdiEntry {
  id: string;
  title: string;
  question: string;
  answer: string;
  emotion: string;
}

interface EmotionData {
  category: string;
  fear: number;
  surprise: number;
  anger: number;
  sadness: number;
  neutral: number;
  happiness: number;
  disgust: number;
}

// 예시 데이터
const mockSessionData: SessionData[] = [
  {
    sequence: 35,
    emotion: "중립",
    endDate: "2022-06-21 18:33:14",
    bdiEntries: [
      {
        id: "BDI01",
        title: "슬픔",
        question: "그리던 분노, 슬픔, 둘기음과 같은 감정으로 느껴지지 않나요?",
        answer: "응",
        emotion: "중립",
      },
      {
        id: "BDI02",
        title: "비관주의",
        question: "혹시... 죄많이 짓다고 느껴나요?",
        answer: "아니아니",
        emotion: "중립",
      },
      // 더 많은 BDI 데이터...
    ],
    emotionData: [
      { category: "BDI01", fear: 0.1, surprise: 0.2, anger: 0.05, sadness: 0.3, neutral: 0.7, happiness: 0.1, disgust: 0.05 },
      { category: "BDI02", fear: 0.15, surprise: 0.05, anger: 0.1, sadness: 0.2, neutral: 0.8, happiness: 0.05, disgust: 0.1 },
      // 더 많은 감정 데이터...
    ],
  },
  {
    sequence: 34,
    emotion: "중립",
    endDate: "2022-06-09 15:01:03",
    bdiEntries: [
      // BDI 데이터...
    ],
    emotionData: [
      // 감정 데이터...
    ],
  },
  // 더 많은 세션 데이터...
];

// 색상 정의
const emotionColors = {
  fear: "#6366F1", // 공포 - 인디고
  surprise: "#8B5CF6", // 놀람 - 보라
  anger: "#EC4899", // 분노 - 핑크
  sadness: "#3B82F6", // 슬픔 - 파랑
  neutral: "#9CA3AF", // 중립 - 회색
  happiness: "#F59E0B", // 행복 - 황색
  disgust: "#10B981", // 혐오 - 녹색
};


export default function EmotionSection() {
  const [selectedSession, setSelectedSession] = useState<SessionData>(mockSessionData[0]);
  // 차트 옵션 설정
  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: true
      },
    },
    colors: Object.values(emotionColors),
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: selectedSession.emotionData.map(item => item.category),
    },
    legend: {
      position: "bottom",
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  // 차트 시리즈 데이터
  const chartSeries = [
    {
      name: "공포",
      data: selectedSession.emotionData.map(item => item.fear),
    },
    {
      name: "놀람",
      data: selectedSession.emotionData.map(item => item.surprise),
    },
    {
      name: "분노",
      data: selectedSession.emotionData.map(item => item.anger),
    },
    {
      name: "슬픔",
      data: selectedSession.emotionData.map(item => item.sadness),
    },
    {
      name: "중립",
      data: selectedSession.emotionData.map(item => item.neutral),
    },
    {
      name: "행복",
      data: selectedSession.emotionData.map(item => item.happiness),
    },
    {
      name: "혐오",
      data: selectedSession.emotionData.map(item => item.disgust),
    },
  ];

  // 세션 선택 핸들러
  const handleSessionSelect = (session: SessionData) => {
    setSelectedSession(session);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">감정 분석 대시보드</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 회차별 감정 상태 테이블 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">회차 별 감정 상태</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">SEQUENCE</TableHead>
                  <TableHead className="w-24">EMOTION</TableHead>
                  <TableHead>ENDDATE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSessionData.map((session) => (
                  <TableRow 
                    key={session.sequence}
                    className={`cursor-pointer ${
                      selectedSession.sequence === session.sequence ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleSessionSelect(session)}
                  >
                    <TableCell>{session.sequence}</TableCell>
                    <TableCell>{session.emotion}</TableCell>
                    <TableCell>{session.endDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            1-{mockSessionData.length} of {mockSessionData.length}
          </div>
        </div>

        {/* 항목별 감정 수치 차트 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">항목 별 감정 수치</h2>
          <div className="h-80">
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="line"
              height="100%"
            />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {Object.entries(emotionColors).map(([emotion, color]) => (
              <div key={emotion} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-xs">
                  {
                    {
                      fear: "공포",
                      surprise: "놀람",
                      anger: "분노",
                      sadness: "슬픔",
                      neutral: "중립",
                      happiness: "행복",
                      disgust: "혐오",
                    }[emotion as keyof typeof emotionColors]
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 문답 결과 및 감정 상태 테이블 */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">문답 결과 및 감정 상태</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">BDIENTEY</TableHead>
                <TableHead className="w-1/3">QUESTION</TableHead>
                <TableHead className="w-1/4">ANSWER</TableHead>
                <TableHead className="w-24">EMOTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedSession.bdiEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.id}</TableCell>
                  <TableCell>{entry.question}</TableCell>
                  <TableCell>{entry.answer}</TableCell>
                  <TableCell>{entry.emotion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          1-{selectedSession.bdiEntries.length} of {selectedSession.bdiEntries.length}
        </div>
      </div>
    </div>
  );
}
