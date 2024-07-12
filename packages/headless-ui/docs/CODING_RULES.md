# Coding Rules

1. Reducer 내 action들은 모두 interface를 열여준다.
2. props로 넘어온 값이 machine 내부 state 보다 우선도가 높다.

   - 만약 props 값을 변경하고 싶다면 callback함수를 함께 넘겨준다.
   - 메모이제이션되지 않은 함수와 객체를 자식 컴포넌트에 전달하면, 자식 컴포넌트 내에서 해당 함수와 객체를 useMemo, useCallback, useEffect의 의존성으로 사용했을 때 리렌더링 시마다 해당 훅의 콜백 함수가 실행됩니다.
     이를 방지하기 위해서는 메모이제이션을 하거나 useEffect의 의존성을 조정하거나 useEffect를 사용하지 않는 등의 방법을 고려해야 합니다. 참고로 익명 함수는 깊은 비교(deep comparison)로도 항상 false를 반환하니 useEffect의 의존성에 넣는것을 피해야한다.

3. 실제 사용자의 행동으로 호출된 action과 programatically하게 호출된 action은 다를 수 있다. 이떼 분기는 machine의 action 내에서 이뤄지도록 한다.
