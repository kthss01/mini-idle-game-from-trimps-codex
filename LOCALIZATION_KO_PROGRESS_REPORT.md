# Trimps 한국어 현지화 진행도 점검 보고서

## 개요
이 문서는 현재 저장소의 한국어 현지화(i18n) 적용 상태를 최신 코드 기준으로 점검한 결과입니다.

- 기준 로케일: `i18n/locales/en.js`
- 한국어 로케일: `i18n/locales/ko.js`
- 추출 스크립트: `scripts/extract-i18n.js`
- 검증 스크립트: `scripts/validate-i18n.js`
- 점검 범위: HTML 바인딩(`data-i18n`, `data-i18n-html`, `data-i18n-title`, `data-i18n-attr`) + JS 런타임(`i18n.t(...)`)

---

## 1) 정량 지표 (최신)

### A. 로케일 사전 품질 (`en.js` vs `ko.js`)
- en 키 수: **235**
- ko 키 수: **235**
- 누락(missing): **0**
- 빈 값(empty): **0**
- en/ko 동일값: **2** (`ui.menu.perks.unknown`, `ui.spire.preset.trap_chip`)
- 유효 번역 키: **233 / 235**

### B. HTML i18n 바인딩 적용 수 (`scripts/extract-i18n.js`)
> 아래 수치는 **파일별 고유 키 수(unique)** 와 **속성 바인딩 수(binding)** 를 함께 표기합니다.

| 파일 | 고유 키 수 | 바인딩 수 | 세부(`data-i18n`/`data-i18n-html`/`data-i18n-title`/`data-i18n-attr`) |
|---|---:|---:|---|
| `index.html` | 94 | 94 | 91 / 1 / 0 / 2 |
| `ScreenReader.html` | 82 | 82 | 69 / 2 / 0 / 11 |
| `indexKong.html` | 40 | 40 | 37 / 1 / 0 / 2 |
| `Kongregate_Game_Shell.html` | 1 | 1 | 1 / 0 / 0 / 0 |

- HTML 신규 추출 키(`stringsResult`): **103**
- 문자열 호환 누적 키(`i18n/extracted-ui-strings.json`): **157**
- 속성 포함 키(`i18n/extracted-ui-attrs.json`): **114**

### C. JS 런타임 i18n 호출 수 (`i18n.t(...)` 정적 리터럴 기준)
- `main.js`: **23**
- `config.js`: **10**
- `updates.js`: **21**
- `objects.js`: **18**
- `playerSpire.js`: **31**
- 합계: **103 호출**, 고유 키 **93개**

### D. 검증 결과 (`node scripts/validate-i18n.js`)
- 동적 키 검증 실패: **0**
- missing: **0**
- unused: **0**
- runtime-only: **67** (en/ko 동일)

---

## 2) 카운트 기준(정의)

문서/스크립트 숫자 불일치를 방지하기 위해 아래 기준으로 통일합니다.

1. **HTML 적용 수**
   - 기본 표시는 `scripts/extract-i18n.js` 출력 기준 사용.
   - `data-i18n`, `data-i18n-html`, `data-i18n-title`, `data-i18n-attr`를 모두 포함.
   - 문서에는 반드시
     - 고유 키 수(중복 제거),
     - 바인딩 수(속성 엔트리 개수)
     를 분리해 표기.

2. **JS 런타임 적용 수**
   - `scripts/validate-i18n.js`와 동일한 파서 기준으로 `i18n.t(...)` 첫 번째 인자만 분석.
   - 문자열 리터럴(작은따옴표/큰따옴표/템플릿 리터럴 중 `${}` 없는 경우)만 정적 키로 집계.

3. **`runtime-only` 기준**
   - `runtime-only` = `runtimeKeys - extractedKeys`.
   - `extractedKeys`는 `extracted-ui-strings.json` + `extracted-ui-attrs.json`의 키 합집합.

4. **포함/제외 규칙**
   - **주석/비활성 코드 제외**: 정적 파서는 실제 구문 매칭 기준이며 주석 텍스트는 키로 집계하지 않음.
   - **중복 호출/중복 바인딩**
     - 호출/바인딩 수는 occurrence 기준,
     - 키 수는 unique 기준으로 분리 표기.

---

## 3) 스크립트 산출 방식 통일 사항

- `scripts/extract-i18n.js`
  - 파일별 출력에 `고유 키 수`와 `바인딩 수(속성별 breakdown)`를 함께 출력.
  - 기존 `i18n/extracted-ui-strings.json`을 유지 병합하여 누적 키셋을 보존.
- `scripts/validate-i18n.js`
  - 기존과 동일하게 `extracted keys(문서/추출 기준)`와 `runtime keys(실행 경로 기준)`의 차이를 `runtime-only`로 경고.
- 문서 지표는 위 두 스크립트의 출력값만 인용.

---

## 4) 종합 해석

- 외부화된 로케일 사전 자체는 높은 완성도(**233/235**)를 유지.
- HTML 바인딩과 런타임 호출은 지속 확장됐으나, `runtime-only 67`이 남아 추출 스냅샷과 런타임 키셋이 완전히 일치하지는 않음.
- 따라서 사용자 체감 품질은 높지만, 게이트를 엄격히 적용하면(예: `runtime-only=0`) 추가 정리 작업이 필요.

---

## 측정 메타데이터
- 측정 시각(UTC): **2026-03-17T01:04:35Z**
- 측정 브랜치: **work**
- 측정 기준 커밋: **414a3ea86df70cf2c41571de4a723868e900be56**
- 실행 명령:
  - `node scripts/extract-i18n.js`
  - `node scripts/validate-i18n.js`
