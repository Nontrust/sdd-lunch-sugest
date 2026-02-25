## ADDED Requirements

### Requirement: 공통 API 요청 훅
페이지에서 API를 호출할 때 `useApi` 훅을 사용하여 data, error, loading 상태를 일관되게 관리해야 한다(SHALL). 훅은 응답이 실패(non-ok)일 경우 자동으로 에러 메시지를 추출하고, 요청 완료 시 loading 상태를 항상 해제해야 한다(SHALL).

#### Scenario: GET 요청 성공
- **WHEN** 페이지에서 `useApi` 훅의 fetch 함수를 호출하면
- **THEN** loading이 true로 전환되고, 응답 성공 시 data에 결과가 설정되며 loading이 false로 전환된다

#### Scenario: GET 요청 실패
- **WHEN** API 응답이 non-ok 상태코드를 반환하면
- **THEN** error에 응답의 에러 메시지가 설정되고 loading이 false로 전환된다

#### Scenario: Mutation 요청
- **WHEN** 페이지에서 `useApiMutation` 훅의 execute 함수를 호출하면
- **THEN** POST/DELETE 등 mutation 요청을 수행하고, 실패 시 error 상태를 설정한다

### Requirement: API 경로 상수
모든 API 엔드포인트 경로는 `lib/api/routes.ts`의 상수를 통해 참조해야 한다(SHALL). 페이지에서 API 경로를 문자열 리터럴로 직접 작성하지 않아야 한다(SHALL).

#### Scenario: 정적 경로 참조
- **WHEN** 페이지에서 `/api/restaurants` 엔드포인트를 호출할 때
- **THEN** `API.RESTAURANTS` 상수를 사용하여 경로를 참조한다

#### Scenario: 동적 경로 참조
- **WHEN** 특정 식당의 메뉴 엔드포인트를 호출할 때
- **THEN** `API.menus(restaurantId)` 헬퍼 함수를 사용하여 경로를 생성한다

### Requirement: 공유 유틸리티 함수
페이지에서 인라인으로 정의된 유틸리티 함수는 `lib/utils/` 하위 모듈로 추출하여 공유해야 한다(SHALL).

#### Scenario: 날짜 포맷 함수 공유
- **WHEN** 날짜를 한국어 형식으로 표시할 때
- **THEN** `lib/utils/date.ts`의 `formatDate` 함수를 import하여 사용한다

### Requirement: 타입 정의 단일 소스
모든 공유 타입은 `lib/types/index.ts`에 정의하고, 페이지에서 동일한 타입을 재정의하지 않아야 한다(SHALL).

#### Scenario: HistoryRecord 타입 참조
- **WHEN** history 페이지에서 히스토리 레코드 타입이 필요할 때
- **THEN** `lib/types`에서 `HistoryRecord`를 import하여 사용하고, 페이지 내 중복 인터페이스를 정의하지 않는다

### Requirement: manage 페이지 컴포넌트 분리
관리 페이지는 역할별로 분리된 컴포넌트로 구성해야 한다(SHALL). `page.tsx`는 상태 관리와 컴포넌트 조합만 담당하고, 폼과 카드 UI는 별도 컴포넌트로 추출해야 한다(SHALL).

#### Scenario: 식당 추가 폼 컴포넌트
- **WHEN** 관리 페이지에서 식당 추가 UI를 렌더링할 때
- **THEN** `RestaurantForm` 컴포넌트가 입력 필드, 카테고리 선택, 추가 버튼을 담당한다

#### Scenario: 식당 카드 컴포넌트
- **WHEN** 관리 페이지에서 개별 식당 정보를 렌더링할 때
- **THEN** `RestaurantCard` 컴포넌트가 식당 정보, 메뉴 목록, 메뉴 추가/삭제를 담당한다
