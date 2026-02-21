## Context

2개 피처 완료 후 첫 번째 리팩토링 사이클이다. 현재 3개 페이지(추천, 기록, 관리)에서 fetch/에러 처리가 각각 다른 방식으로 구현되어 있고, manage 페이지는 170줄 단일 컴포넌트로 모든 로직을 포함한다. history 페이지는 `lib/types`에 이미 있는 타입을 재정의하고 있다.

## Goals / Non-Goals

**Goals:**
- 페이지 간 중복 fetch/에러 처리 패턴을 단일 커스텀 훅으로 통합
- manage 페이지를 읽기 쉬운 크기의 컴포넌트로 분리
- 타입 정의를 `lib/types` 한 곳으로 통일
- API 경로 문자열을 상수로 관리
- 공유 유틸리티 함수를 별도 모듈로 추출
- 에러 시 loading 상태 미해제 버그 수정

**Non-Goals:**
- API 동작이나 응답 형식 변경
- 공통 UI 컴포넌트(Button, Card 등) 추출 — 아직 패턴이 충분히 반복되지 않음
- 서비스 레이어(lib/) 리팩토링 — 현재 구조로 충분함
- 테스트 추가

## Decisions

### 1. 커스텀 훅 `useApi` 도입

**결정:** `lib/hooks/useApi.ts`에 fetch + 에러 + loading 상태를 관리하는 훅 생성

**이유:** 3개 페이지 모두 `useState` + `fetch` + `res.ok` 체크 + `setError` 패턴을 반복한다. manage 페이지는 에러 시 loading 해제를 누락하는 버그도 있다. 훅으로 통합하면 이런 실수를 구조적으로 방지할 수 있다.

**대안:** API 클래스 생성 → 상태 관리까지 포함하지 못해 중복이 남으므로 훅이 적합

**인터페이스:**
```typescript
// GET 요청: data fetch + loading + error 자동 관리
const { data, error, loading, fetch } = useApi<T>();

// Mutation (POST/DELETE): execute 함수 + 에러 관리
const { execute, error } = useApiMutation();
```

### 2. manage 페이지 컴포넌트 분리

**결정:** `app/manage/` 하위에 3개 컴포넌트 추출

| 컴포넌트 | 역할 |
|---|---|
| `RestaurantForm.tsx` | 식당 추가 폼 (입력 + 카테고리 선택 + 추가 버튼) |
| `RestaurantCard.tsx` | 개별 식당 카드 (식당 정보 + 메뉴 목록 + 메뉴 추가/삭제) |
| `page.tsx` | 오케스트레이션만 (상태 관리 + 컴포넌트 조합) |

**이유:** 현재 170줄 단일 파일에서 폼, 카드, 메뉴 입력이 모두 섞여 있다. 역할별로 분리하면 각 파일이 50-80줄로 줄어든다.

**대안:** MenuInput 컴포넌트 추가 분리 → RestaurantCard 안에 포함해도 충분한 크기이므로 과분리 방지

### 3. API 경로 상수 관리

**결정:** `lib/api/routes.ts`에 엔드포인트 상수 및 헬퍼 함수 정의

```typescript
export const API = {
  RESTAURANTS: "/api/restaurants",
  RECOMMEND: "/api/recommend",
  HISTORY: "/api/history",
  restaurant: (id: string) => `/api/restaurants/${id}`,
  menus: (restaurantId: string) => `/api/restaurants/${restaurantId}/menus`,
  menu: (restaurantId: string, menuId: string) =>
    `/api/restaurants/${restaurantId}/menus/${menuId}`,
};
```

**이유:** 현재 6개 이상의 API 경로가 페이지에 문자열로 하드코딩되어 있다. 경로 변경 시 여러 파일을 수정해야 하므로 한 곳에서 관리한다.

### 4. 유틸리티 함수 추출

**결정:** `lib/utils/date.ts`에 `formatDate` 함수 이동

**이유:** history 페이지에 인라인으로 정의된 날짜 포맷 함수를 공유 가능한 위치로 이동. 향후 다른 페이지에서도 날짜 표시가 필요할 수 있다.

### 5. 타입 통일

**결정:** `app/history/page.tsx`의 `HistoryRecord`, `GroupedHistory` 인터페이스를 제거하고 `lib/types`에서 import. `GroupedHistory`는 `lib/types/index.ts`에 추가.

**이유:** 동일한 `HistoryRecord` 타입이 `lib/types`에 이미 존재한다. 중복 정의는 불일치 위험이 있다.

## Risks / Trade-offs

- **[훅 과도한 추상화]** → GET과 mutation을 각각 별도 훅으로 단순하게 유지하여 사용처에서 혼란 방지
- **[컴포넌트 분리 시 props drilling]** → manage 페이지의 깊이가 1단계이므로 props로 충분. Context 불필요
- **[파일 수 증가]** → 4-5개 파일이 추가되지만 각 파일의 역할이 명확하고 크기가 작아 탐색이 오히려 쉬워짐
