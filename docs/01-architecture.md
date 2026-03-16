# ARCHITECTURE_MAP

## 1) 파일 역할 맵
- `index.html`: DOM 골격 + 인라인 이벤트 + 스크립트 로딩 오케스트레이션.
- `config.js`: 상태/콘텐츠 정의(게임 데이터의 Source of Truth).
- `updates.js`: 버전업 마이그레이션 및 리셋/유틸 계층.
- `main.js`: 런타임 실행 허브(루프/전투/진행/저장/입력).
- `objects.js`: 공통 오브젝트(튜토리얼, 시즌 이벤트).
- `playerSpire.js`: 독립 미니시스템(Spire).

## 2) 의존 방향
1. `index.html`
2. `config.js` (전역 `game` 생성)
3. `updates.js` (호환/초기화 도구)
4. `playerSpire.js` (서브시스템)
5. `objects.js` (보조 시스템)
6. `main.js` (최상위 실행 및 통합)

## 3) 시스템 경계(개략)
- **State Layer**: `game` 전역 객체(`config.js` 기반)
- **Simulation Layer**: 루프, 전투, 자원, 진행(`main.js`)
- **Compatibility Layer**: 저장 버전 호환/리셋(`updates.js`)
- **Feature Modules**: Spire(`playerSpire.js`), Tutorial/Holiday(`objects.js`)
- **Presentation Layer**: DOM/스타일(`index.html`, `css/*`), 업데이트 함수(`main.js`)

## 4) 리스크
- 전역 상태 직접 변경 경로가 많아 회귀 영향 범위 추적이 어렵다.
- `resetGame` 같은 함수는 상태+UI를 함께 다뤄 단위 테스트 경계가 약하다.
