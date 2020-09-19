---
layout: post
comments: true
title: "input요소에 enter키 눌렀을 때 원치않는 submit 막기"
summary:
header:
  overlay_image: /assets/images/thumb/js_thumb01.jpg
  overlay_filter: 0.5
  image_position:
  image_link: https://pixabay.com/ko/photos/%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8-%EC%BD%94%EB%93%9C-4523100/
  image_author: Alltechbuzz
date: 2020-07-30 20:51
categories:
    - 퍼블노트
tags:
    - javascript
---

예를 들어 input요소에 값을 입력하고 enter키를 누르면 submit이 되는데, 값을 입력하지 않고도 enter키를 누르면 원치않는 submit이 되는 현상이 발생한다. 블로그 검색 input쪽 살펴보다가 놀라 자빠질뻔... Javascript로 이벤트를 무효화해주면 된다. form요소가 submit을 처리하므로 form요소에 이벤트를 바인딩해줘야 함

{:.has-label}
```html
<form>
  <input type="text" placeholder="검색어를 입력하세요">
</form>
```

{:.has-label}
```javascript
document.querySelector("form").addEventListener("keydown", (evt) => {
  if ((evt.keyCode || evt.which) === 13) evt.preventDefault();
});
```

keyCode, which는 점차 없어질 속성이라고 하니 다음과 같은 방식으로 작성해주자.

{:.has-label}
```javascript
if (evt.code === "Enter") evt.preventDefault();
```

code 속성은 IE에서 지원되지 않으므로 key 속성으로 대체할 수 있음.

inline Javascript로 작성할 수도 있다. 구조와 표현의 분리라는 측면에서 봤을 때 좋은 방법은 아니지만 그냥 이런 방법도 있다는 것임.

{:.has-label}
```html
<form onkeydown="return event.key != 'Enter';">
  <input type="text" placeholder="검색어를 입력하세요">
</form>
```

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="rNxEvBy" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="rNxEvBy">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/rNxEvBy">
  rNxEvBy</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>