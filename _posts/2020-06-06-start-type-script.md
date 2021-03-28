---
layout: post
comments: true
title: "Typescript를 알게 되다"
subtitle: "최신 기술을 익히려는 노력을 더 해야겠음"
header:
  overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/ts_thumb01.jpg
  overlay_filter: 0.4
  image_position-y: 28%
date: 2020-06-06 21:09
categories:
    - 퍼블노트
tags:
    - javascript
    - typescript
---

커뮤니티 눈팅 중 Typescript라는 Javascript의 슈퍼셋 프로그래밍 언어를 알게 되어 설치 후 테스트까지 해보고 기록하고자 포스팅을 하게 되었다. 내용을 상시 업데이트하고 있어서 내용의 흐름이 살짝 안 맞을 수 있음.

## 기본 세팅

<mark>npm install -g typescript</mark> 명령어로 Typescript를 설치해준다. 그리고 연습용 폴더에 <mark>npm init</mark> 명령어로 package.json 파일을 생성해주고 아래와 같이 작성해준다.

```javascript
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "",
  "license": "ISC",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "tsc-watch --onSuccess \"node dist/index.js\" "
  }
}
```

그 후 <mark>npm install tsc-watch --save</mark>로 자동 컴파일에 필요한 tsc-watch를 설치, tsconfig.js 파일을 다음과 같이 작성해주기.

```javascript
{ 
  "compilerOptions": { 
    "target": "es5", 
    "module": "commonjs",
    "esModuleInterop": true,
    "sourceMap": false,
    "allowJs": true,
    "outDir": "dist",
  }, 
  "include": [
    "src/**/*"
  ],
  "exclude": [ 
      "node_modules" 
  ],
}
```

src 폴더는 ts 파일들이 모여 있는 곳이고 dist 폴더는 컴파일된 js 파일들이 올라가는 곳이다.

## 예제

Typescript 파일(예: script.ts)에서 다음과 같은 코드를 작성한다고 가정해보자.

{:data-line="4"}
```typescript
// test 1
const getNum = (a: number, b: number) => a * b;

const num: number = getNum(3, "5");
console.log(num);

// test 2
((arr) => {
    const numbers : Array<number> = arr; // 숫자형만 가지는 배열

    for (const number of numbers) {
        console.log(number);
    }
})([1, 2, 3]);
```

Typescript는 숫자(number)와 문자열(string) 타입을 선언하는 것이 가능해서 4번째 줄처럼 작성하면 에러를 뱉어줌. Javascript 파일에서 저렇게 작성한다면 에러를 뱉지 않고 어떻게든 작동은 할 것이다. 테스트 결과 15가 출력되는 기적을 볼 수 있음...

따라서 Typescript 선에서 에러를 잡아내고 실수를 최소화하는 게 작업 효율을 높일 수 있다고 할 수 있다. 에러 수정 후 <mark>tsc script.ts</mark> 명령어로 컴파일하면 다음과 같은 결과를 볼 수 있음(<mark>tsc -w</mark> 명령어로 저장할 때마다 자동 컴파일 가능).

## script.ts &rarr; script.js 컴파일

```javascript
// test 1
var getNum = function (a, b) { return a * b; };
var num = getNum(3, 6);
console.log(num);
// test 2
(function (arr) {
    var numbers = arr;
    for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
        var number = numbers_1[_i];
        console.log(number);
    }
})([1, 2, 3]);
```

참 쉽죠? 앞으로 틈틈히 익혀봐야겠다.

## Typescript + jQuery 사용하기

Typescript에서 jQuery를 사용하려고 ```$()```{:language-javascript}로 시작하는 것을 작성했다면 $를 찾을 수 없다고 뜰 것임. <mark>npm install --save @types/jquery</mark>로 관련 모듈을 설치해주면 jQuery를 사용할 수 있음.

```javascript
// ts 파일
$(() => {
    const foo : JQuery<HTMLElement> = $("div");
    console.log(foo);
});

// 컴파일 결과
$(function () {
    var foo = $("div");
    console.log(foo);
});
```

**참고**

- [How to watch and compile all TypeScript sources?](https://stackoverflow.com/questions/12799237/how-to-watch-and-compile-all-typescript-sources){:target="_blank"} - Stack Overflow
- [Downlevel Iteration for ES3/ES5 in TypeScript](https://mariusschulz.com/blog/downlevel-iteration-for-es3-es5-in-typescript){:target="_blank"} - Marius Schulz
- [tsconfig.json 컴파일 옵션 정리](https://geonlee.tistory.com/214){:target="_blank"} - 빠리의 택시 운전사
- [TypeScript tsc-watch 사용하기](https://bigstar-vlog.tistory.com/20){:target="_blank"} - 잡학다식 집합소
- [타입스크립트(TypeScript) 타입 선언](https://velog.io/@recordboy/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8TypeScript-%ED%83%80%EC%9E%85-%EC%84%A0%EC%96%B8){:target="_blank"} - 기록맨