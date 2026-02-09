## Why

팀원들이 매일 점심 메뉴를 고르는 데 시간을 낭비하고 있다. 주변 식당과 메뉴를 카테고리별로 관리하고, 웹에서 랜덤 추천을 받을 수 있는 도구가 필요하다.

## What Changes

- Next.js 기반 풀스택 웹 앱 구축
- 식당(상호명) + 카테고리 + 메뉴를 관리하는 API (Next.js API Routes)
- 식당/메뉴 추가·삭제 기능 (React UI)
- 카테고리(한식/중식/일식/양식) 기반 랜덤 추천 기능 (웹 화면)
- 추천 시 상호명과 메뉴를 함께 출력

## Capabilities

### New Capabilities
- `restaurant-management`: 식당과 메뉴 데이터를 추가/삭제/조회하는 웹 UI + API
- `category-recommendation`: 카테고리별 랜덤 메뉴 추천 웹 화면

### Modified Capabilities
<!-- 해당 없음 - 신규 프로젝트 -->

## Impact

- `src/app/`: Next.js App Router 기반 페이지 및 API Routes (신규)
- `data/restaurants.json`: 식당·메뉴 데이터 저장소 (신규, JSON 파일 기반)
- `package.json`: Next.js, React, TypeScript 의존성 추가
