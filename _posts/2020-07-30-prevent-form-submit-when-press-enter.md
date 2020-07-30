---
layout: post
comments: true
title: "input요소에 enter키 눌렀을 때 원치않는 submit 막기"
excerpt: ""
header:
  overlay_image: /assets/images/thumb/js_thumb02.jpg
  overlay_filter: 0.5
date: 2020-07-30 20:51
categories:
    - 퍼블노트
tags:
    - javascript
---

예를 들어 input요소에 값을 입력하고 enter키를 누르면 submit이 되는데, 값을 입력하지 않고도 enter키를 누르면 원치않는 submit이 되는 현상이 발생한다. 블로그 검색 input쪽 살펴보다가 놀라 자빠질뻔... Javascript로 이벤트를 무효화해주면 된다. form요소가 submit을 처리하므로 form요소에 이벤트를 바인딩해줘야 함

{:.has--label}
```html
<form action="post">
  <input type="text" placeholder="검색어를 입력하세요">
</form>
```
{:.has--label}
```javascript
document.querySelector("form").addEventListener("keydown", function(evt) {
  var keyType = evt.keyCode || evt.which;
  if (keyType === 13) evt.preventDefault();
});
```

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="rNxEvBy" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="rNxEvBy">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/rNxEvBy">
  rNxEvBy</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>