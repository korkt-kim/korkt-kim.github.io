# Layout vs Template

## 공통점

- 페이지를 둘러싸는 UI 셸 역할을 한다.

## 차이점

### Layout

- 사용자가 새 페이지로 이동을 해도 Layout은 다시 Mount되지않는다. -> 머리글, 바닥글, 사이드바와 같은 구성 요소에 유용하다.

### Template

- 사용자가 새 페이지로 이동할 때마다 템플릿이 다시 Mount됨. -> 주로 UseEffect 같은 Hook의 실행을 유발한다.
