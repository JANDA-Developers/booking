# Timeline

[npm](https://www.npmjs.com/package/new-react-calendar-timeline)
[gitHub](https://github.com/namespace-ee/react-calendar-timeline)
[examples](https://github.com/namespace-ee/react-calendar-timeline/tree/master/examples)
[monent](https://momentjs.com/)

- monent 를 사용하면 느려질것이다.
  퍼포먼스를 고려해서 사용

  **defaultTimeStart and defaultTimeEnd**
  타임라인 시작과 끝 Date or moment object.
  unControlled 일때

  **visibleTimeStart and visibleTimeEnd**
  타임라인 시작과 끝 Date or moment object.
  onTimeChange 로 조정됨

  **selected**
  array of (선택된 아이템)
  onItemSelect 에 의하여 관리됨니다

  **keys**
  items 와 groud 에게

```
{
 groupIdKey: 'id',
 groupTitleKey: 'title',
 groupRightTitleKey: 'rightTitle',
 groupLabelKey: 'title', // key for what to show in `InfoLabel`
 itemIdKey: 'id',
 itemTitleKey: 'title',    // key for item div content
 itemDivTitleKey: 'title', // key for item div title (<div title="text"/>)
 itemGroupKey: 'group',
 itemTimeStartKey: 'start_time',
 itemTimeEndKey: 'end_time',
}
```

**sidebarContent**
사이드바에 넣을수있는 콘텐츠
Defaults to null.

**sidebarWidth**
default 150

**rightSidebarWidth**
Defaults to 0.

**rightSidebarContent**
Defaults to 0.

**dragSnap**
드래그가 될만큼 눌러야할 시간?

**minResizeWidth**
줄일수 있는 최소한의 width

**stickyOffset**
헤더 나 네브 위치 조정 인듯?

**stickyHeader**
true 나 false 로 포지션이 픽스된것 처럼 따라다니게 할지

**headerRef**
header

**lineHeight**
height of one line

**lineHeight**
height of one line

**headerLabelGroupHeight**
Height of the top header line. Default 30

**headerLabelHeight**
Height of the bottom header line. Default 30

**itemHeightRatio**
아이템 높이 비율?

**minZoom**
Default <code>60 _ 60 _ 1000</code> (1 hour)

**maxZoom**

**clickTolerance**
How many pixels we can drag the background for it to be counted as a click on the background
드래그 관련 ?????? Defualt: 3

**canMove**
아이템 옮길수 있는지 Default true [overridden in the items]

**canChangeGroup**
아이템이 그룹간 이동이 가능한지에 대해서 default true [overridden in the items]

**canResize**
Can items be resized? Can be overridden in the items array. Accepted values: false, "left", "right", "both". Defaults to "right". If you pass true, it will be treated as "right"

**useResizeHandle**
드래그 손잡이 만들기 Default false

**stackItems**
아이템을 서로 쌓아서 시간이 충돌할 때 시각적 오버랩이 발생하지 않도록 한다. 그룹 배열에서 재정의할 수 있다. 기본값은 false이다.

**traditionalZoom**
스크롤 움직일때 줌 인 아웃

**itemTouchSendsClick**
Normally tapping (touching) an item selects it. If this is set to true, a tap will have the same effect, as selecting with the first click and then clicking again to open and send the onItemClick event. Defaults to false.
뭔지 잘 모르겠음 ??

**timeSteps**
With what step to display different units. E.g. 15 for minute means only minutes 0, 15, 30 and 45 will be shown.

```
Default:

{
 second: 1,
 minute: 1,
 hour: 1,
 day: 1,
 month: 1,
 year: 1
}
```

**scrollRef**
스크롤 몸체로부터 오는 스크롤 ref

**onItemMove(itemId, dragTime, newGroupOrder)**
Callback when an item is moved. Returns 1) the item's ID, 2) the new start time and 3) the index of the new group in the groups array.

**onItemResize(itemId, time, edge)**
Callback when an item is resized. Returns 1) the item's ID, 2) the new start or end time of the item 3) The edge that was dragged (left or right)

**onItemSelect(itemId, e, time)**
Called when an item is selected. This is sent on the first click on an item. time is the time that corresponds to where you click/select on the item in the timeline.

**onItemClick(itemId, e, time)**
Called when an item is clicked. Note: the item must be selected before it's clicked... except if it's a touch event and itemTouchSendsClick is enabled. time is the time that corresponds to where you click on the item in the timeline.

**onItemDoubleClick(itemId, e, time)**
Called when an item was double clicked. time is the time that corresponds to where you double click on the item in the timeline.

**onItemContextMenu(itemId, e, time)**
마우스 오른쪽으로 눌렀을때
Called when the item is clicked by the right button of the mouse. time is the time that corresponds to where you context click on the item in the timeline. Note: If this property is set the default context menu doesn't appear.

**onCanvasClick(groupId, time, e)**
Called when an empty spot on the canvas was clicked. Get the group ID and the time as arguments. For example open a "new item" window after this.

**onCanvasDoubleClick(g roup, time, e)**
Called when an empty spot on the canvas was double clicked. Get the group and the time as arguments.

**onCanvasContextMenu(group, time, e)**
Called when the canvas is clicked by the right button of the mouse. Note: If this property is set the default context menu doesn't appear

**onZoom(timelineContext)**
Called when the timeline is zoomed, either via mouse/pinch zoom or clicking header to change timeline units

**moveResizeValidator(action, itemId, time, resizeEdge)**
항목을 이동하거나 크기를 조정할 때 이 기능을 호출한다. 제안된 조치가 비즈니스 논리에 위배될 때 새로운 버전의 변화를 반환하는 것은 이 기능에 달려 있다.

The argument action is one of move or resize.

The argument resizeEdge is when resizing one of left or right.

The argument time describes the proposed new time for either the start time of the item (for move) or the start or end time (for resize).

The function must return a new unix timestamp in milliseconds... or just time if the proposed new time doesn't interfere with business logic.

```javascript
For example, to prevent moving of items into the past, but to keep them at 15min intervals, use this code:

function (action, item, time, resizeEdge) {
  if (time < new Date().getTime()) {
    var newTime = Math.ceil(new Date().getTime() / (15*60*1000)) * (15*60*1000);
    return newTime;
  }

  return time
}
```

**headerLabelFormats and subHeaderLabelFormats**

```javascript
import {
  defaultHeaderLabelFormats,
  defaultSubHeaderLabelFormats
} from "react-calendar-timeline";

defaultHeaderLabelFormats ==
  {
    yearShort: "YY",
    yearLong: "YYYY",
    monthShort: "MM/YY",
    monthMedium: "MM/YYYY",
    monthMediumLong: "MMM YYYY",
    monthLong: "MMMM YYYY",
    dayShort: "L",
    dayLong: "dddd, LL",
    hourShort: "HH",
    hourMedium: "HH:00",
    hourMediumLong: "L, HH:00",
    hourLong: "dddd, LL, HH:00",
    time: "LLL"
  };

defaultSubHeaderLabelFormats ==
  {
    yearShort: "YY",
    yearLong: "YYYY",
    monthShort: "MM",
    monthMedium: "MMM",
    monthLong: "MMMM",
    dayShort: "D",
    dayMedium: "dd D",
    dayMediumLong: "ddd, Do",
    dayLong: "dddd, Do",
    hourShort: "HH",
    hourLong: "HH:00",
    minuteShort: "mm",
    minuteLong: "HH:mm"
  };
```

... and then pass these as headerLabelFormats and subHeaderLabelFormats

**onTimeChange(visibleTimeStart, visibleTimeEnd, updateScrollCanvas)**
스크롤해서 테이블 늘리거나 변경할떄?

A function that's called when the user tries to scroll. Call the passed updateScrollCanvas(start, end) with the updated visibleTimeStart and visibleTimeEnd (as unix timestamps in milliseconds) to change the scroll behavior, for example to limit scrolling.

Here is an example that limits the timeline to only show dates starting 6 months from now and ending in 6 months.

```javascript
// this limits the timeline to -6 months ... +6 months
const minTime = moment().add(-6, 'months').valueOf()
const maxTime = moment().add(6, 'months').valueOf()

function (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
  if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
    updateScrollCanvas(minTime, maxTime)
  } else if (visibleTimeStart < minTime) {
    updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
  } else if (visibleTimeEnd > maxTime) {
    updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
  } else {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
  }
}
```

**onBoundsChange(canvasTimeStart, canvasTimeEnd)**
Called when the bounds in the calendar's canvas change. Use it for example to load new data to display. (see "Behind the scenes" below). canvasTimeStart and canvasTimeEnd are unix timestamps in milliseconds.

**itemRenderer**
아이템 렌더하는법 공식문서 참고하삼
[아이템렌더](https://github.com/namespace-ee/react-calendar-timeline#itemrenderer)

**resizeDetector**
The component automatically detects when the window has been resized. Optionally you can also detect when the component's DOM element has been resized. To do this, pass a resizeDetector. Since bundling it by default would add ~18kb of minimized JS, you need to opt in to this like so:

```javascript
import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container'

<Timeline resizeDetector={containerResizeDetector} ... />
```

**verticalLineClassNamesForTime(start, end)**
verticalLineClassNamesForTime(start, end)
This function is called when the vertical line is rendered. start and end are unix timestamps in milliseconds for the current column. The function should return an array of strings containing the classNames which should be applied to the column. This makes it possible to visually highlight e.g. public holidays or office hours. An example could look like (see: demo/vertical-classes):

```javascript
verticalLineClassNamesForTime = (timeStart, timeEnd) => {
  const currentTimeStart = moment(timeStart);
  const currentTimeEnd = moment(timeEnd);

  for (let holiday of holidays) {
    if (
      holiday.isSame(currentTimeStart, "day") &&
      holiday.isSame(currentTimeEnd, "day")
    ) {
      return ["holiday"];
    }
  }
};
```

Be aware that this function should be as optimized for performance as possible as it will be called on each render of the timeline (i.e. when the canvas is reset, when zooming, etc)

**horizontalLineClassNamesForGroup(group)**

This function is called when the horizontal line is rendered. group is the group which will be rendered into the current row. The function should return an array of strings containing the classNames which should be applied to the row. This makes it possible to visually highlight categories or important items. An example could look like:

```
horizontalLineClassNamesForGroup={(group) => group.root ? ["row-root"] : []}
```

# Timeline Markers

Markers can be placed in the Timeline by declaring them as children of the Timeline component:

```javascript
import Timeline, {
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker
} from "react-calendar-timeline";

<Timeline>
  <TimelineMarkers>
    <TodayMarker />
    <CustomMarker date={today} />
    <CustomMarker date={tomorrow}>
      {/* custom renderer for this marker */}
      {({ styles, date }) => {
        const customStyles = {
          ...styles,
          backgroundColor: "deeppink",
          width: "4px"
        };
        return <div style={customStyles} onClick={someCustomHandler} />;
      }}
    </CustomMarker>
    <CursorMarker />
  </TimelineMarkers>
</Timeline>;
```

**CustomMarker**
Marker that is placed on the current date/time.

date: number | required

Where to place the marker on the timeline. date value is unix timestamp.

children: function({styles: object, date: number}) => JSX.Element

Custom renderer for this marker. Ensure that you always pass styles to the root component's style prop as this object contains positioning of the marker.

```javascript

const today = Date.now()
<CustomMarker date={today} />

//custom renderer
<CustomMarker date={today}>
  {({ styles, date }) =>
  return <div style={styles} />
  }
</CustomMarker>

// multiple CustomMarkers
const markerDates = [
  {date: today, id: 1,},
  {date: tomorrow, id: 2,},
  {date: nextFriday, id: 3,},
]

<TimelineMarkers>
  {markerDates.map(marker => <CustomMarker key={marker.date} date={marker.date}/> )}
</TimelineMarkers>
```

**CursorMarker**
Marker that is displayed when hovering over the timeline and matches where your cursor is.

children: function({styles: object, date: number}) => JSX.Element

Custom renderer for this marker. Ensure that you always pass styles to the root component's style prop as this object contains positioning of the marker.

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
