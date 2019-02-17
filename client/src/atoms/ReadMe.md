### Buttons

| Props       | Tpye        | Description            | Options           | Require | Default |
| ----------- | ----------- | ---------------------- | ----------------- | ------- | ------- |
| disabled    | bool        |                        |                   | X       | false   |
| label       | string      |                        |                   | Y       | false   |
| icon        | string      | 버튼에 쓰일 아이콘     |                   | Y       |
| onClick     | func        | func(e) 클릭 이벤트    |                   | X       |
| iconClasses | ary(string) | 아이콘에 넣을 클래스들 |                   | X       |
| dataTip     | bool        | 툴팁 사용여부          |                   | X       | false   |
| dataFor     | string      | 툴팁 내용 대상         |                   | X       |
| mode        | string      | 형태                   | flat,small,large  | X       |
| float       | string      | float 여부 (클래스)    | left,right        | X       |
| color       | string      | 버튼위 색 (클래스)     | white             | X       |
| thema       | string      | 버튼색 (클래스)        | primary,secondary | X       |
| type        | string      | 버튼 타입              |                   | X       |

### Card

| Props    | Tpye | Description | Options | Require | Default |
| -------- | ---- | ----------- | ------- | ------- | ------- |
| children |      | 카드내용    |         |         |         |

### CircleIcon

| Props    | Tpye   | Description | Options      | Require | Default |
| -------- | ------ | ----------- | ------------ | ------- | ------- |
| children | node   | 카드내용    |              |         |         |
| thema    | string | 카드내용    | white greybg |         |         |
| darkWave | bool   | 카드내용    |              |         |         |
| wave     | bool   | 카드내용    |              |         |         |

### Modal

- 모달은 외부 라이브러리 입니다.
  <!-- - 02.13 아 이거 그냥 만들껄 그랬다 다 간단한 내용인데 그때 너무 몰랐던것 같다. -->

<!-- todo : 시간되면 내구조로 다시만들어야겠다 -->

- 확장성이 몹시 뛰어나기 때문에 채용하였습니다.

- node_modules 에 포함되어있으며 아직까지 수정하지 않았습니다.

- modal.scss만 는 해당 페이지 또는 컴포넌트에 임폴트 해서 사용하십시요.

[모달 문서](https://github.com/reactjs/react-modal#installation);

### Tolltip

- 외부 tooltip 을 가져왔습니다. 무겁지 않을까 걱정인데 생각보다 용량이 크진 않았습니다. 압축파일 기준 200kb

- 이걸 사용할수있는 방법은 2가지가있다 button 처럼 꼭 필요하다면 안에다가 tooltip 프로퍼티를 설정해서 접근하는 방법과

- 외부에 span태그를 감싸서 하는방법이 있다

<!-- todo: 툴팁 작업 및 forms PropTypes 정리 -->

[문서](https://github.com/wwayne/react-tooltip);
