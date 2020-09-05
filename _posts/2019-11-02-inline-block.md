---
layout: post
comments: true
title: "CSS 수직 중앙 정렬, position은 안녕"
excerpt: "position을 이용한 중앙 정렬은 이득보다 손실이 크다."
header:
  overlay_image: /assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.5
date: 2019-11-02 22:12
categories:
    - 퍼블노트
tags:
    - align-vertically
    - inline-block
    - css
---
position을 이용한 중앙 정렬은 이득보다 손실이 크다. position 그 자체가 가진 특성과 더불어, margin 음수값을 사용 후 반응형에서 요소 사이즈가 변경되면 margin값도 조절해줘야 하고, ```transform:translate(-50%,-50%)```{:.language-css} 선언 시 너비/높이 중 하나라도 홀수이면 요소가 흐려지는 &ldquo;서브 픽셀 렌더링&rdquo; 이슈가 발생.

맹목적 position 신도가 아닌 이들이 사용하는 방법으로 vertical-align, line-height, table-cell 등의 방법이 있다. vertical-align은 기준이 될 요소가 있어야 하고 line-height는 텍스트가 한 줄 이상일 경우 사실상 사용 불가능이며, table-cell은 무난하나..

## 그렇다면 무엇이 효율적인 방법인가?
공부하다가 발견한 방법으로, 중앙 정렬하고자 하는 요소의 부모에게 가상의 높이를 주는 것임.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="LYYeOPx" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Used pseudo-class for vertical-align.">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/LYYeOPx">
  Used pseudo-class for vertical-align.</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

position이 가지는 특성으로 인한 손실이 발생하지 않고 기준이 될 요소도 없으며(기준이 될 가상의 요소라는 점에서 차이가 있고), line-height와는 비교도 되지 않음. table-cell과의 차이라면 padding의 영향을 받느냐 받지 않느냐.

단점으로 line-height와 마찬가지로 텍스트가 한 줄 이상일 경우 사용 불가능이지만, 폰트의 행간을 조절하는 것에 의미가 있는 line-height를 단순히 요소의 중앙 정렬에 사용하는 것은 의미에 맞지 않는다고 생각.

다만 ```display: flex```{:.language-css} 등 여러가지 방법이 더 있고, 본인 프로젝트의 크로스브라우징 범위를 고려하여 적절한 방법을 사용하길 바람~