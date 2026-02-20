# recommendation-history Specification

## Purpose
추천 결과를 히스토리에 자동 저장하고, 사용자가 최근 추천 기록을 조회할 수 있는 기능을 제공한다.

## Requirements
### Requirement: 추천 히스토리 자동 저장
시스템은 추천 API가 결과를 반환할 때 추천된 식당/메뉴 정보를 히스토리에 자동으로 저장해야 한다(SHALL). 히스토리 레코드는 id, restaurantId, restaurantName, menuName, category, recommendedAt 필드를 포함해야 한다(SHALL).

#### Scenario: 추천 시 히스토리 자동 저장
- **WHEN** 추천 API가 식당과 메뉴를 추천하면
- **THEN** 해당 추천 결과가 `data/history.json`의 records 배열에 자동으로 추가된다

#### Scenario: 히스토리 레코드 필드 구성
- **WHEN** 히스토리 레코드가 저장되면
- **THEN** id(타임스탬프 기반), restaurantId, restaurantName, menuName, category, recommendedAt(ISO 8601) 필드가 포함된다

### Requirement: 히스토리 조회
시스템은 저장된 추천 히스토리를 최근 날짜순으로 조회할 수 있어야 한다(SHALL). 조회 시 최근 7일간의 기록을 날짜별로 그룹핑하여 반환해야 한다(SHALL).

#### Scenario: 히스토리 목록 조회
- **WHEN** 사용자가 히스토리 조회를 요청하면
- **THEN** 최근 7일간의 추천 기록이 날짜별로 그룹핑되어 최신순으로 표시된다

#### Scenario: 히스토리가 없는 경우
- **WHEN** 추천 기록이 하나도 없는 상태에서 히스토리를 조회하면
- **THEN** "추천 기록이 없습니다" 메시지가 표시된다

### Requirement: 히스토리 조회 페이지
시스템은 `/history` 경로에 히스토리 조회 전용 페이지를 제공해야 한다(SHALL). 네비게이션에 "기록" 링크를 추가하여 접근할 수 있어야 한다(SHALL).

#### Scenario: 히스토리 페이지 접근
- **WHEN** 사용자가 네비게이션에서 "기록" 링크를 클릭하면
- **THEN** `/history` 페이지로 이동하여 추천 기록 목록이 표시된다

#### Scenario: 히스토리 날짜별 그룹 표시
- **WHEN** 히스토리 페이지에서 여러 날짜의 기록이 있으면
- **THEN** 각 날짜별로 구분되어 식당명, 메뉴명, 카테고리가 표시된다

### Requirement: 히스토리 데이터 저장소
시스템은 히스토리 데이터를 `data/history.json` 파일에 별도로 저장해야 한다(SHALL). 기존 `lib/storage/index.ts` 패턴을 따라 `readHistory`, `writeHistory` 함수를 제공해야 한다(SHALL).

#### Scenario: 히스토리 파일 초기 상태
- **WHEN** `data/history.json` 파일이 존재하지 않으면
- **THEN** 빈 records 배열(`{"records": []}`)로 초기화된다

#### Scenario: 히스토리 읽기/쓰기
- **WHEN** 히스토리 서비스가 데이터를 읽거나 쓸 때
- **THEN** `lib/storage/index.ts`의 `readHistory`/`writeHistory` 함수를 통해 `data/history.json`에 접근한다
