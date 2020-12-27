---
layout: post
comments: true
title: "Safari에서 line-height 값이 어긋나는 문제.."
subtitle: "vertical-align 속성값을 수치로 잡아야 함"
header:
    overlay_image: /assets/images/thumb/safari_thumb01.jpg
    overlay_filter: 0.4
    image_link: https://pixabay.com/ko/illustrations/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EC%9B%B9-www-%EC%BB%B4%ED%93%A8%ED%84%B0-773218/
    image_author: geralt
date: 2020-12-27 12:28
categories:
    - 퍼블노트
tags:
    - css
    - safari
post_dropcap: false
---

아이폰 Safari에서 테스트를 하던 중 행간이 어긋나는 상황을 만나게 되었다. 정확히는 ```line-height```{:language-css} 속성값이 적용되지 않은 듯한 문제다.

```html
<p>1</p>
```

```css
p {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #333;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
}
```

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="RwGjExB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="RwGjExB">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/RwGjExB">
  RwGjExB</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

문제는 아래와 같다.

![아이폰 Safari에서의 모습](/assets/images/post/safari-cross-browsing_img01.jpg)

Safari에서 행간이 맞지 않아 텍스트가 위에 붙어 있는 것처럼 보인다. 그래서 기존 스타일은 그대로 두고 가상요소로 중앙 정렬을 맞춰보려 했었다.

```css
p:before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
```

이 방법을 써도 똑같이 보인다.. 그래서 아래처럼 ```vertical-align``` 속성값을 수치로 잡아봤더니 해결됨.

{:data-line="5"}
```css
p:before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: -0.25em;
}
```