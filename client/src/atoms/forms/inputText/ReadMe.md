# InputText

| Props          | Tpye   | Description                                             | Options                | Require | Default |
| -------------- | ------ | ------------------------------------------------------- | ---------------------- | ------- | ------- |
| value          | any    | 값(hook)                                                |                        |         |         |
| onChange       | func   | func(인풋값);                                           |                        | Y       |         |
| label          | string |                                                         |                        |         |         |
| disabled       | string |                                                         |                        |         | false   |
| type           | string | 인풋에 들어갈 타입                                      | password               |         |         |
| dataSuccess    | string | 에러메세지                                              |                        |         | ''      |
| dataErr        | string | 성공메세지                                              |                        |         | ''      |
| validation     | func   | 유효성검사함수                                          | utils.validation       |         |         |
| onChangeValid  | func   | func(검사결과)                                          |                        | valid   |         |
| isValid        | any    | 값에따라 classNames 결정                                | onChangeValid 검사결과 | Y       |         |
| refContainer   | object | input 객체 저장                                         |                        |         | {}      |
| readOnly       | bool   | 읽기전용 모드                                           |                        |         |         |
| textarea       | bool   | 텍스트어리어로 사용할지                                 |                        |         | false   |
| scroll         | bool   | 텍스트어리어 일때 스크롤 노출                           |                        |         | false   |
| hyphen         | bool   | 한국 전화번호에 맞춘 오토 하이픈 사용여부               |                        |         | false   |
| doubleHeight   | bool   | 텍스트어리어 일때 높이 2배                              |                        |         | false   |
| allWaysShow... | bool   | 텍스트 벨리드 메세지가 있을때 포커스 안해도 메세지 보임 |                        |         | false   |
| max            | number | validation이 MaxOver 일떄 최대값                        |                        |         | 10000   |

- comma : 콤마 된것은 리턴할때 콤마를 때서 줍니다.
- hyphen : 하이픈된 것은 리턴할때 하이픈 때서 줍니다
- cooma hyphen 상태에서 type number가 들어온다면 리턴할떄 너버로 바꾸어 onChange로 전송합니다.
- onChangeValid 를 주지않고 validation 만 주게되면 스스로 유효성 검사를 합니다 이것은 unControlled 상태이지만 상황에따라서 UI 만 변동하는 역할 로 사용가능합니다.
