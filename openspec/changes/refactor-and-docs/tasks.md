## 1. 공유 인프라 생성

- [x] 1.1 `lib/api/routes.ts` 생성 — API 경로 상수 및 동적 경로 헬퍼 함수 정의
- [x] 1.2 `lib/hooks/useApi.ts` 생성 — GET 요청용 `useApi` 훅 (data, error, loading, fetch)
- [x] 1.3 `lib/hooks/useApiMutation.ts` 생성 — POST/DELETE용 `useApiMutation` 훅 (execute, error)
- [x] 1.4 `lib/utils/date.ts` 생성 — `formatDate` 함수를 history 페이지에서 이동
- [x] 1.5 `lib/types/index.ts`에 `GroupedHistory` 인터페이스 추가

## 2. manage 페이지 컴포넌트 분리

- [x] 2.1 `app/manage/RestaurantForm.tsx` 추출 — 식당 추가 폼 (입력, 카테고리 선택, 추가 버튼)
- [x] 2.2 `app/manage/RestaurantCard.tsx` 추출 — 식당 카드 (식당 정보, 메뉴 목록, 메뉴 추가/삭제)
- [x] 2.3 `app/manage/page.tsx` 리팩토링 — 상태 관리 + 컴포넌트 조합만 남기기

## 3. 페이지별 훅 및 상수 적용

- [x] 3.1 `app/page.tsx` — useApi 훅 적용, API 경로 상수 사용
- [x] 3.2 `app/manage/page.tsx` — useApi/useApiMutation 훅 적용, API 경로 상수 사용, 에러 시 loading 미해제 버그 수정
- [x] 3.3 `app/history/page.tsx` — 중복 타입 제거 후 `lib/types`에서 import, formatDate를 `lib/utils/date`에서 import, API 경로 상수 사용

## 4. 검증

- [x] 4.1 빌드 성공 확인 (`npm run build`)
- [x] 4.2 추천 페이지 동작 확인 (카테고리 선택, 추천, 에러 표시)
- [x] 4.3 관리 페이지 동작 확인 (식당 추가/삭제, 메뉴 추가/삭제, 에러 처리)
- [x] 4.4 히스토리 페이지 동작 확인 (기록 조회, 날짜 포맷)
