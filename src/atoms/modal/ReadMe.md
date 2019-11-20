# Modal

| Props             | Tpye                  | Description                         | Options | Require | Default |
| ----------------- | --------------------- | ----------------------------------- | ------- | ------- | ------- |
| center            | bool                  | 모달안의 내용을 가운데정렬          |         | X       |         |
| confirm           | boolean               | 확인과 취소 버튼이있는 모달을 팝업  | ------- | ------- | ------- |
| confirmCallBackFn | confirm 결과를 반환함 | ------------                        | ------- | ------- | ------- |
| isAlert           | boolean               | 얼럿창인지 (CSS 변화가 있음)        | ------- | ------- | ------- |
| closeModal        | func                  | 호출로서 isOpen을 변경할수있는 함수 | ------- | ------- | ------- |
| isOpen            | boolean               | 모달이 열려있는지                   | ------- | ------- | ------- |
| center            | boolean               | 모달 가운데정렬                     | ------- | ------- | ------- |
| info              | any                   | Open으로 저장할 정보                | ------- | ------- | ------- |

- &\_\_EndSection 클래스 네임을 주어 안의 버튼들의 margin바텀을 제어합니다.
- modal info 타입이 String 일시 텍스트를 그대로 화면에 뛰웁니다.
- modal info.txt 텍스트를 화면에 뛰웁니다.
- modal info.thmea = warn 을 적용시 --wran 적용
- modal info.callBack 으로 confirm 컬백을 줄수도 있습니다.
  [모달 문서](https://github.com/reactjs/react-modal#installation);
