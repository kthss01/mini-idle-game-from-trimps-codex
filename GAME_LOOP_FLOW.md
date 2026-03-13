# GAME_LOOP_FLOW

## 메인 루프 시퀀스
1. `gameTimeout()`이 틱 길이(`1000 / speed`)를 계산한다.
2. 실제 시간-게임 시간 차이(`dif`)를 계산한다.
3. 누락 틱이 있으면 `while (dif >= tick)`에서 `runGameLoop(true)`로 보정 실행한다.
4. 현재 틱 `runGameLoop(null)` 실행.
5. `updateLabels()`로 UI 라벨 갱신.
6. 다음 `setTimeout(gameTimeout, tick - dif)` 예약.

## `gameLoop()` 내부(요약)
1. 경제/생산: `gather`, `craftBuildings`, `breed`.
2. 전투/진행: `battleCoordinator`.
3. 주기성 자동화: 루프 카운터(`loops`) 기반 300ms/400ms/0.5s/1s/2s 작업.
4. 조건부 시스템: AutoJobs, Daily modifier, EWMA 평균 계산, Mutation/generator tick.
5. 실시간 렌더 후처리: 메시지 출력/Steam canvas 정리(조건부).

## 오프라인/예외 경계
- 1시간 이상 공백 감지 시 `checkOfflineProgress()` 경로로 분기.
- `runGameLoop`는 try/catch로 오류를 툴팁에 노출해 디버깅 가시성을 확보.
