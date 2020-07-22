---
layout: post
comments: true
title: "더 효율적인 CSS 작성 연구 1"
excerpt: "기존의 습관화된 코딩 방식에서 탈피해야 한다."
header:
  overlay_image: /assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.3
date: 2020-03-18 22:08
categories:
    - css
tags:
    - css
---
기존의 많이 사용되는, 익숙한 방식에서 벗어난 더 효율적인 스타일링 연구를 시작하였다. 원래 더 좋은 방식을 쓸 수 있다는 것을 인지하지 못하는 상태인 경우가 대부분이고, 자신도 모르게 습관화된 코딩 방식을 개선할 필요가 있다고 본다. 나는 굉장히 쉬운 코드임에도 어렵게 작성하는 경우가 많았었는데, 차근차근 코딩 방식을 개선해나갈 것이다.

각설하고, 코드를 짜봅시다.

{:.has--label}
```html
<ul>
  <li>list</li>
  <li>list</li>
  <li>list</li>
</ul>
```

첫 번째 li를 제외한 li에 <code>margin-left</code>값을 줄 것이다.

## 익숙한 방식

{:.has--label}
```scss
li {
  margin-left: 40px;

  &:first-child {
    margin-left: 0;
  }
}
```

또는

{:.has--label}
```scss
li {
  &:not(:first-child) {
    margin-left: 40px;
  }
}
```
IE 8을 고려하지 않을 경우 not 선택자를 사용할 수도 있다.

## 더 효율적인 방법

{:.has--label}
```scss
li + li {
  margin-left: 40px;
}
```
인접선택자를 이용한 한 줄의 코드로 끝.

어차피 ul의 자식으로 li만 들어갈 수 있으니 상관없다. <code>ul, ol > li</code> 구조가 아닌 형태로 마크업해서 인접선택자를 사용하기 어렵다면 형제선택자를 쓰면 될 것임.