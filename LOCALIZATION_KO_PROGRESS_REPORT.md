# Trimps 한국어 현지화 진행도 점검 보고서 (업데이트)

## 요약
- 로케일 키 수는 `en=285`, `ko=285`로 동일하며 누락/빈 값은 없습니다.
- 영문/한글 값이 동일한 키는 1개(`ui.spire.preset.trap_chip`)입니다.
- 런타임 `i18n.t(...)` 리터럴 키는 116개이며, 이 중 추출 스냅샷(`extracted-ui-strings + extracted-ui-attrs`)에 없는 `runtime-only` 키가 90개입니다.
- 즉, **사전 완성도는 높지만 추출 스냅샷과 런타임 사용처 간 정합성 격차가 큽니다.**

## 1) 사전(번역 데이터) 품질
기준 파일:
- `i18n/locales/en.js`
- `i18n/locales/ko.js`

정량 결과:
- en 키 수: **285**
- ko 키 수: **285**
- ko 누락(missing): **0**
- ko 빈 값(empty): **0**
- en/ko 동일값: **1** (`ui.spire.preset.trap_chip`)
- 유효 번역 키: **285/285**

## 2) 추출 스냅샷 기준 커버리지
기준 파일:
- `i18n/extracted-ui-strings.json`
- `i18n/extracted-ui-attrs.json`

정량 결과:
- strings 키 수: **173**
- attrs 키 수: **125**
- 합집합(추출 키셋): **198**

해석:
- HTML/속성 추출 누적 스냅샷은 198개 키를 커버합니다.
- 현재 런타임 리터럴 키(116개) 중 90개가 스냅샷에 없으므로, 추출 파이프라인 또는 추출 대상 파일/패턴 보강이 필요합니다.

## 3) 런타임 i18n 적용 현황 (`i18n.t(...)` 리터럴)
스캔 대상:
- `main.js`, `config.js`, `updates.js`, `objects.js`, `playerSpire.js`

파일별 호출 수:
- `main.js`: **30**
- `config.js`: **18**
- `updates.js`: **36**
- `objects.js`: **20**
- `playerSpire.js`: **31**
- 합계: **135 호출 / 고유 키 116개**

검증 결과(`node scripts/validate-i18n.js`):
- dynamic key 실패: **0**
- missing: **0**
- unused: **0**
- runtime-only: **90** (en/ko 동일)

## 4) 병목/리스크 분석
1. **추출-런타임 불일치 증가**
   - `runtime-only 90`은 단순 경고 수준을 넘어, 관리 지표(번역 적용률/검증 자동화) 왜곡 위험이 큽니다.

2. **문서화 수치 최신화 필요**
   - 기존 문서의 과거 지표(예: runtime-only 67, 낮은 호출 수)와 현재 코드 기준이 다릅니다.

3. **도메인 우선순위 정비 필요**
   - `updates.js`, `main.js`, `config.js`의 호출 비중이 큰 만큼, 플레이어 체감 경로 중심으로 먼저 추출/검증 동기화를 맞추는 것이 효과적입니다.

## 5) 권장 액션
- P0: `runtime-only` 90개를 도메인별(맵/전투/Spire/설정)로 분류해
  1) HTML/속성 추출 대상에 편입할 키,
  2) 런타임 전용 키로 의도적으로 유지할 키
  를 분리 정의.
- P1: `scripts/extract-i18n.js`의 대상 파일/속성 패턴을 현재 UI 구조에 맞게 확장.
- P2: `docs/localization/*`와 본 보고서의 지표 갱신 주기를 CI 검증 결과와 맞춰 자동 업데이트.

## 측정 메타데이터
- 측정 시각(UTC): 2026-03-17
- 측정 명령:
  - `node scripts/validate-i18n.js`
  - `node` 인라인 스크립트(로케일 키 수/동일값/런타임 호출 수 집계)
  - `node` 인라인 스크립트(HTML 바인딩 개수 확인)
