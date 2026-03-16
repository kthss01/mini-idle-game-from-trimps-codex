# Trimps 프로젝트 개요 (1차 스캔)

## 로딩/초기화 개요
- `index.html`은 라이브러리(PlayFab/LZString/Decimal) 이후 핵심 게임 스크립트를 `config.js → updates.js → playerSpire.js → objects.js → main.js` 순서로 직접 로드한다.
- 이 순서 때문에 `config.js`의 데이터 정의(`newGame`)와 `updates.js`의 유틸/리셋 함수가 먼저 준비되고, `main.js`가 최종 실행 허브 역할을 맡는다.

## 파일 역할 요약
- `index.html`: UI DOM 앵커와 클릭 이벤트(`onclick`)를 직접 선언한 화면 진입점.
- `config.js`: `newGame()` 기반 전역 상태 스키마/정적 데이터 기본값 정의.
- `updates.js`: 버전 호환/마이그레이션과 초기화(`resetGame`) 관련 로직.
- `playerSpire.js`: Spire 전용 독립 상태/렌더/규칙 객체(`playerSpire`).
- `objects.js`: 튜토리얼/시즌 이벤트 같은 보조 시스템 객체.
- `main.js`: 저장/로드, 메인 루프(`gameLoop`), 전투/진행/자동화/입력 처리의 실행 중심.

## 런타임 진입점(관찰)
- `main.js`는 저장/로드 및 루프 스케줄링(`gameTimeout`, `runGameLoop`, `gameLoop`)을 통해 전체 시뮬레이션을 구동한다.
- 루프는 `gather/breed/battleCoordinator` 같은 시뮬레이션 함수와 주기성 자동화 로직(초 단위/2초 단위 등)을 결합한다.

## 분석 메모
- 전역 상태(`game`) 중심 아키텍처로 결합도가 높다.
- UI 갱신이 로직 함수 근처에 혼재되어 있어 문서화 시 “상태 변경”과 “DOM 반영”을 분리해 추적할 필요가 있다.
