# ⚔️ House Chore RPG - Development & DLC History Report

본 문서는 **House Chore RPG (집안일 RPG PWA)**의 성능 개선, 모바일 스크롤 버그 해결, 그리고 연이은 대규모 DLC(Workplace, Holy Church) 패치 내역을 총망라한 개발 히스토리 리포트입니다.

---

## 📅 핵심 업데이트 이력 (Chronological History)

### 🚀 v30. 모바일 스크롤 락 레이아웃 대개편
* **이슈**: 모달창이 활성화된 상태에서 내부 스크롤이 잠기거나 뒷배경 전체 화면이 함께 스크롤되는 iOS/Safari 특유의 `position: fixed` + `display: flex` 버그 발생.
* **해결**:
  * 모달 오버레이를 `display: block` 형태의 독립 스크롤 레이어로 변경하고 모달 바디에 `margin: 20px auto` 및 터치 액션 규칙을 적용하여 완벽하게 해결.
  * 모달 오픈 시 뒷배경 스크롤 방지용 `lockBodyScroll()` / `unlockBodyScroll()` 클래스 토글 제어 완비.

### 🏫 v31. Workplace DLC 기틀 다지기
* **탭 바 마크업 주입**: 상단에 탭 컨테이너(`tab-container`)를 삽입하여 홈과 직장을 스왑하도록 구현.
* **지도 및 에셋 스왑**: 탭 전환 시 3D 클레이 스타일 지도를 동적으로 스왑하고, 이에 맞게 마이 홈 핀과 직장 핀을 필터링 처리.
* **신규 장비 입고**:
  * 🥼 **수석 연구원 가운**: 연구실 퀘스트 진행 시 버프 적용.
  * ☕ **황금 아라비카 머그**: 오피스 퀘스트 진행 시 버프 적용.

### 🐛 v32. 구문 에러(Syntax Error) 해결 및 깃허브 배포 우회
* **자바스크립트 중괄호 수복**:
  * 이전 교체 작업 중 `resetGameData()` 함수의 닫는 중괄호 `}`가 유실되어 자바스크립트 전체 컴파일이 불가능해졌던 이슈 해결.
* **Jekyll 빌드 바이패스(`.nojekyll`) 도입**:
  * GitHub Pages 배포 엔진이 자바스크립트/HTML 내의 중괄호(`{{ }}`)를 Jekyll Liquid 템플릿 엔진 문법으로 오인해 빌드를 실패시켰던 문제를 해결하기 위해 루트 디렉토리에 `.nojekyll` 설정 긴급 추가.

### 🔬 v33. 연구소 & 오피스 커스텀 퀘스트 모달 구현
* **지도 핀 모달 추가 연동**:
  * **🔬 현미경 핀(연구실)**과 **💻 컴퓨터 핀(오피스)** 팝오버 내부에 맞춤형 서브 퀘스트를 즉석 생성하는 등록 버튼 추가.
* **지능형 다목적 퀘스트 모달**:
  * 기존 추가 폼을 재활용하여 입력받는 타겟 타입(`wl_lab`, `wl_office`, `home`)에 따라 모달 타이틀과 데이터 보관 배열을 분기 처리하도록 고도화.

### ⛪ v34. Holy Church (신성한 교회 DLC) 대확장
* **교회 탭 추가**: 3분할 탭 바(`tab-church`) 완성.
* **성스러운 교회 전경 지도 (`church_map.jpg`)**: 3D 클레이 스타일 전용 교회 맵 연동.
* **2종의 예배/봉사 핀**:
  * **🕊️ 예배 및 묵상**: 성경 읽기, 감사 기도 일정 관리 및 퀘스트 추가.
  * **🧹 봉사 및 친교**: 헌금함 소독, 나눔 급식 봉사 일정 관리 및 퀘스트 추가.
* **📿 사제 & 👼 성가대 날개 아바타 및 장비 추가**:
  * **📿 신성 묵주 반지** (🪙220) - 예배 골드 보상 +25% 버프 / 장착 시 사제 고양이 아바타 (`avatar_priest.jpg`) 스왑.
  * **👼 천사 성가대 날개** (🪙300) - 봉사 경험치 보상 +25% 버프 / 장착 시 천사 날개 성가대 야옹이 아바타 (`avatar_choir.jpg`) 스왑.
  * 교회 기본 상태 전환 시 성가대 아바타 자동 매핑.

---

## 🛠️ 정적 리소스 파일 구성 (Static Assets)

| 파일명 | 용도 / 설명 | 스킨 매핑 조건 |
| :--- | :--- | :--- |
| `house_map.jpg` | 마이 홈 지도 | `currentTab === 'home'` |
| `workplace_map.jpg` | 연구실 & 오피스 지도 | `currentTab === 'workplace'` |
| `church_map.jpg` | 신성한 교회 지도 | `currentTab === 'church'` |
| `character_avatar.jpg` | 기본 집안일 야옹이 | 장비 미장착 (홈 기본) |
| `avatar_broom.jpg` | 🧹 마법 빗자루 착용 고양이 | `equippedItem === 'broom'` |
| `avatar_crown.jpg` | 👑 왕실의 왕관 착용 고양이 | `equippedItem === 'crown'` |
| `avatar_glasses.jpg` | 🕶️ 멋쟁이 선글라스 착용 고양이 | `equippedItem === 'glasses'` |
| `avatar_ribbon.jpg` | 🎀 러블리 리본 착용 고양이 | `equippedItem === 'ribbon'` |
| `avatar_shield.jpg` | 🛡️ 냄비뚜껑 방패 착용 고양이 | `equippedItem === 'shield'` |
| `avatar_sword.jpg` | 🍳 거품기 성검 착용 고양이 | `equippedItem === 'sword'` |
| `avatar_mantle.jpg` | 🧥 용사 빨간망토 착용 고양이 | `equippedItem === 'mantle'` |
| `avatar_labcoat.jpg` | 🥼 연구원 가운 착용 고양이 | `equippedItem === 'labcoat'` |
| `avatar_mug.jpg` | ☕ 황금 머그잔 착용 고양이 | `equippedItem === 'mug'` / 직장 기본 |
| `avatar_priest.jpg` | 📿 신성 묵주 반지 착용 고양이 | `equippedItem === 'rosary'` |
| `avatar_choir.jpg` | 👼 성가대 천사 날개 고양이 | `equippedItem === 'wings'` / 교회 기본 |
| `monster_slime.jpg` | 레이드 보스: 곰팡이 슬라임 | 레이드 1페이즈 |
| `monster_dragon.jpg` | 레이드 보스: 먼지 마왕 드래곤 | 레이드 2페이즈 |

---

## 💎 DLC별 핵심 장비 및 효과 요약

### 1. 🏫 Workplace DLC 장비
* **수석 연구원 가운 (🥼, 🪙250)**: 연구실 업무(`wl_lab`) 해결 시 경험치 획득량 **+20%** 증폭.
* **황금 아라비카 머그잔 (☕, 🪙180)**: 오피스 업무(`wl_office`) 해결 시 골드 획득량 **+20%** 증폭.

### 2. ⛪ Holy Church DLC 장비
* **신성 묵주 반지 (📿, 🪙220)**: 예배 및 묵상(`ch_faith`) 완료 시 골드 획득량 **+25%** 증폭.
* **천사 성가대 날개 (👼, 🪙300)**: 봉사 및 친교(`ch_service`) 완료 시 경험치 획득량 **+25%** 증폭.
