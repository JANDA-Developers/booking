## TooltipList

- `tooltipList`는 단순히 tooltip 의 변형입니다.
- `children` 을 통해서 HTML 요소를 제공하십시오.

## Q

#### 모달같은 상위노드에서 스크롤시 tooltip이 클로즈 되지 않습니다?

- 몇가지 속성을 제외하면 `tooltip` 의 특성을 기대로 가집니다.
- 스크롤을 가지는 주체의 class네임과 data-for 를 가진 객체의 ref 를 전달하면 스클롤 close를 할수 있습니다.

| Props           | Tpye | Description                              | Options | Require | Default |
| --------------- | ---- | ---------------------------------------- | ------- | ------- | ------- |
| scrollNodeClass | url  | 스크롤을 담당하는 `Eelement`의 className |         | X       |         |
| tooltipRef      | func | 툴팁을 일으키는 대상의 Ref               |         | X       |         |

ReactTooltip.rebuild()
