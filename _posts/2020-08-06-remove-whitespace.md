---
layout: post
comments: true
title: "Vanilla JS로 inline 요소의 text node 제거하기"
summary:
header:
  overlay_image: /assets/images/thumb/js_thumb02.jpg
  overlay_filter: 0.5
  image_position-y: 37%
  image_link: https://www.freepik.com/free-vector/javascript-frameworks-concept-illustration_6183526.htm#page=1&query=javascript&position=0
  image_author: stories
date: 2020-08-06 23:56
categories:
    - 퍼블노트
tags:
    - javascript
post_dropcap: false
---

[몇 달전에도 작업한 바 있으나](/2020/02/19/white-space/) jQuery를 쓴 코드였고, 이번에는 Vanilla JS로 작업을 해보았다.

{:.has-label}
```html
<ul class="has-whitespace">
  <li>111</li>
  <li>222</li>
  <li>333</li>
  <li>444</li>
</ul>

<div class="has-whitespace">
  <input type="text">
  <input type="text">
  <input type="text">
</div>
```

{:.has-label}
```css
li {
  display: inline-block;
  background: skyblue;
}
```

{:.has-label}
```javascript
var removeWhitespace = function(parentElem) {
  if (!parentElem) return;
  
  for (var i = 0; i < parentElem.length; i++) {
    Array.prototype.slice.call(parentElem[i].childNodes).forEach(function(childElem) {
      if (childElem.nodeType === 3) parentElem[i].removeChild(childElem);
    });
  }
};
removeWhitespace(document.querySelectorAll(".has-whitespace"));
```

childNodes는 NodeList를 반환하고, NodeList는 유사배열이므로 배열로 바꾸어주려고 ```Array.from()```{:.language-javascript} 메서드를 사용했으나 ES6를 지원하지 않는 IE에서 작동하지 않아 ```Array.prototype.slice.call```{:.language-javascript} 메서드로 해결했음(내 블로그에 적용할 스크립트인데, 아직 ES6 &rarr; ES5 문법으로 변환하지 않는 환경이라서 ES5로 작업 중이고 아래 codepen에는 ES6 문법으로 작성함).

자식 요소의 nodeType이 text일 경우 해당 요소를 제거해준다. 간단해보이지만 아직도 좀 헷갈림.. 다 이해될 때까지 살펴보자..

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="wvGBaev" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="wvGBaev">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/wvGBaev">
  wvGBaev</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>