---
layout: post
comments: true
title: "순수 Javascript로 레이어팝업 초점이동을 구성해보자"
excerpt: ""
header:
  overlay_image: /assets/images/thumb/js_thumb02.jpg
  overlay_filter: 0.5
  image_position:
date: 2020-08-09 22:07
categories:
    - 퍼블노트
tags:
    - javascript
---

블로그 JS 작업 중 레이어팝업 초점이동 관련 코드를 구현했었는데, jQuery를 이용해서 구현을 완료했었다. 하지만 똑같은 문제를 순수 Javascript로 구성해본다면?

## 레이어팝업 내부에서만 초점이동이 돌게 하기

레이어팝업 내부 요소들 중 초점이동이 가능한 처음/마지막 요소에서 초점이동 시, 초점이 레이어팝업 밖으로 나가선 안되는 건 당연한 상식이다. 이를 jQuery로 구현한다면 비교적 수월(?)할 것임. 하지만 평소 순수 Javascript에 대한 학습이 부족했기 때문에 jQuery를 벗어나서 사고하는 게 상당히 어려웠고, 이대로는 안되겠다싶어서 코드를 한번 만들어보았다.

결과적으로 개인적인 만족감뿐만 아니라 약간의 vanila JS 사고력(?) 증가까지 이루었다고 생각한다. 그렇다고 자만하지는 말자...

{:.has--label}
```html
<div class="layer" id="layer">
  <div class="layer__inner-wrap">
    <a href="#">1</a>
    <span tabindex="0">2</span>
    <button type="button">3</button>
  </div>
</div>

<a href="#">outer element</a>
```

{:.has--label}
```javascript
var layer = document.getElementById("layer"),
    layerTabbable = layer.querySelectorAll("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
    layerTabbableFirst = layerTabbable[0],
    layerTabbableLast = layerTabbable[layerTabbable.length - 1],
    handleFirstKeydownEvent = function(evt) {
      if (evt.shiftKey && (evt.keyCode || evt.which) === 9) {
        evt.preventDefault();
        layerTabbableLast.focus();
      }
    },
    handleLastKeydownEvent = function(evt) {
      if (!evt.shiftKey && (evt.keyCode || evt.which) === 9) {
        evt.preventDefault();
        layerTabbableFirst.focus();
      }
    };

layerTabbableFirst.addEventListener("keydown", handleFirstKeydownEvent);
layerTabbableLast.addEventListener("keydown", handleLastKeydownEvent);
```

codepen에 올린 결과물로 테스트를 해보자.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="vYGOgZB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Tabbable element keyboard event pure JS">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/vYGOgZB">
  Tabbable element keyboard event pure JS</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

사실 이걸로 끝나선 안된다. 레이어팝업이 열리자마자 레이어팝업 또는 초점이동이 가능한 첫 번째 요소에 초점이동이 가야 하는 것과, 레이어팝업 바깥 요소들을 보조기기가 읽을 수 없게 처리를 해주는 것도 당연한 상식임을 잊지 말자.