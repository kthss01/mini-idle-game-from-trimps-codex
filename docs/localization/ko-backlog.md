# 한국어 로컬라이제이션 백로그 (ko)

기준 사전은 `i18n/locales/en.js`이며, 아래 항목은 `i18n/extracted-ui-strings.json` + JS 런타임 `i18n.t(...)` 사용처를 병합해 생성했습니다.

- 상태(status) 값: `new`, `translated`, `reviewed`, `in-game-verified`
- 우선순위 정렬: 상시 UI > 전투/맵 흐름 > 도전과제/이벤트 > 장문 스토리

## 도메인 작업 보드
도메인 기준 작업 단위는 아래 필드를 반드시 채워 관리합니다.

| domain | scope prefix | assignee | due-date | status | translated | reviewed | in-game-verified |
|---|---|---|---|---|---|---|---|
| maps | `ui.maps.*` | @unassigned | 2026-03-31 | todo | [ ] | [ ] | [ ] |
| challenges | `ui.challenges.*` | @unassigned | 2026-03-31 | todo | [ ] | [ ] | [ ] |
| heirloom | `ui.heirloom.*` | @unassigned | 2026-03-31 | todo | [ ] | [ ] | [ ] |
| story | `ui.story.*` | @unassigned | 2026-03-31 | todo | [ ] | [ ] | [ ] |
| spire | `ui.spire.*` | @unassigned | 2026-03-31 | todo | [ ] | [ ] | [ ] |

상태 규칙:
- `status`: `todo` → `in-progress` → `done` (차단 이슈가 있으면 `blocked`)
- 완료 조건: `translated`, `reviewed`, `in-game-verified` 체크가 모두 완료되어야 `done` 처리


## 상시 UI

