# Interplug AI Workshop

Whale ERP를 AI와 함께 개발한 경험을 나누는 사내 워크숍(2026-11-27, 전 직원 대상)의 초대 페이지입니다. 라우트는 `/` 하나뿐인 한 장짜리 페이지입니다.

화면은 위에서부터 이렇게 이어집니다.

1. 2초 로딩 스피너 (5×5 도트 매트릭스 사운드 바)
2. 히어로: 고래 배경 영상, 헤드라인, 행사 일자, 저장소 수치
3. 세션 섹션: 세션 소개 → AI와 일하는 방식 → 성과 → 출시 영상 → 부족했던 점 → 다음 프로젝트
4. 마무리 화면과 푸터

## 기술 스택

- Next.js 16 (App Router), React 19, TypeScript
- React Compiler, `cacheComponents` 사용 (`next.config.ts`)
- 스타일: `src/app/globals.css` 의 일반 CSS. Tailwind는 import만 되어 있고 유틸리티 클래스는 쓰지 않습니다.
- 글꼴: Pretendard (jsDelivr CDN), Instrument Serif · JetBrains Mono (`next/font/google`)
- 패키지 매니저: pnpm (`package.json` 의 `packageManager` 로 고정)

> 이 버전의 Next.js는 학습 자료와 API가 다를 수 있습니다. 코드를 쓰기 전에 `node_modules/next/dist/docs/` 의 해당 가이드를 확인하세요 (`AGENTS.md` 참고).

## 시작하기

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

| 명령 | 용도 |
|---|---|
| `pnpm dev` | 개발 서버 |
| `pnpm build` | 프로덕션 빌드 (페이지는 정적으로 프리렌더됩니다) |
| `pnpm start` | 빌드 결과 실행 |
| `pnpm lint` | ESLint |

변경 후에는 `pnpm lint` 와 `pnpm build` 가 통과하는지 확인합니다.

## 폴더 구조

```
src/app/
  layout.tsx             메타데이터, 글꼴, <html> 에 .js 클래스를 붙이는 인라인 스크립트
  page.tsx               히어로 마크업 + 로더 + 섹션 조립
  hero-motion.tsx        (client) 히어로 등장 애니메이션, 배경 영상 페이드인, 수치 카운트업
  sound-bars-loader.tsx  (client) 2초 로딩 스피너, LOADER_MS 정의
  sections.tsx           히어로 아래 세션 섹션 전체 (서버 컴포넌트)
  film.tsx               (client) 클릭하면 로드되는 YouTube 출시 영상
  globals.css            디자인 토큰과 모든 스타일
  icon.svg               파비콘
public/assets/
  hero.mp4, poster.jpg   히어로 배경 영상과 포스터
  closing.jpg            마무리 화면 배경
  film-poster.jpg        출시 영상 썸네일
```

## 자주 하는 수정

### 문구와 수치

- 히어로 문구와 하단 수치는 `src/app/page.tsx` 에 있습니다. 수치는 `data-count` 속성 값까지 함께 바꿔야 카운트업 결과가 맞습니다.
- 세션 섹션의 목차, 흐름 단계, 성과 수치, 차트 값, 논의 주제는 `src/app/sections.tsx` 위쪽의 배열(`AGENDA`, `FLOW`, `RULES`, `RESULTS`, `FIXES`, `TOPICS`)만 고치면 됩니다.
- 수치 출처는 사내 보고 덱(2026-10-30 저장소 분석 기준)입니다. 히어로 수치(커밋 5,144 · AI 공동 작성 81.5% · 저장소 3 · 10주)와 덱 수치(작업 이력 4,435 · 82% · 저장소 4 · 2개월)는 기준 시점이 달라 서로 다릅니다. 수치를 바꿀 때는 어느 기준인지 먼저 확인하세요.

### 행사 일자

`2026-11-27` 은 히어로(`page.tsx`)와 마무리 화면(`sections.tsx`) 두 곳에 있습니다. `<time dateTime>` 값도 함께 바꿉니다.

### 로딩 시간

`sound-bars-loader.tsx` 의 `LOADER_MS` 하나만 바꾸면 됩니다. `hero-motion.tsx` 가 이 값을 가져와 히어로 등장을 그만큼 늦춥니다.

### 출시 영상 교체

`film.tsx` 의 `ID` 를 새 YouTube 영상 ID로 바꾸고, `public/assets/film-poster.jpg` 를 새 썸네일(16:9)로 교체합니다. 영상 길이 표시(`0:21`)와 `sections.tsx` 의 소개 문구도 맞춰 줍니다.

### 색과 글꼴

`globals.css` 맨 위 `:root` 의 토큰을 씁니다.

| 토큰 | 값 | 용도 |
|---|---|---|
| `--bg` | `#02060a` | 배경. 히어로 영상 가장자리 색과 같습니다 |
| `--accent` | `#7fe7f2` | 강조색. 점, ✦, 강조 단어, 재생 버튼에만 씁니다 |
| `--fg` | `0 0% 100%` | 글자색. `hsl(var(--fg) / .66)` 처럼 투명도로 위계를 나눕니다 |
| `--line` | 흰색 12% | 구분선 |
| `--gx` | `clamp(20px,5vw,72px)` | 좌우 여백 |

## 구현 메모

- **스크립트가 꺼진 경우**: 등장 애니메이션은 `<html>` 에 `.js` 클래스가 있을 때만 걸립니다. 클래스가 없으면 모든 요소가 처음부터 보이고 로더도 숨겨집니다. 인라인 스크립트가 하이드레이션 전에 클래스를 바꾸기 때문에 `<html>` 에 `suppressHydrationWarning` 을 붙였습니다.
- **스크롤 등장 효과**: CSS 스크롤 애니메이션(`animation-timeline: view()`)으로만 만들었고 JS는 쓰지 않습니다. 지원하지 않는 브라우저에서는 애니메이션 없이 처음부터 보이는 것이 정상입니다.
- **동작 줄이기**: `prefers-reduced-motion` 을 켠 사용자에게는 배경 영상 대신 포스터를 보여 주고, 카운트업·스크롤 효과를 끄며, 로더 막대를 멈춥니다.
- **한글 강조**: Instrument Serif 에는 한글이 없습니다. 섹션 제목의 한글 강조(`h2 em`)는 색만 바꾸고, 세리프 이탤릭은 라틴 문자(히어로의 "with AI", 수치)에만 씁니다.
- **YouTube**: 재생 버튼을 누르기 전에는 YouTube를 전혀 불러오지 않습니다. 누르면 `youtube-nocookie.com` 으로 불러와 바로 재생합니다.
- **큰 화면**: 1441px 이상에서는 1440×900 화면을 기준으로 히어로 전체를 같은 비율로 키웁니다. 16:9보다 넓은 화면에서는 배경 영상을 16:9로 두고 오른쪽 끝을 배경색으로 흐립니다.

## 저장소 주의

이 저장소는 **공개**입니다. 디자인 시안(`docs/result/`)과 사내 보고 덱(`docs/ref/`)은 `.gitignore` 로 빼 두었으니 로컬에서만 참고하고 커밋하지 마세요.
