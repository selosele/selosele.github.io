---
layout: post
comments: true
title: "activeElement 속성으로 현재 활성화된 요소 찾기"
excerpt: ""
header:
  overlay_image: /assets/images/thumb/js_thumb02.jpg
  overlay_filter: 0.5
date: 2020-04-21 20:22
categories:
    - 퍼블노트
tags:
    - javascript
---
오늘 실무에서 접근성 관련으로 헤매다가 Javascript의 activeElement 속성을 이용해 문제를 해결하였음. 현재 활성화된 요소를 반환하는 속성인데, 이걸 이용해서 코드를 만든 게 아니라 내가 삽질을 하고 있었다는 게 드러난 것에 가깝지만..

특정 요소에서 초점이 빠져나가고 다음 요소에 초점이 잡혀야 하는 상황이었는데, 초점이 안 잡히는 줄 알고 이리저리 헤매다가 이 속성을 써보니 해당 요소에 잘만 잡히고 있었음을 보여줌.. 알고보니 모니터가 작아서(라기 보단 겁나 큰 팀장님 모니터에서 보니까 초점이 보임) 초점이 안 보였던 것......-_- 화면 전체에 꽉 찬 상태로 잡히는 초점인지라..

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="vYNyBZg" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="vYNyBZg">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/vYNyBZg">
  vYNyBZg</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>