| key | en | ko | source | runtime files | status |
|---|---|---|---|---|---|
| ui.automation.auto_jobs | AutoJobs | 자동 직업 | extracted-ui-strings |  | translated |
| ui.automation.auto_storage | AutoStorage | 자동 저장소 | extracted-ui-strings |  | translated |
| ui.automation.auto_structure | AutoStructure | 자동 건설 | extracted-ui-strings |  | translated |
| ui.bone_trader.bone_portal_desc | Automatically gain helium equal to the amount you earned on your best run | 최고 기록 런에서 획득한 헬륨 양만큼 자동으로 획득합니다 | extracted-ui-strings |  | translated |
| ui.bone_trader.buy_bone_portal | Buy Bone Portal (100 bones) | 뼈 포털 구매 (뼈 100개) | extracted-ui-strings |  | translated |
| ui.bone_trader.buy_heirloom | Buy Heirloom (30 bones) | 가보 구매 (뼈 30개) | extracted-ui-strings |  | translated |
| ui.bone_trader.close | Close | 닫기 | extracted-ui-strings |  | translated |
| ui.bone_trader.exotic_imports | Exotic Imp-orts | 특수 임프 수입 | extracted-ui-strings |  | translated |
| ui.bone_trader.exotic_imports_desc_prefix | Exotic Imp-orts will be unlocked permanently once purchased. Each has a | 특수 임프 수입은 한 번 구매하면 영구적으로 해금됩니다. 각 칸마다 | extracted-ui-strings |  | translated |
| ui.bone_trader.exotic_imports_desc_suffix | chance to spawn per cell and better loot than normal enemies. Any stacking multipliers from killing Imp-orts reset on Portal but the imps do not have to be unlocked again. | 확률로 등장하며 일반 적보다 더 좋은 전리품을 제공합니다. 임프를 처치해 쌓이는 중첩 배수는 포털 시 초기화되지만, 임프 자체를 다시 해금할 필요는 없습니다. | extracted-ui-strings |  | translated |
| ui.bone_trader.flavor | The Bone Trader trades bones for... bonuses | 뼈 상인은 뼈를 받아... 보너스를 제공합니다 | extracted-ui-strings |  | translated |
| ui.bone_trader.heirloom_desc | Get one Heirloom at the chances above, based on highest zone | 최고 지역 기준으로 위 확률에 따라 가보 1개를 획득합니다 | extracted-ui-strings |  | translated |
| ui.bone_trader.menu_button | Bone Trader | 뼈 상인 | extracted-ui-strings |  | translated |
| ui.bone_trader.other_goodies | Other Goodies | 기타 혜택 | extracted-ui-strings |  | translated |
| ui.bone_trader.owned_prefix | You have | 보유 수량 | extracted-ui-strings |  | translated |
| ui.bone_trader.permanent_upgrades | Permanent Upgrades | 영구 업그레이드 | extracted-ui-strings |  | translated |
| ui.bone_trader.source | You can earn bones as you progress through the world by killing Skeletimps and Megaskeletimps. | 스켈레팀프와 메가스켈레팀프를 처치하면 월드를 진행하면서 뼈를 획득할 수 있습니다. | extracted-ui-strings |  | translated |
| ui.bone_trader.spawns_maps | Spawns in Maps | 맵에서 등장 | extracted-ui-strings |  | translated |
| ui.bone_trader.spawns_world | Spawns in World | 월드에서 등장 | extracted-ui-strings |  | translated |
| ui.bone_trader.title | Bone Trader | 뼈 상인 | extracted-ui-strings |  | translated |
| ui.jobs.fire | Fire | 해고 | extracted-ui-strings |  | translated |
| ui.menu.bored | bored | 심심함 | extracted-ui-strings+runtime | config.js, config.js | translated |
| ui.menu.breeding | breeding | 번식 중 | extracted-ui-strings+runtime | updates.js, config.js, config.js | translated |
| ui.menu.cancel | Cancel | 취소 | extracted-ui-strings+runtime | updates.js | translated |
| ui.menu.delete_save | Delete Save | 저장 삭제 | extracted-ui-strings+runtime | updates.js | translated |
| ui.menu.trimps | Trimps | 트림프 | runtime | config.js | translated |
| ui.menu.upgrades | Upgrades | 업그레이드 | extracted-ui-strings+runtime | updates.js, config.js, config.js | translated |
| ui.menu.upgrades_research_first | Upgrades<br/>(Research first) | 업그레이드<br/>(먼저 연구 필요) | extracted-ui-strings+runtime | updates.js | translated |
| ui.offline.back_to_world | Back to World | 월드로 돌아가기 | extracted-ui-strings |  | translated |
| ui.offline.cell | Cell | 칸 | extracted-ui-strings |  | translated |
| ui.offline.minus1_map | -1 Level map | -1 레벨 맵 | extracted-ui-strings |  | translated |
| ui.offline.minus2_map | -2 Level map | -2 레벨 맵 | extracted-ui-strings |  | translated |
| ui.offline.minus3_map | -3 Level map | -3 레벨 맵 | extracted-ui-strings |  | translated |
| ui.offline.run_map | Wanna run a map? | 맵을 실행할까요? | extracted-ui-strings |  | translated |
| ui.offline.show_equality | Show Equality | 평등 보기 | extracted-ui-strings |  | translated |
| ui.offline.start_fighting | Start Fighting | 전투 시작 | extracted-ui-strings |  | translated |
| ui.offline.starting | Starting... | 시작 중... | extracted-ui-strings |  | translated |
| ui.offline.stop_here | Stop Here | 여기서 중지 | extracted-ui-strings |  | translated |
| ui.offline.title | Making up lost time... | 오프라인 진행분을 계산하는 중... | extracted-ui-strings |  | translated |
| ui.offline.what_is_this | What is This?! | 이게 뭐죠?! | extracted-ui-strings |  | translated |
| ui.offline.world_level_map | World Level Map | 현재 월드 레벨 맵 | extracted-ui-strings |  | translated |
| ui.offline.zone | Zone | 지역 | extracted-ui-strings |  | translated |
| ui.panels.buildings | Buildings | 건물 | extracted-ui-strings |  | translated |
| ui.panels.jobs | Jobs | 직업 | extracted-ui-strings |  | translated |
| ui.queue.auto_traps_off | AutoTraps Off | 자동 함정 꺼짐 | extracted-ui-strings |  | translated |
| ui.queue.build | Build | 건설 | extracted-ui-strings |  | translated |
| ui.queue.empty | Nothing in queue... | 대기열이 비어 있습니다... | extracted-ui-strings |  | translated |
| ui.resources.action.chop | Chop | 벌목 | extracted-ui-strings |  | translated |
| ui.resources.action.gather | Gather | 채집 | extracted-ui-strings |  | translated |
| ui.resources.action.mine | Mine | 채굴 | extracted-ui-strings |  | translated |
| ui.resources.action.research | Research | 연구 | extracted-ui-strings |  | translated |
| ui.resources.food | Food | 식량 | extracted-ui-strings |  | translated |
| ui.resources.fragments | Fragments | 조각 | extracted-ui-strings |  | translated |
| ui.resources.metal | Metal | 금속 | extracted-ui-strings |  | translated |
| ui.resources.science | Science | 과학 | extracted-ui-strings |  | translated |
| ui.resources.wood | Wood | 나무 | extracted-ui-strings |  | translated |
| ui.screen_reader.info_line_1 | This game uses several different ways to show additional information in tooltips. | 이 게임은 툴팁에 추가 정보를 표시하는 여러 가지 방법을 사용합니다. | extracted-ui-strings |  | translated |
| ui.screen_reader.info_line_2 | shift+/ will work on all elements, but requires focus, and specific NVDA settings. All elements with additional information are focusable with tab. | shift+/는 모든 요소에서 작동하지만 포커스와 NVDA 설정이 필요합니다. 추가 정보가 있는 모든 요소는 tab으로 포커스할 수 있습니다. | extracted-ui-strings |  | translated |
| ui.screen_reader.info_line_3 | shift+enter works only on button elements, not clickable. It does not require focus. | shift+enter는 클릭 가능한 요소가 아닌 button 요소에서만 동작하며, 포커스가 필요하지 않습니다. | extracted-ui-strings |  | translated |
| ui.screen_reader.info_line_4 | You can also enable separate info buttons, which will respond to enter. | 별도의 정보 버튼을 활성화할 수도 있으며, enter로 반응합니다. | extracted-ui-strings |  | translated |
| ui.screen_reader.info_line_5 | To enable shift+/ tooltips, Turn NVDA + 8 on, and disable NVDA: Settings > browse mode: Disable "trap all command gestures from reaching the document." | shift+/ 툴팁을 사용하려면 NVDA + 8을 켜고 NVDA 설정 > browse mode에서 "trap all command gestures from reaching the document."를 비활성화하세요. | extracted-ui-strings |  | translated |
| ui.screen_reader.info_line_6 | You can show/hide this information via the game setting "Show Screen Read Info." | 게임 설정의 "Show Screen Read Info."를 통해 이 안내를 표시/숨김할 수 있습니다. | extracted-ui-strings |  | translated |
| ui.screen_reader.info_title | Screen Reader Information | 스크린 리더 정보 | extracted-ui-strings |  | translated |
| ui.settings.language.label | Language: | 언어: | extracted-ui-strings |  | translated |
| ui.settings_menu.achieves | Achieves | 업적 | extracted-ui-strings |  | translated |
| ui.settings_menu.back_to_search | Back to Search | 검색으로 돌아가기 | extracted-ui-strings |  | translated |
| ui.settings_menu.browse_all | Browse All | 전체 보기 | extracted-ui-strings |  | translated |
| ui.settings_menu.export | Export | 내보내기 | extracted-ui-strings |  | translated |
| ui.settings_menu.import | Import | 가져오기 | extracted-ui-strings |  | translated |
| ui.settings_menu.save | Save | 저장 | extracted-ui-strings |  | translated |
| ui.settings_menu.search_title | Choose a Category Below, or Search for a Setting/Keyword: | 아래에서 카테고리를 선택하거나 설정/키워드를 검색하세요: | extracted-ui-strings |  | translated |
| ui.settings_menu.settings | Settings | 설정 | extracted-ui-strings |  | translated |
| ui.settings_menu.stats | Stats | 통계 | extracted-ui-strings |  | translated |
| ui.settings_menu.whats_new | V <span id="versionNumber"></span> \| What's New | V <span id="versionNumber"></span> \| 새로운 소식 | extracted-ui-strings |  | translated |
| ui.settings_tabs.alerts | Pop-ups and Alerts | 팝업 및 알림 | extracted-ui-strings |  | translated |
| ui.settings_tabs.general | General | 일반 | extracted-ui-strings |  | translated |
| ui.settings_tabs.hotkeys | Hotkeys | 단축키 | extracted-ui-strings |  | translated |
| ui.settings_tabs.layout | Layout | 레이아웃 | extracted-ui-strings |  | translated |
| ui.settings_tabs.new | New | 새 항목 | extracted-ui-strings |  | translated |
| ui.settings_tabs.other | Other | 기타 | extracted-ui-strings |  | translated |
| ui.settings_tabs.performance | Performance | 성능 | extracted-ui-strings |  | translated |
| ui.settings_tabs.qol | Quality of Life | 편의 기능 | extracted-ui-strings |  | translated |
| ui.tabs.alchemy | Alchemy | 연금술 | extracted-ui-strings |  | translated |
| ui.tabs.all | All | 전체 | extracted-ui-strings |  | translated |
| ui.tabs.buildings | Buildings | 건물 | extracted-ui-strings |  | translated |
| ui.tabs.equality | Equality | 평등 | extracted-ui-strings |  | translated |
| ui.tabs.equipment | Equipment | 장비 | extracted-ui-strings |  | translated |
| ui.tabs.jobs | Jobs | 직업 | extracted-ui-strings |  | translated |
| ui.tabs.mastery | Mastery | 숙련 | extracted-ui-strings |  | translated |
| ui.tabs.nature | Nature | 자연 | extracted-ui-strings |  | translated |
| ui.tabs.spire | Spire | 첨탑 | extracted-ui-strings |  | translated |
| ui.tabs.upgrades | Upgrades | 업그레이드 | extracted-ui-strings |  | translated |

