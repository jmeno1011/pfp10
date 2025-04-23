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

// BDI-2 문항 정의
const bdiQuestions = [
  { id: "BDI01", title: "슬픔", question: "당신은 얼마나 자주 슬픔을 느끼십니까?" },
  { id: "BDI02", title: "비관주의", question: "당신의 미래에 대해 어떻게 생각하십니까?" },
  { id: "BDI03", title: "과거의 실패", question: "과거를 돌아봤을 때 실패했다고 느끼십니까?" },
  { id: "BDI04", title: "즐거움 상실", question: "일상 활동에서 즐거움을 느끼십니까?" },
  { id: "BDI05", title: "죄책감", question: "자신에게 죄책감이 있다고 느끼십니까?" },
  { id: "BDI06", title: "벌받는 느낌", question: "벌을 받고 있다고 느끼십니까?" },
  { id: "BDI07", title: "자기혐오", question: "자신에 대해 어떻게 느끼십니까?" },
  { id: "BDI08", title: "자기비판", question: "자신을 비판하거나 비난하는 경향이 있습니까?" },
  { id: "BDI09", title: "자살사고", question: "자살에 대한 생각이 있으십니까?" },
  { id: "BDI10", title: "울음", question: "얼마나 자주 우십니까?" },
  { id: "BDI11", title: "초조", question: "평소보다 더 초조하거나 긴장되어 있습니까?" },
  { id: "BDI12", title: "흥미상실", question: "사람들이나 활동에 대한 흥미가 줄었습니까?" },
  { id: "BDI13", title: "우유부단", question: "결정을 내리는 데 어려움이 있습니까?" },
  { id: "BDI14", title: "무가치함", question: "자신이 가치없다고 느끼십니까?" },
  { id: "BDI15", title: "기력상실", question: "일을 하기 위한 에너지가 있습니까?" },
  { id: "BDI16", title: "수면 양상 변화", question: "수면 패턴에 변화가 있습니까?" },
  { id: "BDI17", title: "짜증", question: "평소보다 더 짜증을 내십니까?" },
  { id: "BDI18", title: "식욕변화", question: "식욕에 변화가 있습니까?" },
  { id: "BDI19", title: "주의집중 어려움", question: "집중하는 데 어려움이 있습니까?" },
  { id: "BDI20", title: "피로감", question: "평소보다 더 피곤하거나 피로하십니까?" },
  { id: "BDI21", title: "성에 대한 흥미상실", question: "성에 대한 관심이 줄었습니까?" },
];

// 답변 샘플
const answerSamples = [
  "아니오", "가끔", "자주", "항상",
  "전혀 그렇지 않다", "약간 그렇다", "상당히 그렇다", "매우 그렇다",
  "그렇지 않다", "조금 그렇다", "많이 그렇다", "매우 많이 그렇다",
  "괜찮다", "그럭저럭", "힘들다", "매우 힘들다"
];

// 감정 샘플
const emotionSamples = ["중립", "슬픔", "분노", "불안", "행복", "혐오", "놀람"];

// 날짜 생성 함수
const generateRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().slice(0, 10) + ' ' +
    String(Math.floor(Math.random() * 24)).padStart(2, '0') + ':' +
    String(Math.floor(Math.random() * 60)).padStart(2, '0') + ':' +
    String(Math.floor(Math.random() * 60)).padStart(2, '0');
};

// 더미 데이터 생성 함수
const generateMockData = (sessions: number): SessionData[] => {
  const mockData: SessionData[] = [];
  const startDate = new Date('2022-01-01');
  const endDate = new Date('2022-06-30');

  for (let i = sessions; i > 0; i--) {
    const sessionEmotion = emotionSamples[Math.floor(Math.random() * emotionSamples.length)];
    const sessionDate = generateRandomDate(startDate, endDate);

    // BDI 항목별 데이터 생성
    const bdiEntries: BdiEntry[] = [];
    const emotionData: EmotionData[] = [];

    for (const question of bdiQuestions) {
      // 문답 데이터 생성
      const entryEmotion = emotionSamples[Math.floor(Math.random() * emotionSamples.length)];
      const answer = answerSamples[Math.floor(Math.random() * answerSamples.length)];

      bdiEntries.push({
        id: question.id,
        title: question.title,
        question: question.question,
        answer: answer,
        emotion: entryEmotion
      });

      // 감정 수치 데이터 생성
      emotionData.push({
        category: question.id,
        fear: parseFloat((Math.random() * 0.4).toFixed(2)),
        surprise: parseFloat((Math.random() * 0.4).toFixed(2)),
        anger: parseFloat((Math.random() * 0.4).toFixed(2)),
        sadness: parseFloat((Math.random() * 0.4).toFixed(2)),
        neutral: parseFloat((Math.random() * 0.8).toFixed(2)),  // 중립은 좀 더 높은 경향
        happiness: parseFloat((Math.random() * 0.4).toFixed(2)),
        disgust: parseFloat((Math.random() * 0.4).toFixed(2))
      });
    }

    mockData.push({
      sequence: i,
      emotion: sessionEmotion,
      endDate: sessionDate,
      bdiEntries: bdiEntries,
      emotionData: emotionData
    });
  }

  // 날짜순으로 정렬
  return mockData.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
};

// 11회차 더미 데이터 생성
const mockSessionData: SessionData[] = generateMockData(11);

export default mockSessionData;