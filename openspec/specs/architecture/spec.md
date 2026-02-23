## Purpose

프로젝트의 아키텍처 원칙, 레이어 규칙, 컨벤션을 명시하여 피처 개발과 리팩토링 시 일관된 판단 기준을 제공한다.

> **이 문서는 고정된 규범이 아니다.** 프로젝트가 성장하고 더 나은 방법이 발견되면 언제든 갱신해야 한다. 리팩토링 사이클마다 이 문서의 적합성을 검토한다 (→ `refactoring-cycle` 스펙 참조).

---

## Requirements

### Requirement: 아키텍처 진화 원칙
이 스펙은 현재 시점의 최선이며, 영구적 규범이 아니다(SHALL). 프로젝트 성장, 요구사항 변화, 업계 모범 사례 변화에 따라 적극적으로 갱신해야 한다(SHALL).

#### Scenario: 리팩토링 사이클에서 아키텍처 리뷰
- **WHEN** 리팩토링 사이클이 시작될 때
- **THEN** 이 스펙의 각 항목이 여전히 프로젝트에 적합한지 검토한다. 부적합한 항목은 대안과 함께 갱신한다

#### Scenario: 피처 개발 중 마찰 발견
- **WHEN** 피처 개발 중 현재 아키텍처 규칙이 생산성을 저해하거나 과도한 보일러플레이트를 유발할 때
- **THEN** 해당 사항을 기록하고, 다음 리팩토링 사이클의 아키텍처 리뷰 대상에 포함한다

#### Scenario: 스펙 변경 이력
- **WHEN** 아키텍처 스펙이 변경될 때
- **THEN** 이 문서 하단 Changelog에 변경 일자, 변경 내용, 사유를 기록한다(SHALL)


### Requirement: 레이어 구조와 의존 방향
프로젝트는 4개 레이어로 구성하며, 의존 방향은 반드시 위→아래(단방향)여야 한다(SHALL). 같은 레이어 간 의존, 아래→위 역방향 의존은 금지한다(SHALL).

```
UI 레이어        app/**/page.tsx, app/**/컴포넌트
    ↓
API 레이어       app/api/**/route.ts
    ↓
서비스 레이어     lib/*/service.ts (팩토리 함수)
    ↓
데이터 레이어     lib/storage/ (리포지토리 인터페이스 + 구현)
```

#### Scenario: 정상적인 의존 방향
- **WHEN** API 라우트에서 비즈니스 로직이 필요할 때
- **THEN** 서비스 레이어(`lib/*/index.ts`)를 import하여 사용한다

#### Scenario: 역방향 의존 금지
- **WHEN** 서비스 레이어에서 UI 컴포넌트나 API 라우트를 import하려 할 때
- **THEN** 이는 아키텍처 위반이다. 서비스는 하위 레이어(데이터)만 의존해야 한다

#### Scenario: 같은 레이어 간 의존
- **WHEN** 서비스가 다른 서비스를 필요로 할 때
- **THEN** 팩토리 함수의 인자로 주입받아야 한다(SHALL). 직접 import하지 않는다 (예: recommend → historyService를 인자로 주입)

### Requirement: 서비스 분리 기준
서비스는 도메인 엔티티 단위로 분리해야 한다(SHALL). 하나의 서비스는 하나의 도메인 책임만 가진다(SHALL).

| 서비스 | 도메인 | 책임 |
|--------|--------|------|
| restaurant | 식당 | 식당 CRUD |
| menu | 메뉴 | 메뉴 CRUD (식당의 하위 자원) |
| history | 히스토리 | 추천 기록 저장/조회 |
| recommend | 추천 | 추천 로직 + 오케스트레이션 |

#### Scenario: 새 서비스 생성 기준
- **WHEN** 새로운 기능이 기존 서비스의 책임 범위를 벗어날 때
- **THEN** 새 도메인 서비스를 생성한다. 단, 기존 서비스에 메서드 1-2개 추가로 해결되면 분리하지 않는다

#### Scenario: 오케스트레이션 로직 위치
- **WHEN** 여러 서비스를 조합하는 로직이 필요할 때
- **THEN** 주된 도메인 서비스의 메서드로 추가한다 (예: 추천+기록 → recommend 서비스). API 라우트에 오케스트레이션을 두지 않는다(SHALL)

### Requirement: 서비스 구현 패턴
모든 서비스는 팩토리 함수 패턴으로 구현해야 한다(SHALL). 클래스를 사용하지 않는다(SHALL).

```
lib/{domain}/
  types.ts      — 서비스 인터페이스 정의
  service.ts    — createXxxService(repo) 팩토리 함수
  index.ts      — 기본 인스턴스 생성 + 함수 re-export (하위 호환)
```

#### Scenario: 새 서비스 추가
- **WHEN** 새 도메인 서비스를 추가할 때
- **THEN** 위 3-파일 구조를 따른다. `index.ts`에서 기본 인스턴스를 생성하고 개별 함수를 re-export한다

#### Scenario: 기본 인스턴스 하위 호환
- **WHEN** API 라우트에서 `import * as restaurant from "@/lib/restaurant"` 형태로 사용할 때
- **THEN** 기존 함수 시그니처가 유지되어 변경 없이 동작한다

### Requirement: 에러 처리 컨벤션
API 에러는 `lib/api/error.ts`의 팩토리 함수로 생성해야 한다(SHALL). 에러 메시지는 한국어로 작성한다(SHALL).