## 전투/맵 흐름

| key | en | ko | source | runtime files | status |
|---|---|---|---|---|---|
| ui.battle.auto_fight_off | AutoFight Off | 자동 전투 꺼짐 | extracted-ui-strings |  | translated |
| ui.battle.exit_spire | Exit Spire | 첨탑 나가기 | extracted-ui-strings |  | translated |
| ui.battle.fight | Fight | 전투 | extracted-ui-strings |  | translated |
| ui.battle.finish_daily | Finish Daily | 일일 종료 | extracted-ui-strings |  | translated |
| ui.battle.heirlooms | Heirlooms | 가보 | extracted-ui-strings |  | translated |
| ui.battle.maps | Maps | 맵 | extracted-ui-strings |  | translated |
| ui.battle.portal | Portal | 포털 | extracted-ui-strings |  | translated |
| ui.battle.repeat_off | Repeat Off | 반복 꺼짐 | extracted-ui-strings |  | translated |
| ui.battle.void_maps | Void Maps | 공허 맵 | extracted-ui-strings |  | translated |
| ui.map.abandon_map | Abandon Map | 맵 포기 | extracted-ui-strings+runtime | main.js | translated |
| ui.map.abandon_map_lowercase | abandon | 포기 | runtime | main.js | translated |
| ui.map.abandon_soldiers | Abandon Soldiers | 병사 포기 | extracted-ui-strings+runtime | main.js | translated |
| ui.map.continue | Continue | 계속 | extracted-ui-strings+runtime | main.js | translated |
| ui.map.floor |  Floor {floor} |  {floor}층 | extracted-ui-strings+runtime | main.js | translated |
| ui.map.level_with_prefix | <br/>Lv: {level} | <br/>레벨: {level} | extracted-ui-strings+runtime | main.js | translated |
| ui.map.map_bonus | {bonus}% Map Bonus | 맵 보너스 {bonus}% | extracted-ui-strings+runtime | main.js | translated |
| ui.map.maps | Maps | 맵 | extracted-ui-strings+runtime | main.js, main.js, updates.js | translated |
| ui.map.maps_with_bonus | Maps ({bonus}) | 맵 ({bonus}) | extracted-ui-strings+runtime | main.js | translated |
| ui.map.recycle_map | Recycle Map | 맵 재활용 | extracted-ui-strings+runtime | main.js | translated |
| ui.map.recycle_map_lowercase | recycle | 재활용 | runtime | main.js | translated |
| ui.map.run_map | Run Map | 맵 실행 | runtime | main.js | translated |
| ui.map.select_a_map | Select a Map! | 맵을 선택하세요! | extracted-ui-strings+runtime | main.js | translated |
| ui.map.spire | Spire | 첨탑 | extracted-ui-strings+runtime | main.js | translated |
| ui.map.spire_number | Spire {num} | 첨탑 {num} | extracted-ui-strings+runtime | main.js | translated |
| ui.map.world | World | 월드 | extracted-ui-strings+runtime | main.js | translated |
| ui.map.zone | Zone | 지역 | extracted-ui-strings+runtime | main.js, updates.js | translated |
| ui.maps.abandon_map | Abandon Map | 맵 포기 | extracted-ui-strings |  | translated |
| ui.maps.abandon_map_lowercase | abandon | 포기 | extracted-ui-strings |  | translated |
| ui.maps.abandon_soldiers | Abandon Soldiers | 병사 포기 | extracted-ui-strings |  | translated |
| ui.maps.continue | Continue | 계속 | extracted-ui-strings |  | translated |
| ui.maps.floor |  Floor {floor} |  {floor}층 | extracted-ui-strings |  | translated |
| ui.maps.level_with_prefix | <br/>Lv: {level} | <br/>레벨: {level} | extracted-ui-strings |  | translated |
| ui.maps.map_bonus | {bonus}% Map Bonus | 맵 보너스 {bonus}% | extracted-ui-strings |  | translated |
| ui.maps.maps | Maps | 맵 | extracted-ui-strings |  | translated |
| ui.maps.maps_with_bonus | Maps ({bonus}) | 맵 ({bonus}) | extracted-ui-strings |  | translated |
| ui.maps.recycle_map | Recycle Map | 맵 재활용 | extracted-ui-strings |  | translated |
| ui.maps.recycle_map_lowercase | recycle | 재활용 | extracted-ui-strings |  | translated |
| ui.maps.run_map | Run Map | 맵 실행 | extracted-ui-strings |  | translated |
| ui.maps.select_a_map | Select a Map! | 맵을 선택하세요! | extracted-ui-strings |  | translated |
| ui.maps.spire | Spire | 첨탑 | extracted-ui-strings |  | translated |
| ui.maps.spire_number | Spire {num} | 첨탑 {num} | extracted-ui-strings |  | translated |
| ui.maps.world | World | 월드 | extracted-ui-strings |  | translated |
| ui.maps.zone | Zone | 지역 | extracted-ui-strings |  | translated |
| ui.spire_assault.auto_level_status | AutoLevel {status} | 자동 레벨 {status} | runtime | objects.js | translated |
| ui.spire_assault.off | Off | 꺼짐 | runtime | objects.js | translated |
| ui.spire_assault.on | On | 켜짐 | runtime | objects.js | translated |

