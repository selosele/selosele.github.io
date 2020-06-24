---
comments: true
title: "jQuery 동적으로 이벤트 바인딩하기"
excerpt: "삽질을 방지해주는 기법"
header:
  overlay_image: /assets/images/thumb/js_thumb02.png
  overlay_filter: 0.3
date: 2020-02-06 23:45
categories:
    - javascript
tags:
    - jquery
    - javascript
---
만약 버튼을 클릭하면 버튼이 생성되고, 생성된 버튼을 클릭 시 alert창이 뜨는 jQuery를 짠다면?

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="ZEGEvVG" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="ZEGEvVG">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/ZEGEvVG">
  ZEGEvVG</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<hr>

열에 아홉은 이런 코드를 짤 것으로, 작동하지 않음....

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="MWwWQQJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="MWwWQQJ">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/MWwWQQJ">
  MWwWQQJ</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<hr>

DOM &rarr; 이벤트 핸들러 &rarr; 타겟 &rarr; 함수 순서로 작성해주어야 작동한다.