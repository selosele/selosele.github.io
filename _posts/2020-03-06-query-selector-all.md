---
layout: post
comments: true
title: "querySelectorAll에 대해 제대로 알고 쓰자"
subtitle: "jQuery적 사고방식을 지양해야"
header:
  overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/js_thumb01.jpg
  overlay_filter: 0.4
  image_position-y: 56%
  image_link: https://pixabay.com/ko/photos/%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8-%EC%BD%94%EB%93%9C-4523100/
  image_author: Alltechbuzz
date: 2020-03-06 23:45
categories:
    - 퍼블노트
tags:
    - JavaScript
---

오늘도 간단한 Javascript를 가지고 열심히 삽질을 한 나님에게 쓰는 포스트임. 결론부터 말하면 제목이 곧 내용.  
매개변수를 이용해서 태그에 텍스트를 삽입하는 스크립트를 jQuery와 Vanilla JS로 짜보았는데..

```javascript
// jQuery
function myName(x) {
  return $("p").text(x);
}
myName("sel");
```

문제없이 작동하는 jQuery 코드.

Vanilla JS 코드를 아래와 같이 작성해봄.

```javascript
// Vanilla JS
function myName(x) {
  var para = document.querySelectorAll("p");
  para.innerHTML = x;
}
myName("sel");
```

안됨...

이게 왜 안되는지 며칠을 고민해봤는데도 답이 안나왔었음. 결국 이해하고서 작동하는 쪽으로 고쳐본 코드는 다음과 같고, jQuery/Vanilla JS 코드 구별을 위해 함수명/태그를 다르게 작성함.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="RwPLjXE" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="RwPLjXE">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/RwPLjXE">
  RwPLjXE</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

내가 해당 코드를 짜면서 했던 생각은, &ldquo;querySelectorAll은 선택한 요소와 일치하는 모든 NodeList를 반환하니까, jQuery에서 <code>$("p")</code>라고 쓰듯이 비슷하게 작성하면 될 것&rdquo;이었음.

이게 멍청한 생각이었음을 깨달은 것은 querySelectorAll이 선택한 요소를 배열로 가져온다는 점을 이해한 순간...

블로그 JS 대부분을 jQuery로 작업해왔고, jQuery적인 사고방식에 물들어 있던 나에게 이 쉬운 논리가 원활히 이해될리는 만무했을 것임. 의존적인 코딩 습관은 매우 위험한 것이다.

**참고 링크**

- [Document.querySelectorAll()](https://developer.mozilla.org/ko/docs/Web/API/Document/querySelectorAll){:target="_blank"} - MDN
- [NodeList](https://developer.mozilla.org/ko/docs/Web/API/NodeList){:target="_blank"} - MDN