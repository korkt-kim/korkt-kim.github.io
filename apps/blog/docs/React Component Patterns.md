# React Component Pattern Inversion Of Control

- 컴포넌트가 기본 기능대로 동작하기보다는, 원하는 방식으로 확장되어 동작하길 바랄 때가 있다. 이럴 때 IOC를 통해 컴포넌트를 사용하는 개발자에게 컴포넌트의 제어권을 넘겨줌으로써, 개발자가 원하는 대로 컴포넌트를 컨트롤 하도록 할 수 있다.

## Render Props 패턴

### 해결상황

- 컴포넌트의 child가 함수 형태인 컴포넌트로 Component 렌더링 단계에 간단히 IOC를 적용할 수 있다.

## Control Props Pattern

### 해결상황

- 컴포넌트 내부의 state와 해당 state 변화를 처리하는 로직들을 컴포넌트 외부에서 컨트롤할 수 있도록 하는 패턴.

### 적용방법

- child 컴포넌트 내부에 정의된 state나 useState 상태 값과 해당 상태 값을 변경하는 로직들을 사용하지 않고, 프로퍼티를 통해 외부에서 들어온 상태값과 콜백함수를 사용함으로써 외부에서 컴포넌트의 상태를 컨트롤할 수 있게 한다.

### 예제

- before

```tsx
function MyCapitalizedInput() {
  const [capitalizedValue, setCapitalizedValue] = React.useState('')

  return (
    <input
      value={capitalizedValue}
      onChange={e => setCapitalizedValue(e.target.value.toUpperCase())}
    />
  )
}
```

- after

1. initialValue가 있는 버전

```tsx
function default function MyCapitalizedInput({
  value = undefined,
  initialValue = "",
  onChange,
}: {
  value?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
}) {
   const [capitalized, setCapitalized] = useState<string>("");
  // check point 1. event handler 사용 방법. 내부와 외부를 sync를 맞춘다.
  const handleChange = useCallback((newValue: string) => {
    const _newValue = newValue.toUpperCase();
    onChange?.(_newValue);
    setCapitalized(_newValue);
  }, []);

  // check point 2. useEffect로 초기값과 value sync를 맞춰준다.
  const firstMounded = useRef(true);
  useEffect(() => {
    // initialValue가 필요없다면 useState 초기에 value 세팅으로 useEffect를 대신할 수 있음.
    if (firstMounded.current && !!initialValue) {
      handleChange(initialValue);
    }

    firstMounded.current = false;
  }, [value, handleChange, initialValue]);

  return (
      <input
        value={value ?? capitalized}
        onChange={(e) => handleChange(e.target.value)}
      />
  );
}
```

2. initialValue가 없는 버전

```tsx
function default function MyCapitalizedInput({
  value = undefined,
  onChange,
}: {
  value?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
}) {
   const [capitalized, setCapitalized] = useState<string>(value ?? "");
  // check point 1. event handler 사용 방법. 내부와 외부를 sync를 맞춘다.
  const handleChange = useCallback((newValue: string) => {
    const _newValue = newValue.toUpperCase();
    onChange?.(_newValue);
    setCapitalized(_newValue);
  }, []);

  return (
      <input
        {/*check point3. value를 우선으로 내부 값을 후순위로 설정한다*/}
        value={value ?? capitalized}
        onChange={(e) => handleChange(e.target.value)}
      />
  );
}
```

## State Reducer Pattern

### 해결 상황

- 컴포넌트 내부의 동작 방식을 reducer를 통해 직접 제어한다.이를 Props를 통해 넘기도록 하여 제어의 역전을 이룬다.
- 가장 복잡도가 큰 경우에도 state reducers를 사용하는 것이 사용자에게 제어권을 넘기는 가장 좋은 방법이다. 모든 내부 컴포넌트 작업을 외부에서 접근할 수 있으며 재정의하는 것 또한 가능하다.

### 적용방법

- default reducer를 기본 컴포넌트에 설정하고 이를 훅을 이용하여 props로 받아 덮어 쓸 수 있게한다.

### 예제

- before

```tsx
// toggle.tsx
function useToggle() {
  const [on, setOnState] = React.useState(false)

  const toggle = () => setOnState(o => !o)
  const setOn = () => setOnState(true)
  const setOff = () => setOnState(false)

  return { on, toggle, setOn, setOff }
}

function Toggle({ onChange }: { onChange: (count: number) => any }) {
  const { on, toggle, setOn, setOff } = useToggle()

  function handleClick() {
    toggle()
    onChange?.(count + 1)
  }

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch on={on} onClick={handleClick} />
    </div>
  )
}

// App.js
function App() {
  const [clicksSinceReset, setClicksSinceReset] = useState(0)
  const tooManyClicks = clicksSinceReset >= 4

  return (
    <div className='App'>
      <Toggle onChange={(count: number) => setClicksSinceReset(count)} />
      {tooManyClicks ? (
        <button onClick={() => setClicksSinceReset(0)}>Reset</button>
      ) : null}
    </div>
  )
}
```

- after

