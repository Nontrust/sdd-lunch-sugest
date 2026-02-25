## Why

2개 피처(category-menu-recommender, history-smart-recommend) 구현이 완료된 시점이다. 프로젝트 규칙으로 2개 피처마다 리팩토링 사이클을 실행하여 기술 부채를 조기에 정리하고 유지보수성을 유지한다. 현재 페이지 간 fetch/에러 처리 중복, manage 페이지 비대화, 타입 재정의 등 정리가 필요한 항목이 쌓여 있다.

**아키텍처 리뷰 결과:** 서비스 레이어가 스토리지를 직접 import하여 확장성과 테스트 용이성이 낮음을 확인. recommend API 라우트에 오케스트레이션 로직이 혼재되어 관심사 분리 부족. 프로젝트에 아키텍처 규칙 자체가 명세되어 있지 않아 판단 기준 부재. → 서비스 레이어 인터페이스 분리 + 아키텍처/리팩토링 규칙 명세를 범위에 포함.

## What Changes

### 프론트엔드
- 페이지 공통 fetch + 에러 처리 로직을 커스텀 훅으로 추출
- `manage/page.tsx`를 여러 컴포넌트로 분리 (RestaurantForm, RestaurantCard 등)
- 페이지에서 중복 정의된 타입을 `lib/types`에서 import하도록 통일
- API 엔드포인트 문자열을 상수로 추출
- 인라인 유틸리티 함수(formatDate 등)를 공유 모듈로 이동
- manage 페이지의 에러 시 loading 상태 미해제 버그 수정

### 백엔드
- 스토리지를 `RestaurantRepository`, `HistoryRepository` 인터페이스로 추상화
- 모든 서비스를 팩토리 함수 패턴(`createXxxService(repo)`)으로 전환
- recommend API 라우트의 오케스트레이션 로직(pick + addRecord)을 서비스 레이어로 이동
- `index.ts` re-export로 기존 API 라우트 하위 호환성 유지

### 아키텍처 규칙 명세
- 프로젝트 아키텍처 원칙 정식 스펙 작성 (레이어, 의존 방향, 서비스 패턴, 에러 컨벤션, 프론트 패턴 등)
- 리팩토링 사이클 훅 정식 스펙 작성 (트리거 조건, 아키텍처 리뷰 필수, 이력 추적)

## Capabilities

### New Capabilities
- `shared-ui-patterns`: 공통 커스텀 훅(useApi, useApiMutation), API 경로 상수, 유틸리티 함수 등 프론트엔드 공유 패턴
- `service-layer-interface`: 서비스 레이어 인터페이스 분리 + 팩토리 함수 DI + recommend 오케스트레이션
- `architecture`: 레이어 구조, 의존 방향, 서비스 패턴, 에러/검증/프론트엔드 컨벤션
- `refactoring-cycle`: 2개 피처 완료마다 리팩토링 사이클 트리거 + 아키텍처 리뷰 필수

### Modified Capabilities
_(요구사항 변경 없음 - 구현 세부사항만 리팩토링)_

## Impact

### 프론트엔드
- `app/page.tsx`, `app/history/page.tsx`, `app/manage/page.tsx` — fetch 로직 훅으로 교체
- `app/manage/page.tsx` — 컴포넌트 분리로 파일 구조 변경
- `app/history/page.tsx` — 타입 import 변경, formatDate 외부 모듈로 이동
- 새 파일 추가: `lib/hooks/`, `lib/utils/`, `lib/api/routes.ts`, `app/manage/` 하위 컴포넌트

### 백엔드
- `lib/storage/` — types.ts, file-storage.ts 추가, index.ts 변경
- `lib/restaurant/`, `lib/menu/`, `lib/history/`, `lib/recommend/` — 각각 types.ts 추가, service.ts 팩토리 전환, index.ts 변경
- `app/api/recommend/route.ts` — recommend.recommend() 사용, history import 제거

### 스펙
- `openspec/specs/` — architecture, service-layer-interface, refactoring-cycle 스펙 추가
- `openspec/config.yaml` — 아키텍처/프로젝트 규칙 갱신

### 하위 호환성
- API 동작 및 기존 스펙 변경 없음
- 나머지 API 라우트(restaurants, menus, history) 코드 변경 없음
