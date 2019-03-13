# SearchInput

| Props           | Tpye   | Description                                                      | Options | Require | Default |
| --------------- | ------ | ---------------------------------------------------------------- | ------- | ------- | ------- |
| dataList        | bool   | 서치 리스트로 제공할 리스트                                      |         | Y       | false   |
| staticList      | bool   | 리스트가 공중에 뜨지 않도록 제공                                 |         |         | false   |
| filter          | bool   | 값에 일치하는리스트만 보입니다.                                  |         |         | false   |
| alwaysListShow  | bool   | 포커스 되지않았을 때도 리스트가 보입니다.                        |         |         | false   |
| onTypeChange    | bool   | 텍스트를 칠떄마다 데이터를 전송(onSearch)합니다.                 |         |         | false   |
| onSearch        | func   | 값을 전송합니다.                                                 |         |         |
| placeHolder     | string |                                                                  |         |         |
| label           | string | 라벨텍스트                                                       |         |         |
| onTypeValue     | string | 서치값 onTypeChange 가 true가 아니면 사용하지 마십시요           |         |         |
| isMatched       | string | onTypeValue 가 있을경우에 정확하게 일치하는 리스트 name이 있는지 |         |         |
| asName          | string | dateFormatter에 들어갈 변환 키값                                 |         |         |
| asDetail        | string | dateFormatter에 들어갈 변환 키값                                 |         |         |
| feedBackMessage | string | 인풋 아래에피드백으로 나타날 메세지                              |         |         |
| setIsMatched    | func   |                                                                  |         |         |

### DESCRIPTION

리스트에 적용될수 있는 키값으로 데이터를 변환하지 않아도 됩니다.
asName 과 asDetail 에 원하는 데이터 키값을 넣으면 그키값으로 리스트가 표시됩니다.
