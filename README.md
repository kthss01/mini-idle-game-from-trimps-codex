# mini-idle-game-from-trimps-codex

## 1) 프로젝트 소개 / 현재 상태
Trimps 원본 코드를 기반으로 구조를 해석·정리하는 **분석 중심 미니 Idle 게임 저장소**입니다.  
현재는 게임 로직 자체의 대규모 리팩터링보다, 원본 동작 보존을 전제로 한 **아키텍처 분석 문서화**를 우선 진행하고 있습니다.

## 2) 코드 구조 요약 (핵심 스크립트)
- `config.js`: 밸런스 상수, 기본 설정값, 환경별/모드별 전역 구성값을 정의합니다.
- `main.js`: 게임 부트스트랩, 메인 루프, 주요 상태 전이와 UI 갱신 트리거를 담당합니다.
- `updates.js`: 프레임/틱 단위 계산 및 자원·전투·진행 업데이트 로직을 수행합니다.
- `objects.js`: 게임에서 사용하는 주요 데이터 객체/도메인 구조(유닛, 업그레이드, 상태 객체 등)를 정의합니다.
- `playerSpire.js`: Spire(관련) 플레이어 진행/상태 계산 및 연관된 특수 규칙 처리를 담당합니다.

## 3) 문서 인덱스 (루트 분석 문서)
현재 분석 문서는 저장소 루트에 위치합니다.

- [00_project_overview.md](./00_project_overview.md)
- [ARCHITECTURE_MAP.md](./ARCHITECTURE_MAP.md)
- [GAME_LOOP_FLOW.md](./GAME_LOOP_FLOW.md)
- [CORE_SYSTEMS.md](./CORE_SYSTEMS.md)
- [PROGRESSION_MODEL.md](./PROGRESSION_MODEL.md)
- [UI_LOGIC_MAP.md](./UI_LOGIC_MAP.md)
- [SAVE_LOAD_AND_MIGRATION.md](./SAVE_LOAD_AND_MIGRATION.md)
- [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md)
- [analysis_log.md](./analysis_log.md)
- [TRIMPS_DEVELOPER_DOCUMENTATION_PLAN.md](./TRIMPS_DEVELOPER_DOCUMENTATION_PLAN.md)
- [TRIMPS_ARCHITECTURE_ANALYSIS_PLAN_KO.md](./TRIMPS_ARCHITECTURE_ANALYSIS_PLAN_KO.md)

## 4) 기여 / 검증 최소 절차
코드를 수정할 때는 아래 최소 절차를 따라주세요.

1. 변경한 코드 파일의 책임 범위가 기존 문서와 일치하는지 확인합니다.
2. 코드 영향 범위에 맞춰 관련 문서를 함께 갱신합니다.
   - 루프/업데이트 변경: `GAME_LOOP_FLOW.md`, `CORE_SYSTEMS.md`
   - 구조/모듈 책임 변경: `ARCHITECTURE_MAP.md`, `00_project_overview.md`
   - 저장/로드·마이그레이션 영향: `SAVE_LOAD_AND_MIGRATION.md`
   - 진행/밸런스 영향: `PROGRESSION_MODEL.md`
   - UI 흐름 영향: `UI_LOGIC_MAP.md`
3. 변경 요약을 `analysis_log.md`에 기록합니다.
4. PR 설명에 “코드 변경 + 문서 동기화 여부”를 명시합니다.

## 5) 문서 위치 정책 (현재 vs 목표)
- **현재 위치**: 분석 문서가 저장소 **루트**에 분산되어 있습니다.
- **목표 위치**: 문서 체계를 `/docs` 하위로 단계적으로 이전하여, 개요/아키텍처/시스템/UI/로드맵을 주제별 디렉터리로 정리할 계획입니다.
- 이전 완료 전까지는 루트 문서를 기준으로 유지·갱신합니다.
