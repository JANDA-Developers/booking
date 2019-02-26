# searchInput

### PROPS

| Props          | Tpye   | Description                                                      | Options | Require | Default |
| -------------- | ------ | ---------------------------------------------------------------- | ------- | ------- | ------- |
| userList       | bool   | 서치 리스트로 제공할 아이콘                                      |         |         | false   |
| staticList     | bool   | 리스트를 absolute 상태에서 static 으로 변경                      |         |         | false   |
| unfilter       | bool   | 필터링 되지않은 리스트를 사용합니다 비었을때를 제외              |         |         | false   |
| alwaysListShow | bool   | 필터링 되지않은 리스트를 사용합니다                              |         |         | false   |
| onTypeChange   | bool   | 텍스트를 칠떄마다 데이터를 전송(onSearch)합니다.                 |         |         | false   |
| onSearch       | func   | 값을 전송합니다.                                                 |         |         |
| placeHolder    | string |                                                                  |         |         |
| label          | string | 라벨텍스트                                                       |         |         |
| onTypeValue    | string | 서치값 onTypeChange 가 true가 아니면 사용하지 마십시요           |         |         |
| isMatched      | string | onTypeValue 가 있을경우에 정확하게 일치하는 리스트 name이 있는지 |         |         |
| setIsMatched   | string |                                                                  |         |         |

### DESCRIPTION

서치인풋은 내부에서 키값을 가지고 리스트를 배치해 냅니다.
키값을 확장하여 리스트를 세부화 할수있도록 설계해두었고
어떤 데이터가 들어와도 변활할수있도록 util 에 포멧터를 두었습니다.

<!-- todo: 키보드 엔터와 클릭시 값을 바로 전달하지말고 onChange 를 거쳐서 갈수 있도록 하자. -->
