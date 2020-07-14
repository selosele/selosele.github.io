---
layout: post
comments: true
title: "Javascript를 활용하여 pixel &rarr; rem 단위로 변환해보자"
excerpt: "넘나도 쉬운 방법인 것"
header:
  overlay_image: /assets/images/thumb/js_thumb02.png
  overlay_filter: 0.5
date: 2020-07-14 22:06
categories:
    - javascript
tags:
    - javascript
---

오늘 실무에서 이미지 요소의 높이값(pixel)을 rem 단위로 변환해서 선언해야 하는 상황이 있었다. 말 그대로 변환해서 선언해주면 되지 않느냐? 이미지들마다 사이즈가 천차만별이라 일일이 선언해줄 수가 없어서 Javascript를 이용하는 방법을 검색, 적용하였음.

늘 그렇듯 잊지 않기 위해 코드를 기록해둔다.

```html
<p id="para">ㅇㅇ</p>
```

```css
html {
  font-size: 20px;
}

#para {
  height: 100px;
  background: grey;
}
```

p 요소의 높이값을 rem 단위로 변환해볼 것이다.

```javascript
function pixelToRemUnit(pixelUnit) {
  return pixelUnit / parseFloat(getComputedStyle(document.documentElement).fontSize) + "rem";
}

$("#para").css("height", pixelToRemUnit($("#para").height()));
```

매개변수로 받는 요소의 사이즈 나누기, html 요소의 font-size(+ 문자열을 실수로 변환 필수)으로 계산한 값에 rem 문자열을 더하여 최종적으로 rem 단위를 반환해준다.

참 쉽죠?

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="RwrYrXb" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="RwrYrXb">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/RwrYrXb">
  RwrYrXb</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>