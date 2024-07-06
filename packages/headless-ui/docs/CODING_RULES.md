# Coding Rules

1. Reducer 내 action들은 모두 interface를 열여준다.
2. props로 넘어온 값이 machine 내부 state 보다 우선도가 높다.

   - 만약 props 값을 변경하고 싶다면 callback함수를 함께 넘겨주고 Reducer내 action에서 호출한다.

3. 실제 사용자의 행동으로 호출된 action과 programatically하게 호출된 action은 다를 수 있다. 이떼 분기는 machine의 action 내에서 이뤄지도록 한다.
