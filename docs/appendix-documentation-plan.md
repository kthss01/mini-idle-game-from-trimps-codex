# Trimps 개발자 문서화 계획서

이 문서는 `TRIMPS_ARCHITECTURE_ANALYSIS_PLAN_KO.md`의 분석 워크플로우를 기준으로, 실제 개발자 문서를 어떤 구조와 템플릿으로 작성할지 정의한다.

## 1) Documentation Structure

### 1.1 최상위 문서 맵
1. `docs/00-overview.md` — 프로젝트 개요와 읽기 가이드
2. `docs/01-architecture.md` — 프로젝트 아키텍처
3. `docs/02-folder-structure.md` — 폴더/파일 구조와 책임
4. `docs/03-main-systems.md` — 핵심 시스템 설명
5. `docs/04-important-functions.md` — 주요 함수 레퍼런스
6. `docs/05-data-flow.md` — 상태/이벤트 데이터 흐름
7. `docs/06-game-mechanics.md` — 게임 메커닉/진행 구조
8. `docs/07-save-load-and-migrations.md` — 저장/불러오기/마이그레이션
9. `docs/08-ui-rendering-and-events.md` — UI 갱신/입력 이벤트
10. `docs/09-balancing-and-tuning.md` — 밸런싱 포인트
11. `docs/10-testing-and-debugging.md` — 테스트/디버깅 가이드
12. `docs/appendix-glossary.md` — 용어집 및 상태 키 사전

### 1.2 작성 순서 (분석 계획 연계)
- **Phase A: 구조 파악**
  - `00-overview`, `02-folder-structure` 먼저 작성
- **Phase B: 런타임 중심 분석**
  - `01-architecture`, `03-main-systems`, `05-data-flow` 작성
- **Phase C: 도메인 상세화**
  - `04-important-functions`, `06-game-mechanics`, `08-ui-rendering-and-events` 작성
- **Phase D: 안정성/운영 문서화**
  - `07-save-load-and-migrations`, `09-balancing-and-tuning`, `10-testing-and-debugging`, `appendix`

---

## 2) Sections and Subsections

### 2.1 `00-overview.md`
- 프로젝트 목표/장르/핵심 플레이 루프
- 기술 스택(순수 JS, HTML/CSS, 전역 상태 중심 구조)
- 진입점과 부트스트랩 개요 (`index.html` → 스크립트 로드)
- 신규 기여자 온보딩 순서

### 2.2 `01-architecture.md`
- **시스템 컨텍스트 다이어그램**
  - Game State (`game`) / Main Loop / Combat / Economy / UI / Save-Load
- **런타임 아키텍처**
  - 초기화 단계, 루프 단계, 종료/저장 단계
- **모듈 경계와 의존 방향**
  - `config.js`(정의) ↔ `main.js`(실행) ↔ `updates.js`(마이그레이션)
- **아키텍처 리스크**
  - 전역 결합도, UI-로직 결합, 대규모 함수 복잡도

### 2.3 `02-folder-structure.md`
- 루트 파일 트리 요약
- 폴더별 책임
  - `css/`, `fonts/`, `imgs/`, `Playfab/`
- 핵심 파일 책임 정의
  - `index.html`, `main.js`, `config.js`, `objects.js`, `updates.js`, `playerSpire.js`
- 변경 시 영향 범위(예: `config.js` 변경이 경제/진행 전체에 미치는 영향)

### 2.4 `03-main-systems.md`
- 시스템 카탈로그
  - 게임 루프
  - 전투
  - 자원/경제
  - 월드/맵 진행
  - 업그레이드/해금
  - 포탈/리셋
  - 오프라인 진행
  - 저장/불러오기
  - 스파이어 콘텐츠
- 시스템별 항목
  - 진입 함수
  - 읽기/쓰기 상태 키
  - 관련 UI 훅
  - 주요 분기 조건(챌린지/유니버스 등)

### 2.5 `04-important-functions.md`
- 함수 레퍼런스 포맷 표준
  - 목적, 입력, 출력, 부작용, 호출 관계
- 우선 문서화 함수군
  - `gameLoop` 계열
  - 전투/진행 핵심 함수
  - 저장/불러오기 및 버전업데이트 함수
  - UI 업데이트/메시지 함수
- 함수 간 상호작용 시퀀스 예시

### 2.6 `05-data-flow.md`
- 전역 상태 스키마 개요 (`game.global`, resources, jobs, upgrades 등)
- 틱 단위 데이터 흐름
  1) 시간 계산
  2) 시뮬레이션 업데이트
  3) 상태 변경
  4) UI 반영
  5) 저장 트리거
- 이벤트 기반 흐름
  - 사용자 입력 → 명령 함수 → 상태 변경 → UI
- 오프라인 진행/보정 흐름 분리

### 2.7 `06-game-mechanics.md`
- 코어 메커닉
  - 자원 생산/소비
  - 전투 계산과 승패 조건
  - 월드/맵 진행 규칙
- 성장 메커닉
  - 업그레이드/장비/건물/직업
  - 해금 조건 및 선행 관계
- 리셋 메커닉
  - 포탈 시 유지/초기화 상태 매트릭스
- 후반 콘텐츠
  - 스파이어 구조와 메인 진행 루프 연결