## 도전과제/이벤트

| key | en | ko | source | runtime files | status |
|---|---|---|---|---|---|
| ui.alert.generic.sorry | Sorry | 죄송합니다 | extracted-ui-strings |  | translated |
| ui.alert.holiday.event_ended | {holiday} event has come to an end! | {holiday} 이벤트가 종료되었습니다! | extracted-ui-strings+runtime | objects.js | translated |
| ui.alert.holiday.loaded_event | Loaded {holiday} event! | {holiday} 이벤트를 불러왔습니다! | extracted-ui-strings+runtime | objects.js | translated |
| ui.alert.map.waiting_for_soldiers | Waiting to travel until your soldiers are finished. | 병사들의 전투가 끝날 때까지 이동을 기다리는 중입니다. | extracted-ui-strings+runtime | main.js | translated |
| ui.alert.story.void_seep | Use of the portal has created a chance for the Void to seep into your world. Be alert. | 포털 사용으로 인해 공허가 세계로 스며들 가능성이 생겼습니다. 주의하세요. | extracted-ui-strings+runtime | updates.js | translated |
| ui.challenges.alchemy.herb_found | You found {amount} {resource}! | {amount} {resource}을(를) 발견했습니다! | extracted-ui-strings |  | translated |
| ui.challenges.hypothermia.perks_locked_html | <span style='color: red'>You cannot change your perks while on the Hypothermia Challenge!</span> | <span style='color: red'>저체온증 도전 중에는 특전을 변경할 수 없습니다!</span> | extracted-ui-strings |  | translated |
| ui.challenges.mutations.radon_vials_found | You were able to take {amount} Radon Vials from that Mutated Enemy! | 그 변이 적에게서 라돈 바이알 {amount}개를 가져올 수 있었습니다! | extracted-ui-strings |  | translated |
| ui.challenges.mutations.seeds_found | You found {amount} Mutated Seed{plural}{nullifier_text} on that {enemy} enemy! | 그 {enemy} 적에게서 변이 씨앗 {amount}개{nullifier_text}를 획득했습니다! | extracted-ui-strings |  | translated |
| ui.heirloom.buy_heirloom | Buy Heirloom (30 bones) | 가보 구매 (뼈 30개) | extracted-ui-strings |  | translated |
| ui.heirloom.heirloom_desc | Get one Heirloom at the chances above, based on highest zone | 최고 지역 기준으로 위 확률에 따라 가보 1개를 획득합니다 | extracted-ui-strings |  | translated |
| ui.heirloom.menu_button | Heirlooms | 가보 | extracted-ui-strings |  | translated |
| ui.message.challenge.alchemy.herb_found | You found {amount} {resource}! | {amount} {resource}을(를) 발견했습니다! | runtime | objects.js | translated |
| ui.message.challenge.hypothermia.perks_locked_html | <span style='color: red'>You cannot change your perks while on the Hypothermia Challenge!</span> | <span style='color: red'>저체온증 도전 중에는 특전을 변경할 수 없습니다!</span> | runtime | updates.js | translated |
| ui.message.challenge.mutations.radon_vials_found | You were able to take {amount} Radon Vials from that Mutated Enemy! | 그 변이 적에게서 라돈 바이알 {amount}개를 가져올 수 있었습니다! | runtime | objects.js | translated |
| ui.message.challenge.mutations.seeds_found | You found {amount} Mutated Seed{plural}{nullifier_text} on that {enemy} enemy! | 그 {enemy} 적에게서 변이 씨앗 {amount}개{nullifier_text}를 획득했습니다! | runtime | objects.js | translated |
| ui.message.challenge.spire_assault.contract_fulfilled | You have fulfilled your Contract, and Huffy has gained access to {contract}! | 계약을 이행하여 허피가 {contract}에 접근할 수 있게 되었습니다! | runtime | objects.js | translated |

