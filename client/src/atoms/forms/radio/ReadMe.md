# Radio

| Props         | Tpye   | Description            | Options | Require | Default |
| ------------- | ------ | ---------------------- | ------- | ------- | ------- |
| id            | string | 라디오 아이디          |         | Y       |         |
| disabled      | bool   |                        |         |         |         |
| groupName     | string | 라디오 그룹이름        |         | Y       |         |
| label         | string |                        |         |         |         |
| value         | any    | 각라디오에 해당하는 값 |         | Y       |         |
| selectedValue | any    | 라디오 그룹의 선택된값 |         | Y       |         |
| onChange      | func   | onChange(radioVlaue)   |         | 286     |         |

- 라디오 아이디는 {groupName}--{번호} 를 사용하세요.
- 라디오는 그룹이 같은것끼리 사용됩니다.
- 라디오의 value 는 다른 value 들과 다르게 onChange와 연관성이 없습니다.
