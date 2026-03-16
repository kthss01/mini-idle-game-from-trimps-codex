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

## `game.global` 키 기능군 재분류 (2차)

> 기준: `newGame().global` 기본 스키마(`config.js`) + `load()`에서 직접 보정되는 값(`main.js`).

| 기능군 | 키(예시) | 근거/운영 포인트 |
|---|---|---|
| 버전/식별/세션 메타 | `stringVersion`, `version`, `isBeta`, `betaV`, `killSavesBelow`, `uniqueId` | 저장 허용/차단(`newer version`, `killSavesBelow`) 판단의 기준값. |
| 전투/월드 진행 | `world`, `lastClearedCell`, `gridArray`, `mapsActive`, `mapGridArray`, `battleCounter`, `fighting`, `formation` | 전투 연속성/맵 진입 상태 복원의 핵심. 불일치 시 로드 직후 전투 상태가 꼬일 수 있음. |
| 맵 운영/자동 맵핑 | `mapsOwnedArray`, `currentMapId`, `repeatMap`, `mapRunCounter`, `mapCounterGoal`, `mapPresets`, `mapPresets2`, `canMapAtZone` | 맵 반복/프리셋 UX와 직접 연결되어 저장 회귀 시 체감 이슈가 큼. |
| 시간/오프라인/타임라인 | `start`, `time`, `portalTime`, `lastOnline`, `lastOfflineProgress`, `zoneStarted`, `mapStarted`, `lastSoldierSentAt`, `timeWarpLimit` | 오프라인 보상/경과시간 계산의 입력값. 로드 시 시간축 어긋남 여부를 우선 확인해야 함. |
| 포탈/도전/리셋 진행 | `portalActive`, `totalPortals`, `totalRadPortals`, `lastPortal`, `lastRadonPortal`, `challengeActive`, `selectedChallenge`, `runningChallengeSquared` | 포탈 및 챌린지 상태 복원 실패 시 보상/해금 흐름에 직접 영향. |
| 경제/자원 성과 메타 | `bestHelium`, `totalHeliumEarned`, `heliumLeftover`, `bestRadon`, `totalRadonEarned`, `radonLeftover`, `magmite`, `magmaFuel` | 누적 통계와 통화 잔액이 섞여 있어, 보정 로직 변경 시 과거 저장의 값 튐 가능성 존재. |
| 자동화/품질 설정 | `autoBattle`, `autoUpgrades`, `autoStorage`, `autoEquipSetting*`, `autoJobsSetting*`, `autoStructureSetting*`, `Geneticistassist*` | 자동화 플래그는 로드 직후 동작 모드에 영향. 옵션 병합 예외 처리와 함께 점검 필요. |
| 시드/랜덤 상태 | `voidSeed`, `scrySeed`, `heirloomSeed`, `enemySeed`, `holidaySeed`, `u2WorldSeed` | RNG 재현성/콘텐츠 분포 일관성에 영향. 임의 초기화 회귀 여부 점검 포인트. |
| 확장/엔드게임 콘텐츠 | `spire*`, `fluffy*`, `u2MutationData`, `mayhemCompletions`, `stormDone`, `exterminateDone`, `alchemyUnlocked` | 업데이트 간 스키마 확장 빈도가 높은 영역. 하위 호환 보정 추가 시 우선 표기 대상. |
| UI/가독성/로그 상태 | `tab`, `buyTab`, `messages`, `lockTooltip`, `statsMode`, `tutorial*` | 기능 값은 아니지만 로드 직후 UX에 큰 영향을 주는 상태군. |

## 버전 호환 블록 인덱스 (현재 코드 기준)

`load()` 내부의 `oldVersion <= x` 분기를 인덱스로 정리한 초안이다.

| 조건 | 무엇을 보정하는가 | 왜 필요한가(근거) | 리스크/메모 |
|---|---|---|---|
| `oldVersion <= 1.02` | `game.resources[*].max`를 `parseFloat`로 재정규화 | 구버전 저장에서 `max`가 문자열로 남아 있을 수 있어, 수치 연산 전 타입 정규화가 필요함. | 자원 필드 스키마 변경 시 타입 보정 범위 재검토 필요 |
| `oldVersion <= 1.06` | `trimps.max`에 `Mansion` 보정치 반영, `Mansion.increase.by = 10` 재설정 | 초기 버전의 Mansion 증가량 체계 변경 이후, 기존 저장값을 최신 계산식과 맞추기 위한 교정. | 건물 증가량 공식 변경 시 중복 보정 위험 |
| `oldVersion <= 1.07` | `highestLevelCleared` 초기화, `Wormhole` 수용량/증가량 재설정, Z33+면 Doom 해금 처리 | 월드 진행/인구 수용량/해금 트리거가 구버전 저장에 누락될 수 있어 후처리 필요. | 분기 순서 의존성이 있어 다른 보정과의 선후 관계 점검 필요 |

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

### 통과 기준(최소 시나리오)

아래 6개 시나리오가 모두 충족되어야 Save/Load 변경을 "통과"로 판정한다.

| 시나리오 | 최소 재현 절차 | 통과 기준 |
|---|---|---|
| 기본 저장/복원 | 새 세션에서 월드/맵 1회 진행 → `save()` → 새로고침 후 자동 `load()` | `world`, `lastClearedCell`, 자원 수치가 저장 직전과 일치 |
| Export/Import | `save(true)`로 export 문자열 생성 → import 박스로 `load(true)` | 에러 메시지 없이 로드되고, 자동화/옵션 값이 유지 |
| 최신 버전 차단 | 현재 클라이언트보다 높은 `stringVersion` save 문자열 로드 시도 | 로드가 차단되고 호환성 안내 메시지가 표시 |
| kill 하한 차단 | `version < killSavesBelow` save 문자열 로드 시도 | 로드가 차단되고 reset 안내 메시지가 표시 |
| 오프라인 복귀 후 재저장 | 오프라인 처리 직후 즉시 저장 후 재로드 | `time`, `portalTime`, `lastOnline` 기반 경과시간이 비정상 점프하지 않음 |
| resetGame 결합 | 로드 전후로 맵/전투/탭 전환을 수행 후 로드 | 로드 후 UI가 중복 렌더/깨짐 없이 정상 상태로 초기화 |

권장 기록 포맷: `날짜 / 커밋 / 시나리오 / 결과(PASS|FAIL) / 메모`.

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
