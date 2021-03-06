---
layout: post
comments: true
title: "난감한 텍스트 디자인.. 구현법을 알아내다"
subtitle: "의외로 쉬운 방법"
header:
  overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.4
date: 2019-12-09 21:17
categories:
    - 퍼블노트
tags:
    - CSS
post_dropcap: false
---

가끔 이런 텍스트 디자인을 봤을 것임.

{% include image.html url='//cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/post/heading-style_img01.jpg' description='딱 봤을 땐 뭐가 문제인지 모르겠으나.. 텍스트가 한 줄 이상이 된다면?' alt='' %}

{% include image.html url='//cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/post/heading-style_img02.jpg' description='이런 보기 싫은 광경이 펼쳐진다.' alt='' %}

어떻게 CSS를 줘야 할지 감이 잡히지 않는데, background-image를 높은 확률로 ```position: absolute```{:.language-css}, calc 등으로 잡아보지만 당연히 줄에 맞게 떨어질리가 없다. 구글링으로 얻은 몇 가지 방법을 소개하겠음.

## box-shadow를 이용한 방법

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="wvBXdgq" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="wvBXdgq">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/wvBXdgq">
  wvBXdgq</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

box-shadow를 inset 선언시 그림자가 요소 내부에 생기는 것을 이용한 방법.

기본적으로 block 요소는 줄에 맞게 안 떨어지는데, block 요소 &gt; span 구조를 짜고 span에 스타일을 줘야 정상적으로 보이는 것임. 그럼 block 요소를 inline으로 바꿔주면 되지 않느냐? 상하단 간격을 줄 수 없게 됨. 그렇다고 div &gt; block 요소 구조는 뭔가 어색한 것 같기도.. 어쨌든 block 요소 &gt; span 구조는 후술할 모든 방법에 해당된다.

텍스트가 한 줄 이상일 때 잘 된다! 근데 알다시피 box-shadow는 IE 9까지 지원하니..  
본인 프로젝트의 크로스브라우징 범위를 체크해서 IE 9 이상이면 써도 될 듯.

## linear-gradient를 이용한 방법

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="oNgyWZg" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="oNgyWZg">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/oNgyWZg">
  oNgyWZg</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

linear-gradient는 IE 10까지 지원한다. 그럼 IE 8에서도 문제 없는 방법이 있긴 한건가? 최후의 방법이 하나 남았다.

## background-repeat로 이미지를 반복시키는 방법

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="jOEWLqj" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="jOEWLqj">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/jOEWLqj">
  jOEWLqj</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

예를 들어 요소의 font-size가 24px라고 가정했을 때, 너비 1px, 높이 8px 정도의 이미지를 하나 만들어서 background-image로 삽입 &rarr; 적당한 background-position 잡아주기 &rarr; x축으로 반복시키기.

크로스브라우징 이슈 없는 깔끔한 방법이라고 할 수 있겠다.