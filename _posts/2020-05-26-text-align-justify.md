---
layout: post
comments: true
title: "text-align: justify 속성을 사용한 신기한 정렬 기법"
excerpt: "매우 신기~"
header:
  overlay_image: /assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.3
date: 2020-05-26 22:35
categories:
    - css
tags:
    - css
---
text를 정렬하는 방법(text-align)이라면 left, right, center 밖에 몰랐었는데, justify라는 속성을 알게 되어 기록함.

{:.has--label}
```html
<p>t e x t</p>
```
우선 ```text-align: justify```{:.language-css}는 text를 양쪽으로 정렬해주는 속성이다.

내가 하려는 건 한 글자씩 모두 양쪽으로 정렬하려는 것이고, 글자 사이에 공백이 있어야 적용됨.

{:.has--label}
```scss
p {
  max-width: 500px;
  text-align: justify;

  &:after {
    content: "";
    display: inline-block;
    width: 100%;
  }
}
```

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="result" data-user="selucky" data-slug-hash="ZEbZdEm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="ZEbZdEm">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/ZEbZdEm">
  ZEbZdEm</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

p 요소의 양쪽으로 글자들이 정렬된 것을 볼 수 있다.