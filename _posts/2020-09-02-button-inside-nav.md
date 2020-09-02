---
layout: post
comments: true
title: "nav 요소 내에 button 요소를 포함할 수 있는가?"
excerpt: ""
header:
  overlay_image: /assets/images/thumb/nav_thumb01.jpg
  overlay_filter: 0.5
  image_link: https://pixabay.com/ko/photos/%EC%86%90-%EB%82%98%EC%B9%A8%EB%B0%98-%EC%98%A4%EB%A6%AC-%EC%97%94%ED%85%8C%EC%9D%B4%EC%85%98-3585349/
  image_author: geralt
date: 2020-09-02 21:11
categories:
    - 퍼블노트
tags:
    - html
---

제곧내.. 일단 ```<nav>```{:.language-html} 요소는 현재 문서 내에서 또는 다른 문서에 대한 탐색 링크를 제공하는 section을 나타내는 요소이다[^1]. 탐색 링크인 a 요소 대신 button 요소만 가지고 있는 nav 요소가 있다고 가정해보자.

{:.has-label}
```html
<nav>
  <a href="/">사이트 타이틀</a>
  <button type="button">검색 열기</button>
  <button type="button">메뉴 열기</button>
</nav>
```

내 블로그 최상단 네비게이션 랜드마크의 HTML 구조를 예시로 들어보겠으며, 사이트 타이틀[^2], 검색/메뉴 열기 버튼으로 구성되어 있다.

사이트 타이틀은 사이트의 첫 화면으로 이동되는 링크라서 &ldquo;페이지의 탐색&rdquo;에는 의미가 없다고 본다. 그렇다면 사이트 타이틀은 제외하고, 버튼만 있는 nav 요소가 과연 semantic한가?

우선 검색 열기 버튼을 누르면 페이지 이동이 아닌 검색 기능을 제공하는 레이어팝업이 등장하므로(애시당초 검색 페이지로 이동이면 당연히 a 요소로 마크업했어야 함), semantic 측면에서 보면 nav 요소 내에 있을 이유가 없다. 그리고 메뉴 열기 버튼을 누르면 사이트의 탐색 링크 목록을 제공하는 nav 요소를 포함한 레이어가 등장한다. 그렇다면 버튼 클릭 &rarr; nav 요소 등장..이라는 구조를 봤을 때, 다른 의미에서 semantic하다고 볼 수 있을까?

## 나는 모른다. 하지만 semantic할 수도..?

nav 요소의 스펙이 궁금하면 각주 1번에 있는 링크에 가서 읽어보면 되고, 우선 의미론을 제외, 단순히 &ldquo;nav 요소 내에 button 요소를 포함할 수 있는가&rdquo;에 대한 정답은 yes이다. nav 요소는 모든 Flow content를 포함할 수 있고, button 요소는 Flow content로 분류되기 때문이다.

이제 중요한 것. 의미론적인 면에서 생각을 해보자. 페이지 이동이 아닌 기능을 제공하는 button 요소를 포함할 수 있는가? 

[^1]: [1] [w3.org](https://www.w3.org/TR/2011/WD-html5-20110405/sections.html#the-nav-element){:target="_blank"} 및 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav){:target="_blank"}

[^2]: [2] 사이트 타이틀은 흔히 ```<h1>```{:.language-html}으로 마크업되는 로고 같은 것. 나는 로고보단 사이트 타이틀이라고 불러야 의미에 맞고, h1으로 감싸져야 한다고 생각하지 않아서 저렇게 구성했을 뿐이니 신경쓰지 마셈..