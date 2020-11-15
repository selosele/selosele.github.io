---
layout: post
comments: true
title: "border: none과 border: 0의 차이"
subtitle: "분명한 차이가 있다."
header:
  overlay_image: /assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.5
date: 2020-02-29 12:50
categories:
    - 퍼블노트
tags:
    - css
---
reset CSS를 작성할 때 요소의 border를 없애려 사용하는 ```border: none```{:.language-css}/```border: 0```{:.language-css} 선언.  
언뜻 보면 똑같아 보이지만 확연한 차이가 있음을 알았음..

## 코드

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="XWbRvJP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="XWbRvJP">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/XWbRvJP">
  XWbRvJP</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

1. 모든 input 요소에 ```border: 2px solid #333```{:.language-css} 선언.
2. ```border: 0```{:.language-css}을 선언한 input에 ```border-style: dashed```{:.language-css}를 선언하면 통하지 않음.
3. ```border: none```{:.language-css}을 선언한 input에 ```border-style: dashed```{:.language-css}를 선언하면 통함.
4. border-style은 ```border: none```{:.language-css}보다 우선순위가 높아서 이런 현상이 발생.
5. border-style 다음에 ```border: none```{:.language-css}을 선언하면 캐스케이딩 원칙에 따라 후자가 적용됨.

---

* [참고 링크 1](https://stackoverflow.com/questions/2922909/should-i-use-border-none-or-border-0){:target="_blank"}
* [참고 링크 2](https://codepen.io/denilsonsa/pen/LkdHh?editors=110){:target="_blank"}
* [참고 링크 3](https://trend21c.tistory.com/287){:target="_blank"}