| 상태 코드 | 의미 | 팩토리 함수 | 메시지 패턴 |
|-----------|------|------------|------------|
| 400 | 잘못된 입력 | `apiError(400, msg)` | `"{필드}은(를) 입력해주세요"` |
| 404 | 리소스 없음 | `notFound(resource)` | `"{리소스}을(를) 찾을 수 없습니다"` |
| 409 | 중복 | `duplicate(name)` | `"이미 존재하는 상호명입니다: {name}"` |
| 500 | 서버 오류 | (withHandler 자동) | `"알 수 없는 오류가 발생했습니다"` |

#### Scenario: 서비스에서 에러 발생
- **WHEN** 서비스 레이어에서 비즈니스 규칙 위반이 발생할 때
- **THEN** `apiError()`, `duplicate()`, `notFound()` 등으로 에러를 throw한다

#### Scenario: API 라우트 에러 처리
- **WHEN** API 라우트에서 에러를 처리할 때
- **THEN** `withHandler` 래퍼가 자동으로 `{ error: message }` 형식의 JSON 응답을 반환한다. 라우트에서 직접 try/catch를 작성하지 않는다(SHALL)

### Requirement: API 응답 형식
모든 API 응답은 일관된 형식을 따라야 한다(SHALL).

#### Scenario: 성공 응답
- **WHEN** API 요청이 성공할 때
- **THEN** 도메인 객체를 JSON으로 직접 반환한다 (래퍼 없음)

#### Scenario: 에러 응답
- **WHEN** API 요청이 실패할 때
- **THEN** `{ "error": "에러 메시지" }` 형식으로 반환하며, HTTP 상태 코드를 함께 설정한다

### Requirement: 프론트엔드 패턴
UI 레이어는 다음 패턴을 따라야 한다(SHALL).

#### Scenario: API 호출 — GET 요청
- **WHEN** 페이지에서 데이터를 조회할 때
- **THEN** `useApi<T>()` 훅을 사용한다. data, error, loading 상태가 자동 관리된다

#### Scenario: API 호출 — Mutation 요청
- **WHEN** 페이지에서 데이터를 생성/삭제할 때
- **THEN** `useApiMutation()` 훅을 사용한다. 실패 시 error 상태가 자동 설정된다

#### Scenario: API 경로 참조
- **WHEN** 페이지에서 API 엔드포인트를 호출할 때
- **THEN** `lib/api/routes.ts`의 `API` 상수를 사용한다. 문자열 리터럴을 직접 사용하지 않는다(SHALL)

#### Scenario: 컴포넌트 분리 기준
- **WHEN** 페이지 컴포넌트가 120줄을 초과하거나 2개 이상의 독립적 UI 영역을 포함할 때
- **THEN** 역할별로 하위 컴포넌트를 분리한다. `page.tsx`는 상태 관리와 컴포넌트 조합만 담당한다

#### Scenario: 타입 참조
- **WHEN** 페이지에서 도메인 타입이 필요할 때
- **THEN** `lib/types`에서 import한다. 페이지 내에 동일한 타입을 재정의하지 않는다(SHALL)

### Requirement: 입력 검증 전략
외부 입력(API 요청 body, query params)은 API 라우트에서 검증해야 한다(SHALL). 서비스 레이어는 유효한 입력을 전제로 동작한다(SHALL).

#### Scenario: 필수 필드 누락
- **WHEN** POST 요청에 필수 필드(name, category 등)가 없을 때
- **THEN** API 라우트에서 400 에러를 반환한다

#### Scenario: 서비스 레이어 신뢰
- **WHEN** 서비스 함수가 호출될 때
- **THEN** 인자가 이미 검증되었다고 가정한다. 서비스 내에서 입력 형식 검증을 중복하지 않는다. 단, 비즈니스 규칙 검증(중복 체크, 존재 확인)은 서비스에서 수행한다

### Requirement: ID 생성 전략
엔티티 ID는 `Date.now().toString()` 기반으로 생성한다(SHALL). 현재 단일 사용자 파일 기반 시스템에서 충분하다.

#### Scenario: 향후 변경 시점
- **WHEN** 다중 사용자 또는 DB 기반으로 전환할 때
- **THEN** nanoid 또는 UUID로 교체한다. 리포지토리 인터페이스 덕분에 서비스 코드 변경 없이 가능하다

### Requirement: 스토리지 제약 사항
현재 파일 기반 스토리지는 동시성 안전하지 않다(SHALL document). 단일 사용자 환경을 전제로 한다(SHALL).

#### Scenario: 동시 요청 발생
- **WHEN** 동시에 여러 쓰기 요청이 발생할 때
- **THEN** 마지막 쓰기가 이전 쓰기를 덮어쓸 수 있다. 현재 단일 사용자 환경에서 허용 가능한 제약이다

#### Scenario: 스토리지 교체
- **WHEN** 파일 기반에서 DB로 전환할 때
- **THEN** `RestaurantRepository`/`HistoryRepository` 인터페이스의 새 구현을 만들고 팩토리에 주입한다. 서비스 코드는 변경하지 않는다

---

## Changelog

| 일자 | 변경 | 사유 |
|------|------|------|
| 2026-02-22 | 초판 작성 | 1회차 리팩토링 사이클에서 아키텍처 규칙 부재 확인, 전체 명세 |
