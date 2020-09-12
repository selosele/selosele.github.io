---
layout: post
comments: true
title: "Typescript를 알게 되다"
summary: "최신 트렌드를 익히려는 노력을 더 해야겠음"
header:
  overlay_image: /assets/images/thumb/ts_thumb01.jpg
  overlay_filter: 0.4
date: 2020-06-06 21:09
categories:
    - 퍼블노트
tags:
    - javascript
    - typescript
---
커뮤니티 눈팅 중 Typescript라는 Javascript의 슈퍼셋 프로그래밍 언어를 알게 되어 설치 후 테스트까지 해보고 기록하고자 포스팅을 하게 되었다.

## 예제

Typescript 파일(예: script.ts)에서 다음과 같은 코드를 작성한다고 가정해보자.

{:.has-label}
```typescript
function getNum(a: number, b: number) {
    return a * b;
}

var num: number = getNum(3, "5");
console.log(num);
```
Typescript는 숫자(number)와 문자열(string) 타입을 선언하는 것이 가능하다. 따라서 저렇게 작성하면 에러를 뱉어줌.

Javascript 파일에서 저렇게 작성한다면 에러를 뱉지 않고 어떻게든 동작은 할 것이다. 테스트 결과 15가 출력되는 기적을 볼 수 있음....

따라서 Typescript 선에서 에러를 잡아내고 실수를 최소화하는 게 작업 효율을 높일 수 있다고 할 수 있다. 에러를 수정하고 컴파일한다면 다음과 같은 결과를 볼 수 있다.

## script.ts &rarr; script.js 컴파일

{:.has-label}
```javascript
function getNum(a, b) {
    return a * b;
}

var num = getNum(3, 5);
console.log(num);
```

참 쉽죠? 앞으로 틈틈히 익혀봐야겠음.