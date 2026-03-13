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
   - `scripts/validate-i18n.js`를 추가해 추출된 UI 키 대비 각 로케일의 누락/미사용 키를 확인할 수 있게 했습니다.

## 키 네이밍 규칙
- 도메인 기반 dot notation 사용: `ui.offline.start_fighting`
- 섹션별 구분: `ui.offline.*`, `ui.bone_trader.*`

## 권장 작업 순서
1. HTML에 `data-i18n` 키를 반영합니다.
2. `node scripts/extract-i18n.js`로 키 목록을 갱신합니다.
3. `i18n/locales/en.js`, `i18n/locales/ko.js`에 번역을 반영합니다.
4. `node scripts/validate-i18n.js`를 실행해 누락/미사용 키를 점검합니다.

## 다음 단계
- `main.js`, `objects.js`, `updates.js`, `config.js`의 동적 문자열을 `t('...')`로 전환
- 플레이스홀더(`{count}`)를 포함한 템플릿 메시지 구조 도입
- 추출/검증 결과를 CI에서 자동 검사
