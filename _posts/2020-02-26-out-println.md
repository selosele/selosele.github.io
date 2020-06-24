---
comments: true
title: "JSP) 기본 출력문 out.println"
excerpt: ""
header:
  overlay_image: /assets/images/thumb/default_thumb04.png
  overlay_filter: 0.3
date: 2020-02-26 21:14
categories:
    - jsp
tags:
    - jsp
---
Java에서 Javascript의 <code>document.write</code> 함수처럼 웹 페이지에 무엇인가를 출력해주는 메소드는 <code>out.println</code>이다. 착각하기 쉬운 <code>System.out.println</code>은 Eclipse 콘솔창에 출력을 해주는 메소드.

JSP 예제를 만들어보았음.

```jsp
<body>
  <% 
    String a = "제목"; // 문자열을 String 변수에 저장
    System.out.println(a); // Eclipse 콘솔창에 출력
    out.println(a); // 웹 페이지에 출력
  %>
  
  <h2><%= a %></h2> <!-- 변수값 대입 -->
</body>
```
<code><%= %></code> 구문을 활용하여 변수값을 대입할 수 있다.

```html
<!-- 결과 -->
제목
<h2>제목</h2>
```