## 장문 스토리

| key | en | ko | source | runtime files | status |
|---|---|---|---|---|---|
| ui.message.story.map_fragments_found | You found {amount} map fragments! | 맵 조각 {amount}개를 발견했습니다! | runtime | config.js | translated |
| ui.story.map_fragments_found | You found {amount} map fragments! | 맵 조각 {amount}개를 발견했습니다! | extracted-ui-strings |  | translated |
| ui.story.spire_assault_unlocked_body | <i>"As you approach the infinitely tall Spire, a Trimp rushes out and embraces Scruffy. Scruffy introduces you to Huffy, who seems to have also realized that Druopitee is kind of a prick. Huffy lets you know that he managed to destroy the Corruption device at the top, but that it was now crawling with horrible shadowy enemies. Huffy lets you know that he is shielded from the Portal inside the Spire, but that even when you Portal and forget him, he can use your subconscious to help direct him in cleansing the Spire and finding artifacts to make your Trimps stronger."</i><br/><br/>You've finally made it to Huffy and the first Spire in this Universe. Huffy needs your help removing all of the Enemies! Check out the new tab titled 'SA' to get started.<br/><br/><b>A tip for once you're in</b>: Huffy has figured out how to put on Pants and a Sword but is struggling beyond that. Click two other items to equip them ASAP! | <i>"끝없이 높은 첨탑에 다가가자 트림프 하나가 달려 나와 스크러피를 껴안았습니다. 스크러피는 드루오피티가 꽤 못된 녀석이라는 걸 깨달은 듯한 허피를 소개합니다. 허피는 꼭대기의 부패 장치를 파괴하는 데 성공했지만, 지금은 끔찍한 그림자 적들로 들끓고 있다고 말합니다. 또한 첨탑 내부에서는 포털로부터 보호받고 있지만, 당신이 포털을 타고 자신을 잊더라도 당신의 잠재의식을 통해 첨탑 정화와 트림프 강화를 위한 유물 탐색을 계속 도울 수 있다고 합니다."</i><br/><br/>드디어 이 우주의 첫 번째 첨탑과 허피에게 도착했습니다. 허피가 모든 적을 제거할 수 있도록 도와주세요! 새로 생긴 'SA' 탭에서 시작할 수 있습니다.<br/><br/><b>들어가면 유용한 팁</b>: 허피는 바지와 검은 착용할 줄 알게 되었지만 그 이상은 아직 어렵습니다. 다른 아이템 두 개를 눌러 최대한 빨리 장착해 주세요! | extracted-ui-strings |  | translated |
| ui.story.spire_assault_unlocked_title | Spire Assault Unlocked! | 첨탑 강습 해금! | extracted-ui-strings |  | translated |
| ui.story.void_seep | Use of the portal has created a chance for the Void to seep into your world. Be alert. | 포털 사용으로 인해 공허가 세계로 스며들 가능성이 생겼습니다. 주의하세요. | extracted-ui-strings |  | translated |
| ui.tooltip.spire_assault.help.back_button | Back to Spire Assault | 첨탑 강습으로 돌아가기 | runtime | objects.js | translated |
| ui.tooltip.spire_assault.help.title | Spire Assault Help/FAQ | 첨탑 강습 도움말/FAQ | runtime | objects.js | translated |
| ui.tooltip.spire_assault.unlock.body | <i>"As you approach the infinitely tall Spire, a Trimp rushes out and embraces Scruffy. Scruffy introduces you to Huffy, who seems to have also realized that Druopitee is kind of a prick. Huffy lets you know that he managed to destroy the Corruption device at the top, but that it was now crawling with horrible shadowy enemies. Huffy lets you know that he is shielded from the Portal inside the Spire, but that even when you Portal and forget him, he can use your subconscious to help direct him in cleansing the Spire and finding artifacts to make your Trimps stronger."</i><br/><br/>You've finally made it to Huffy and the first Spire in this Universe. Huffy needs your help removing all of the Enemies! Check out the new tab titled 'SA' to get started.<br/><br/><b>A tip for once you're in</b>: Huffy has figured out how to put on Pants and a Sword but is struggling beyond that. Click two other items to equip them ASAP! | <i>"끝없이 높은 첨탑에 다가가자 트림프 하나가 달려 나와 스크러피를 껴안았습니다. 스크러피는 드루오피티가 꽤 못된 녀석이라는 걸 깨달은 듯한 허피를 소개합니다. 허피는 꼭대기의 부패 장치를 파괴하는 데 성공했지만, 지금은 끔찍한 그림자 적들로 들끓고 있다고 말합니다. 또한 첨탑 내부에서는 포털로부터 보호받고 있지만, 당신이 포털을 타고 자신을 잊더라도 당신의 잠재의식을 통해 첨탑 정화와 트림프 강화를 위한 유물 탐색을 계속 도울 수 있다고 합니다."</i><br/><br/>드디어 이 우주의 첫 번째 첨탑과 허피에게 도착했습니다. 허피가 모든 적을 제거할 수 있도록 도와주세요! 새로 생긴 'SA' 탭에서 시작할 수 있습니다.<br/><br/><b>들어가면 유용한 팁</b>: 허피는 바지와 검은 착용할 줄 알게 되었지만 그 이상은 아직 어렵습니다. 다른 아이템 두 개를 눌러 최대한 빨리 장착해 주세요! | runtime | objects.js | translated |
| ui.tooltip.spire_assault.unlock.continue | Continue | 계속 | runtime | objects.js | translated |
| ui.tooltip.spire_assault.unlock.title | Spire Assault Unlocked! | 첨탑 강습 해금! | runtime | objects.js | translated |

