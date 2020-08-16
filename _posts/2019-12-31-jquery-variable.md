---
layout: post
comments: true
title: "Javascript 객체와 jQuery 객체를 구별하기 위한 변수 명명법"
excerpt: ""
header:
  overlay_image: /assets/images/thumb/js_thumb02.jpg
  overlay_filter: 0.5
  image_link: https://pixabay.com/ko/photos/%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8-%EC%BD%94%EB%93%9C-4523100/
  image_author: Alltechbuzz
date: 2019-12-31 20:13
categories:
    - 퍼블노트
tags:
    - javascript
---
Javascript/jQuery 객체가 구별되지 않은 변수명이란 다음과 같다.

{:.has--label}
```javascript
foo.addClass("on");
```
변수 선언부를 보기 전까지 어느 객체인지 알 수 없음.

{:.has--label}
```javascript
var foo = document.getElementById("foo");
var $foo = $("#foo");
```
DOM을 Javascript로 가져올 거면 별다른 식별자를 안 붙여도 된다고 생각하며 jQuery에 의해 컨트롤되는 객체임을 구별하고자 할 때, jQuery 전용 식별자인 $ 기호로 구별해주는 방법이 많이 사용된다.

최근 알게된 방법.