```tsx
// Toggle.tsx
export const actionTypes = {
  toggle: 'TOGGLE',
  on: 'ON',
  off: 'OFF',
}

function defaultToggleReducer(state, action) {
  switch (action.type) {
    case actionTypes.toggle: {
      return { on: !state.on }
    }
    case actionTypes.on: {
      return { on: true }
    }
    case actionTypes.off: {
      return { on: false }
    }
    default:
      throw new Error()
  }
}

function useToggle({
  reducer,
}: {
  reducer: (state: any, action: any, next?: typeof defaultToggleReducer) => any
}) {
  const [{ on }, dispatch] = useReducer(reducer, { on: false })

  const toggle = () => dispatch({ type: actionTypes.toggle })
  const setOn = () => dispatch({ type: actionTypes.on })
  const setOff = () => dispatch({ type: actionTypes.off })

  return { on, toggle, setOn, setOff }
}

interface ToggleProps {
  reducer: (
    currentState: any,
    action: any,
    next?: typeof defaultToggleReducer
  ) => any
  onChange?: () => any
}

function composeReducer(
  outerReducer?: any
): Reducer<number, typeof actionTypes> {
  return function (prevState, action) {
    if (!outerReducer) {
      return defaultToggleReducer(prevState, action)
    }

    return outerReducer(prevState, action, defaultToggleReducer)
  }
}

export default function Toggle({ reducer, onChange }: ToggleProps) {
  const { on, toggle, setOn, setOff } = useToggle({
    reducer: composeReducer(reducer),
  })

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <input
        type='checkbox'
        onClick={() => {
          toggle()
          onChange?.()
        }}
        checked={on}
      />
    </div>
  )
}

// App.js
const reducer = tooManyClicks => (currentState, action, next) => {
  const changes = next?.(currentState, action)
  if (tooManyClicks && action.type === actionTypes.toggle) {
    // other changes are fine, but on needs to be unchanged
    return { ...changes, on: currentState.on }
  } else {
    // the changes are fine
    return changes
  }
}

export default function App() {
  const [clicksSinceReset, setClicksSinceReset] = useState(0)
  const tooManyClicks = clicksSinceReset >= 4

  return (
    <div className='App'>
      <Toggle
        reducer={reducer(tooManyClicks)}
        onChange={() => setClicksSinceReset(count => count + 1)}
      />
      {tooManyClicks ? (
        <button onClick={() => setClicksSinceReset(0)}>Reset</button>
      ) : null}
    </div>
  )
}
```

- Toggle은 본연의 역할을 하면서 제약사항은 Parent Component 및 Parent Component의 Reducer가 담당하게 된다.

## Props Collections and Getters

### 해결 상황

- Controlled Props Pattern, Render Props Pattern에서 상태값이 여러개고 해당 값을 컨트롤하기 위한 콜백함수가 많아질 때, 이러한 콜백함수들을 묶어서 외부로 전달한다.

### 예제

- before

```tsx
const Counter = ({ count, onChange, onIncrement, onDecrement }) => {
  const [count, setCount] = useState(count)

  const onChangeCount = value => {
    setCount(value)
    onChange?.(value)
  }

  const onDecrementCount = () => {
    setCount(count => count - 1)
    onDecrement?.()
  }

  onIncrementCount = () => {
    setCount(count => count + 1)
    onIncrement?.()
  }
  return (
    <div>
      <button onClick={onDecrementCount}>-</button>
      <button onClick={onInrementCount}>+</button>
      {count}
    </div>
  )
}
// App.js
function App() {
  const [value, setValue] = useState(0)

  return (
    <Counter
      value={value}
      onDecrementCount={() => setValue(value - 1)}
      onIncrement={() => setValue(value + 1)}
      onChange={value => setValue(value)}
    />
  )
}
```

- after

```tsx
const useCounter = ({ count, onIncrement, onDecrement, onChange }) => {
  const [count, setCount] = useState(count)

  const onIncrement = function () {
    setCount(prev => (prev ? prev + 1 : 1))
    callbackProps?.onIncrement?.()
  }

  const onDecrement = function () {
    setCount(prev => (prev ? prev - 1 : -1))
    callbackProps?.onDecrement?.()
  }

  const onChange = function (count: number) {
    setCount(count)
    callbackProps?.onChange?.(count)
  }
  return {
    count,
    onChange,
    onIncrement,
    onDecrement,
  }
}
const Counter = ({ count, onChange, onIncrement, onDecrement }) => {
  const counter = useCounter({ count, onChange, onIncrement, onDecrement })

  return (
    <div>
      <button onClick={counter.onDecrementCount}>-</button>
      <button onClick={counter.onInrementCount}>+</button>
      {counter.count}
    </div>
  )
}
// App.js
function App() {
  const { count, ...callbacks } = useCounter({ defaultValue: 10 })

  return (
    <div>
      <Counter count={count} {...callbacks} />
    </div>
  )
}
```

- 코드를 간단하게 바꾸기 위해서 훅에서 또는 render props의 child prameter로 연관된 것을 묶어 분리한 것에 불과한다.
