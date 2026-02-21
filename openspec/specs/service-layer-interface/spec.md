## Purpose

서비스 레이어에 인터페이스와 팩토리 함수 패턴을 도입하여 스토리지 교체(DB 등)와 테스트 모킹이 가능하도록 한다. recommend API 라우트의 오케스트레이션 로직을 서비스 레이어로 이동하여 관심사를 분리한다.

## Requirements

### Requirement: 스토리지 리포지토리 인터페이스
스토리지 접근은 `RestaurantRepository`와 `HistoryRepository` 인터페이스를 통해 추상화해야 한다(SHALL). 파일 기반 구현은 `file-storage.ts`에서 팩토리 함수로 제공해야 한다(SHALL).

#### Scenario: 리포지토리 인터페이스 정의
- **WHEN** 서비스가 스토리지에 접근할 때
- **THEN** `RestaurantRepository` 또는 `HistoryRepository` 인터페이스의 `read`/`write` 메서드를 통해 접근한다

#### Scenario: 파일 기반 리포지토리 생성
- **WHEN** 기본 파일 기반 스토리지가 필요할 때
- **THEN** `createFileRestaurantRepository()` 또는 `createFileHistoryRepository()` 팩토리 함수로 인스턴스를 생성한다

### Requirement: 서비스 팩토리 함수 패턴
각 서비스(restaurant, menu, history, recommend)는 리포지토리를 인자로 받는 팩토리 함수로 생성해야 한다(SHALL). 서비스 인터페이스는 각 서비스의 `types.ts`에 정의해야 한다(SHALL).

#### Scenario: 서비스 생성
- **WHEN** 서비스 인스턴스가 필요할 때
- **THEN** `createRestaurantService(repo)`, `createMenuService(repo)`, `createHistoryService(repo)`, `createRecommendService(repo, historyService)` 팩토리 함수를 사용한다

#### Scenario: 테스트용 모킹
- **WHEN** 테스트에서 스토리지를 모킹할 때
- **THEN** 리포지토리 인터페이스를 구현한 목 객체를 팩토리 함수에 전달하여 서비스를 생성할 수 있다

### Requirement: 하위 호환성 유지
각 서비스의 `index.ts`에서 기본 인스턴스를 생성하고 함수를 re-export하여 기존 API 라우트가 변경 없이 동작해야 한다(SHALL).

#### Scenario: 기존 import 호환
- **WHEN** API 라우트에서 `import * as restaurant from "@/lib/restaurant"` 형태로 사용할 때
- **THEN** `restaurant.getAll()`, `restaurant.add()`, `restaurant.remove()` 등 기존 함수가 동일하게 동작한다

### Requirement: recommend 오케스트레이션 서비스 이동
추천 + 히스토리 기록 오케스트레이션 로직은 `RecommendService.recommend()` 메서드에 포함해야 한다(SHALL). API 라우트는 `recommend.recommend()`만 호출하고 히스토리 서비스를 직접 사용하지 않아야 한다(SHALL).

#### Scenario: 추천 및 히스토리 자동 기록
- **WHEN** `recommend.recommend(category, smart)`를 호출하면
- **THEN** 식당/메뉴를 추천하고, 결과가 있으면 히스토리에 자동으로 기록한 뒤 결과를 반환한다

#### Scenario: 추천 결과 없음
- **WHEN** 해당 카테고리에 후보 식당이 없을 때
- **THEN** `null`을 반환하고 히스토리에 기록하지 않는다
