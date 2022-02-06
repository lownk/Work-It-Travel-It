<br>
# 💰Work it Travel it
<br>

## 프로젝트 개요
---

해야 할 일과 가야할 장소를 관리하는 모바일 to do list 어플리케이션입니다.<br> React-Native 개발의 기초를 익히기 위한 미니 프로젝트입니다.<br>
할 일이 Work탭과 Travel탭으로 각각 따로 구분되며, 직접 작성해 추가할 수 있습니다.<br>
텍스트를 터치해 할 일의 내용을 수정하거나, 삭제 버튼으로 아예 목록에서 제거할 수 있습니다.<br>
체크박스를 터치하여 완료한 할 일에 취소선을 표시합니다.

<br><br>

## 개발 환경
---
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=Javascript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/ReactNative-61DAFB?style=flat-square&logo=React&logoColor=white"/></a>
<img src="https://img.shields.io/badge/StyleSheet-CC6699?style=flat-square&logo=React&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Expo-000020?style=flat-square&logo=Expo&logoColor=white"/></a><br>
<img src="https://img.shields.io/badge/Github-181717?style=flat-square&logo=Github&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/></a><br><br>


<br><br>


## 구현 사항
---
## Work / Travel 탭
- 각 탭을 분리해 각각 다른 공간에 할 일을 저장할 수 있습니다. <br>
Work탭이 활성화 되어있는지의 여부를 boolean타입으로 working state에 저장해, 각각의 탭에서 onPress이벤트가 감지 될 경우 boolean타입에 따라 각각 다른 화면을 보여줍니다. <br>

- 앱을 재시작했을때 탭의 위치를 기억합니다.<br>
각 탭을 터치할때마다 해당 탭의 working state를 AsyncStorage에 저장한 뒤, 앱이 재시작 될 때 해당 값을 불러와 현재의 working state로 할당합니다. 

## to do list

- 할 일 완료 표시
to do

- 목록에서 할 일 제거

- 할 일 수정 


<br><br><br>

## 기능별 시연 영상
---



