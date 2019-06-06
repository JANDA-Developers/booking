# Checkbox

| Props    | Tpye   | Description    | Options | Require | Default |
| -------- | ------ | -------------- | ------- | ------- | ------- |
| disabled | bool   |                |         |         | false   |
| checked  | bool   | 체크여부(hook) |         | Y       | false   |
| onChange | func   | func(체크여부) |         | Y       |         |
| label    | string |                |         |         |         |

#### Default Chceked 하는방법

선택된 밸류를 라디오들에 전달한다음  
checked Prop 가진 밸류와 일치함에 따른 true || false 로 하여 input에 넣어야함
