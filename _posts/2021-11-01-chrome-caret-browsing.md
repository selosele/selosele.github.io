---
layout: post
comments: true
title: "Chrome 텍스트 클릭 시 깜빡이는 문제 해결"
header:
  overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/chrome_thumb01.jpg
  overlay_filter: 0.4
  image_link: https://pixabay.com/ko/illustrations/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EC%9B%B9-www-%EC%BB%B4%ED%93%A8%ED%84%B0-773216/
  image_author: geralt
date: 2021-11-01 23:37
categories:
    - 퍼블노트
tags:
    - CSS
---

Chrome 브라우저에서 텍스트를 클릭하면 깜빡이는 현상이 최근 언제부터인지 몰라도 갑자기 발생했던 것 같다. 개인적으로 불편해서 검색 후 해결하였고 방법을 풀어보겠다. 일단 문제 현상은 아래 이미지를 보면 알 수 있다.

![문제 현상](//cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/post/chrome-caret-browsing_img01.png)
*input 요소를 클릭한 것처럼 깜빡이는 현상이 나타난다.*

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RwZLXKm" data-user="selucky" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/RwZLXKm">
  Untitled</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

검색을 해보니 두 가지 방법을 찾을 수 있었는데,

1. [Chrome의 캐럿 브라우징을 미사용으로 설정하기](https://support.google.com/chrome/thread/78208145/line-shows-up-when-clicking-on-text?hl=en){:target="_blank"}
  * 요약 : F7키를 누르거나 Chrome 설정에 가서 캐럿 브라우징 미사용으로 설정하면 됨  
    ![](//cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/post/chrome-caret-browsing_img02.png)
    *Chrome 설정에 가서 캐럿 브라우징 미사용으로 설정하기*
2. [caret-color CSS 속성을 transparent 선언](https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color){:target="_blank"}

각자 편한 방법을 적용하면 될 것 같다. 실제 프로덕트에서는 사용자더러 F7키를 누르라고 할 수 없으니 CSS로 해결하는 방법이 나을 것 같음. 코드 예시를 들어보자면,

```css
body {
  caret-color: transparent;
}

input,
textarea {
  caret-color: auto;
}
```

전역에 적용되도록 상위 요소에 한번 선언해준 다음, 사용자 경험 측면에서 input / textarea 등 사용자의 입력을 받는 요소는 깜빡임이 표출되어야 하므로, 해당 요소들에 다시 초기화 선언을 해준다.