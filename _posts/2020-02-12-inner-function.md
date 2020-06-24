---
layout: post
comments: true
title: "Javascript 외부 함수 밖에서 내부 함수 실행하기"
excerpt: "간단하지만 아직 충분히 이해되지 않았음"
header:
  overlay_image: /assets/images/thumb/js_thumb02.png
  overlay_filter: 0.3
date: 2020-02-12 00:46
categories:
    - javascript
tags:
    - javascript
---
다음과 같이 함수 내에 함수가 있는 경우, 외부 함수 밖에서 내부 함수를 실행하는 건 당연히 안됨. 그러나 방법이 있다는 걸 알았는데.. 핵심은 클로저이며, Javascript의 기초 중에 기초를 놓치고 있었다는 것도 깨달았다.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="GRJJPZZ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="GRJJPZZ">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/GRJJPZZ">
  GRJJPZZ</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<div class="cont-box type1 mt--normal">
  <ol class="bu-list--num type2">
    <li><em class="num">1</em>외부 함수 내에서 내부 함수를 반환.</li>
    <li><em class="num">2</em>외부 함수 밖에서 변수 생성 후 외부 함수를 저장.</li>
    <li><em class="num">3</em>저장된 함수 실행.</li>
  </ol>
</div>

완벽히 이해될 때까지 화이팅~