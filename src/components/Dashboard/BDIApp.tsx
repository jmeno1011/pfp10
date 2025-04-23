import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  // TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";

interface BDIEntry {
  sequence: number;
  bdisum: number;
  affective: number;
  cognitive: number;
  somatic: number;
  startDate: string;
  endDate: string;
  details: {
    [key: string]: number;
  };
}

interface BDITableProps {
  data: BDIEntry[];
  onSelectEntry?: (entry: BDIEntry) => void;
}

const bdiQuestions: { [key: string]: string } = {
  bdi01: "슬픔",
  bdi02: "비관주의",
  bdi03: "과거의 실패",
  bdi04: "즐거움 상실",
  bdi05: "죄책감",
  bdi06: "벌받는 느낌",
  bdi07: "자기혐오",
  bdi08: "자기비판",
  bdi09: "자살사고",
  bdi10: "울음",
  bdi11: "초조",
  bdi12: "흥미상실",
  bdi13: "우유부단",
  bdi14: "무가치함",
  bdi15: "기력상실",
  bdi16: "수면 양상 변화",
  bdi17: "짜증",
  bdi18: "식욕변화",
  bdi19: "주의집중 어려움",
  bdi20: "피로감",
  bdi21: "성에 대한 흥미상실",
};

// BDI 카테고리 정의
const bdiCategories = {
  affective: ["bdi01", "bdi04", "bdi10", "bdi11", "bdi12", "bdi13"],
  cognitive: [
    "bdi02",
    "bdi03",
    "bdi05",
    "bdi06",
    "bdi07",
    "bdi08",
    "bdi09",
    "bdi14",
  ],
  somatic: ["bdi15", "bdi16", "bdi17", "bdi18", "bdi19", "bdi20", "bdi21"],
};

