// 툴팁 내용
export const bditooltips = {
  bdisum: {
    title: 'Beck Depression Inventory (BDI) 총점',
    description: 'BDI는 우울증의 심각도를 평가하는 21개 문항으로 구성됩니다.',
    interpretation: [
      { range: '0-9', meaning: '정상' },
      { range: '10-15', meaning: '가벼운 우울' },
      { range: '16-23', meaning: '중등도 우울' },
      { range: '24-63', meaning: '심한 우울' },
    ],
  },
  affective: {
    title: '*BDISUM에 대한 비율',
    description: 'Affective 문항:',
    items: [
      '슬픔(bdi01)',
      '즐거움 상실(bdi04)',
      '울음(bdi10)',
      '우유부단(bdi13)',
      '초조(bdi11)',
      '흥미상실(bdi12)',
    ],
  },
  cognitive: {
    title: '*BDISUM에 대한 비율',
    description: 'Cognitive 문항:',
    items: [
      '비관주의(bdi02)',
      '실패감(bdi03)',
      '죄책감(bdi05)',
      '벌 받는 느낌(bdi06)',
      '자기혐오(bdi07)',
      '자기비난(bdi08)',
      '자살사고(bdi09)',
      '무가치함(bdi14)',
    ],
  },
  somatic: {
    title: '*BDISUM에 대한 비율',
    description: 'Somatic 문항:',
    items: [
      '사회적 위축(bdi15)',
      '수면문제(bdi16)',
      '피로감(bdi17)',
      '식욕변화(bdi18)',
      '집중력저하(bdi19)',
      '체중변화(bdi20)',
      '성적관심 감소(bdi21)',
    ],
  },
};


export type Tootip = {
  title: string;
  description: string;
  interpretation?: { range: string, meaning: string }[];
  items?: string[];
}