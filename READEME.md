개발규칙
=============


## Client 개발 규칙 

#### 명명 && 코드 규칙
1. 모든 컴포넌트 파일은 jsx로 작성합니다. 
2. 모든 css파일은 scss 로 작성합니다.
3. 기본적으로 Eslint Air-bnb 규칙을 준수합니다.
4. 폴더명은 소문자로 작성합니다.
5. 함수 프리픽스 JD를 사용합니다.
6. css 명명법 BEM 규칙을 준수합니다. 
7. 컴포넌트들은 외부 css로부터 **독립적** 이여야 합니다.
8. compoents 와 pages 폴더에 있는 파일명은 대문자로 시작하는 카멜케이스를 사용합니다.

#### 폴더 구조

* actions  // actions 함수 모음
* atoms // 가장 작은 단위의 페이지 구성요소 / btns / icons / search_bar / pagination ...  
* components // atoms가 그룹화 되어있는 단위 / Header / footer / nav  ...
* layout // page에 관여하는 / css / grid / typhography 
* lib // 외부 라이브러리
* pages // 페이지 컴포넌트 모음 
* style_config // scss 편수들 / mixin  
* utils // 공통적으로 사용되는 함수 / validation / ...



## 버전 관리 규칙

### Flow 
* 영상 참조!
https://youtu.be/v2cixb4Zh6Q
* Comming Soon~
