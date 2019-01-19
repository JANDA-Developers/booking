개발규칙
=============


## Client 개발 규칙 

#### 명명 && 코드 규칙
1. 모든 js 파일은 jsx로 작성합니다. 
2. 모든 css파일은 scss 로 작성합니다.
3. 기본적으로 Eslint Air-bnb 규칙을 준수합니다.
4. 폴더명은 소문자로 작성합니다.

5. css 명명법 BEM 규칙을 준수합니다. 
6. 컴포넌트들은 외부 css로부터 **독립적** 이여야 합니다.
7. compoents 와 pages 폴더에 있는 파일명은 대문자로 시작하는 카멜케이스를 사용합니다.
8. 모든 query를 참조하는 변수는 대문자로 시작합니다.

9. boolean 값 변수 Prefix "is"
10. 전역 객체, 변수, 함수 등 Prefix "JD + 소문자 연결"
11. 이벤트 핸들러 함수 Prefix "handle"
12. Debounce 처리된 함수  Prefix "debounce"

13. Enum 을 만들때는 Prefix "em"
14. Utils 변수명은 가능한 짧게 작성하세요.

#### 폴더 구조
* actions  // actions 함수 모음
* atoms // 가장 작은 단위의 페이지 구성요소 / btns / icons / search_bar / pagination ...  
* components // atoms가 그룹화 되어있는 단위 / Header / footer / nav  ...
* layout // page에 관여하는 / css / grid / typhography 
* lib // 외부 라이브러리
* pages // 페이지 컴포넌트 모음 
* style_config // scss 편수들 / mixin  
* utils // 공통적으로 사용되는 함수 / validation / ...
_각폴더에는 ReadMe.md 파일이 존재합니다. 참고바람니다._



## 버전 관리 규칙

### Flow 
* 영상 참조!
https://youtu.be/v2cixb4Zh6Q
* Comming Soon~
