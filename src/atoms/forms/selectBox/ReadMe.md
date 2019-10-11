# JDselect

| Props          | Tpye   | Description                 | Options | Require | Default |
| -------------- | ------ | --------------------------- | ------- | ------- | ------- |
| label          | string |                             |         |         |         |
| disabled       | bool   |                             |         |         |         |
| isOpen         | bool   | 셀렉트박스가 항상열려있는지 |         |         |         |
| isMulti        | bool   | 멀티 셀렉트 가능여부        |         |         |         |
| onChange       | func   | func(selectOption)          |         | Y       |         |
| selectedOption | object | 셀렉트된 옵션(hook)         |         | Y       |         |
| options        | object | 셀렉트박스에 들어갈 옵션    |         | Y       |         |

- select DATA EX)

```javascript
const selectDummyOptions = [
  {value: "chocolate", label: "Chocolate"},
  {value: "strawberry", label: "Strawberry"},
  {value: "vanilla", label: "Vanilla"}
];
```

- [참고](https://github.com/JedWatson/react-select)
