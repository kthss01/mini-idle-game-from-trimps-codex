# Trimps 한국어 현지화 1차 적용 정리

## 이번 커밋에서 진행한 항목
1. 사용자 노출 문자열 탐지 기반 마련
   - `scripts/extract-i18n.js`를 추가해 `data-i18n`이 적용된 UI 문자열을 수집하도록 구성했습니다.
2. 문자열 분리
   - `i18n/locales/en.js`, `i18n/locales/ko.js`를 추가해 영어/한국어 사전을 분리했습니다.
3. 하드코딩 텍스트 치환
   - `index.html`, `ScreenReader.html`의 오프라인 진행 UI 및 Bone Trader 일부 UI를 `data-i18n` 키로 치환했습니다.
4. 로컬라이제이션 시스템 설계/구현
   - `i18n/i18n.js`에 `t`, `setLocale`, `applyI18nToDom` 및 `localStorage` 기반 언어 저장 로직을 구현했습니다.
5. 번역 워크플로우 준비
   - 추출 스크립트로 키 목록을 파일화하고, 사전 파일 기반으로 번역 반영이 가능하도록 했습니다.
6. 로케일 검증 자동화 추가
   - `scripts/validate-i18n.js`에서 추출 키 + 런타임 코드 스캔 키를 합쳐 `missing`/`unused`/`runtime-only`를 분리 출력합니다.

## 키 네이밍 규칙
- 도메인 기반 dot notation 사용: `ui.offline.start_fighting`
- 섹션별 구분: `ui.offline.*`, `ui.bone_trader.*`

## 권장 작업 순서
1. HTML에 `data-i18n` 키를 반영합니다.
2. `node scripts/extract-i18n.js`로 키 목록을 갱신합니다.
3. 런타임 문자열이 있는 경우 `main.js`, `objects.js`, `updates.js`, `config.js`에서 `i18n.t('...')` 형태로 키를 적용합니다.
4. `i18n/locales/en.js`, `i18n/locales/ko.js`에 번역을 반영합니다.
5. `node scripts/validate-i18n.js`를 실행해 아래 결과를 기준으로 수정 우선순위를 정합니다.
   - `missing`: 로케일 파일에 반드시 추가해야 하는 키(최우선)
   - `unused`: 로케일에만 남아 있는 키(정리 대상)
   - `runtime-only`: 코드(`i18n.t`)에서만 사용되고 추출 파일에는 없는 키(추출 범위 확장 또는 예외 검토)

## 동적 키 사용 규칙 (오탐 방지)
validator는 `i18n.t(...)`의 첫 번째 인자를 정적 분석합니다. 아래 규칙을 따르지 않으면 검증 실패로 처리됩니다.

1. 권장 패턴
   - 항상 문자열 리터럴 사용: `i18n.t('ui.map.zone')`
   - 파라미터는 두 번째 인자로 전달: `i18n.t('ui.map.map_bonus', { bonus: value })`
2. 금지/주의 패턴
   - 템플릿 동적 키: ``i18n.t(`ui.map.${type}`)``
   - 변수 키 직접 전달: `i18n.t(keyName)`
3. 예외가 필요한 경우
   - `scripts/validate-i18n.js`의 `dynamicKeyRules.allowedTemplatePrefixes`에 허용 접두사를 추가
   - 특정 표현식을 무시해야 하면 `dynamicKeyRules.ignoredExpressions`에 등록

## 다음 단계
- 플레이스홀더(`{count}`)를 포함한 템플릿 메시지 구조 도입
- 추출/검증 결과를 CI에서 자동 검사
