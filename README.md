### 프로젝트 생성 및 패키치 설치
```
npm create vite@latest pfp10 -- --template react-ts
npm install zustand react-router-dom 
```

### 파일 구조 설정
```
src/
  ├── components/    # 재사용 가능한 컴포넌트
  ├── pages/         # 페이지 컴포넌트
  ├── store/         # Zustand 스토어
  ├── types/         # TypeScript 타입 정의
  ├── App.tsx        # 라우팅 설정
  └── index.tsx      # 진입점
```