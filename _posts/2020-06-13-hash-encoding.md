---
layout: post
comments: true
title: "URL hash값을 가져올 시 한글 깨지지 않게 하기"
excerpt: ""
header:
  overlay_image: /assets/images/thumb/js_thumb01.png
  overlay_filter: 0.3
date: 2020-06-13 00:58
categories:
    - javascript
tags:
    - javascript
---
블로그 Javascript 작업 중 URL의 hash값을 가져와서 뭔가를 처리해야 하는 상황이었는데, hash값을 console에 출력 시 영어는 잘 나오나 한글이 깨져서 나오는 현상이 발생, 기나긴 삽질과 검색이 동원된 끝에 방법을 알아냈다.

영어/한글 hash값이 포함된 URL로 비교를 해보자.

```javascript
"https://selosele.github.io/#test"

console.log(window.location.hash); // #test 
```

영어는 정상적으로 출력되는 반면

```javascript
"https://selosele.github.io/#테스트"

console.log(window.location.hash); // ""
```

따옴표나 #@$@#!$@!$#$ 등 알아볼 수 없는 문자로 출력되기도 한다.

## 해결책

정상적인 문자열로 되돌려주는 decodeURI 함수를 사용해야 한다.

```javascript
console.log(decodeURI(window.location.hash)); // 테스트
```