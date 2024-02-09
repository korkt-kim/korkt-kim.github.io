import { renderHook, act } from '@testing-library/react'
import React, { createRef } from 'react'
import ReactDOM from 'react-dom/client'

import { useIntersectionObserver } from '../hooks/useIntersectionObserver/index'

import { RefObject } from 'react'
import { cloneDeep } from 'lodash-es'

// # 컴포넌트가 필요한 훅 테스트 방법
// useIntersectionObserver 훅 테스트를 위해서는 스크롤에따라 이벤트 발생을 체크해야하므로 컴포넌트가 필요하다.
// useIntersectionObserver의 테스트 순서
// 1. DOM API에 대해 Mocking을 한다. 왜냐하면 테스트는 Browser에서 돌아가지 않기 때문에 DOM API를 실행할 수 없다.
//   - observe와 disconnect를 가짜로 가지는 IntersectionObserver를 생성한다.
//   - 진짜 IntersectionObserver에 덮어쓴다.
// 2. ReactDOM으로 react스럽게 렌더링한다.
// 3. mocking한 DOM API에 원하는 매개변수를 테스트에서 직접 넣어준다.
//   - 만약 callback 함수가 매개변수라면 act를 이용해서 callback함수에도 직접 매개변수를 넣어준다.
// 4. hook의 결과값을 예상치와 비교한다.

describe('useIntersectionObserver', () => {
  const container = document.createElement('div')

  const observe = jest.fn()
  const disconnect = jest.fn()

  const mockIntersectionObserver = jest.fn().mockReturnValue({
    observe,
    disconnect,
  })
  window.IntersectionObserver = mockIntersectionObserver

  it('useIntersectionObserver가 정의되어있다', () => {
    expect(useIntersectionObserver).toBeDefined()
  })

  it('should work when target is in viewport', async () => {
    const targetRef = createRef<HTMLDivElement>()

    act(() => {
      ReactDOM.createRoot(container).render(<div ref={targetRef} />)
    })

    const { result } = renderHook(() =>
      useIntersectionObserver(targetRef, { root: null, threshold: 0 })
    )

    const calls = mockIntersectionObserver.mock.calls
    // mockIntersectionObserver (useIntersectionObserver 입장에서는 new IntersectionObserver)에 들어간 매개변수.[(entries: IntersectionObserverEntry[]) => void, IntersectionObserverInit]
    const onChange = calls[calls.length - 1][0]

    act(() => {
      onChange([
        {
          targetRef: targetRef.current,
          isIntersecting: true,
          intersectionRatio: 0.5,
        },
      ])
    })

    expect(result.current).not.toBeNull()
    expect(result.current?.isIntersecting).toBe(true)
    expect(result.current?.intersectionRatio).toBe(0.5)
  })
})
