# Zustand

## Redux vs Zustand

### 공통점

1. immutable state model을 기반으로 한다.
2. Render Optimization은 Selector를 통해서 한다.

### 차이점

1. State Model: Redux는 app을 context provider로 감싸야하지만 Zustand는 그렇지 않다.

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

const useCountStore = create<State & Actions>(set => ({
  count: 0,
  increment: (qty: number) => set(state => ({ count: state.count + qty })),
  decrement: (qty: number) => set(state => ({ count: state.count - qty })),
}))
```

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

type Action = {
  type: keyof Actions
  qty: number
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty }
    case 'decrement':
      return { count: state.count - action.qty }
    default:
      return state
  }
}

const useCountStore = create<State & Actions>(set => ({
  count: 0,
  dispatch: (action: Action) => set(state => countReducer(state, action)),
}))
```

## nextjs example

https://github.com/vercel/next.js/tree/canary/examples/with-zustand

## api

1. create

- state와 action을 이용하여 store를 정의한다. context provider 가 필요하지않다.

```ts
import { create } from 'zustand';

interface CounterState {
    counter: number;
    increase: (by: number) => void;
}

const useStore = create<CounterState>()((set) => ({
    counter: 0,
    increase: (by) => set((state) => ({ counter: state.counter + by })),
}));

export default function Counter() {
    // const { counter, increase } = useStore();
    // or
    const counter = useStore((state) => state.counter);
    const increase = useStore((state) => state.increase);

    const handleClick = () => {
        increase(1);
    };
    return (
        <div>
            <span>{counter}</span>
            <button onClick={handleClick}>one up</button>
        </div>
    );
}
```

2. createStore

- custom hook을 return 하는 대신 store 객체를 반환한다. context나 props를 통해 store를 전달하는 경우에 이상적이다.

```ts
import { createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';

interface CounterState {
    counter: number;
    increase: (by: number) => void;
}

const useCreateStore = createStore<CounterState>()((set) => ({
    counter: 0,
    increase: (by) => set((state) => ({ counter: state.counter + by })),
}));

const CounterContext = createContext<typeof useCreateStore | null>(null);

function CounterContextProvider({ children }: { children: React.ReactNode }) {
    const store = useRef(useCreateStore);

    return (
        <CounterContext.Provider value={store.current}>
            {children}
        </CounterContext.Provider>
    );
}

function Counter() {
    const store = useContext(CounterContext);
    if (!store) throw new Error('Missing CounterContext.Provider in the tree');
    const counter = useStore(store, (state) => state.counter);
    const increase = useStore(store, (state) => state.increase);

    const handleClick = () => {
        increase(1);
    };
    return (
        <div>
            <span>{counter}</span>
            <button onClick={handleClick}>one up</button>
        </div>
    );
}

export default function App() {
    return (
        <CounterContextProvider>
            <Counter />
        </CounterContextProvider>
    );
}
```

3. StateCreator
4. PartialState
5. useStore
6. useBoundStore

- slice pattern에서 여러개의 store를 하나의 bounded store에 합칠때 사용한다.

```ts
const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
})

const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}))

function App() {
  const bears = useBoundStore((state) => state.bears)
  const fishes = useBoundStore((state) => state.fishes)
  const addBear = useBoundStore((state) => state.addBear)

  return (
    <div>
      <h2>Number of bears: {bears}</h2>
      <h2>Number of fishes: {fishes}</h2>
      <button onClick={() => addBear()}>Add a bear</button>
    </div>
  )
}
```

7. useContextStore
8. createContext
9. combine, devtools, subscribeWithSelector
10. persist

### create vs createStore

    - 차이점
      - create는 ```useStore``` 훅을 반환하고 그에 따라 Context Provider가 따로 필요없지만 createStore는 store 객체를 반환하여 Context Provider내에서 합성한다.

