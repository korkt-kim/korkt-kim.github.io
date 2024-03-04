# use server vs server only

- use server (React)
  - Server Action을 만들기 위한 선언.
    - Client Component가 `use server`파일 함수를 import 한다면 해당 함수 실행에 대하여 server에서 작동하도록 한다.
    - Server Action이란 server에서 실행되는 **asynchronous function**이다. Form Mutation등을 하기위해 Server, Client Component에서 사용될 수 있다.
- server only(Next)
  - Client component에서 실행하지 않으려고 제한을 두기위해 선언.
    - 만약 client component에서 `server-only` 파일 함수를 import 한다면 build time 에러가 발생한다.

## 정리

- `server-only`는 `use server`와 용도 자체가 다르다. `server-only`는 client side에서 import 자체는 막지만 `use server`는 client side에서 server를 이용해 함수를 실행시키기 위함이다.
- server action에 `use server` 대신 `server-only`를 사용할 수는 있지만, client component에서 server action을 실행할 일이 있다면 불필요한 선언이다.