### 2.8 `07-save-load-and-migrations.md`
- 저장 포맷 개요
- 저장/불러오기 흐름
- 버전 마이그레이션 전략 (`updates.js` 중심)
- 하위 호환 정책과 실패 시 복구 전략

### 2.9 `08-ui-rendering-and-events.md`
- 화면 영역 분해(자원/전투/패널/모달)
- DOM ID ↔ 업데이트 함수 매핑
- 사용자 액션 ↔ 명령 함수 매핑
- 접근성 모드(`usingScreenReader`) 분기
- 렌더링 성능 주의점

### 2.10 `09-balancing-and-tuning.md`
- 밸런싱 레버 목록
  - 자원 계수, 비용 곡선, 전투 계수, 버프/스택
- 조정 절차
  - 가설 → 파라미터 변경 → 측정 지표 확인
- 회귀 방지 체크리스트

### 2.11 `10-testing-and-debugging.md`
- 수동 테스트 시나리오
  - 초반 진행, 중반 성장, 포탈, 오프라인 복귀
- 디버깅 포인트
  - 루프 지연, 상태 불일치, 저장 호환성
- 버그 리포트 템플릿

### 2.12 `appendix-glossary.md`
- 용어집
- 상태 키 사전
- 자주 보는 함수 인덱스
- 이슈 조사 로그 링크

---

## 3) What information should be included in each section

각 문서 섹션에는 공통적으로 다음 정보를 포함한다.

1. **Why it exists**
   - 이 섹션이 필요한 이유와 독자가 해결할 질문
2. **Scope**
   - 다루는 범위/제외 범위
3. **Source of truth**
   - 근거 파일 목록과 함수/상태 키
4. **Core explanation**
   - 개념 설명 + 실제 코드 흐름
5. **Developer impact**
   - 수정 시 영향도, 리스크, 주의사항
6. **Checklist**
   - 리뷰 체크리스트(누락 방지)
7. **Open questions**
   - 미해결 이슈와 후속 조사 포인트

권장 표준 형식:
- 표(함수/상태/의존관계)
- 시퀀스 다이어그램(틱, 저장, 입력 이벤트)
- 결정 기록(왜 이렇게 설계되었는지)

---

## 4) Example documentation templates

### Template A: 시스템 문서 (`03-main-systems.md`용)
```md
# [System Name]

## Purpose
- 이 시스템이 해결하는 문제:
- 플레이 경험에서의 역할:

## Entry Points
- 함수:
- 호출 위치:

## State Contract
| Key | Read/Write | Description | Risk |
|---|---|---|---|
| game.global.xxx | R/W | ... | High |

## Flow
1. ...
2. ...
3. ...

## UI Hooks
- updateXXX()
- tooltip/message 영향

## Edge Cases
- 오프라인 진행 시:
- 챌린지/모드 분기:

## Change Safety Checklist
- [ ] 저장 호환성 영향 확인
- [ ] UI 반영 누락 확인
- [ ] 밸런스 지표 재검증
```

### Template B: 함수 레퍼런스 (`04-important-functions.md`용)
```md
# Function: functionName

## Signature
`function functionName(arg1, arg2)`

## Responsibility
- 무엇을 하는 함수인지 1~2문장으로 요약

## Inputs
- arg1:
- arg2:

## Outputs
- 반환값:
- 상태 변경:

## Side Effects
- game.* 변경:
- DOM 변경:
- 로그/메시지:

## Called By / Calls
- Called by:
- Calls:

## Failure / Edge Conditions
- 입력 경계값:
- 모드별 분기:

## Test Notes
- 최소 검증 시나리오:
```

### Template C: 데이터 흐름 문서 (`05-data-flow.md`용)
```md
# Data Flow: [Scenario]

## Scenario
- 예: 한 틱에서 자원 생산 후 전투까지

## Preconditions
- 필요한 상태:

## Step Flow
1. [Function A] reads game.global.time
2. [Function B] updates game.resources.food
3. [Function C] evaluates combat
4. [Function D] triggers UI updates

## Sequence Diagram
`mermaid sequenceDiagram` 예시:
- participant U as User/Input
- participant L as Game Loop
- participant S as State(game)
- participant UI as Renderer
- L->>S: update resources
- L->>S: resolve combat
- L->>UI: update panels

## Observability
- 디버깅 로그 포인트:
- 재현 방법:
```

### Template D: 게임 메커닉 문서 (`06-game-mechanics.md`용)
```md
# Mechanic: [Name]

## Player-facing Rule
- 플레이어가 체감하는 규칙

## Internal Rule
- 코드 상 계산식/조건

## Dependencies
- 관련 자원:
- 관련 업그레이드/버프:
- 관련 상태 키:

## Formula (if any)
- value = base * multiplier + bonus

## Unlock / Reset Interaction
- 해금 조건:
- 포탈/리셋 후 상태:

## Balancing Notes
- 민감 파라미터:
- 조정 시 부작용:
```

---

## 5) 운영 가이드 (문서 유지보수)

- 문서 우선순위: `01-architecture`와 `03-main-systems`를 항상 최신으로 유지
- 코드 변경 PR에는 관련 문서 링크를 포함
- 큰 구조 변경 시 ADR(Architecture Decision Record) 1건 추가
- 릴리즈 전 문서 검토 체크:
  - [ ] 저장/마이그레이션 문서 최신화
  - [ ] 신규 메커닉 문서 추가
  - [ ] 주요 함수 레퍼런스 갱신
