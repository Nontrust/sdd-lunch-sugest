## Context

팀 내부용 점심 메뉴 추천 웹앱을 처음부터 구축한다. 신규 프로젝트이므로 기존 코드는 없다.

## Goals / Non-Goals

**Goals:**
- Next.js App Router 기반 풀스택 웹앱 구축
- 식당·메뉴 CRUD API 제공
- 카테고리별 랜덤 추천 기능 제공
- 팀원이 즉시 사용할 수 있는 간단한 UI

**Non-Goals:**
- 사용자 인증/권한 관리 (팀 내부용이므로 불필요)
- 데이터베이스 도입 (초기 단계에서는 JSON 파일로 충분)
- 모바일 앱 지원
- 배포 자동화

## Decisions

### Decision 1: Next.js App Router 사용

App Router(app/)를 사용한다. Pages Router 대비 서버 컴포넌트, Route Handlers 등 최신 패턴을 활용할 수 있다.

### Decision 2: JSON 파일 기반 데이터 저장

`data/restaurants.json` 파일에 데이터를 저장한다. 팀 내부 소규모 사용이므로 DB 없이 시작한다. 파일 읽기/쓰기로 CRUD를 구현하며, 추후 DB 전환이 필요하면 데이터 레이어만 교체하면 된다.

### Decision 3: 데이터 구조

```json
{
  "restaurants": [
    {
      "id": "uuid",
      "name": "김밥천국",
      "category": "korean",
      "menus": [
        { "id": "uuid", "name": "김치찌개" },
        { "id": "uuid", "name": "제육볶음" }
      ]
    }
  ]
}
```

카테고리는 `korean`, `chinese`, `japanese`, `western` 4종으로 고정한다.

### Decision 4: 페이지 구조

- `/` : 추천 페이지 (메인)
- `/manage` : 식당·메뉴 관리 페이지

### Decision 5: API Routes

- `GET /api/restaurants` : 전체 목록 조회
- `POST /api/restaurants` : 식당 추가
- `DELETE /api/restaurants/[id]` : 식당 삭제
- `POST /api/restaurants/[id]/menus` : 메뉴 추가
- `DELETE /api/restaurants/[id]/menus/[menuId]` : 메뉴 삭제
- `GET /api/recommend?category=korean` : 랜덤 추천

## Risks / Trade-offs

- [JSON 파일 동시 쓰기 충돌] → 소규모 팀이므로 발생 가능성 낮음. 문제 시 DB로 전환
- [서버 재시작 시 데이터 유실 없음] → JSON 파일은 디스크에 영속적으로 저장됨
