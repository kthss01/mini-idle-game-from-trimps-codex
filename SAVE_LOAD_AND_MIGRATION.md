# SAVE_LOAD_AND_MIGRATION

## 현재 상태 점검 결과
- 기존 문서셋(`00_project_overview`, `ARCHITECTURE_MAP`, `CORE_SYSTEMS`, `GAME_LOOP_FLOW`, `UI_LOGIC_MAP`, `PROGRESSION_MODEL`)은 **구조/루프/시스템 개요 중심**으로 잘 정리되어 있다.
- 다만 개발자 문서화 계획서에서 별도 장으로 정의한 `save/load/migration` 관점은 독립 문서가 없어서, 저장 호환성 이슈를 빠르게 추적하기 어렵다.

## Save 흐름 요약 (`main.js`)
1. `autoSave()`가 60초 주기로 `save()`를 호출한다(옵션/오프라인 상태 조건부).
2. `save()`는 먼저 런타임 객체(`autoBattle`, `u2Mutations`)를 동기화한 뒤 `game`을 직렬화한다.
3. 저장 데이터에서 정적 정의/툴팁/코스트 등 재생성 가능한 필드를 대량 제거해 저장 크기를 줄인다.
4. `playerSpire.save()` 결과를 붙인 후 `LZString.compressToBase64`로 압축한다.
5. 기본 저장소는 `localStorage.trimpSave1`이며, 조건 충족 시 PlayFab 클라우드 저장을 추가로 시도한다.

### Save 시 삭제되는 데이터의 의도
- `tooltip`, `cost`, `description`, `title`류: `config.js`에서 재구성 가능.
- `badGuys`, `worldUnlocks`, `mapConfig` 등: 런타임/정의 기반으로 재생성 가능.
- 효과:
  - 저장 용량 감소
  - 버전 간 정적 데이터 변경 시 충돌 완화
  - 단, 삭제 대상 변경은 과거 저장 호환성에 직접 영향

## Load 흐름 요약 (`main.js`)
1. 입력 소스 결정: import 문자열 또는 `localStorage`.
2. Base64 압축 해제 + JSON 파싱 실패 시 사용자에게 공지 후 중단.
3. 버전 가드:
   - 베타 저장을 라이브 클라이언트에 로드 차단.
   - 저장 버전이 실행 중 버전보다 최신이면 로드 차단.
   - `killSavesBelow`보다 낮은 저장은 강제 차단.
4. `resetGame()`으로 런 상태/DOM을 초기화한 뒤, 저장값을 카테고리 단위로 병합한다.
5. 카테고리별 예외 처리(`options`, `equipment`, `heirlooms`, 일부 필드 skip)를 적용한다.
6. 이후 버전별 호환 패치(legacy compatibility blocks)를 순차 실행한다.

## Migration/Compatibility 관찰 포인트
- 마이그레이션은 전용 버전 테이블이 아니라, `load()` 내부의 다수 `if (oldVersion <= x)` 블록으로 누적 관리된다.
- 장점: 즉시 대응이 빠름.
- 리스크:
  - 단일 함수 비대화로 가독성 저하
  - 특정 버전 분기 순서 의존이 강함
  - 테스트 없이 수정 시 회귀 위험 증가

## resetGame의 역할 (`updates.js`)
- `resetGame()`은 단순 상태 초기화가 아니라, UI DOM 초기화까지 대규모로 수행한다.
- 의미:
  - 로드 전 환경을 일관 상태로 정리해 잔존 상태를 제거
  - 대신 Save/Load와 UI 결합도가 높아져 변경 영향 범위가 커짐

## 다음 문서 작업 권장(진행 필요 항목)
1. **저장 스키마 키 사전 추가**
   - `game.global`, `resources`, `jobs`, `portal`, `heirlooms` 등 핵심 키를 R/W 기준으로 표준화.
2. **버전 호환 블록 인덱스화**
   - `oldVersion <= x` 조건을 표로 정리해 "어떤 버전을 왜 패치하는지"를 추적 가능하게 만들기.
3. **회귀 체크리스트 문서화**
   - 저장/불러오기 수정 시 수동 검증 시나리오(신규 저장, 구버전 import, 베타/라이브 충돌, 오프라인 복귀 직후 저장).

## 이번 턴에서 진행한 내용
- 위의 누락 영역을 메우기 위해 `SAVE_LOAD_AND_MIGRATION.md`를 신규 작성하여 Save/Load/Compatibility 핵심 흐름과 후속 액션을 정리했다.
