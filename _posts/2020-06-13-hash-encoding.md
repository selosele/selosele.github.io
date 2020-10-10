---
layout: post
comments: true
title: "URL hash값을 가져올 시 한글 깨지지 않게 하기"
summary:
header:
  overlay_image: /assets/images/thumb/js_thumb01.jpg
  overlay_filter: 0.5
  image_link: https://pixabay.com/ko/photos/%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8-%EC%BD%94%EB%93%9C-4523100/
  image_author: Alltechbuzz
date: 2020-06-13 00:58
categories:
    - 퍼블노트
tags:
    - javascript
---
블로그 Javascript 작업 중 URL의 hash값을 가져와서 뭔가를 처리해야 하는 상황이었는데,  
hash값을 console에 출력 시 영어는 잘 나오나 한글이 깨져서 나오는 현상이 발생, 기나긴 삽질과 검색이 동원된 끝에 방법을 알아냈다.

영어/한글 hash값이 포함된 URL로 비교를 해보자.

{:.has-label}
```javascript
"https://selosele.github.io/#test"

console.log(location.hash); // #test 
```

영어는 정상적으로 출력되는 반면

{:.has-label}
```javascript
"https://selosele.github.io/#테스트"

console.log(location.hash); // ""
```

따옴표나 #@$@#!$@!$#$ 등 알아볼 수 없는 문자로 출력되기도 한다.

## 해결책

정상적인 문자열로 되돌려주는 decodeURI 함수를 사용해야 한다.

{:.has-label}
```javascript
console.log(decodeURI(location.hash)); // 테스트
```