# React_practice

# React 입문주차 S.A.


<aside>
🐤 JavaScript의 자료형과 JavaScript만의 특성은 무엇일까 ?

</aside>
<details><summary> 느슨한 타입(loosely typed)의 동적(dynamic) 언어</summary>
### 타입
자료형을 의미하는 타입은 int, short, float, bool 등이 있다.
bool을 이용해 참거짓을 나타내는 자료를 만들고
float을 이용해 실수를 나타내는 자료를 만들 수 있다.
<br>
하지만 이것은 정적 언어(C,C++,C#,JAVA 등)에 해당되는 사항이다.
깐깐하게 체크하며 맞지않는 자료가 들어가면 화를 낸다.
<br>
JavaScript는 느슨한 타입(loosely typed)의 동적(dynamic) 언어이다.
한마디로 변수에 융통성이 있다. 변수의 자료형을 미리 선언하지 않아도 된다.
기본적으로 JavaScript의 변수는 특정 타입과 연결되지 않으며,
모든 타입의 값으로 할당 또는 재할당이 가능하다.

```js
let num = 5     // num의 자료형은 숫자
foo = 'five'    // num의 자료형이 문자로 자연스럽게 재할당 됨
foo = true      // num의 자료형이 불리언으로 재할당 됨

```


</details>
<details><summary> JavaScript 형변환</summary>

</details>
<details><summary> ==, ===</summary>

</details>
<details><summary> 느슨한 타입(loosely typed)의 동적(dynamic) 언어의 문제점은 무엇이고 보완할 수 있는 방법에는 무엇이 있을지 생각해보세요.</summary>

</details>
<details><summary> undefined와 null의 미세한 차이들을 비교해보세요.</summary>

</details>


<aside>
🐤 JavaScript 객체와 불변성이란 ?

</aside>

<details><summary> 기본형 데이터와 참조형 데이터</summary>

</details>
<details><summary> JavaScript 형변환</summary>

</details>
<details><summary> 불변 객체를 만드는 방법</summary>

</details>
<details><summary> 얕은 복사와 깊은 복사</summary>

</details>

<aside>
🐤 호이스팅과 TDZ는 무엇일까 ?

</aside>
<details><summary> 스코프, 호이스팅, TDZ</summary>

</details>
<details><summary> 함수 선언문과 함수 표현식에서 호이스팅 방식의 차이</summary>

</details>
<details><summary> 여러분이 많이 작성해온 let, const, var, function 이 어떤 원리로 실행되는지 알 수 있어요.</summary>

</details>
<details><summary> 실행 컨텍스트와 콜 스택</summary>

</details>
<details><summary> 스코프 체인, 변수 은닉화</summary>

</details>

<aside>
🐤 실습 과제

</aside>

- 콘솔에 찍힐 b 값을 예상해보고, 어디에서 선언된 “b”가 몇번째 라인에서 호출한 console.log에 찍혔는지, 왜 그런지 설명해보세요.
주석을 풀어보고 오류가 난다면 왜 오류가 나는 지 설명하고 오류를 수정해보세요.
    
    ```jsx
    let b = 1;
    
    function hi () {
    
    const a = 1;
    
    let b = 100;
    
    b++;
    
    console.log(a,b);
    
    }
    
    //console.log(a);
    
    console.log(b);
    
    hi();
    
    console.log(b);
    ```
    

```js
function makeAdder(x) {
    var y = 1;
    
    return function(z) {
    y = 100;
    return x + y + z;
    };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);
//클로저에 x와 y의 환경이 저장됨

console.log(add5(2)); // 107 (x:5 + y:100 + z:2)
console.log(add10(2)); // 112 (x:10 + y:100 + z:2)
//함수 실행 시 클로저에 저장된 x, y값에 접근하여 값을 계산