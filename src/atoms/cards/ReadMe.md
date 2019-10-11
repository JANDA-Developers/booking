## Card

| Props      | Tpye | Description        | Options | Require | Default |
| ---------- | ---- | ------------------ | ------- | ------- | ------- |
| children   |      | 카드내용           |         |         |         |
| hover      |      | 호버이펙트         |         |         |         |
| fullHeight |      | 강제로 Height 100% |         |         |         |
| fullWidth  |      | 강제로 with 100%   |         |         |         |
| noMargin   |      | 마진없앰           |         |         |         |
| selected   |      | 선택된 효과줌      |         |         |         |

hover?: boolean;
fullHeight?: boolean;
className?: string;
selected?: boolean;
noMargin?: boolean;
onClickCard?(): void;

현재 패딩이 콘테이너패딩과 동일하게 설정중
