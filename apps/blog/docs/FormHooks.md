# Form Hooks

## useFormSate

### 사용법

- `const [state, formAction] = useFormState(fn,initialState);`

- `fn`: submit이 되었을때 실행할 함수. function이 호출되면 이전 state를 paramter로 받는다.
- `initialState`: state의 초기값.
- `state`: 현재 state. 초기 렌더링에는 initialState가 될것이다. action이 호출된 직후, action이 return한 값이된다.
- `formAction`: form에 전달할 새로운 action

```ts
import { useFormState } from "react-dom";


async function increment(previousState, formData) {
  return previousState + 1;
}

function StatefulForm({}) {
  const [state, formAction] = useFormState(increment, 0);
  return (
    <form>
      {state}
      <button formAction={formAction}>Increment</button>
    </form>
  )
}


```

## useFormStatus

-
