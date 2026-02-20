## Why

현재 추천 시스템은 완전 랜덤이라 어제 먹은 식당이 오늘 또 추천될 수 있다. 추천 기록을 저장하고, 최근 추천 이력을 기반으로 중복을 방지하면 사용자 만족도가 크게 향상된다.

## What Changes

- 추천 결과를 날짜/시간과 함께 히스토리로 자동 저장
- 히스토리 조회 페이지 추가 (최근 N일간 기록)
- 추천 API에 스마트 추천 모드 추가: 최근 N일 내 추천된 식당을 제외하고 추천
- 모든 식당이 최근 추천된 경우 폴백으로 일반 랜덤 추천 수행

## Capabilities

### New Capabilities
- `recommendation-history`: 추천 결과의 저장, 조회, 삭제를 담당. 히스토리 데이터 모델과 API, 조회 UI 포함.
- `smart-recommend`: 히스토리 기반 중복 방지 추천 로직. 최근 N일 내 추천 식당 제외 필터링과 폴백 전략 포함.

### Modified Capabilities
- `category-recommendation`: 추천 API가 스마트 추천 모드를 지원하도록 확장. 기존 랜덤 추천은 그대로 유지하면서 중복 방지 옵션 추가.

## Impact

- **데이터**: `data/history.json` 파일 추가 (히스토리 저장소)
- **API**: `POST /api/history` (저장), `GET /api/history` (조회), `GET /api/recommend` (smart 파라미터 추가)
- **UI**: 히스토리 조회 페이지 추가, 네비게이션에 "기록" 메뉴 추가
- **Lib**: `lib/history/service.ts` (히스토리 서비스), `lib/recommend/service.ts` (스마트 추천 로직 추가)
