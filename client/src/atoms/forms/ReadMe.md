# Checkbox

| Props    | Tpye   | Description    | Options | Require | Default |
| -------- | ------ | -------------- | ------- | ------- | ------- |
| disabled | bool   |                |         |         | false   |
| checked  | bool   | 체크여부(hook) |         | Y       | false   |
| onChange | func   | func(체크여부) |         | Y       |         |
| label    | string |                |         |         |         |

# InputText

| Props         | Tpye   | Description                      | Options                | Require | Default |
| ------------- | ------ | -------------------------------- | ---------------------- | ------- | ------- |
| value         | any    | 값(hook)                         |                        |         |         |
| onChange      | func   | func(인풋값);                    |                        | Y       |         |
| label         | string |                                  |                        |         |         |
| disabled      | string |                                  |                        |         | false   |
| type          | string | 인풋에 들어갈 타입               | password               |         |         |
| dataSuccess   | string | 에러메세지                       |                        |         | ''      |
| dataErr       | string | 성공메세지                       |                        |         | ''      |
| validation    | func   | 유효성검사                       | utils.validation       |         |         |
| onChangeValid | func   | func(검사결과)                   |                        |         |         |
| isValid       | any    | 값에따라 classNames 결정         | onChangeValid 검사결과 | Y       |         |
| refContainer  | object | input 객체 저장                  |                        |         | {}      |
| readOnly      | bool   | 읽기전용 모드                    |                        |         |         |
| textarea      | bool   | 텍스트어리어로 사용할지          |                        |         | false   |
| scroll        | bool   | 텍스트어리어 일때 스크롤 노출    |                        |         | false   |
| doubleHeight  | bool   | 텍스트어리어 일때 높이 2배       |                        |         | false   |
| max           | number | validation이 MaxOver 일떄 최대값 |                        |         | 10000   |

# Radio

| Props     | Tpye             | Description            | Options | Require | Default |
| --------- | ---------------- | ---------------------- | ------- | ------- | ------- |
| id        | string           | 라디오 아이디          |         | Y       |         |
| disabled  | bool             |                        |         |         |         |
| groupName | string           | 라디오 그룹이름        |         | Y       |         |
| label     | string           |                        |         |         |         |
| value     | string or Number | 각라디오에 해당하는 값 |         | Y       |         |
| onChange  | func             | onChange(radioVlaue)   |         | 286     |         |

- 라디오 아이디는 {groupName}--{번호} 를 사용하세요.
- 라디오는 그룹이 같은것끼리 사용됩니다.
- 라디오의 value 는 다른 value 들과 다르게 onChange와 연관성이 없습니다.

#### Default Select 하는방법

선택된 밸류를 라디오들에 전달한다음  
checked 프로프를 자기가가진 밸류와 일치함에 따른 true || false 로 하여 input에 넣어야함

# JDselect

| Props          | Tpye   | Description                 | Options | Require | Default |
| -------------- | ------ | --------------------------- | ------- | ------- | ------- |
| label          | string |                             |         |         |         |
| disabled       | bool   |                             |         |         |         |
| isOpen         | bool   | 셀렉트박스가 항상열려있는지 |         |         |         |
| isMulti        | bool   | 멀티 셀렉트 가능여부        |         |         |         |
| onChange       | func   | func(selectOption)          |         | Y       |         |
| selectedOption | object | 셀렉트된 옵션(hook)         |         | Y       |         |
| options        | object | 셀렉트박스에 들어갈 옵션    |         | Y       |         |

- select DATA EX)

```javascript
  const selectDummyOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
```

- [참고](https://github.com/JedWatson/react-select)

# Switch

| Props    | Tpye   | Description | Options | Require | Default |
| -------- | ------ | ----------- | ------- | ------- | ------- |
| disabled | bool   |             |         |         | false   |
| checked  | bool   | 값(Hook)    |         | Y       | false   |
| onChange | func   |             |         | Y       |         |
| ltxt     | string | 왼쪽라벨    |         |         |         |
| rtxt     | string | 오른쪽라벨  |         |         |         |
