# mini-idle-game-from-trimps-codex

Trimps 기반 미니 방치형 게임 코드베이스입니다.

## 빠른 실행
- 브라우저에서 `index.html`을 열어 실행할 수 있습니다.
- 접근성 화면은 `ScreenReader.html`에서 확인할 수 있습니다.

## i18n 작업 명령어
- UI 문자열 추출: `node scripts/extract-i18n.js`
- 로케일 검증: `node scripts/validate-i18n.js`

일반적인 현지화 작업 순서:
1. HTML에서 `data-i18n="..."` 키를 부여합니다.
2. `extract-i18n.js`로 키 목록(`i18n/extracted-ui-strings.json`)을 갱신합니다.
3. `i18n/locales/en.js`, `i18n/locales/ko.js`를 업데이트합니다.
4. `validate-i18n.js`로 누락/미사용 키를 검증합니다.
