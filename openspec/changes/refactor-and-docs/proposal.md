 ## Why

2개 피처(category-menu-recommender, history-smart-recommend) 구현이 완료된 시점이다. 프로젝트 규칙으로 2개 피처마다 리팩토링 사이클을 실행하여 기술 부채를 조기에 정리하고 유지보수성을 유지한다. 현재 페이지 간 fetch/에러 처리 중복, manage 페이지 비대화, 타입 재정의 등 정리가 필요한 항목이 쌓여 있다.

## What Changes

- 페이지 공통 fetch + 에러 처리 로직을 커스텀 훅으로 추출
- `manage/page.tsx`를 여러 컴포넌트로 분리 (RestaurantForm, RestaurantCard 등)
- 페이지에서 중복 정의된 타입을 `lib/types`에서 import하도록 통일
- API 엔드포인트 문자열을 상수로 추출
- 인라인 유틸리티 함수(formatDate 등)를 공유 모듈로 이동
- manage 페이지의 에러 시 loading 상태 미해제 버그 수정

## Capabilities

### New Capabilities
- `shared-ui-patterns`: 공통 커스텀 훅(useFetch), API 경로 상수, 유틸리티 함수 등 프론트엔드 공유 패턴

### Modified Capabilities
_(요구사항 변경 없음 - 구현 세부사항만 리팩토링)_

## Impact

- `app/page.tsx`, `app/history/page.tsx`, `app/manage/page.tsx` — fetch 로직 훅으로 교체
- `app/manage/page.tsx` — 컴포넌트 분리로 파일 구조 변경
- `app/history/page.tsx` — 타입 import 변경, formatDate 외부 모듈로 이동
- 새 파일 추가: `lib/hooks/`, `lib/utils/`, `lib/api/routes.ts`, `app/manage/` 하위 컴포넌트
- API 동작 및 기존 스펙 변경 없음
