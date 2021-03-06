---
layout: post
comments: true
title: "first-letter 가상 요소에 대한 놀라운 사실 한 가지"
subtitle: "함정에 빠지기 쉽다."
header:
  overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/letter_thumb01.jpg
  overlay_filter: 0.4
date: 2020-02-17 22:07
categories:
    - 퍼블노트
tags:
    - CSS
---

CSS의 ```::first-letter```{:.language-css}는 텍스트의 첫 글자에 스타일을 줄 수 있는 가상 요소이다. 의외로 잘 알려지지 않은 속성으로, 첫 글자 스타일링은 대부분 span 등으로 감싸서 처리하는 방식이 사용되고 있어 별도의 추가 마크업이 필요없다는 점에서 추후 유지보수 시 편리하다고 볼 수 있다(폰트 크기, 색상 등 font 속성만 스타일링을 하고자 할 때로 국한된다. 이름에서 볼 수 있듯 font 계열 속성만 사용 가능). 모든 브라우저에서 호환되며 특히 IE 8까지도 지원된다는 점에서 크로스브라우징 이슈가 없다고 볼 수 있다.

는 중요한 점 하나를 간과했을 때의 이야기고..

## 코드를 봅시다.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="xxGVMKM" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="xxGVMKM">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/xxGVMKM">
  xxGVMKM</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

위와 같이 예쁘게(?) 첫 글자 스타일링을 해주었고 Chrome, IE, Opera 브라우저에서 문제 없으니 끝..  
이 아니고 Firefox 브라우저에서 이슈가 있다. 나님 블로그 CSS에 이런 방식을 즐겨 사용하다가 최근 이런 문제에 봉착하여 골머리를 앓는 중이었음.

위의 Codepen을 Firefox에서 확인해보면 알겠지만, 다음과 같이 ```::first-letter```{:.language-css}가 제대로 적용되지 않은 것을 볼 수 있다.

{% include image.html url='//cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/post/first-letter_img01.jpg' description='Firefox에서의 모습.' alt='' %}

개발자도구로 대다수는 ```::first-letter```{:.language-css} 부분만 살펴보겠지만 원인은 ```::before```{:.language-css} 가상 요소에 있다.

결론부터 말하면 의도한대로 적용되지 않은 것일뿐이지 정상적으로 적용 안 된게 아니다. 구글링 중 해답을 발견했는데, 역시 공식 명세에 해답이 있었다. 다음은 공식 명세 일부를 발췌한 것임.

> The ::before and ::after pseudo-elements can be used to describe generated content before or after an element&rsquo;s content. They are explained in CSS 2.1. When the ::first-letter and ::first-line pseudo-elements are applied to an element having content generated using ::before or ::after, they apply to the first letter or line of the element including the generated content.
> 
> <cite><a href="https://www.w3.org/TR/selectors-3/#gen-content" target="_blank">출처</a></cite>

::before 혹은 ::after에 의해 생성된 내용을 가지는 요소에 ::first-letter 가상 요소와 ::first-line 가상 요소가 적용 되는 경우, ::first-letter와 ::first-line은 각각 생성된 내부를 포함한 문자 혹은 행에 적용된다는 내용이다. 그래서 ::before를 ::after로 수정하니 해결됨.

MDN에도 관련 내용이 올라와 있어 발췌하였다.

> A combination of the ::before pseudo-element and the content property may inject some text at the beginning of the element. In that case, ::first-letter will match the first letter of this generated content.
> 
> <cite><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter" target="_blank">출처</a></cite>

::before 가상 요소와 content 속성을 함께 사용하면 ::first-letter는 생성 콘텐츠(generated content)의 첫 글자와 일치하게 된다고.. 결국 Firefox가 조금 더 엄격한 것일뿐이었다.