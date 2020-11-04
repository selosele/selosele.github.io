---
layout: post
comments: true
title: "nav 요소 내에 button 요소를 포함할 수 있는가?"
summary:
header:
  overlay_image: /assets/images/thumb/html_thumb01.jpg
  overlay_filter: 0.4
  image_position-y: 57%
  image_link: https://pixabay.com/ko/illustrations/html5-html-%ED%8C%8C%EC%9D%BC-%ED%98%95%EC%8B%9D-386614/
  image_author: geralt
date: 2020-10-10 12:42
categories:
    - 퍼블노트
tags:
    - html
primary_post: true
---

제곧내..  
일단 명세에 의하면 ```<nav>```{:.language-html} 요소는 현재 문서 내에서 또는 다른 문서에 대한 탐색 링크를 제공하는 section을 나타내는 요소라고 설명되어 있다[^1]. 어느 날 갑자기 궁금해진 게, nav 요소 내에 button 요소를 포함할 수 있는가? 안된다면 button 요소로 제공해야 될 기능(예를 들어 주메뉴 열기 등)을 a 요소로 제공해야 하는가?

{:.has-label}
```html
<nav>
  <a href="/">사이트 타이틀</a>
  <button type="button">검색 열기</button>
  <button type="button">메뉴 열기</button>
</nav>
```

내 블로그 최상단 네비게이션 랜드마크의 HTML 구조를 예시로 들어보겠으며,  
사이트 타이틀[^2], 검색/메뉴 열기 button으로 구성되어 있다.

사이트 타이틀은 사이트의 첫 화면으로 이동되는 링크라서 &ldquo;페이지의 탐색&rdquo;에는 의미가 없다고 본다. 이제 button에 대해 살펴보자.

우선 검색 열기 button을 누르면 페이지 이동이 아닌 검색 기능을 제공하는 레이어팝업이 등장하므로(애시당초 검색 페이지로 이동이면 당연히 a 요소로 마크업했어야 함), semantic 측면에서 보면 nav 요소 내에 있을 이유가 없다. 그리고 메뉴 열기 button을 누르면 사이트의 탐색 링크 목록을 제공하는 nav 요소를 포함한 레이어가 등장한다. 그렇다면 button 클릭 &rarr; nav 요소 등장..이라는 구조를 봤을 때, 다른 의미에서 semantic하다고 볼 수 있을까?

## 결론

한 달간 찾아보고 얻은 해답을 적어본다.

> 의미론은 말 그대로 해당 요소가 전달하는 의미이고 이는 요소의 목적을 이야기하며,  
> nav 안에 어떤 요소가 있든 탐색 링크를 가진 섹션이라는 목적을 벗어나지 않으면 된다. 일단 nav 요소는 sectioning root 이기 때문에 heading을 가져야 하는데, 당신의 생각을 기준으로 하면 nav 요소는 a 요소들의 그룹이어야 하니 heading이 포함되면 안되는 것.
> 때문에 nav 안에 heading이 있어도 그 목적이 헤쳐지지 않음이고, nav 안에 button이 있다고 하더라도 그것이 네비게이션의 목적을 해치지 않는다면 있어도 무방하다.
> 
> <cite>커뮤니티에서 얻은 답변 요약</cite>

즉, 사용자는 nav 요소의 button 요소를 눌러서 사이트의 탐색 링크를 제공하는 네비게이션 랜드마크에 접근할 수 있게 되므로,  
본연의 목적대로 작동하는 것이다. 평소 semantic markup에 대해 나만의 생각대로 결론을 내린 적이 많은 것 같은데 이번 기회에 바로잡을 수 있게 되었다.

[^1]: [1] [공식 명세](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element){:target="_blank"}

[^2]: [2] 사이트 타이틀은 흔히 ```<h1>```{:.language-html}으로 마크업되는 로고 같은 것. 나는 로고보단 사이트 타이틀이라고 불러야 의미에 맞고, h1으로 감싸져야 한다고 생각하지 않아서 저렇게 구성했을 뿐이니 신경쓰지 마셈..