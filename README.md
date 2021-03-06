
# 💰Work it Travel it
<br>

## 프로젝트 개요
---

해야 할 일과 가야할 장소를 관리하는 모바일 to do list 어플리케이션입니다.<br> React-Native 개발의 기초를 익히기 위한 미니 프로젝트입니다.<br>
할 일이 Work탭과 Travel탭으로 각각 따로 구분되며, 직접 작성해 추가할 수 있습니다.<br>
텍스트를 터치해 할 일의 내용을 수정하거나, 삭제 버튼으로 아예 목록에서 제거할 수 있습니다.<br>
체크박스를 터치하여 완료한 할 일에 취소선을 표시합니다.<br>
모바일 애플리케이션 개발에 입문하며 React-Native 개발을 단순화해주고 다양한 API를 지원해주는 expo CLI를 사용했습니다. 

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

<img src="https://user-images.githubusercontent.com/85019895/153166420-927d0cef-d263-450c-9738-c9704b5a44d8.png" width="500" height="500"/><img src="https://user-images.githubusercontent.com/85019895/153166441-124c693c-af28-4f4e-bc66-2d4adeb9afb2.png" width="500" height="500"/>
<img src="https://user-images.githubusercontent.com/85019895/153166450-f62e873d-4d6e-461e-acc4-b1054fff6d4c.png" width="500" height="500"/><img src="https://user-images.githubusercontent.com/85019895/153166453-d65d1779-de3a-4140-be13-f72c2c235a7e.png" width="500" height="500"/>


## Work / Travel 탭
- 탭을 분리해 두 가지 공간에 각각 할 일을 저장할 수 있습니다. <br>
Work탭이 활성화 되어있는지의 여부를 boolean타입으로 working state에 저장합니다. 탭에서 onPress이벤트가 감지 될 경우 현재 working state와 각 to do의 working value가 일치할 때만 to do를 보여주게되므로, 탭마다 다른 to do를 보여줍니다. <br>

- 앱을 재시작했을때 탭의 위치를 기억합니다.<br>
탭을 터치할때마다 해당 탭의 working state를 AsyncStorage에 저장한 뒤, 앱이 재시작 될 때 해당 값을 불러와 현재의 working state로 할당합니다. 

## to do list
- 할 일 저장<br>
TextInput창에 텍스트를 입력한 후 키보드상의 완료 버튼을 누르면 onSubmitEditing prop에 의해 to do를 저장하는 함수가 호출됩니다. state로 만들어둔 빈 객체에 차곡차곡 do to들을 넣어줍니다. onChange로 받아진 텍스트를 text state에 저장합니다.  data.now()메소드의 결과 값을 각 to do의 고유 key값으로 사용했습니다. value에는 text, working, done, editing key들을 넣습니다. 이렇게 to do의 정보를 담은 객체를 toDos state로 업데이트합니다.

- 할 일 완료 표시<br>
done state를 만들어 boolean값을 할당하고, 각to do의 value에 넣습니다. 체크박스 아이콘을 누르면 토글인 done state값이 스위치되고, true일 때만 해당 to do의 스타일에 접근해 아이콘을 변경하고 textDecoraition도 추가합니다.

- 목록에서 할 일 제거<br>
아이콘을 누르면 to do를 제거하는 함수가 호출됩니다. 자바스크립트 delete메소드로 key를 지칭해 해당 to do를 삭제합니다.

- 할 일 수정<br>
to do 텍스트부분을 터치하면 각 to do 속의 editing state를 true로 업데이트하고, editing이 true일 때만 TextInput을 표시합니다. input에 적힌 텍스트를 새로운 state에 저장하고, to do의 text value로 다시 할당해줍니다. onBlur prop을 사용해 input의 바깥을 클릭하면 키보드를 숨기고 input을 언포커싱합니다.


<br><br>

