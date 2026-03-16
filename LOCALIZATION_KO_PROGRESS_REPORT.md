# Trimps 한국어 현지화 진행도 점검 보고서

## 개요
이 문서는 현재 저장소의 한국어 현지화(i18n) 적용 상태를 점검한 결과입니다.

- 기준 로케일: `i18n/locales/en.js`
- 한국어 로케일: `i18n/locales/ko.js`
- 검증 스크립트: `scripts/validate-i18n.js`
- 점검 범위: 주요 HTML/JS UI 파일

---

## 1) 원문(영어) 대비 현재 코드 비교 결과
중첩 객체를 평탄화(flatten)하여 키 단위로 비교했습니다.

- 영어(en) 키 수: **68**
- 한국어(ko) 키 수: **68**
- 번역 완료 키 수(ko 값 존재 + 비어있지 않음 + en과 다름): **68**
- ko 누락 키: **0**
- ko 빈 문자열 키: **0**
- en/ko 동일(미번역으로 볼 수 있는) 키: **0**

✅ **현재 외부화된(i18n 키로 분리된) 문자열 집합 기준 번역률은 100% (68/68) 입니다.**

---

## 2) 한국어 번역 문자열 탐지 결과
저장소 내 한글 문자열은 주로 아래에 존재합니다.

- `i18n/locales/ko.js` (실제 번역 데이터)
- `LOCALIZATION_KO_WORKFLOW.md`, `README.md`, 일부 스크립트 주석/로그

반대로, 핵심 게임 UI/런타임 파일(`main.js`, `config.js`, `updates.js`, `objects.js`, `indexKong.html` 등)에는 한글 문자열이 거의 없고, 영어 하드코딩 문자열이 다수 남아 있습니다.

---

## 3) 번역/미번역 문자열 수 집계
### A. i18n 사전(외부화된 문자열) 기준
- 번역됨: **68**
- 미번역: **0**
- 번역률: **100%**

### B. 프로젝트 전체 UI 체감 기준
- 외부화된 키셋 자체는 완료 상태이나,
- 대다수 UI 텍스트가 여전히 코드/HTML에 영어로 하드코딩되어 있어
- 프로젝트 전체 기준으로는 초기 단계로 판단됩니다.

---

## 4) 전체 현지화 진행률 추정
두 가지 지표를 분리해 보는 것이 정확합니다.

1. **외부화된 키셋 번역률:** 100%
2. **프로젝트 전체 현지화 성숙도(체감):** **약 1~5%**

> 이유: 현재 번역된 68개 키는 존재하지만, 런타임/설정/업데이트/기능 UI의 대부분 문자열은 아직 i18n 키로 이전되지 않았습니다.

---

## 5) 파일별 번역 상태 표
| 파일 | i18n 적용 흔적 | 상태 | 비고 |
|---|---:|---|---|
| `i18n/locales/en.js` | 기준 사전 | 기준(영문) | 68 keys |
| `i18n/locales/ko.js` | 번역 사전 | ✅ 외부화 키셋 100% 번역 | 68 keys |
| `index.html` | `data-i18n`: 41 | 🟡 부분 적용 | 일부 UI만 i18n 적용 |
| `ScreenReader.html` | `data-i18n`: 32 | 🟡 부분 적용 | 접근성 안내문 등 영어 다수 |
| `indexKong.html` | 없음 | 🔴 미적용(대부분 영어) | 하드코딩 텍스트 다수 |
| `main.js` | `i18n.t(...)`: 16 | 🔴 대부분 미현지화 | 런타임 메시지 영어 다수 |
| `objects.js` | `i18n.t(...)`: 2 | 🔴 대부분 미현지화 | 튜토리얼/라벨 영어 다수 |
| `updates.js` | `i18n.t(...)`: 11 | 🔴 대부분 미현지화 | 로그/메시지 영어 다수 |
| `config.js` | `i18n.t(...)`: 6 | 🔴 대부분 미현지화 | 설명 문자열 대량 영어 |
| `playerSpire.js` | 없음 | 🔴 미현지화 | Spire UI 영어 |
| `updates.html` | 없음 | 🔴 미현지화(문서 성격) | 패치노트 영어 |

---

## 6) 미번역(영어) UI 문자열 예시
- `indexKong.html`: `Making up lost time...`, `Bone Trader`, `Wanna run a map?`
- `ScreenReader.html`: `Screen Reader Information`
- `main.js`: `Game Saved!`
- `objects.js`: `Found a Map`, `Map Chamber`, `Custom Maps`
- `updates.js`: `Game Saved!` 관련 분기 문자열
- `config.js`: `Increases the amount of extra Helium you find in the World ...`
- `playerSpire.js`: `Trap Layout`
- `updates.html`: `Remember Me`

---

## 7) 우선순위 제안
1. **`main.js`, `config.js`, `updates.js`, `objects.js`**: 런타임 노출 텍스트가 많아 사용자 체감 효과가 가장 큼.
2. **`indexKong.html`**: `index.html` 대비 i18n 적용이 거의 없어 우선 전환 필요.
3. **`playerSpire.js` 및 기능별 보조 UI**: 메뉴/툴팁의 잔여 영어 구간 정리.

