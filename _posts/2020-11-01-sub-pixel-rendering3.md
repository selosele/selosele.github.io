---
layout: post
comments: true
title: "sub-pixel rendering 이슈에 대응하는 최선의 방법은 무엇인가 3"
subtitle: "display: table 속성을 선언했을 때"
header:
  overlay_image: /assets/images/thumb/chrome_thumb01.jpg
  overlay_filter: 0.4
  image_link: https://pixabay.com/ko/illustrations/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EC%9B%B9-www-%EC%BB%B4%ED%93%A8%ED%84%B0-773216/
  image_author: geralt
date: 2020-11-01 21:25
categories:
    - 퍼블노트
tags:
    - css
primary_post: true
---

또 그놈의 소수점 때문에 골이 아픔..  
[이전 글](/2020/09/17/sub-pixel-rendering2/)에서는 img 요소/background-image의 크기를 CSS로 줄였을 때 이슈에 대응하는 방법에 대해서 떠들어보았고,  
이번에는 ```display: table```{:.language-css} 속성을 선언했을 때 생기는 문제를 이야기해볼 것이다.

## 배경

마크업과 CSS를 살펴보자.

{:.has-label}
```html
<div>
  <p>Lorem Ipsum</p>
</div>
```

{:.has-label}
{:data-line="7"}
```css
div {
  width: 46%;
  background-color: blue;
}

p {
  display: table;
  width: 100%;
  background-color: skyblue;
}
```

```div```{:.language-html} 요소는 46%만큼의 너비값을 선언했고, 자식 ```p```{:.language-html} 요소는 부모의 너비값을 상속, display 속성을 table 선언해주었다.  
아래 codepen을 보면 무엇이 문제인지 알 수 있음.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="BazxLxo" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="BazxLxo">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/BazxLxo">
  BazxLxo</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

개발자도구로 찍어보면 알겠지만,  
크롬 브라우저 모니터 해상도 1920px 기준으로 div 요소의 너비값은 837.75px, p 요소는 837px로 소수점이 무시된 채로 렌더링된 것을 볼 수 있다. 그 영향으로 div 요소의 background-color가 살짝 보이는 현상도 발생한다.

그러나 display: table 속성 선언을 삭제하면 소수점까지 정상적으로 잘만 렌더링이 된다.

---

검색을 해보니 해결책 같아 보이는 것들이 나오긴 했다.

## 해결책

우선 webkit 계열 브라우저는 display: table 속성을 가지는 요소의 너비값을 계산할 때 소수점을 무시한다고 한다.  
당연히 sub-pixel rendering과 관련이 있겠지만 왜 display: table 일때만 발생하는지에 대해서는 찾지 못했다.  
그래도 해결책(처럼 보이는 것들)은 찾을 수 있었다.

1. 자식 요소 너비값을 1px 만큼 더하기.
   * ```width: calc(100% + 1px)```로 잃어버린 공간을 되찾는다..라는 가장 떠올리기 쉬운 방법이다. 하지만 모니터 해상도에 따라 정상적으로 렌더링이 될때는 1px만큼 공간이 튀어나와 보이므로 적절한 해결책이 아니다.
2. 부모 요소에도 display: table 선언을 해주기.
   * 왜인지 모르겠으나 이렇게 하면 해결이 된 것처럼 보인다. 하지만 원래의 너비값인 837.5px에서 0.5px이 또 무시되었다..  
겉으로 봤을 땐 문제없어 보이지만 의도된 너비값대로 렌더링되지 않았으므로 문제 해결에 급급한 방식인 것 같음.

일단 적절한 방법을 계속 찾아볼 것임.

## 참고 링크

* [display: table div with percentage width 1px bug](https://stackoverflow.com/questions/31719624/displaytable-div-with-percentage-width-1px-bug){:target="_blank"} - stack overflow
* [Bug 140371](https://bugs.webkit.org/show_bug.cgi?id=140371){:target="_blank"} - WebKit Bugzilla