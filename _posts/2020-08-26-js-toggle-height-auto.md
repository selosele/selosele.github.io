---
layout: post
comments: true
title: "JS로 height: auto를 부드럽게 toggle하는 방법"
summary: "값이 있어야 한다는 점에 유의하자"
header:
  overlay_image: /assets/images/thumb/js_thumb02.jpg
  overlay_filter: 0.5
  image_position-y: 37%
  image_link: https://www.freepik.com/free-vector/javascript-frameworks-concept-illustration_6183526.htm#page=1&query=javascript&position=0
  image_author: stories
date: 2020-08-26 22:07
categories:
    - 퍼블노트
tags:
    - javascript
---

최근 실무에서 ```height: auto```{:.language-javascript}를 부드럽게 toggle하는 로직을 구현해야 하는 상황이 있었다. 퍼블리싱 요구사항을 듣고서 막연히 가능한 줄 알고 일반적인 방식으로 구현을 해보았으나 당연히 작동하지 않았다.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="eYZvXZM" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="eYZvXZM">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/eYZvXZM">
  eYZvXZM</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

특정한 값이 있어야 부드럽게 toggle이 되는 것이다.  
auto는 값이 없으므로 인식을 할 근거를 못 찾는 것임. 따라서 요소의 바깥으로 넘쳐서 보이지 않는 콘텐츠 포함 전체 높이를 반환하는 속성인 ```scrollHeight```{:.language-javascript}를 사용해서 해결하였다.

위의 codepen은 그냥 예시를 들려고 대충 짜본 것으로, 실제로 저렇게 구현하지 않았음.. 실무에선 jQuery로 작성했고 저기에다가는 공부용으로 vanilla JS로 쓴 것임~