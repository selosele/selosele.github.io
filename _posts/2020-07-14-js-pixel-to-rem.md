---
layout: post
comments: true
title: "Javascript를 활용하여 pixel → rem 단위로 변환해보자"
subtitle: "넘나도 쉬운 방법인 것"
header:
  overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/js_thumb01.jpg
  overlay_filter: 0.4
  image_position-y: 57%
  image_link: https://pixabay.com/ko/photos/%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8-%EC%BD%94%EB%93%9C-4523100/
  image_author: Alltechbuzz
date: 2020-07-14 22:06
categories:
    - 퍼블노트
tags:
    - JavaScript
---

오늘 실무에서 이미지 요소의 높이값(pixel)을 rem 단위로 변환해서 선언해야 하는 상황이 있었다. 말 그대로 변환해서 선언해주면 되지 않느냐? 이미지마다 사이즈가 천차만별이라 일일이 선언해줄 수가 없어서 Javascript를 이용하는 방법을 검색, 적용하였음.

예제를 만들어보았다.

```html
<p id="foo">foo</p>
```

```css
html {
  font-size: 20px;
}

#foo {
  height: 100px;
  background: grey;
  box-sizing: border-box;
}
```

p 요소의 높이값을 rem 단위로 변환해볼 것이다.

```javascript
const pixelToRemUnit = (pixelUnit) => {
  return pixelUnit / parseFloat(getComputedStyle(document.documentElement).fontSize) + "rem";
}, elem = document.getElementById("foo");

elem.style.height = pixelToRemUnit(elem.offsetHeight);
```

매개변수로 받는 요소의 사이즈 나누기, html 요소의 font-size(+ 문자열을 실수로 변환 필수)으로 계산한 값에 rem 문자열을 더하여 최종적으로 rem 단위를 반환해준다. 참고로 위의 코드처럼 모든 페이지에서 호출할 수 있게 공통 함수로 만들어주는 게 좋음.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="RwrYrXb" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="RwrYrXb">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/RwrYrXb">
  RwrYrXb</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>