## Spire

| key | en | ko | source | runtime files | status |
|---|---|---|---|---|---|
| ui.spire.preset.title | Trap Layout {slot} | 함정 배치 {slot} | runtime | playerSpire.js | translated |
| ui.spire.preset.contains_header | <b>This saved layout contains:</b><br/><br/> | <b>이 저장된 배치에는 다음이 포함됩니다:</b><br/><br/> | runtime | playerSpire.js | translated |
| ui.spire.preset.trap_chip | <span class='playerSpireTooltipTrapName' style='background-color: {color}'>{trap}&nbsp;x{count}</span>  | <span class='playerSpireTooltipTrapName' style='background-color: {color}'>{trap}&nbsp;x{count}</span>  | runtime | playerSpire.js | translated |
| ui.spire.preset.cost_summary_html | Total Cost: {total} Rs<br/>Value of Current Traps: {current} Rs<br/> | 총 비용: {total} Rs<br/>현재 함정 가치: {current} Rs<br/> | runtime | playerSpire.js | translated |
| ui.spire.preset.remaining_cost | Remaining Cost: {amount} Rs | 남은 비용: {amount} Rs | runtime | playerSpire.js | translated |
| ui.spire.preset.refund | Refund: {amount} Rs | 환급: {amount} Rs | runtime | playerSpire.js | translated |
| ui.spire.preset.empty_layout | This layout is currently empty. You can save your current setup to this layout, and load it later! | 이 배치는 현재 비어 있습니다. 현재 구성을 이 배치에 저장하고 나중에 불러올 수 있습니다! | runtime | playerSpire.js | translated |
| ui.spire.preset.note_html | <br/><br/><b>You wanted to remind yourself:</b><br/>{note} | <br/><br/><b>스스로에게 남긴 메모:</b><br/>{note} | runtime | playerSpire.js | translated |
| ui.spire.preset.cannot_afford | <span class='red'>You cannot afford to load this Trap layout.</span> | <span class='red'>이 함정 배치를 불러올 런스톤이 부족합니다.</span> | runtime | playerSpire.js | translated |
| ui.spire.preset.not_enough_floors | <span class='red'>You don't have enough Floors available in your Spire to load this layout.</span> | <span class='red'>이 배치를 불러오기에 첨탑 층수가 부족합니다.</span> | runtime | playerSpire.js | translated |
| ui.spire.preset.save_confirm_body_html | Are you sure you want to save your current Spire layout to Preset {slot}? This will overwrite your currently saved layout.<br/><br/>If you want, you can also type a note to your future self below!<br/><br/><input maxlength=\"250\" style=\"width: 100%\" id=\"spireLayoutNoteInput\"/><br/> | 현재 첨탑 배치를 프리셋 {slot}에 저장하시겠습니까? 기존 저장 배치를 덮어씁니다.<br/><br/>원한다면 아래에 미래의 자신에게 남길 메모를 입력할 수 있습니다!<br/><br/><input maxlength=\"250\" style=\"width: 100%\" id=\"spireLayoutNoteInput\"/><br/> | runtime | playerSpire.js | translated |
| ui.spire.preset.save_confirm_title | Save to Layout {slot}? | 배치 {slot}에 저장할까요? | runtime | playerSpire.js | translated |
| ui.spire.preset.load_confirm_body | Are you sure you want to load layout {slot}? This will remove all Traps and Towers currently placed in your Spire! | 배치 {slot}을(를) 불러오시겠습니까? 현재 첨탑에 배치된 모든 함정과 타워가 제거됩니다! | runtime | playerSpire.js | translated |
| ui.spire.preset.load_confirm_title | Load Layout {slot}? | 배치 {slot}을(를) 불러올까요? | runtime | playerSpire.js | translated |
| ui.spire.preset.save_current_layout_here | Save Current Layout Here | 현재 배치 저장 | runtime | playerSpire.js | translated |
| ui.spire.preset.load_this_layout | Load This Layout | 이 배치 불러오기 | runtime | playerSpire.js | translated |
| ui.spire.settings.title | Spire Settings | 첨탑 설정 | runtime | playerSpire.js | translated |
| ui.spire.settings.floating_combat_text | Floating Combat Text | 전투 떠다니는 텍스트 | runtime | playerSpire.js | translated |
| ui.spire.settings.make_static | Make Static: | 고정 표시: | runtime | playerSpire.js | translated |
| ui.spire.settings.trap_damage | Trap Damage: | 함정 피해: | runtime | playerSpire.js | translated |
| ui.spire.settings.poison_tick | Poison Tick: | 독 틱 피해: | runtime | playerSpire.js | translated |
| ui.spire.settings.runestones | Runestones: | 런스톤: | runtime | playerSpire.js | translated |
| ui.spire.settings.visual_settings | Visual Settings | 시각 설정 | runtime | playerSpire.js | translated |
| ui.spire.settings.trap_icons | Trap Icons: | 함정 아이콘: | runtime | playerSpire.js | translated |
| ui.spire.settings.enemy_icons | Enemy Icons: | 적 아이콘: | runtime | playerSpire.js | translated |
| ui.spire.settings.chill_effect | Chill Effect: | 냉기 효과: | runtime | playerSpire.js | translated |
| ui.spire.settings.shock_effect | Shock Effect: | 감전 효과: | runtime | playerSpire.js | translated |
| ui.spire.settings.health_as_percent | Health as %: | 체력을 %로: | runtime | playerSpire.js | translated |
| ui.spire.settings.faded_enemies | Faded Enemies: | 희미한 적: | runtime | playerSpire.js | translated |
| ui.spire.settings.save | Save | 저장 | runtime | playerSpire.js | translated |
| ui.spire.settings.cancel | Cancel | 취소 | runtime | playerSpire.js | translated |