const BDIExpandableTable: React.FC<BDITableProps> = ({
  data,
  onSelectEntry,
}) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const visibleData = data.slice(startIdx, startIdx + rowsPerPage);

  const handleRowClick = (sequence: number) => {
    if (expandedRow === sequence) {
      setExpandedRow(null);
    } else {
      setExpandedRow(sequence);
      const selectedEntry = data.find((entry) => entry.sequence === sequence);
      if (selectedEntry && onSelectEntry) {
        onSelectEntry(selectedEntry);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");
  };

  const getScoreColor = (score: number) => {
    if (score === 0) return "text-gray-500";
    if (score === 1) return "text-blue-500";
    if (score === 2) return "text-yellow-500";
    if (score === 3) return "text-red-500";
    return "";
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-800 text-white">
            <TableRow>
              <TableCell className="w-10 p-2"></TableCell>
              <TableCell className="text-center font-semibold">
                SEQUENCE
              </TableCell>
              <TableCell className="text-center font-semibold">
                BDISUM
              </TableCell>
              <TableCell className="text-center font-semibold">
                AFFECTIVE (%)
              </TableCell>
              <TableCell className="text-center font-semibold">
                COGNITIVE (%)
              </TableCell>
              <TableCell className="text-center font-semibold">
                SOMATIC (%)
              </TableCell>
              <TableCell className="text-center font-semibold">
                수행 날짜
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleData.map((entry) => (
              <React.Fragment key={entry.sequence}>
                <TableRow
                  className={`cursor-pointer hover:bg-gray-100 ${
                    expandedRow === entry.sequence ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleRowClick(entry.sequence)}
                >
                  <TableCell className="p-2">
                    {expandedRow === entry.sequence ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {entry.sequence}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {entry.bdisum}
                  </TableCell>
                  <TableCell className="text-center">
                    {entry.affective.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-center">
                    {entry.cognitive.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-center">
                    {entry.somatic.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(entry.startDate)}
                  </TableCell>
                </TableRow>
                {expandedRow === entry.sequence && (
                  <TableRow>
                    <TableCell colSpan={7} className="p-0">
                      <div className="bg-gray-50 p-4">
                        <h3 className="text-lg font-medium text-center mb-4">
                          BDI 문항 결과
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <h4 className="font-medium text-red-500 mb-2">
                              Affective
                            </h4>
                            <ul className="space-y-1">
                              {bdiCategories.affective.map((key) => (
                                <li key={key} className="flex justify-between">
                                  <span>
                                    {key} ({bdiQuestions[key]})
                                  </span>
                                  <span
                                    className={getScoreColor(
                                      entry.details[key]
                                    )}
                                  >
                                    {entry.details[key]}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <h4 className="font-medium text-orange-500 mb-2">
                              Cognitive
                            </h4>
                            <ul className="space-y-1">
                              {bdiCategories.cognitive.map((key) => (
                                <li key={key} className="flex justify-between">
                                  <span>
                                    {key} ({bdiQuestions[key]})
                                  </span>
                                  <span
                                    className={getScoreColor(
                                      entry.details[key]
                                    )}
                                  >
                                    {entry.details[key]}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <h4 className="font-medium text-green-500 mb-2">
                              Somatic
                            </h4>
                            <ul className="space-y-1">
                              {bdiCategories.somatic.map((key) => (
                                <li key={key} className="flex justify-between">
                                  <span>
                                    {key} ({bdiQuestions[key]})
                                  </span>
                                  <span
                                    className={getScoreColor(
                                      entry.details[key]
                                    )}
                                  >
                                    {entry.details[key]}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border rounded p-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            {startIdx + 1}-{Math.min(startIdx + rowsPerPage, data.length)} of{" "}
            {data.length}
          </span>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-1 rounded border disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4 transform rotate-180" />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-1 rounded border disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// App 컴포넌트: BDI 대시보드와 테이블 통합
const BDIApp: React.FC = () => {
  const [bdiData, setBdiData] = useState<BDIEntry[]>([]);
  // const [selectedEntry, setSelectedEntry] = useState<BDIEntry | null>(null);

  useEffect(() => {
    // 더미 데이터 생성
    const generateDummyData = (): BDIEntry[] => {
      // 현재로부터 35일 전부터 시작
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 35);

      return Array.from({ length: 35 }, (_, i) => {
        // 각 항목 0-3점 랜덤 생성
        const details: { [key: string]: number } = {};
        Object.keys(bdiQuestions).forEach((key) => {
          details[key] = Math.floor(Math.random() * 4);
        });

        // 카테고리별 점수 계산
        const affectiveScore = bdiCategories.affective.reduce(
          (sum, key) => sum + details[key],
          0
        );
        const cognitiveScore = bdiCategories.cognitive.reduce(
          (sum, key) => sum + details[key],
          0
        );
        const somaticScore = bdiCategories.somatic.reduce(
          (sum, key) => sum + details[key],
          0
        );
        const totalScore = affectiveScore + cognitiveScore + somaticScore;

        // 날짜 계산 (각 항목은 약 1일 간격)
        const entryDate = new Date(startDate);
        entryDate.setDate(entryDate.getDate() + i);

        // 다음 항목의 날짜는 현재 항목보다 1-3일 후
        const endDate = new Date(entryDate);
        endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 3) + 1);

        return {
          sequence: 35 - i, // 최신 항목이 가장 높은 번호
          bdisum: totalScore,
          affective: (affectiveScore / totalScore) * 100,
          cognitive: (cognitiveScore / totalScore) * 100,
          somatic: (somaticScore / totalScore) * 100,
          startDate: entryDate.toISOString(),
          endDate: endDate.toISOString(),
          details,
        };
      }).sort((a, b) => b.sequence - a.sequence); // 시퀀스 번호로 내림차순 정렬
    };

    setBdiData(generateDummyData());
  }, []);

  // const handleSelectEntry = (entry: BDIEntry) => {
  //   setSelectedEntry(entry);
  //   // 여기서 대시보드 데이터도 업데이트할 수 있음
  // };

  return (
    <BDIExpandableTable
      data={bdiData}
      // onSelectEntry={handleSelectEntry}
    />
  );
};

export default BDIApp;
