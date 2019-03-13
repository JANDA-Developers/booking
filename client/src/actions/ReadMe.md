# hooks

## useFetch

URL을 받아서
다음 네가지를 리턴합니다

#### Return [<code>data</code>, <code>isLoading</code>, <code>isError</code>, <code>doGet</code>]

- <code>doGet</code> 을통해서 다시 요청을 호출할수 있습니다.
- 지속적인 요청이 필요한경우 보통 useEffect(url)와 함께 사용됨니다.

## useInput

JDinput 컴포넌트와 연계됨니다.  
값 뿐만아니라 벨리데이션 결과를 반환합니다.

#### Return { <code>value</code>,<code>onChange</code>,<code>isValid</code>,<code>onChangeValid</code>};

default 로 주어진 값을 계속 반전시키며 STATE를 유지합니다.
####return [<code>toggle</code>, <code>onClick</code>];

## useModal

모달의 오픈 여부와 OPEN 메소드 CLOSE 메소드를 반환합니다.

####return [<code>isOpen</code>, <code>openModal</code>, <code>closeModal</code>];

## useRadio

네임스페이스

## useCheckBox

네임스페이스

## useSwitch

네임스페이스

## useSelect

네임스페이스

## useToggle
