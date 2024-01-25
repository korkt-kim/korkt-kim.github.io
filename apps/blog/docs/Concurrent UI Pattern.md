# [Concurrent Mode](https://17.reactjs.org/docs/concurrent-mode-intro.html)

- Concurrent Mode가 없다면, rendering을 시작하는 순간(ex. DOM node 생성, component 내 코드 실행) 그 어떠한 것도 이 렌더링을 막을 수 없다. 이를 우리는 **blocking rendering** 이라 부른다
- Concurrent Mode는 Github의 브랜치에서의 작업이라 생각하면 편하다. 브랜치가 있기때문에 여러사람이 하나의 파일에 대해 독립적으로 동시 작업을 진행할 수 있는 것이다.
- Concurrent Mode는 다음의 요소들을 반영한다.
  - 사용자 입력 즉각적으로 반영
  - 클릭이나 페이지 전환은 지연되어도 OK.
  - 화면 간 전환 시 빈번한 화면 로딩 상태는 피로감 향상.(이동하기전 잠시 기다렸다가 고정된 시간 이후 로딩 상태를 보여준다)

### Interruptible rendring

- 목록 필터 기능이 있다고 가정하자, 입력을 할때마다 끊기는 느낌을 받은적이 있을 것이다. 이 문제를 해결하는 방법으로는 일반적으로 사용자가 입력을 중단한 후에만 목록을 업데이트하는 Debounce가 있을 것이다. 하지만 입력하는 실시간으로 보고싶다면 최적의 방안은 되지 못할 것이다.
  - Concurrent Mode는 브라우저가 입력을 업데이트하도록 허용한 다음 업데이트된 목록을 메모리(브랜치)에 계속 렌더링할 수 있다. 메모리에서의 렌더링이 완료되면 React는 Dom을 업데이트한다. 즉, 진행중인 업데이트를 중단하고 더 중요한 작업을 수행한 다음에 이전에 수행하던 작업으로 돌아올 수 있다.

### Intentional Loading Sequence

- 로딩이 오래걸린다면 Spinner을 보여주는 것이 좋다. 하지만 data fetch 응답이 바로 온다면 굳이 Spinner를 보여줄 필요가 없다. Concurrent Mode는 이전화면에 조금더 오래 있으면서 새 화면을 보여주 이전의 나쁜 로딩상태(Spinner)를 스킵해줄 수 있다. 새 화면을 메모리(브랜치)상에서 준비한다. 새화면이 준비되면 그 화면으로 이동한다.

### 결론

- CPU 바운드 업데이트(ex. DOM 노드 생성 및 컴포넌트 코드 실행)의 경우 Concurrency 모드는 더 긴급한 업데이트가 이 렌더링을 중단시킬 수 있다.
- IO 바운드 업데이트(ex. 네트워크에서 코드나 데이터를 fetch)의 경우, Concurrency 모드는 모든 데이터가 도착하기 전에 메모리 상에서 렌더링을 시작할 수 있고, 무의미한 로딩상태를 건너띌 수 있다.

# [Concurrent UI Pattern](https://17.reactjs.org/docs/concurrent-mode-patterns.html)

- 예시 프로젝트(Suspense를 이용한 Concurrent UI Pattern 도입)

  - https://github.com/relayjs/relay-examples/tree/main/issue-tracker

## Concurrent UI Pattern 이란

- 사용자 경험을 향상 시키기 위한 패턴.
  - 사용자가 서비스를 정상적으로 사용할 수 있게끔 오류 없는 비즈니스 로직 작성
  - 서비스 전반에 발생할 수 있는 이슈를 선제적으로 파악하기 위한 Error Tracker
- 쾌적한 사용자 경험을 제공하기 위한 임기응변식으로 대응되는 사용자 경험 향상 요소들을 React에서 제공하는데 이러한 기능들을 사용한 UI 개발 패턴을 Concurrent UI Pattern이라 한다.

  - Suspense, startTransition, useTransition, useDeferredValue, ErrorBoundary

    - Suspense: component가 읽으려하는 data가 아직 **준비되지 않았을때** fallback 출력.

      - 준비의 기준: fetch api는 pending 상태에서 **`Promise{<pending>}`을 throw**하는데 이를 Suspense 컴포넌트가 catch한다.(ErrorBoundary와 유사)

      ```ts
      function fetchUser(userId) {
        let user = null
        const suspender = fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        )
          .then(response => response.json())
          .then(data => {
            setTimeout(() => {
              user = data
            }, 3000)
          })
        return {
          read() {
            if (user === null) {
              throw suspender
            } else {
              return user
            }
          },
        }
      }

      function Main() {
        return (
          <main>
            <h2>Suspense 사용</h2>
            <Suspense fallback={<p>사용자 정보 로딩중...</p>}>
              <User resource={fetchData("1")} />
            </Suspense>
          </main>
        );
      }

      function User({ resource }) {
        const user = resource.user.read();

        return (
          <div>
            <p>
              {user.name}({user.email}) 님이 작성한 글
            </p>
          </div>
        );
      }
      ```

      - react-query와의 사용

      ```ts
      function App() {
        return (
          <Suspense fallback={<div>...loading</div>}>
            <TodoList />
          </Suspense>
        );
      }

      function TodoList() {
        const { data: todoList } = useQuery("todos", () => client.get("/todos"), {
          suspense: true,
        });

        return (
          <div>
            <section>
              <h2>Todo List</h2>
                {todoList?.data.map(({ id, title }) => (
                  <div key={id}>{title}</div>
                ))}
            </section>
          </div>
        );
      }
      ```

      - 주의사항

        - api 두개 이상을 호출하는 component의 경우 자칫하면 waterfall을 야기시킬 수 있으므로 컴포넌트 분리를 통해 이러한 문제를 미연에 방지한다.
        - Suspense를 쓴다고 무조건 모든상황에서 Loading Fallback이 적절히 노출되는 것은 아니다. 아무리 data fetching 시간이 짧아도 그 기간만큼은 fallback을 보여주기 때문이다. 이를 위해 fallback을 특정 시간후에 보여주도록 Wrapping 해야한다.

        ```ts
        const DeferredComponent = ({ children }: PropsWithChildren<{}>) => {
          const [isDeferred, setIsDeferred] = useState(false);


          useEffect(() => {
            // 200ms 지난 후 children Render
            const timeoutId = setTimeout(() => {
              setIsDeferred(true);
            }, 200);

            return () => clearTimeout(timeoutId);
          }, []);

          if (!isDeferred) {
            return null;
          }

          return <>{children}</>;
        };

        <Route exact path={ROUTE.CATEGORY_LIST}>
          <Suspense
            fallback={
              <DeferredComponent>
                <HomeSkeleton />
              </DeferredComponent>
            }
          >
            <CategoryList />
          </Suspense>
        </Route>
        ```
