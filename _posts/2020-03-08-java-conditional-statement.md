---
comments: true
title: "JSP) 조건문"
excerpt: "크게 어렵지 않다."
header:
  overlay_image: /assets/images/thumb/default_thumb04.png
  overlay_filter: 0.3
date: 2020-03-08 20:16
categories:
    - jsp
tags:
    - jsp
---
오늘은 조건문에 대해서 공부하였는데, Javascript의 <code>if/else/else if</code>문과 크게 차이 없어서 금방 이해할 수 있었음.

```jsp
<body>
  <% int day = 8; %> <!-- 변수 선언 -->

  <% if (day == 8) { %> // 변수값이 8일 경우
    <p>오늘은 <span><%= day %></span>일</p>

  <% } else if (day == 9) { %> // 변수값이 9일 경우, 당연하지만 else if가 else보다 상위에 와야 한다.
    <p>오늘은 <span><%= day %></span>일</p>

  <% } else { %> // 변수값이 8이 아닐 경우
    <p>오늘은 <span><%= day %></span>일 아님</p>
  <% } %>
</body>
```
<a href="/2020/02/26/out-println/" class="bu-link2">지난 시간</a>에 공부한 변수값 대입 구문도 활용해주기.

```html
<!-- 결과 -->
<p>오늘은 <span>8</span>일</p>
```

저렇게 유동적으로 변하는 값이 들어가는 경우, 특정 태그(span, strong) 등으로 감싸는 게 좋아보인다. 실무에서 마크업하면서, 어떻게 개발이 입혀질지 헤아리지 못하고 안 감싸는 경우가 많았었는데, 이렇게 나 자신을 반성하게 되었음.....