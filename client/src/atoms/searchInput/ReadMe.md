# SearchInput

Controll Input 만 지원함

| Props           | Tpye   | Description                                                      | Options | Require | Default |
| --------------- | ------ | ---------------------------------------------------------------- | ------- | ------- | ------- |
| dataList        | bool   | 서치 리스트로 제공할 리스트                                      |         | Y       | false   |
| staticList      | bool   | 리스트가 공중에 뜨지 않도록 제공                                 |         |         | false   |
| filter          | bool   | 값에 일치하는리스트만 보입니다.                                  |         |         | false   |
| alwaysListShow  | bool   | 포커스 되지않았을 때도 리스트가 보입니다.                        |         |         | false   |
| isTypeChange    | bool   |                                                                  |         |         | false   |
| isLoading       | bool   | 로딩중인지 => 아이콘표시                                         |         |         | false   |
| onTypeChange    | func   | 텍스트를 칠때마다 값을 전송                                      |         | Y       | false   |
| onSearch        | func   | 사용자가 엔터키를 칠떄 && 아이콘 검색                            |         |         |         |
| onTypeValue     | string | input 값                                                         |         |         | Y       |
| placeHolder     | string |                                                                  |         |         |         |
| label           | string | 라벨텍스트                                                       |         |         |         |
| asName          | string | dateFormatter에 들어갈 변환 키값                                 |         |         |         |
| asDetail        | string | dateFormatter에 들어갈 변환 키값                                 |         |         |         |
| feedBackMessage | string | 인풋 아래에피드백으로 나타날 메세지                              |         |         |         |
| isMatched       | string | onTypeValue 가 있을경우에 정확하게 일치하는 리스트 name이 있는지 |         |         |         |
| maxCount        | number | 리스트에 나타날 카운트                                           |         |         | 999     |
| setIsMatched    | func   |                                                                  |         |         |         |

### DESCRIPTION

- 리스트에 적용될수 있는 키값으로 데이터를 변환하지 않아도 됩니다.
- <code>asName</code> 과 <code>asDetail</code> 에 원하는 데이터 키값을 넣으면 그키값으로 리스트가 표시됩니다.
