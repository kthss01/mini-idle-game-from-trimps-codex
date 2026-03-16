# UI_LOGIC_MAP

## UI 섹션별 관찰

| UI Section | DOM IDs (예시) | Update/Action funcs (예시) | 상태 의존 |
|---|---|---|---|
| 오프라인 진행 레이어 | `offlineWrapper`, `offlineProgress`, `offlineMapBtn*` | `offlineProgress.runFirstMap`, `offlineProgress.finish` | 오프라인 시간/전투/맵 상태 |
| 자원 패널 | `foodOwned`, `woodOwned`, `metalOwned`, `scienceOwned` | `setGather`, `getPsString` | 자원 보유량, 초당 생산량 |
| 전투/월드 패널 | `battleContainer`, `worldNumber`, `badGuyCol` | `fightManual`, `startFight`, `battle` | 전투 상태, 월드/셀 진행 |
| 맵 패널 | `mapsBtn`, `preMaps`, `mapGrid` | `runMap`, 맵 관련 명령 함수 | `mapsActive`, 현재 맵/맵 목록 |
| 튜토리얼/팝업 | `tutorialDiv`, `openTutorialContainer` | `tutorial.popup`, `tutorial.check` | 튜토리얼 단계/포탈 여부 |

## 이벤트 처리 패턴
- `index.html`에서 `onclick` 인라인 핸들러를 많이 사용한다.
- `main.js`는 전역 `keydown` 리스너로 단축키/모드별 분기(`hotkeys`, `usingScreenReader`)를 처리한다.

## 성능/유지보수 메모
- 리셋 함수에서 광범위한 DOM 직접 조작이 수행되어 화면 일관성은 좋지만 결합도는 높다.
- UI 액션이 상태 변경 함수에 직접 연결되어 있어 테스트 시 입력-상태-렌더 3단 분리가 필요하다.
