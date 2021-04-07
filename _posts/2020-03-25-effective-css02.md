---
layout: post
comments: true
title: "더 효율적인 CSS 작성 연구 2"
subtitle: "기존의 습관화된 코딩 방식에서 탈피해야 한다."
header:
  overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.4
date: 2020-03-25 22:18
categories:
    - 퍼블노트
tags:
    - CSS
post_dropcap: false
---

이번에는 div &gt; a 구조에서 div에 검정 반투명 배경색을 깔아주기 위해 다음과 같이 CSS를 작성하였다.

```html
<div>
    <a href="#">anchor</a>
</div>
```

```scss
div {
  display: table;
  position: relative;
  z-index: 1;
  width: 100px;
  height: 100px;
  background: #ce5050;
  table-layout: fixed;

  a {
    display: table-cell;
    width: 100%;
    text-align: center;
    vertical-align: middle;
  }
}
```

## 익숙한 방식

```css
a:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.2);
}
```

너비/높이값을 100%로 잡아주는 익숙한 방식이다. 왜 before를 div가 아닌 a에 넣냐면 z-index를 한 번 더 선언해야 해서 복잡해지기 때문임.

## 더 효율적인 방법

```css
a:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: rgba(0,0,0,0.2);
}
```

굳이 너비/높이값까지 선언하지 않고 ```position: absolute```{:.language-css} 모든 방향을 0으로 잡아주어 가상의 영역을 만들어준다.

위의 모든 방법을 종합한 온라인 예제 코드를 만들어보았으니 비교해보자.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="YzXJomj" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="YzXJomj">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/YzXJomj">
  YzXJomj</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 마지막으로

다른 상황에서도 유용하게 사용할 수 있는데, anchor의 영역이 잡히지 않아 사용자 입장에서 클릭이 어려운 상황일 때, ```display: block```{:.language-css} 선언이나 너비/높이를 아무리 잡아주어도 안되면 이렇게 쓰면 된다. 애초에 영역이 잘 잡히게끔 마크업 및 스타일링을 해야 하겠으나 어쩔 수 없는 경우가 반드시 있는 법이다.

개인적으로 실무에서 table 속성 사용으로 인해 가끔 이런 문제가 발생한적이 있어서 위 방법으로 해결했음.