# 한국어 현지화 진행도 및 develop 병합 판단 (2026-03-17)

## 1) 현재 진행도 요약

### 정량 지표
- 로케일 키 수: en **235** / ko **235**
- 누락(missing) **0**, 빈 값(empty) **0**
- en/ko 동일값 **2** (`ui.menu.perks.unknown`, `ui.spire.preset.trap_chip`)
- 유효 번역 키 **233/235**

- HTML i18n 적용 (`scripts/extract-i18n.js`, 고유 키 / 바인딩)
  - `index.html`: **94 / 94** (`data-i18n` 91, `data-i18n-html` 1, `data-i18n-title` 0, `data-i18n-attr` 2)
  - `ScreenReader.html`: **82 / 82** (69, 2, 0, 11)
  - `indexKong.html`: **40 / 40** (37, 1, 0, 2)
  - `Kongregate_Game_Shell.html`: **1 / 1** (1, 0, 0, 0)
  - HTML 신규 추출 키: **103**
  - 문자열 호환 누적 키(`extracted-ui-strings.json`): **157**
  - 속성 포함 키(`extracted-ui-attrs.json`): **114**

- JS 런타임 `i18n.t(...)` 적용 수 (리터럴 기준)
  - `main.js`: **23**
  - `config.js`: **10**
  - `updates.js`: **21**
  - `objects.js`: **18**
  - `playerSpire.js`: **31**
  - 합계: **103 호출 / 고유 키 93**

- `node scripts/validate-i18n.js` 결과
  - dynamic-keys 실패: **0**
  - `runtime-only`: **67개** (en/ko 동일)

### 해석
- **사전 번역 완성도는 매우 높음(233/235).**
- 다만 추출 키셋 대비 런타임 키 차이(`runtime-only=67`)가 남아 있어, 릴리즈 게이트를 엄격히 적용하면 후속 정리가 필요.

---

## 2) 카운트 기준 (문서/스크립트 통일 정의)

1. HTML 적용 수는 `data-i18n`, `data-i18n-html`, `data-i18n-title`, `data-i18n-attr`를 모두 포함한다.
2. 문서에는 **고유 키 수**와 **바인딩 수**를 분리 표기한다.
3. JS 적용 수는 `i18n.t(...)`의 첫 번째 인자가 리터럴일 때만 집계한다.
4. `runtime-only`는 `runtimeKeys - (extracted-ui-strings + extracted-ui-attrs)`로 계산한다.
5. 주석/비활성 텍스트는 집계 대상에서 제외한다(정적 파서 매칭 기준).

---

## 3) 게임 진행 기준 우선순위 (추천)

### P0 (최우선): 진행/판단에 직접 영향
1. **전투/맵/포탈 전환 메시지** (`main.js`, `updates.js`, `objects.js`)
2. **즉시 플레이 효율에 영향 주는 설정 설명** (`config.js`)

### P1 (높음): 반복 사용 UI
3. **Spire / Spire Assault UI** (`playerSpire.js`)
4. **맵/도전 도메인 문구 일관성** (`ui.map.*`, `ui.message.challenge.*`)

### P2 (중간): 접근성/플랫폼/부가 문서
5. `indexKong.html` 잔여 문구
6. `ScreenReader.html` 장문 문체 통일
7. `updates.html` 계정/문서성 UI

---

## 4) develop 브랜치 병합 가능 여부

### 판단
- **조건부 병합 권장** (통합은 가능, 릴리즈 게이트는 별도 판단).

### 병합 가능한 근거
- en/ko 누락/빈 값 없음.
- 주요 런타임 파일에서 i18n 적용이 확장되어 체감 개선이 존재.

### 보류 근거
- 워크플로우 게이트를 `runtime-only=0`으로 유지한다면 현재 **67개**로 미통과.

### 결론
- develop이 통합/검증 브랜치라면 병합 후 정리 지속 가능.
- develop이 릴리즈 직결 브랜치라면 `runtime-only` 축소 후 병합 권장.

---

## 5) 브랜치 상태 확인 한계
- 현재 로컬 환경에서 `develop` 리모트 비교(`ahead/behind`)는 수행하지 않았고,
- 본 문서는 **로컬 품질 지표 기반 판단**이다.

---

## 측정 메타데이터
- 측정 시각(UTC): **2026-03-17T01:04:35Z**
- 측정 브랜치: **work**
- 측정 기준 커밋: **414a3ea86df70cf2c41571de4a723868e900be56**
- 실행 명령:
  - `node scripts/extract-i18n.js`
  - `node scripts/validate-i18n.js`
