---
layout: post
comments: true
title: "border: none과 border: 0의 차이"
excerpt: "분명한 차이가 있다."
header:
  overlay_image: /assets/images/thumb/css_thumb01.png
  overlay_filter: 0.3
date: 2020-02-29 12:50
categories:
    - css
tags:
    - css
    - cascading-rules
---
reset CSS를 작성할 때 요소의 border를 없애고자 사용하는 <code>border: none</code>/<code>border: 0</code> 선언. 언뜻 보면 똑같아 보이지만 확연한 차이가 있다는 것을 알았다. 결론부터 말하면 후자를 사용하는 게 좋음. 나는 무의식적으로 후자만 사용해왔어서 상관없지만 분명한 차이가 있음을 짚고 넘어가야 할 필요가 있다고 생각해서 포스트를 작성하게 되었음. 또한 무의식적인 코딩 습관을 고치는 것도 중요하다고 생각~~

## 코드

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="XWbRvJP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="XWbRvJP">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/XWbRvJP">
  XWbRvJP</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<hr>

<div class="cont-box type1">
  <ol class="bu-list--num type3">
    <li><em class="num">1</em>모든 input 요소에 <code>border: 2px solid #333</code> 선언.</li>
    <li><em class="num">2</em><code>border: 0</code>을 선언한 input에 <code>border-style: dashed</code>를 선언하면 통하지 않음.</li>
    <li><em class="num">3</em><code>border: none</code>을 선언한 input에 <code>border-style: dashed</code>를 선언하면 통함.</li>
    <li><em class="num">4</em><code>border-style</code>은 <code>border: none</code>보다 우선순위가 높아서 이런 현상이 발생.</li>
    <li><em class="num">5</em><code>border-style</code> 다음에 <code>border: none</code>을 선언하면 캐스케이딩 원칙에 따라 후자가 적용됨.</li>
  </ol>

  <hr>

  <ul>
    <li>
      <a href="https://stackoverflow.com/questions/2922909/should-i-use-border-none-or-border-0" target="_blank" title="새창열림" class="bu-link4">참고 링크 1</a>
    </li>
    <li>
      <a href="https://codepen.io/denilsonsa/pen/LkdHh?editors=110" target="_blank" title="새창열림" class="bu-link4">참고 링크 2</a>
    </li>
    <li>
      <a href="https://trend21c.tistory.com/287" target="_blank" title="새창열림" class="bu-link4">참고 링크 3</a>
    </li>
  </ul>
</div>