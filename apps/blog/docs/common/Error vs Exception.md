# Error vs Exception

## 오류

- **개발자가 미리 예측이 불가능**.
- 시스템이 종료되어야할 수전의 상황과 같이 복구할 수 없는 심각한 문제들.
- ```js
  const str = 'You can not change this'
  str = 'but I want to change it'
  // const 의 값을 바꾸려했기때문에 Javascript 실행이 실패한다.
  // 오류를 직접 생성하지 않고 깨진 코드를 작성했기 때문에 Error다.
  ```
- Java에서는 `StacOverflowError`(깊은 재귀), `OutOfMemoryError`(JVM 메모리 부족)가 해당됨. => 개발자가 임의로 throw 할 수 없음

## 예외

- **개발자가 미리 예측하여 방지해야함**.
- 개발자가 구현한 로직에서 발생한 실수나 사용자의 영향에 의해 발생.
- 오류와 다르게 개발자가 임의로 예외를 던질 수 있다.
- ```js
  const input = 2000
  try {
    if (input > 1000) {
      throw new Error('Sorry, the value must be less than 1000')
    }
  } catch (e) {
    console.log(e.message)
  }
  //의도적으로 error를 throw 하고 handling 한다. 의도적인 부분은 Exception다.
  ```
- Java에서는 `NullPointerException`(객체가 필요한데 해당 객체가 없을경우), `IllegalArgumentException`(메서드가 허가되지 부적절한 argument를 받았을 경우)

Javascript에서는 Error와 Exception에 구분을 두지 않는다. 모든 것은 에러다