## 기타

| key | en | ko | source | runtime files | status |
|---|---|---|---|---|---|
| ui.message.map.finish_or_action_current_map | You must finish or {action} your current map before moving on. | 이동하기 전에 현재 맵을 완료하거나 {action}해야 합니다. | runtime | main.js | translated |
| ui.tooltip.confirm.im_fine | I'll be fine | 괜찮아요 | extracted-ui-strings+runtime | updates.js | translated |
| ui.tooltip.confirm.im_scared | I'm Scared | 무서워요 | extracted-ui-strings+runtime | updates.js | translated |


## 이번 반영 (runtime 신규 키)

| key | en | ko | source | runtime files | status |
|---|---|---|---|---|---|
| ui.menu.bone.select_exotic_imports | Select 4 Exotic Imports! | 특수 임프 수입 4개를 선택하세요! | runtime | main.js | translated |
| ui.menu.bone.select_four_imps_first | First, Select 4 Imps | 먼저 임프 4개를 선택하세요 | runtime | main.js | translated |
| ui.message.kong.api_not_loaded | Kongregate API not loaded! You cannot submit high scores or spend Kreds. Try refreshing or contacting Kongregate support! | 콩그리게이트 API를 불러오지 못했습니다! 최고 점수를 제출하거나 크레드를 사용할 수 없습니다. 새로고침하거나 콩그리게이트 지원팀에 문의해 주세요! | runtime | main.js | translated |
| ui.menu.perks.unknown | ??? | ??? | runtime | updates.js | translated |
| ui.menu.perks.view | View Perks | 특전 보기 | runtime | updates.js | translated |
| ui.menu.alchemy.title | Alchemy | 연금술 | runtime | objects.js | translated |
| ui.menu.alchemy.save_and_close | Save and Close | 저장하고 닫기 | runtime | objects.js | translated |
| ui.menu.spire_assault.title | Spire Assault | 첨탑 강습 | runtime | objects.js | translated |
| ui.menu.close | Close | 닫기 | runtime | objects.js | translated |
| ui.message.runetrinket.found | You found {amount} Runetrinket{suffix}! | 루네트링킷 {amount}개{suffix}를 찾았습니다! | runtime | config.js | translated |
| ui.message.science.research_again | You can research science again! | 과학 연구를 다시 할 수 있습니다! | runtime | config.js | translated |
| ui.message.achievement.locked | Locked | 잠김 | runtime | updates.js | translated |
| ui.message.achievement.row_finished | Row Finished! | 줄 완료! | runtime | updates.js | translated |
| ui.message.achievement.row_finished_progress | Row Finished! ({progress}) | 줄 완료! ({progress}) | runtime | updates.js | translated |
| ui.message.achievement.progress | Progress: {progress} | 진행도: {progress} | runtime | updates.js | translated |
| ui.message.achievement.progress_too_slow | Progress: Too slow! {progress} | 진행도: 너무 느림! {progress} | runtime | updates.js | translated |
| ui.message.achievement.wrong_universe_progress | You're in the wrong Universe! {progress} | 현재 우주가 다릅니다! {progress} | runtime | updates.js | translated |
