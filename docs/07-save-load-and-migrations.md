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

## 저장 스키마 키 사전 (1차)

> 기준: `newGame()` 초기 스키마와 `save()/load()`의 직렬화/병합 동작.

| 영역 | 대표 키 | R/W | Save/Load 관점 메모 |
|---|---|---|---|
| 런타임 메타 | `game.global.stringVersion`, `version`, `isBeta`, `killSavesBelow` | R | 버전 가드/호환성 판단의 기준값. |
| 전투/진행 | `game.global.world`, `lastClearedCell`, `mapsActive` | R/W | 전투/월드/맵 진행 연속성의 핵심 상태. |
| 시간/오프라인 | `game.global.time`, `lastOnline`, `portalTime` | R/W | 오프라인 복귀, 플레이 시간 계산, 포탈 타임라인에 영향. |
| 자원 | `game.resources.*` | R/W | 저장 시 일부 파생값(`trimps.employed`) 제거 후 로드 시 재계산. |
| 직업/건물/장비/업그레이드 | `game.jobs.*`, `buildings.*`, `equipment.*`, `upgrades.*` | R/W | `tooltip/cost/description` 등 정의성 데이터는 저장에서 제거. |
| 포탈/챌린지 | `game.portal.*`, `game.challenges.*`, `game.global.challengeActive` | R/W | 현재 챌린지 중심으로 저장 데이터를 축소하며, 일부 정적 필드는 제거됨. |
| 설정 | `game.options.menu.*` | R/W | 사용자 설정값은 유지, UI 설명성 필드(`description` 등)는 저장에서 제거. |
| 확장 콘텐츠 | `playerSpire`, `game.global.u2MutationData`, `heirloom*` | R/W | 본체 저장 직렬화 + 별도 부착(`playerSpire.save()`) 조합 구조. |

## 버전 호환 블록 인덱스 (현재 코드 기준)

`load()` 내부의 `oldVersion <= x` 분기를 인덱스로 정리한 초안이다.

| 조건 | 패치 목적(요약) | 리스크/메모 |
|---|---|---|
| `oldVersion <= 1.02` | 특정 옵션 필드의 기본값 정합성 보정 | 메뉴/옵션 스키마 변경 시 재검토 필요 |
| `oldVersion <= 1.06` | 업그레이드 관련 상태 보정 | 업그레이드 데이터 구조 변경과 결합 위험 |
| `oldVersion <= 1.07` | 초기화 누락 상태의 후처리 | 분기 순서 의존성 존재 |

권장 운영 규칙:
1. 새 호환 분기를 추가할 때는 위 표에 **조건/목적/영향** 1줄을 즉시 반영한다.
2. 분기 추가 시 수동 회귀 체크리스트(아래)를 함께 실행한다.

## Save/Load 회귀 체크리스트 (수동)

1. **신규 저장/불러오기 기본 경로**
   - 새로운 세션에서 1회 이상 진행 후 저장 → 새로고침 후 정상 복원 확인.
2. **Export/Import 경로**
   - `save(true)` 문자열 export 후 import 실행, 에러 메시지/상태 복원 확인.
3. **버전 가드 경로**
   - 최신보다 높은 버전 문자열/베타-라이브 혼합 시 차단 메시지 확인.
4. **killSavesBelow 경로**
   - 하한 미만 save 버전에서 차단되는지 확인.
5. **오프라인 복귀 직후 저장**
   - 오프라인 복귀 처리 후 즉시 저장/재로드 시 시간/진행 불일치가 없는지 확인.
6. **리셋 결합 경로**
   - `resetGame()` 이후 UI 표시(자원/탭/맵/전투 영역)가 초기 상태로 정리되는지 확인.

## 다음 문서 작업 권장(잔여)
1. **키 사전 심화 (2차)**
   - `appendix-glossary`로 이전 가능한 수준까지 하위 키(예: `game.global` 세부 그룹)를 확장.
2. **호환 분기 상세 주석화**
   - 각 `oldVersion` 분기에 대해 "왜 이 값이 필요한지" 코드 근거 라인과 함께 보강.
3. **실제 회귀 결과 기록 템플릿 추가**
   - 체크리스트 실행 결과를 남길 수 있는 표(날짜/빌드/결과/이슈)를 별도 섹션으로 추가.

## 이번 턴에서 진행한 내용
- 저장 스키마 키 사전 1차 표를 추가했다.
- `oldVersion <= x` 호환 분기 인덱스 초안을 추가했다.
- Save/Load 수정 시 사용할 수동 회귀 체크리스트를 문서화했다.
