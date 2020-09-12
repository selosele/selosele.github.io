---
layout: post
comments: true
title: "display: table을 파헤쳐보자"
summary: "table 요소만의 스타일을 사용할 수 있다."
header:
  overlay_image: /assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.3
date: 2020-01-09 21:21
categories:
    - 퍼블노트
tags:
    - css
    - table
---
CSS ```display: table```{:.language-css} 속성은 말 그대로 요소를 table의 성질을 갖게 한다는 뜻이다. 이 속성으로 무엇을 할 수 있는가에 십중팔구 가로/세로정렬을 이야기할 것이다. 여러 개의 아이템을 일정하게 정렬할 때 많이 사용되는 방법으로, 아이템을 감싸는 wrapper에 ```display: table```{:.language-css}과 너비를 잡아주고, 아이템에 ```display: table-cell```{:.language-css}을 선언하여 table의 td 요소처럼 퍼센트 너비값을 갖게 함과 동시에 가로정렬이 되게끔 한다. 거기다가 아이템에 ```vertical-align: middle```{:.language-css}을 선언하여 손쉬운 세로정렬을 할 수 있다. 그러나 꼭 정렬에만 국한된 방법은 아니다.

table의 성질을 갖게 되었으니 table 요소가 갖는 스타일을 입힐 수 있다는 점에 주목하자. 예를 들어 아이템들의 border가 겹쳐서 ```margin: -1px```{:.language-css} 등으로 조절하기보단 ```border-collapse: collapse```{:.language-css}로 border가 겹치지 않게 해줄 수 있다. 그리고 table-cell로 가로정렬된 아이템들의 너비가 제각각 다를 경우, wrapper에 ```table-layout: fixed```{:.language-css}로 아이템의 너비를 고정해준다. 또한 아이템들의 간격(예: 20px)을 띄우고자 할 때 ```border-spacing: 20px```{:.language-css}[^1]로 가능. 예제 코드를 봅시다.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="KKwovMX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="KKwovMX">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/KKwovMX">
  KKwovMX</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

무조건적으로 **display: table === 가로/세로정렬**로 생각하지 말자. 코딩을 주입식으로 외우면 위험함.. 조금 더 연구하고 검색하여 효율적인 스타일링을 해보자~

[^1]: [1] border-collapse: collapse 선언이 없는, 즉 border 간격 조정이 가능한 상태에서만 유효.
