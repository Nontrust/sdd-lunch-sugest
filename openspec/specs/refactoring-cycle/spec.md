## Purpose

2개 피처 완료마다 리팩토링 사이클을 자동으로 트리거하여 기술 부채를 조기에 정리하고 프로젝트의 유지보수성을 일정 수준 이상으로 유지한다.

## Requirements

### Requirement: 리팩토링 트리거 조건
2개의 피처 변경(openspec/changes/)이 아카이브(archive/)에 완료될 때마다 리팩토링 사이클을 실행해야 한다(SHALL). 리팩토링 자체는 피처 카운트에 포함하지 않는다(SHALL).

#### Scenario: 트리거 시점 판단
- **WHEN** archive/ 내 피처 변경 수가 짝수(2, 4, 6…)에 도달하면
- **THEN** 다음 작업으로 리팩토링 사이클을 실행한다

#### Scenario: 리팩토링은 카운트 제외
- **WHEN** 리팩토링 사이클이 완료되어 아카이브될 때
- **THEN** 해당 변경은 피처 카운트에 포함하지 않는다

### Requirement: 아키텍처 리뷰
리팩토링 사이클마다 현재 아키텍처가 여전히 최선인지 반드시 검토해야 한다(SHALL). 아키텍처는 고정된 것이 아니며, 프로젝트 성장에 따라 언제든 더 나은 방향으로 진화해야 한다(SHALL).

#### Scenario: 아키텍처 적합성 점검
- **WHEN** 리팩토링 사이클을 시작할 때
- **THEN** 다음 질문에 답한다:
  1. 현재 레이어 구조가 새로운 피처를 수용하기에 적합한가?
  2. 서비스 간 의존 관계가 복잡해지고 있지 않은가?
  3. 현재 패턴(팩토리 함수, 리포지토리 등)이 오히려 장애물이 되고 있지 않은가?
  4. 업계에서 더 나은 접근법이 등장했는가?

#### Scenario: 아키텍처 변경이 필요할 때
- **WHEN** 리뷰 결과 현재 아키텍처가 부적합하다고 판단되면
- **THEN** proposal에 아키텍처 변경 사유와 대안을 명시하고, `openspec/specs/architecture/` 스펙을 함께 갱신한다(SHALL)

#### Scenario: 아키텍처 변경이 불필요할 때
- **WHEN** 리뷰 결과 현재 아키텍처가 적합하다고 판단되면
- **THEN** proposal에 "아키텍처 리뷰 완료 — 현행 유지" 한 줄을 명시한다(SHALL)

### Requirement: 리팩토링 범위 결정
리팩토링 proposal의 Why 섹션에 직전 2개 피처 이름을 명시해야 한다(SHALL). 범위는 직전 사이클 이후 누적된 기술 부채를 대상으로 하며, 프론트엔드와 백엔드를 모두 포함할 수 있다(SHALL).

#### Scenario: proposal 작성
- **WHEN** 리팩토링 사이클 proposal을 작성할 때
- **THEN** Why 섹션에 "2개 피처(feature-a, feature-b) 구현 완료" 형태로 트리거 피처를 명시한다

#### Scenario: 범위 식별
- **WHEN** 리팩토링 대상을 결정할 때
- **THEN** 코드 스멜(중복, 비대한 모듈, 타입 불일치, 관심사 미분리)과 아키텍처 리뷰 결과를 종합하여 범위를 정한다

### Requirement: 리팩토링 결과물 형식
리팩토링 사이클도 일반 피처와 동일한 openspec 프로세스(proposal → design → tasks → specs)를 따라야 한다(SHALL). 변경 디렉토리 이름에 리팩토링임을 표시해야 한다(SHALL).

#### Scenario: 디렉토리 명명
- **WHEN** 리팩토링 변경 디렉토리를 생성할 때
- **THEN** `refactor-*` 접두사를 사용한다 (예: `refactor-and-docs`, `refactor-service-layer`)

#### Scenario: 하위 호환성 유지
- **WHEN** 리팩토링을 실행할 때
- **THEN** 기존 API 동작과 UI 기능에 변경이 없어야 한다(SHALL). 내부 구현만 개선한다.

### Requirement: 리팩토링 이력 추적
config.yaml의 context 또는 specs 목록에서 완료된 리팩토링 사이클을 추적할 수 있어야 한다(SHALL).

#### Scenario: 사이클 이력 조회
- **WHEN** 프로젝트의 리팩토링 이력을 확인하고 싶을 때
- **THEN** archive/ 내 `refactor-*` 디렉토리와 해당 proposal의 Why 섹션에서 어떤 피처 이후에 실행된 리팩토링인지 파악할 수 있다

## History

| 사이클 | 트리거 피처 | 리팩토링 변경 | 주요 내용 |
|--------|------------|--------------|----------|
| 1회 | category-menu-recommender, history-smart-recommend | refactor-and-docs | 프론트엔드: 커스텀 훅, 컴포넌트 분리, 타입 통일, API 상수 |
| 1회 | (동일) | service-layer-interface | 백엔드: 리포지토리 인터페이스, 서비스 팩토리 패턴, recommend 오케스트레이션 |
