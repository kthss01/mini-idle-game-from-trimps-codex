# CORE_SYSTEMS

| System | Entry points | State read/write | UI hooks | Notes |
|---|---|---|---|---|
| Save/Load | `save`, `load` | `game` 전체 직렬화/역직렬화, `game.global` 버전 필드 | `message`, `tooltip` | 저장 시 불필요 필드 제거 후 LZString 압축 |
| Main Loop | `gameTimeout`, `runGameLoop`, `gameLoop`, `runEverySecond` | 자원/전투/자동화 관련 전역 상태 | `updateLabels`, 메시지/통계 반영 | 틱 보정 while 루프로 드리프트 흡수 |
| Combat/Progression | `fightManual`, `startFight`, `battle`, `nextWorld` | 전투 상태, 월드/셀 진행, 맵 상태 | 전투 패널/월드 표시 갱신 | 루프에서 `battleCoordinator`와 결합 |
| Maps | `runMap` | `mapsActive`, map grid, 보상/진행 상태 | 맵/월드 전환 UI | 월드 루프와 별도 진행 단위 |
| Offline | `offlineProgress` 객체 | 오프라인 누적 시간/진행 관련 상태 | 오프라인 전용 레이어 DOM | 일반 루프와 다른 시간 스케일 |
| Reset/Migration | `resetGame` (`updates.js`) | 런 상태/일부 영속 상태 재초기화 | 수십 개 DOM 노드 초기화 | 리셋 시점 UX 일관성의 핵심 |
| Spire | `playerSpire.init` 등 | `playerSpire.*`, 일부 `game.global` | Spire 탭/팝업 렌더 | 독립 서브게임에 가까운 구조 |
| Tutorial/Holiday | `tutorial.*`, `holidayObj.*` | 튜토리얼 단계/이벤트 플래그 | 튜토리얼 창, 알림 메시지 | 온보딩/시즌성 경험 담당 |
