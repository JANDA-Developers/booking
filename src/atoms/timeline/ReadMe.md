# Timeline

[npm](https://www.npmjs.com/package/new-react-calendar-timeline)
[gitHub](https://github.com/namespace-ee/react-calendar-timeline)
[examples](https://github.com/namespace-ee/react-calendar-timeline/tree/master/examples)
[monent](https://dayjsjs.com/)

- monent 를 사용하면 느려질것이다.
  퍼포먼스를 고려해서 사용

<!--
Z-Index

Horizontal Lines: 30
Vertical Lines: 40
Items: 80-88 (depending on selection, dragging, etc)
Header: 90

 -->

```
// render default marker for Cursor
<CursorMarker />

//custom renderer
<CursorMarker>
  {({ styles, date }) =>
  // date is value of current date. Use this to render special styles for the marker
  // or any other custom logic based on date:
  // e.g. styles = {...styles, backgroundColor: isDateInAfternoon(date) ? 'red' : 'limegreen'}
  return <div style={styles} />
  }
</CursorMarker>
```
