---
layout: post
comments: true
title: "table 요소와 overflow의 공존은 불가능"
excerpt: "알고보면 정답은 쉬운 곳에 있다."
header:
  overlay_image: /assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.5
date: 2020-02-24 21:30
categories:
    - 퍼블노트
tags:
    - css
    - table
---
제목 그대로 table 요소와 overflow 속성의 공존은 불가능하다. 예시로 ```display: table/table-cell```{:.language-css} 등 너비값을 가진 table 요소에 overflow 속성을 선언하면 먹히지 않는 현상. 실무에서 이것 때문에 고생을 했는지라.. 열심히 구글링해서 찾아낸 해답은 의외로 간단했음.

## 우선 코드부터 봅시다.

{:.has--label}
```html
<ul>
  <li>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae neque necessitatibus sint quo autem, accusamus possimus fugit laudantium laboriosam nemo minus hic repudiandae voluptatibus quam cumque. Laudantium magni tenetur nemo?
  </li>
</ul>
```

{:.has--label}
```scss
ul {
  display: table;
  overflow: hidden;
  width: 200px;
  
  li {
    background: skyblue;
    list-style-type: none;
    white-space: nowrap;
  }
}
```
위 코드는 ```overflow: hidden```{:.language-css}이 먹히지 않는데, 동작하는 쪽으로 고쳐본 결과는 아래 코드와 같다.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="XWbppKP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="XWbppKP">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/XWbppKP">
  XWbppKP</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

---

```table-layout: fixed```{:.language-css} 선언으로 table 요소의 너비값을 고정시켜줘야 overflow 속성이 유효해지게 된다. 즉, overflow는 너비값을 가질 수 있는 block formatting context가 넘칠 때의 처리를 결정하는 속성이기 때문. MDN에 자세히 설명되어 있다.

> The overflow shorthand CSS property sets what to do when an element&apos;s content is too big to fit in its block formatting context.
> 
> overflow CSS 단축 속성은 요소의 콘텐츠가 너무 커서 요소의 블록 서식 맥락에 맞출 수 없을 때의 처리법을 지정합니다.
> 
> <cite><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/overflow" target="_blank" title="새창열림" class="bu-link2">원문</a> 및 <a href="https://developer.mozilla.org/ko/docs/Web/CSS/overflow" target="_blank" title="새창열림" class="bu-link2">번역</a></cite>

그렇다면 ```table-layout: fixed```{:.language-css}에 의해 절대(?) 고정 너비값을 가진 table 요소는 block formatting context인가? 아직은 모르겠으니 나중에 알아보기로 하였다가 순간 떠오른 것이, block formatting context는 너비/&ldquo;높이값&rdquo;을 가질 수 있다는 점이다. table 요소는 유동적이므로 고정 높이값이 의미가 없고 &ldquo;절대 고정&rdquo;시켜줄 수 있는 방법 또한 없음. 본문은 너비값만 다루고 있었던 것...... 함정에 빠지지 말자.

또 한 가지. table &gt; block 구조에서 overflow 속성을 table에 선언하지말고 block의 성질을 가진 자식 요소에게 너비값과 함께 선언해주면 될 것이다. 만약 부모 table의 너비값이 고정값인 상황에서 자식 block 요소에 너비값 100%를 선언하여도 부모의 너비값을 상속받을 수 없다. 그냥 자식 요소한테 고정 너비값을 선언하는 게 속 편한 일.