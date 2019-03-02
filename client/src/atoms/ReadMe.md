## Buttons

| Props       | Tpye        | Description            | Options           | Require | Default |
| ----------- | ----------- | ---------------------- | ----------------- | ------- | ------- |
| disabled    | bool        |                        |                   |         | false   |
| label       | string      |                        |                   | Y       | false   |
| icon        | string      | 버튼에 쓰일 아이콘     |                   | Y       |
| onClick     | func        | func(e) 클릭 이벤트    |                   |         |
| iconClasses | ary(string) | 아이콘에 넣을 클래스들 |                   |         |
| dataTip     | bool        | 툴팁 사용여부          |                   |         | false   |
| dataFor     | string      | 툴팁 내용 대상         |                   |         |
| mode        | string      | 형태                   | flat,small,large  |         |
| float       | string      | float 여부 (클래스)    | left,right        |         |
| color       | string      | 버튼위 색 (클래스)     | white             |         |
| thema       | string      | 버튼색 (클래스)        | primary,secondary |         |
| type        | string      | 버튼 타입              |                   |         |

## Card

| Props    | Tpye | Description | Options | Require | Default |
| -------- | ---- | ----------- | ------- | ------- | ------- |
| children |      | 카드내용    |         |         |         |

## CircleIcon

| Props    | Tpye   | Description | Options      | Require | Default |
| -------- | ------ | ----------- | ------------ | ------- | ------- |
| children | node   | 카드내용    |              |         |         |
| thema    | string | 카드내용    | white greybg |         |         |
| darkWave | bool   | 카드내용    |              |         |         |
| wave     | bool   | 카드내용    |              |         |         |

## Modal

- 모달은 외부 라이브러리 입니다.
  <!-- - 02.13 아 이거 그냥 만들껄 그랬다 다 간단한 내용인데 그때 너무 몰랐던것 같다. -->

<!-- todo : 시간되면 내구조로 다시만들어야겠다 -->

- 확장성이 몹시 뛰어나기 때문에 채용하였습니다.

- node_modules 에 포함되어있으며 아직까지 수정하지 않았습니다.

- modal.scss만 는 해당 페이지 또는 컴포넌트에 임폴트 해서 사용하십시요.

[모달 문서](https://github.com/reactjs/react-modal#installation);

## Tolltip

- 외부 tooltip 을 가져왔습니다. 압축파일 기준 200kb

--center 중앙정렬

[툴팁 문서](https://github.com/wwayne/react-tooltip);
