---
layout: post
comments: true
title: "실무 적용을 위한 jQuery 플러그인 제작에 도전하다"
summary:
header:
  overlay_image: /assets/images/thumb/jquery_thumb01.jpg
  overlay_filter: 0.4
  image_position-y: 29%
  image_link: https://pixabay.com/ko/photos/%EB%AA%A8%ED%98%95-%ED%83%80%EC%9D%B4%ED%94%84-%EB%9D%BC%EC%9D%B4%ED%84%B0-%EB%8B%A8%EC%96%B4-5281991/
  image_author: viarami
date: 2020-10-15 00:38
categories:
    - 퍼블노트
    - 개인 프로젝트
tags:
    - javascript
primary_post: true
---

실무에서 중복 사용되는 jQuery 코드를 통합해서 관리할 수 없을까 하는 생각을 하던 중 결국 플러그인을 만들어보기로 했고, 매일은 아니지만 시간날 때마다 작업을 하고 있다.

## 배경

다음과 같이 마크업되어 있다고 가정해보자.

{:.has-label}
```html
<a href="#gnb" class="hashToggle">주메뉴 열기</a>
<div id="gnb"></div>

<a href="#layer-popup" class="hashToggle">레이어팝업 열기</a>
<div id="layer-popup"></div>
```

각 a 요소를 클릭하면 href 속성값과 매칭되는 id값을 가진 요소를 toggle하는 JS를 작성해야 한다면?

{:.has-label}
{:data-line="4"}
```javascript
$(".hashToggle").on("click", function(event) {
  event.preventDefault();

  $(this.hash).toggle();
});
```

각 a 요소마다 일일이 JS를 작성하지 않고 ```hashToggle```{:.language-css}이라는 공통 클래스에 의해 제어된다.  
toggle만 할 거면 문제가 없으나, ```slideToggle```{:.language-javascript}, ```fadeToggle```{:.language-javascript} 등 여러 메소드를 사용해야 한다거나 이벤트가 발생할 때마다 특정한 로직이 들어가야 한다면?

그래서 플러그인을 만들어보기로 결심하고 작업을 시작하였다.  
타인의 것을 가져다 쓰기만 하다가 직접 만들어보려니 막막한 느낌도 든다.

## 머릿속에 담아둔 요구사항

나름 구상해본 요구사항(?)은 다음과 같다.

1. 모든 이벤트를 바인딩할 수 있어야 한다. <mark>click</mark>, <mark>mouseover</mark> 등
2. <mark>toggle</mark>, <mark>fadeToggle</mark> 등 모든 메소드를 사용할 수 있어야 한다.
3. 원하는 클래스를 toggle할 수 있어야 한다.
4. 원하는 element에 클래스를 toggle할 수 있어야 한다.
5. 이벤트 발생 시마다 원하는 로직을 넣을 수 있어야 한다.

확장성이 있어야 한다..로 요약할 수 있겠다.  
당연히 플러그인은 확장성이 있어야 한다. 확장성이 없으면 플러그인이 아니다.

## 샘플

어느정도 뼈대를 설계했고, 다음과 같은 방식으로 작동하게 만들었다.

{:.has-label}
```javascript
// 플러그인 옵션 기본값 세팅
var option = $.extend({
  event: "click",
  action: "toggle",
  duration: 300,
  animateStop: true,
  toggleClass: null,
  addClass: null,
  removeClass: null,
  afterEvent: null
}, options);
```

<mark>event</mark> 옵션은 바인딩할 이벤트를 설정한다. 기본값은 click으로 설정했는데,  
위에 예시로 든 코드를 봐도 알겠지만 대부분 click으로 뭔가를 toggle하는 경우가 많기 때문.  
어쨌든 해당 옵션은 모든 이벤트를 사용할 수 있다.

<mark>action</mark> 옵션은 나타나고 사라지는 메소드를 설정한다. toggle, show, hide, slideDown, fadeOut 등 모든 메소드를 사용할 수 있다.

<mark>duration</mark> 옵션은 말 그대로 지연시간을 설정한다. 예) ```slideDown(300)```{:.language-javascript}  
<mark>animateStop</mark> 옵션은 jQuery 메소드인 ```stop()```{:.language-javascript}을 걸어줄 수 있다.

<mark>toggleClass</mark>, <mark>addClass</mark>, <mark>removeClass</mark> 옵션은 jQuery의 그것과 같다. 예) ```toggleClass: "active"```{:language-javascript}  
클래스가 붙는 요소는 a 요소의 href 속성값과 매칭되는 id값을 가진 요소(이하 타겟요소)이다.

<mark>afterEvent</mark>는 바인딩한 이벤트에 대한 핸들러를 작성할 수 있는 콜백함수로, ```event```{:.language-javascript} 매개변수를 갖는다.  
아래 **afterEvent 옵션 구현이 매우 어렵다.** 부분에서 자세히 설명하겠음.

이제 플러그인 호출을 해볼 것이다.

{:.has-label}
```javascript
$(".foo").hashToggle({
  event: "mouseover mouseout",
  action: "fadeToggle",
  duration: 600,
  toggleClass: "active"
});
```

작동하는지 보려면 아래 codepen에 올려놓은 코드를 보면 된다.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="PozZZay" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="PozZZay">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/PozZZay">
  PozZZay</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## afterEvent 옵션 구현이 매우 어렵다.

그나저나 머릿속에 담아둔 요구사항 중 마지막 &ldquo;원하는 로직을 넣을 수 있어야 한다&rdquo;는 게 무슨 뜻이냐,  
위에 언급한 afterEvent 옵션 사용법은 다음과 같다.

{:.has-label}
```javascript
$(".foo").hashToggle({
  afterEvent: function() {
    $(this).attr("title", "확장됨"); // 예) 아코디언 ui의 웹 접근성 대응 코드
  }
});
```

&ldquo;이벤트 발생(예: click)&rdquo; &rarr; &ldquo;<mark>afterEvent</mark> 콜백함수에 작성한 핸들러 실행&rdquo; 순서로 작동한다.  
웹 접근성 대응이 필요할 경우 위와 같은 코드를 넣어야 하는데, 플러그인에서 해당 옵션을 제공하지 않는다면  
플러그인이 가지는 중요한 의미인 확장성이 아무 의미없게 된다.

또 중요한 것은, afterEvent 옵션에 작성한 핸들러도 toggle 되듯이 흘러가야 한다는 것임.  
로직 순서를 풀어보자면

1. 이벤트 발생 (예: mouseover)
2. 특정 콜백함수(예: <mark>afterFirstEvent</mark>)에 작성한 핸들러 실행
3. 다시 이벤트 발생 (예: mouseout)
4. 특정 콜백함수(예: <mark>afterLastEvent</mark>)에 작성한 핸들러 실행

이렇게 구현해야 하는데 어려워서 잘 풀리지 않고 있다..  
하루 아침에 되는 것도 아니고 계속 하다보면 될 것이라고 생각함..

---

일단 플러그인 파일명은 jQuery.hashToggle-1.0.js 라고 계획하였다.. 얼른 만들자..