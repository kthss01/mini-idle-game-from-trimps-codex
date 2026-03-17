# 한국어 미번역 구간 점검 (전체 소스 기준)

기준 시점: 2026-03-17

## 요약
- 로케일 사전 기준(`i18n/locales/en.js` vs `i18n/locales/ko.js`) 미번역/누락은 사실상 **1건(0.35%)**입니다.
- 해당 1건은 `ui.spire.preset.trap_chip`으로, 템플릿 HTML 조각(트랩 이름/개수 표시용)이라 의도적으로 공용 문자열로 유지된 형태입니다.
- 검증 스크립트 기준 `missing: 0`, `unused: 0`이며, 경고는 번역 누락이 아니라 `runtime-only` 키(추출 스냅샷 외부 사용) 90건입니다.

## 1) 사전(키) 기준 미번역 현황
- 전체 EN 키: 285
- KO 키: 285
- 누락 키: 0
- 빈 값: 0
- EN과 KO 값 완전 동일: 1
  - `ui.spire.preset.trap_chip`

> 해석: 키 커버리지 자체는 완료 상태이며, 실제 미번역 후보는 1개입니다.

## 2) 미번역 후보 상세

### `ui.spire.preset.trap_chip`
- en 값:
  - `<span class='playerSpireTooltipTrapName' style='background-color: {color}'>{trap}&nbsp;x{count}</span>`
- ko 값:
  - `<span class='playerSpireTooltipTrapName' style='background-color: {color}'>{trap}&nbsp;x{count}</span>`
- 판단:
  - 문장형 번역 대상이라기보다는 UI 렌더링용 템플릿이라 체감 미번역 이슈는 낮음.
  - 다만 정책적으로 "ko는 100% 현지화"를 원하면 별도 키 분리(예: 접두/접미 텍스트) 검토 가능.

## 3) 전체 소스 대비 "한글화 미완" 비율
- 사전 기준 미완(동일값 1건만 미완으로 간주):
  - **1 / 285 = 0.35%**
- 사전 기준 완료:
  - **284 / 285 = 99.65%**

## 4) 참고: 경고 90건(`runtime-only`)의 의미
- `node scripts/validate-i18n.js`에서 출력되는 `runtime-only (90)`은
  - "추출 스냅샷(JSON)에는 없지만 JS 런타임에서 호출되는 키"를 뜻함.
  - 번역 누락 경고가 아니라 추출 파이프라인 가시성 경고임.
- 실제로 해당 검증 결과는 `missing: 0`, `unused: 0`로 번역 데이터 불일치는 확인되지 않음.

## 5) 바로 적용 가능한 우선순위
1. **P0**: `ui.spire.preset.trap_chip` 처리 정책 결정
   - 유지(현 상태) 또는 키 구조를 더 세분화해 표현식 현지화.
2. **P1**: `runtime-only 90` 키를 도메인별로 문서화
   - 추출 대상/비대상 구분을 명시해 관리 지표 혼선을 줄이기.
3. **P2**: CI에서 `validate-i18n` 결과를 정기 스냅샷 문서로 반영
   - 향후 신규 미번역 유입을 조기 차단.
