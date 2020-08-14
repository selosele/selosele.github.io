---
layout: post
comments: true
title: "display: inline-table을 이용한 가로정렬"
excerpt: "이런 속성도 있었다니!"
header:
  overlay_image: /assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.3
date: 2019-12-30 22:00
categories:
    - 퍼블노트
tags:
    - css
    - table
    - inline-table
---
CSS로 가로정렬하는 방법하면 떠오르는 것들 : float, inline-block 등등.. 그와중에 inline-table이라는 신기한 녀석을 발견하여 기록하고자 함. block 요소인 table을 말 그대로 inline 요소의 성질을 갖게 만듦. 예제 코드를 봅시다.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="vYEeEBJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="vYEeEBJ">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/vYEeEBJ">
  vYEeEBJ</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

예시로 table 요소(table 태그든 display를 table로 바꾸어준 것이든) 여러 개를 가로정렬할 필요가 있을 때, 또는 inline-block으로 해결되지 않을 때 사용하면 적당할 듯. table 요소를 inline의 성질을 갖게 만든다..라는 의미론에 집착하여 원칙적으로 table 요소의 가로정렬은 무조건 inline-table을 사용해야 한다는 건 절대 아니니 본인 상황에 맞게 사용하면 될 것임. IE 8까지 지원되는 것 또한 장점.

퇴출될 속성이 아닌 이상 반드시 쓸모가 있는 법이므로 잘 안 쓰이니까, 기존에 쓰던 게 편하니까 등의 이유로 외면하지 말자~