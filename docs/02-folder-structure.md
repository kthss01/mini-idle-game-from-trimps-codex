# 02-folder-structure

## 루트 구조 요약
- 실행 진입점: `index.html`
- 핵심 런타임 스크립트: `config.js`, `updates.js`, `playerSpire.js`, `objects.js`, `main.js`
- 정적 리소스: `css/`, `fonts/`, `imgs/`
- 외부 SDK/의존: `Playfab/`, `lz-string.js`, `decimal.min.js`

## 디렉터리 책임
- `css/`: 화면 스타일시트 및 테마
- `fonts/`: UI 폰트/아이콘 폰트
- `imgs/`: UI/외부 링크 이미지
- `Playfab/`: PlayFab SDK 및 라이선스 파일
- `docs/`: 개발/분석 문서(본 문서 체계)

## 변경 영향 가이드
- `config.js` 변경은 경제/진행/저장 포맷 전반에 영향을 줄 수 있다.
- `main.js` 변경은 루프/전투/UI 갱신 경계에 직접 영향을 준다.
- `updates.js` 변경은 저장 호환성과 버전 업그레이드 경로를 우선 검증해야 한다.
