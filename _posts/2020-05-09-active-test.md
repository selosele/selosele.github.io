---
layout: post
comments: true
title: "초점이동 테스트를 위한 Javascript 연구"
subtitle:
header:
  overlay_image: /assets/images/thumb/js_thumb01.jpg
  overlay_filter: 0.4
  image_position-y: 57%
  image_link: https://pixabay.com/ko/photos/%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8-%EC%BD%94%EB%93%9C-4523100/
  image_author: Alltechbuzz
date: 2020-05-09 18:28
categories:
    - 퍼블노트
tags:
    - javascript
    - web-accessibility
---

실무에서나 블로그 작업에서나 Tab키에 의한 초점이동 테스트를 할 때,  
&ldquo;현재 초점이 잡힌 요소에 숫자가 떠서 몇 번째 요소에 초점이 잡혔는지 알 수 있으면 좋겠다&rdquo;라는 생각을 했는데, 코드를 만들어서 테스트해본 결과 대만족. 실무에서도 사용할 계획임.

## 기존에 만들었던 코드

```javascript
$("*").on("focus", function() {
  console.log(document.activeElement);
});
```
현재 초점이 잡힌 요소를 console에 띄우는 것밖에 없다.

## 새로 만든 코드

```javascript
var objActiveCount = 0
  , objTabbable = $("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])");

objTabbable.focus(function() {
  objActiveCount += 1;

  var objActivated = document.activeElement
    , objActiveNum = document.createElement("span");

  objActiveNum.classList.add("active-n");
  objActiveNum.innerHTML = objActiveCount;

  $(this).find(objActiveNum).length || $(this).append(objActiveNum);
  console.log(objActivated, objActiveCount);
});
```

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="xxwjKvx" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="xxwjKvx">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/xxwjKvx">
  xxwjKvx</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

200510, 코드를 개선해보았음.

```javascript
objActiveNum.style.cssText = "position: absolute; z-index: 99999; font-size: 5rem; font-weight: 700; color: #525252";
```

숫자(span 요소)에 미리 정의해둔 클래스(active-n)를 붙이지 않고 js에서 style을 주는 방식으로 바꾸어보았다. 개인적으로 더 나은 듯.