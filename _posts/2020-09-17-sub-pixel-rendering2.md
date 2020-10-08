---
layout: post
comments: true
title: "sub-pixel rendering 이슈에 대응하는 최선의 방법은 무엇인가 2"
summary: "CSS로 이미지 크기를 줄였을 때"
header:
  overlay_image: /assets/images/thumb/chrome_thumb01.jpg
  overlay_filter: 0.5
  image_link: https://pixabay.com/ko/illustrations/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EC%9B%B9-www-%EC%BB%B4%ED%93%A8%ED%84%B0-773216/
  image_author: geralt
date: 2020-09-17 21:48
categories:
    - 퍼블노트
tags:
    - css
primary_post: true
---

[이전 글](/2020/02/16/sub-pixel-rendering/)에서는 ```transform```{:.language-css} 속성을 사용했을 때 이슈에 대응하는 방법을 떠들어보았고,  
이번에는 CSS로 img 요소/background-image의 크기를 줄였을 때 대응하는 최선의 방법은 무엇인가..에 대해 이야기해보려고 한다.

실무에서 반응형 분기점마다 이미지 크기를 CSS로 줄여야 하는 상황이 있었는데, 크기가 홀수 단위로 떨어지다보니 이미지가 심하게 흐려보여서, 결국 이미지를 분기점마다 대응할 수 있게 포토샵에서 다른 크기로 여러 장을 편집하기 직전까지 갔으나..

검색을 해보니 ```image-rendering```{:.language-css}라는 속성이 나와서 테스트 후 적용하였다.

## image-rendering 속성이란?

[명세](https://drafts.csswg.org/css-images-3/#the-image-rendering){:target="_blank"}에 의하면 해당 속성은 브라우저의 이미지 크기 변경 방식에 대한 힌트를 제공하는 속성이라고 설명되어 있으며 img 요소와 background-image에 적용된다.

명세와 [MDN](https://developer.mozilla.org/ko/docs/Web/CSS/image-rendering){:target="_blank"}을 보면 여러가지 속성값이 언급되어 있으나, 대부분 Deprecated 되었거나 크롬 브라우저에서 사용할 수 없는 것으로 보인다. 실질적으로 사용할 수 있는 것을 다음과 같이 추려보았음.

* auto
* pixelated
* crisp-edges

### image-rendering : auto

<div class="page__image-container" style="image-rendering: auto;">
{% include image.html url='/assets/images/post/sub-pixel-rendering2_img01.jpg' description='늘린 이미지' alt='' width='400' %}
{% include image.html url='/assets/images/post/sub-pixel-rendering2_img01.jpg' description='원본 이미지' alt='' %}
{% include image.html url='/assets/images/post/sub-pixel-rendering2_img01.jpg' description='줄인 이미지' alt='' width='165' %}
</div>

auto는 image-rendering 속성을 선언하지 않은 상태인, 즉 기본값이다. 줄인 이미지가 크롬 브라우저에서 흐릿하게 보이는 현상을 볼 수 있음.

### image-rendering : pixelated

<div class="page__image-container" style="image-rendering: auto; image-rendering: pixelated;">
{% include image.html url='/assets/images/post/sub-pixel-rendering2_img01.jpg' description='늘린 이미지' alt='' width='400' %}
{% include image.html url='/assets/images/post/sub-pixel-rendering2_img01.jpg' description='원본 이미지' alt='' %}
{% include image.html url='/assets/images/post/sub-pixel-rendering2_img01.jpg' description='줄인 이미지' alt='' width='165' %}
</div>

해당 속성값을 선언하면 이미지를 픽셀화된 상태(pixelated)로 렌더링한다. 말 그대로 픽셀화된 상태이므로 이미지가 점처럼 보인다. 흐리게 보이는 거 방지하겠다고 썼다간 오히려 더 깨져보일 수 있으므로 이 방법은 좀 아닌 것 같음..

### image-rendering : crisp-edges

<div class="page__image-container" style="image-rendering: auto; image-rendering: -webkit-optimize-contrast;">
{% include image.html url='/assets/images/post/sub-pixel-rendering2_img01.jpg' description='늘린 이미지' alt='' width='400' %}
{% include image.html url='/assets/images/post/sub-pixel-rendering2_img01.jpg' description='원본 이미지' alt='' %}
{% include image.html url='/assets/images/post/sub-pixel-rendering2_img01.jpg' description='줄인 이미지' alt='' width='165' %}
</div>

webkit 계열 브라우저에서 작동하려면 -webkit-optimize-contrast 라고 선언해주어야 한단다. 어차피 이미지가 흐려보이는 현상은 크롬 브라우저에서만 발생하니까 상관없다.

아무튼 해당 속성값은 이미지를 흐릿하지 않게 렌더링해준다. 명세나 기술 문서 등에 길고 어렵게(?) 설명되어 있어서 요약하자면 그렇다는 얘기다. auto를 제외한 두 가지 속성값을 테스트해본 결과 이 속성값이 제일 적절한 것으로 판단, 실무에 적용하였음.

{:.has-label}
```css
body {
  image-rendering: -webkit-optimize-contrast;
}
```

모든 이미지에 일일이 선언하려면 좀 번거로울 것이다. 상속을 받는 속성이므로 상위 요소에 한 번만 선언해주면 더 간편해질 것임.

{:.has-label}
```css
body :before,
body :after {
  image-rendering: -webkit-optimize-contrast;
}
```

그리고 가상요소로 넣은 background-image도 영향을 받을 수 있도록 하기 위해 위와 같이 작성해주는 것도 필수~

참고로 ```body:before```{:.language-css} 가 아니라 ```body :before```{:.language-css} 임...... body의 자손에 가상요소를 쓰겠다는 의미이니 잘못 읽지 말자...

## 참고 링크

* [the-image-rendering](https://drafts.csswg.org/css-images-3/#the-image-rendering){:target="_blank"} - drafts.csswg.org
* [image-rendering](https://developer.mozilla.org/ko/docs/Web/CSS/image-rendering){:target="_blank"} - MDN
* [image-rendering](https://docs.w3cub.com/css/image-rendering/){:target="_blank"} - docs.w3cub.com