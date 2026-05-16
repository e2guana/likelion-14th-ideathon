# FairMate Frontend

FairMate는 조별과제에서 생기는 자료 분산, 역할 떠넘기기, 초기 눈치싸움을 줄이기 위한 All-in-One 협업 워크스페이스 시연 앱입니다. 현재 구현은 프론트엔드만 사용하며, 모든 데이터는 React state로 관리됩니다.

## 구현한 기능

- 워크스페이스 개설: 과제명, 수업명, 마감일을 입력해 과제용 공간을 생성하는 화면
- 팀원 초대: 이메일과 대표 강점을 입력해 초대 목록에 팀원을 추가
- AI 역할 분배: 팀원의 강점과 주당 가능 시간을 계산해 역할 추천 결과를 즉시 갱신
- 통합 도구 표현: 문서 공동 편집, 스마트 칸반, 팀 채팅, 회의록 보관을 하나의 워크스페이스에 묶어 표현

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 Vite가 안내하는 로컬 주소를 엽니다. 보통 `http://localhost:5173`입니다.

## 프로젝트 구조

```text
src/
  App.jsx      # 화면 상태, 팀원 초대, 역할 추천 알고리즘
  App.css      # 서비스 화면 레이아웃과 컴포넌트 스타일
  index.css    # 전역 토큰, 글꼴, 기본 스타일
```

## 프론트엔드만으로 구현하는 방식

1. `App.jsx`의 `workspace` state가 워크스페이스 정보를 저장합니다.
2. `members` state가 초대된 팀원, 강점, 가능 시간을 저장합니다.
3. `recommendRoles()`가 역할별 요구 역량과 팀원 데이터를 비교해 추천 결과를 만듭니다.
4. 사용자가 가능 시간을 조정하면 `useMemo`가 추천 결과를 다시 계산합니다.

백엔드가 필요해지는 시점에는 `members`와 `workspace` state를 API 응답으로 교체하면 됩니다.

## 배포하기

### Vercel

1. GitHub에 프로젝트를 올립니다.
2. [Vercel](https://vercel.com)에 로그인합니다.
3. `Add New Project`에서 이 저장소를 선택합니다.
4. Framework Preset은 `Vite`로 둡니다.
5. Build Command는 `npm run build`, Output Directory는 `dist`를 사용합니다.
6. `Deploy`를 누르면 배포 URL이 생성됩니다.

### Netlify

1. GitHub에 프로젝트를 올립니다.
2. [Netlify](https://www.netlify.com)에 로그인합니다.
3. `Add new site`에서 이 저장소를 연결합니다.
4. Build command에 `npm run build`를 입력합니다.
5. Publish directory에 `dist`를 입력합니다.
6. 배포를 실행합니다.

### GitHub Pages

GitHub Pages를 쓸 경우 저장소명이 하위 경로가 되므로 `vite.config.js`에 `base` 설정이 필요할 수 있습니다.

```js
export default defineConfig({
  base: '/저장소명/',
  plugins: [react()],
})
```

이후 `npm run build`로 생성된 `dist` 폴더를 GitHub Pages 배포 워크플로에 연결합니다.

## 확인 명령어

```bash
npm run lint
npm run build
```
