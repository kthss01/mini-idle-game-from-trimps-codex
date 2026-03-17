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
이 저장소의 분석/개발 문서는 `docs/` 표준 체계(00~10, appendix)로 정리되었습니다.

- 문서 진입점: [docs/INDEX.md](./docs/INDEX.md)

기존 루트 문서 파일들은 하위 호환을 위한 **이동 안내(redirect) 파일**로 유지됩니다.
