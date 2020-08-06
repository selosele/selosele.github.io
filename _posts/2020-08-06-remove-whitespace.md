---
layout: post
comments: true
title: "순수 Javascript로 inline formatting context의 text node 제거하기"
excerpt: "포스트 작성 중"
header:
  overlay_image: /assets/images/thumb/js_thumb02.jpg
  overlay_filter: 0.5
  image_position:
date: 2020-08-06 23:56
categories:
    - 퍼블노트
tags:
    - javascript
---

[몇 달전에도 작업한 바 있으나](/2020/02/19/white-space/) jQuery를 쓴 코드였고, 이번에는 순수 Javascript로 작업을 해보았다.

{:.has--label}
```html
<ul class="has--whitespace">
  <li>111</li>
  <li>222</li>
  <li>333</li>
  <li>444</li>
</ul>

<div class="has--whitespace">
  <input type="text">
  <input type="text">
  <input type="text">
</div>
```

{:.has--label}
```css
li {
  display: inline-block;
  background: skyblue;
}
```

{:.has--label}
```javascript
var removeWhitespace = function(parentElem) {
  if (!parentElem) return;
  
  for (var i = 0; i < parentElem.length; i++) {
    Array.prototype.slice.call(parentElem[i].childNodes).forEach(function(childElem) {
      if (childElem.nodeType === 3) parentElem[i].removeChild(childElem);
    });
  }
};
removeWhitespace(document.querySelectorAll(".has--whitespace"));
```

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="wvGBaev" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="wvGBaev">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/wvGBaev">
  wvGBaev</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>