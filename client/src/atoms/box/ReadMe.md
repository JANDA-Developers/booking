# JDbox

박스의 용도는 박스형 UI 구조를 만드는 용도입니다.

| Props       | Tpye               | Description                         | Options | Require          | Default |
| ----------- | ------------------ | ----------------------------------- | ------- | ---------------- | ------- |
| mode        | enum               | 색상정의                            |         |                  | false   |
| label       | JSX.Element string | mode normal일때 박스안쪽에 라벨생성 |         | mode: normal     |         |
| topLabel    | bool               | 라벨 위치를 위쪽으로 변경           |         | mode: normal     |         |
| icon        | IIcons             | 상자 안쪽 좌측 아이콘 생성          |         | mode: normal     |         |
| iconOnClick | func               | 아이콘 클릭 핸들러                  |         | mode: normal     |         |
| iconHover   | boolean            | 아이콘 호버 효과                    |         | mode: normal     |         |
| photo       | string             | 아이콘 호버 효과                    |         | mode: photoFrame |         |
| standard    | boolean            | 라인높이 제어                       |         | mode: normal     |         |
| align       | enum               | 정렬 제어                           |         | mode: table      |         |
