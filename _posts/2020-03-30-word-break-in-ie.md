---
layout: post
comments: true
title: "왜 IE에서 word-break: keep-all 미적용 문제가 발생하는가..."
excerpt: "해답은 어디에"
header:
  overlay_image: /assets/images/thumb/ie_thumb01.png
  overlay_filter: 0.3
date: 2020-03-30 22:02
categories:
    - css
tags:
    - css
---
오늘 실무에서 엄청난 멘붕을 겪었는데, <code>word-break: keep-all</code> 선언이 IE 모든 버전에서 정상적으로 적용되지 않는 문제.. 검색을 해보니 <code>word-break: break-all</code>, <code>word-wrap: break-word</code> IE 미적용 관련 글을 쉽게 찾아볼 수 있었으나 <code>keep-all</code> 문제는 찾아볼 수 없었다. 결국 선임에게 물어본 결과 그냥 딴거(break-word/break-all) 쓰는 걸로..

대체 원인이 무엇일까? 버그라고 보기엔 IE 모든 버전을 지원하는 속성이므로 내가 애초부터 CSS를 잘못 작성했을 수도 있고.. 해답은 어디에 있단말인가.......

## 코드

<script async src="//jsfiddle.net/dmitry762/psgk8hcf/12/embed/html,css,result/"></script>

해당 문제를 그대로 구현해보았다. codepen만 쓰다가 IE 테스트를 위해 오랜만에 JSfiddle을 이용하여 작성하였음.

### 조건

<div class="cont-box type1">
  <ol class="bu-list--num type2">
    <li>
      <em class="num">1</em> 3단 중첩 구조의 마크업. 위 코드는 div &gt; p &gt; span
    </li>
    <li>
      <em class="num">2</em> div는 <code>display: table</code> 속성 적용, p는 <code>display: table-cell</code>, span은 매우 긴 텍스트를 담고 있고, 두 줄까지만 보이게 스타일링을 해주었으며 <code>word-break: keep-all</code> 선언으로 텍스트가 단어 단위로 떨어지게끔 하였음.
    </li>
  </ol>
</div>

왜 p에 <code>overflow: hidden</code> 선언을 안 했냐면 table 요소는 overflow 속성을 적용받지 않기 때문임. 그리고 span에 inline-block 선언을 해주었으나 선임께서 너비를 정의해주거나 block 선언을 해야 한다고 알려주심..

## 결론
우선 IE에서 텍스트에 띄어쓰기를 넣을 경우 줄바꿈이 발생하는데, 크롬에선 띄어쓰기 없이도 잘만 줄바꿈된다. 그렇다고 띄어쓰기를 해결책으로 삼을 수는 없으니..

<code>word-wrap</code>, <code>overflow-wrap</code> 속성이나 <code>white-space</code> 속성을 이용한 줄바꿈 발생도 통하지 않는다. 다른 속성을 사용하는 걸로 타협을 했지만, 또 이런 상황에 처할 수 있기 때문에 반드시 짚고 넘어가야 하는 문제임은 틀림없다.