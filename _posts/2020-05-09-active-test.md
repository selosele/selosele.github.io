---
layout: post
comments: true
title: "초점이동 테스트를 위한 Javascript 연구"
excerpt: ""
header:
  overlay_image: /assets/images/thumb/js_thumb02.png
  overlay_filter: 0.3
date: 2020-05-09 18:28
categories:
    - javascript
    - web-accessibility
tags:
    - javascript
    - web-accessibility
---
웹 접근성 작업은 만만치 않은 작업이다. 실무에서나 블로그 작업에서나 Tab키에 의한 초점이동 테스트를 할 때, &ldquo;현재 초점이 잡힌 요소에 숫자가 떠서 몇 번째 요소에 초점이 잡혔는지 알 수 있으면 좋겠다&rdquo;라는 생각을 하게 되었고, 코드를 만들어서 테스트해본 결과 대만족. 실무에서도 사용할 계획임.

## 기존에 만들었던 코드
```javascript
$(function() {

    $("*").on("focus", function() {
       console.log(document.activeElement);
    });

});
```
현재 초점이 잡힌 요소를 console에 띄우는 것밖에 없다.

## 새로 만든 코드
```javascript
$(function() {
    
    var objActiveCount = 0
      , objTabbable = $("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])");

    objTabbable.on("focus", function() {
        objActiveCount += 1;

        var objActivated = document.activeElement
          , objActiveNum = document.createElement("span");
        
        objActiveNum.className = "active-n";
        objActiveNum.innerHTML = objActiveCount;

        if ($(this).find(objActiveNum).length === 0) $(this).append(objActiveNum);
        console.log(objActivated, objActiveCount);
    });

});
```
초점이동 가능한 요소를 일일이 변수에 저장하지 않고, 그냥 모든 요소에 이벤트를 바인딩할 수도 있었지만 <code>button &gt; svg &gt; path</code> 구조의 마크업에서 svg와 path 요소도 초점이 잡히는 신기한 현상 때문에 저렇게 작성하였음.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="xxwjKvx" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="xxwjKvx">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/xxwjKvx">
  xxwjKvx</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

200510, 코드를 개선해보았음.

```javascript
objActiveNum.style.cssText = "position: absolute; z-index: 99999; font-size: 5rem; font-weight: 700; color: #525252";
```

숫자(span 요소)에 미리 정의해둔 클래스(active-n)를 붙이지 않고 js에서 style을 주는 방식으로 바꾸어보았다. 개인적으로 더 나은 듯.