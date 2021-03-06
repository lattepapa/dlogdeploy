---
title: "비트연산자"
category: javascript
path: /javascript/mil19
date: 2021-01-15 23:10:18
---

비트연산자는 말그대로 주어진 데이터를 비트 단위로 쪼개어 연산하기 위한 도구이다. 크게 **&**, **|**, **^**, **~**, **<<**, **>>** 정도가 있다.

| 연산자 |       이름       |    의미     |
| :----: | :--------------: | :---------: |
|   &    |     엠퍼센트     |     AND     |
|   \|   |      파이프      |     OR      |
|   ^    |       캐럿       |     XOR     |
|   ~    |       틸드       |     NOT     |
|   <<   |  왼쪽 이중 앵글  |  왼쪽 이동  |
|   >>   | 오른쪽 이중 앵글 | 오른쪽 이동 |

<br />

예를 들어 정수 9가 주어졌을 때 7 << 1를 구하면 다음과 같다.

```
0000 0000 0000 0111 (7)
0000 0000 0000 1110 (7<<1)
```

<br />

왼쪽 이중 앵글 연산에 의해, 111$_{(2)}$의 각 자리에 있는 비트들이 왼쪽으로 1칸씩 이동하여 1110$_{(2)}$이 되었다. 즉, 7이 14가 되었다. 한편, 7 << 2을 구하면 다음과 같다.

```
0000 0000 0000 0111 (7)
0000 0000 0001 1100 (7<<2)
```

<br />

이번엔 111$_{(2)}$의 각 자리에 있는 비트들이 왼쪽으로 2칸씩 이동하여 11100$_{(2)}$이 되었다. 즉, 7은 28이 되었다. 만약, 7 << 3을 구하면 다음과 같다.

```
0000 0000 0000 0111 (7)
0000 0000 0011 1000 (7<<3)
```

<br />

주어진 111$_{(2)}$의 각 자리에 있는 비트들이 왼쪽으로 3칸씩 이동하여 111000$_{(2)}$, 즉, 56이 되었다. 여기서 심오한(?) 규칙을 발견할 수 있다. 왼쪽 이중 앵글에 의한 비트연산 $A$ << $n$은 그 결과값으로 $A * 2{^n}$을 배출한다는 것이다. 물론 자바스크립트 정수(INT) 자료형의 특성상, 주어진 정수 범위를 넘어서는 자릿수 이동은 허용되지 않으므로 정수형의 범위 끝까지 다다른 자료의 경우 이러한 이중 앵글 연산은 오히려 원본값보다 작아진 결과를 배출할 수도 있을 것이다.

<br />
<br />

#### 연습문제

주어진 배열의 항목들로 만들 수 있는 모든 부분집합들을 리턴해야 한다.

<span style="color:#088A68">**힌트** </span>

```
let arr = [1,2,3] 이 입력될 경우,
[[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]] 이 결과로 리턴되어야 함
```

<br>

#### Reference Code

```jsx{numberLines: true}
function subSets(arr) {
  let result = [];

  // 항목이 n개인 집합의 부분집합의 개수는 공집합을 제외하면 2^n - 1이다.
  for (let i = 1; i < 1 << arr.length; i++) {
    result.push([]);

    // 각 i번째 부분집합들마다, i & (1<<j) 의 결과가 0이 아닌 경우만을 찾는다.
    for (let j = 0; j < arr.length; j++) {
      if (i & (1 << j)) result[i - 1].push(arr[j]);
    }
  }

  return result;
}

subSets([1, 2, 3, 4]);
/* (15)
[
  [1],
  [2],
  [1, 2],
  [3],
  [1, 3],
  [2, 3],
  [1, 2, 3],
  [4],
  [1, 4],
  [2, 4],
  [1, 2, 4],
  [3, 4],
  [1, 3, 4],
  [2, 3, 4],
  [1, 2, 3, 4],
]
*/
```

<br />

5번째 줄 for 반복 루프의 조건을 살펴보자.  
$i$의 시작값이 1인 것과 $i$의 순회 범위가 $i < (1$ << arr.length $)$라는 것은, 반복 루프 작업을 통해 $1 * {2^{arr.length}} - 1$개의 항목들을 순회하겠다는 의미이다. 이러한 루프 조건을 설정한 이유는 항목의 개수가 $n$개인 어떠한 집합에 대해 공집합, 즉, []인 것을 제외한 부분집합의 개수는 ${2^n} - 1$이기 때문이다. 따라서 이러한 반복 횟수를 설정한 후, 매 $i$의 순회 때마다 미리 빈 배열들을 만들어 놓는다면 중첩 루프를 통해 그 빈 배열들마다 부분집합들을 삽입하기만 하면 된다.

10번째 줄을 보면, $i$ & ($1$ << $j$)이 **truthy**할 때만 $i-1$번째 부분집합에 arr[j]를 삽입할 수 있다는 내용을 볼 수 있다. $i$ & ($1$ << $j$)이 truthy인 경우와 falsy한 경우는 아래와 같이 구분할 수 있다.

```
예를들어 i=5, j=0이면

0000 0000 0000 0101 (5)
0000 0000 0000 0001 (1<<0)
--------------------------
0000 0000 0000 0001 (5 & (1<<0)) => truthy(즉, 0이 아님)
```

```
예를들어 i=5, j=1이면

0000 0000 0000 0101 (5)
0000 0000 0000 0010 (1<<1)
--------------------------
0000 0000 0000 0000 (5 & (1<<0)) => falsy
```

```
예를들어 i=5, j=2이면

0000 0000 0000 0101 (5)
0000 0000 0000 0100 (1<<2)
--------------------------
0000 0000 0000 0100 (5 & (1<<0)) => truthy(즉, 0이 아님)
```

```
예를들어 i=5, j>=3이면

0000 0000 0000 0101 (5)
???? ???? ???? ?000 (1<<j)
--------------------------
0000 0000 0000 0000 (5 & (1<<0)) => falsy
```

<br />

이러한 연산과정을 토대로 배열 [1,2,3]에 대해 위의 subSets 함수를 실행해보면 아래와 같은 과정을 거친다는 것을 확인할 수 있다.

![subsets](https://user-images.githubusercontent.com/67884699/105569757-cdd21f00-5d87-11eb-908c-7f29e6433f4e.jpg)
