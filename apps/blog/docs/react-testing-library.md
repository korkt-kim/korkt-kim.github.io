# React Testing Library

## Component Testing

### Page

### Component

## Hook Testing

```js
import useToggle from './useToggle'

function ToggleButton({ initial = false }) {
  const [on, toggle] = useToggle(initial)

  return <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
}

export default ToggleButton
```

### React Component를 통한 간접 테스트

훅의 return 값이 예상값과 일치하는지 확인

```js
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ToggleButton from './ToggleButton'

test('button text changes from ON to OFF when clicked', () => {
  render(<ToggleButton />)

  const button = screen.getByRole('button')

  expect(button).toHaveTextContent('OFF')

  userEvent.click(button)

  expect(button).toHaveTextContent('ON')
})

test('button text is ON given initial set to true', () => {
  render(<ToggleButton initial={true} />)

  expect(screen.getByRole('button', { name: /on/i })).toBeInTheDocument()
})
```

### React Hooks Testing Library를 통한 직접 테스트

`npm i -D @testing-library/react-hooks`

```js
import { renderHook, act } from '@testing-library/react-hooks'

import useToggle from './useToggle'

test('update state from false to true when toggle is called', () => {
  const { result } = renderHook(() => useToggle())

  expect(result.current[0]).toBe(false)

  // toggle 실행
  act(() => result.current[1]())

  expect(result.current[0]).toBe(true)
})

test('allows for initial value', () => {
  const { result } = renderHook(() => useToggle(true))

  expect(result.current[0]).toBe(true)
})
```

## 질문

- react-test-renderer create() vs @testing-library-react render()
  - `create()`는 virtualDOM(ReactDOM)에 대해 테스트를 가능하게 해준다.
  - `render()`는
- react-dom/test-utils vs react-test-renderer vs @testing-library/react
  - react-dom/test-utils
    - 주로 브라우저 환경에서 실행되는 React 컴포넌트 테스트에 사용된다.
  - react-test-renderer
    - 가상 DOM을 사용하여 테스트를 실행하며, 브라우저 환경이나 DOM API에 의존하지 않고 React Component를 테스트하는데 사용된다. 주로 React Component의 트리를 생성하고 검사하는데 사용된다.
  - @testing-library/react
    - 컴포넌트에 대해 사용자 중심의 테스트 방식을 지향한다. ex) 버튼클릭, 입력값 변경 등
