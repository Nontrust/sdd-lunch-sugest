## 1. 프로젝트 초기 설정

- [x] 1.1 Next.js 프로젝트 생성 (TypeScript, App Router)
- [x] 1.2 초기 데이터 파일 `data/restaurants.json` 생성 (샘플 데이터 포함)

## 2. API Routes 구현

- [x] 2.1 데이터 읽기/쓰기 유틸리티 함수 작성 (`app/lib/` 패키지별 분리)
- [x] 2.2 `GET /api/restaurants` - 전체 목록 조회 API
- [x] 2.3 `POST /api/restaurants` - 식당 추가 API
- [x] 2.4 `DELETE /api/restaurants/[id]` - 식당 삭제 API
- [x] 2.5 `POST /api/restaurants/[id]/menus` - 메뉴 추가 API
- [x] 2.6 `DELETE /api/restaurants/[id]/menus/[menuId]` - 메뉴 삭제 API
- [x] 2.7 `GET /api/recommend?category=` - 랜덤 추천 API

## 3. 추천 페이지 (메인 `/`)

- [x] 3.1 카테고리 선택 UI (한식/중식/일식/양식/전체)
- [x] 3.2 추천 버튼 및 랜덤 추천 호출
- [x] 3.3 추천 결과 카드 표시 (상호명, 카테고리, 메뉴명)

## 4. 관리 페이지 (`/manage`)

- [x] 4.1 식당 추가 폼 (상호명 + 카테고리 선택)
- [x] 4.2 식당 목록 표시 및 삭제 기능
- [x] 4.3 메뉴 추가 폼 및 삭제 기능

## 5. 검증

- [x] 5.1 전체 기능 동작 확인 (식당/메뉴 CRUD + 추천)
