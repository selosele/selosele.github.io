---
layout: post
comments: true
title: "Javascript 요소와 jQuery 요소를 구별하기 위한 변수 명명법"
subtitle:
header:
  overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/jquery_thumb01.jpg
  overlay_filter: 0.5
  image_position-y: 29%
  image_link: https://pixabay.com/ko/photos/%EB%AA%A8%ED%98%95-%ED%83%80%EC%9D%B4%ED%94%84-%EB%9D%BC%EC%9D%B4%ED%84%B0-%EB%8B%A8%EC%96%B4-5281991/
  image_author: viarami
date: 2019-12-31 20:13
categories:
    - 퍼블노트
tags:
    - JavaScript
post_dropcap: false
---

Javascript/jQuery 요소가 구별되지 않은 변수명이란 다음과 같다.

```javascript
console.log(foo);
```

변수 선언부를 보기 전까지 어느 요소인지 알 수 없음.

```javascript
var foo = document.getElementById("foo");
var $foo = $("#foo");
```

jQuery에 의해 컨트롤되는 요소임을 구별하고자 할 때, jQuery 전용 식별자인 ```$```{:.language-javascript} 기호로 구별해주는 방법이 많이 사용된다. 최근 알게된 방법.