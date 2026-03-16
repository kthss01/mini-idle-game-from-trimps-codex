# Documentation Governance Policy

이 문서는 코드 변경 시 문서 최신성을 유지하기 위한 운영 정책(소유 범위, 갱신 규칙, PR 검증 절차)을 정의한다.

## 1) 문서 소유 범위(Ownership Scope)

아래 범위는 문서의 1차 책임 영역을 의미하며, 실제 PR에서는 변경 영향에 따라 다중 문서 동시 갱신이 필요할 수 있다.

### A. 시스템/아키텍처 문서
- 대상 문서
  - `docs/01-architecture.md`
  - `docs/03-main-systems.md`
  - `docs/05-data-flow.md`
  - `ARCHITECTURE_MAP.md`, `CORE_SYSTEMS.md`, `GAME_LOOP_FLOW.md`
- 책임 범위
  - 시스템 경계, 모듈 책임, 런타임 흐름, 주요 데이터 흐름 변화

### B. 저장/호환/마이그레이션 문서
- 대상 문서
  - `docs/07-save-load-and-migrations.md`
  - `SAVE_LOAD_AND_MIGRATION.md`
- 책임 범위
  - 세이브 포맷 변경, 로드 로직 변경, 버전 호환성, 마이그레이션 절차

### C. UI/렌더링/상호작용 문서
- 대상 문서
  - `docs/08-ui-rendering-and-events.md`
  - `UI_LOGIC_MAP.md`
- 책임 범위
  - 화면 구성, 이벤트 바인딩, 렌더링 순서, 접근성/사용성 변화

### D. 게임 규칙/밸런싱 문서
- 대상 문서
  - `docs/06-game-mechanics.md`
  - `docs/09-balancing-and-tuning.md`
  - `PROGRESSION_MODEL.md`
- 책임 범위
  - 수치 모델, 성장 곡선, 난이도, 밸런싱 원칙

### E. 인덱스/개요/온보딩 문서
- 대상 문서
  - `docs/INDEX.md`
  - `docs/00-overview.md`
  - `README.md`
- 책임 범위
  - 문서 네비게이션, 시작 가이드, 문서 구조 반영

---

## 2) 코드 변경 유형별 필수 문서 업데이트 매트릭스

아래 매트릭스는 "최소 필수"를 정의한다. 변경이 광범위하면 관련 문서를 추가 갱신한다.

| 코드 변경 유형 | 대표 파일/영역 예시 | 필수 갱신 문서 | 비고 |
|---|---|---|---|
| 세이브/로드/마이그레이션 로직 변경 | `updates.js`, 세이브 버전 처리 코드 | `docs/07-save-load-and-migrations.md`, `SAVE_LOAD_AND_MIGRATION.md` | **예: `updates.js` 변경 시 저장/호환 문서 갱신 필수** |
| 핵심 시스템 흐름 변경 | `main.js`, `objects.js`의 시스템 간 호출 구조 | `docs/03-main-systems.md`, `docs/05-data-flow.md` | 필요 시 `docs/01-architecture.md` 동시 갱신 |
| 데이터 모델/오브젝트 스키마 변경 | `objects.js`, 전역 상태 구조 | `docs/05-data-flow.md`, `docs/04-important-functions.md` | 세이브 포맷 영향 시 저장 문서도 필수 |
| UI 렌더링/이벤트 처리 변경 | `index.html`, `updates.html`, UI 관련 JS/CSS | `docs/08-ui-rendering-and-events.md`, `UI_LOGIC_MAP.md` | 사용자 흐름이 바뀌면 개요 문서도 반영 |
| 게임 규칙/수치 조정 | 메커닉, 보상, 난이도 파라미터 | `docs/06-game-mechanics.md`, `docs/09-balancing-and-tuning.md` | 성장 구조 영향 시 `PROGRESSION_MODEL.md` 갱신 |
| 폴더 구조/문서 구조 개편 | 디렉터리 이동, 문서 분할/통합 | `docs/02-folder-structure.md`, `docs/INDEX.md`, `README.md` | 깨진 링크/참조 검증 필수 |
| 테스트/디버깅 절차 변경 | 실행/검증 방법, 디버그 루틴 | `docs/10-testing-and-debugging.md` | 재현 단계 업데이트 포함 |

---

## 3) PR 체크리스트 반영 가이드

모든 PR은 아래 항목을 체크리스트에 포함해야 한다.

- [ ] 문서 영향 검토 완료 (해당 없음이면 근거 명시)

권장 세부 규칙:
1. 코드 변경이 매트릭스 대상이면, **필수 문서 파일 경로를 PR 본문에 명시**한다.
2. 문서 변경이 없는 경우, "왜 문서 변경이 필요 없는지"를 1~2문장으로 설명한다.
3. 문서 인덱스(`docs/INDEX.md`)에서 새 문서/개편 사항 링크를 점검한다.

권장 PR 본문 예시:

```markdown
## Documentation Impact
- [x] 문서 영향 검토 완료
- 업데이트 문서: `docs/07-save-load-and-migrations.md`, `SAVE_LOAD_AND_MIGRATION.md`
- 사유: `updates.js` 마이그레이션 분기 로직 변경으로 저장/호환 정책 문서 동기화 필요
```

---

## 4) 운영 규칙

- "코드 머지 가능"의 정의에는 "필수 문서 동기화 완료"를 포함한다.
- 문서가 선행되지 않으면 PR 승인 시 코멘트로 누락 문서를 명시한다.
- 대규모 리팩터링 시 문서 변경을 별도 커밋으로 분리해 리뷰 가능성을 높인다.
