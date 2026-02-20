# category-recommendation Specification

## Purpose
TBD - created by archiving change category-menu-recommender. Update Purpose after archive.
## Requirements
### Requirement: 카테고리 선택
시스템은 추천 페이지에서 사용자가 원하는 카테고리(한식/중식/일식/양식)를 선택하거나 "전체"를 선택할 수 있도록 해야 한다(SHALL).

#### Scenario: 카테고리 선택
- **WHEN** 사용자가 추천 페이지에서 "한식" 카테고리를 선택
- **THEN** 해당 카테고리가 선택 상태로 표시된다

#### Scenario: 전체 카테고리 선택
- **WHEN** 사용자가 "전체"를 선택
- **THEN** 모든 카테고리가 추천 대상에 포함된다

### Requirement: 랜덤 추천
시스템은 사용자가 추천 버튼을 클릭하면 선택된 카테고리에서 식당과 메뉴를 추천해야 한다(SHALL). 기본적으로 스마트 추천 모드가 활성화되어 최근 추천 이력 기반 중복 방지를 적용하며, `smart` 쿼리 파라미터(기본값 `true`)로 스마트 추천 on/off를 제어할 수 있어야 한다(SHALL). 스마트 추천이 비활성화된 경우 기존과 동일하게 완전 랜덤 추천을 수행해야 한다(SHALL).

#### Scenario: 카테고리별 랜덤 추천
- **WHEN** 사용자가 "한식"을 선택하고 추천 버튼을 클릭
- **THEN** 한식 카테고리의 식당 중 하나와 해당 식당의 메뉴 하나가 랜덤으로 표시된다

#### Scenario: 등록된 식당이 없는 카테고리
- **WHEN** 사용자가 식당이 등록되지 않은 카테고리를 선택하고 추천 버튼을 클릭
- **THEN** "해당 카테고리에 등록된 식당이 없습니다" 메시지가 표시된다

#### Scenario: 스마트 추천 기본 활성화
- **WHEN** 사용자가 추천 버튼을 클릭하고 smart 파라미터를 별도로 지정하지 않으면
- **THEN** 스마트 추천 모드가 적용되어 최근 추천 식당을 제외하고 추천한다

#### Scenario: 스마트 추천 비활성화
- **WHEN** smart=false 파라미터로 추천을 요청하면
- **THEN** 중복 방지 없이 기존과 동일하게 완전 랜덤으로 추천한다

#### Scenario: 추천 시 히스토리 자동 저장
- **WHEN** 추천 API가 결과를 반환하면
- **THEN** 추천 결과가 히스토리에 자동으로 저장된다

### Requirement: 추천 결과 표시
시스템은 추천 결과로 상호명과 메뉴명을 함께 카드 형태로 표시해야 한다(SHALL).

#### Scenario: 추천 결과 표시
- **WHEN** 랜덤 추천이 완료되면
- **THEN** 상호명, 카테고리, 메뉴명이 카드 형태로 표시된다

