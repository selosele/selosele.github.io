---
layout: post
comments: true
title: "position: absolute 모든 방향을 이용한 중앙정렬 기법"
excerpt: "신기한 방법인듯"
header:
  overlay_image: /assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.3
date: 2020-05-20 22:51
categories:
    - 퍼블노트
tags:
    - css
---
요소를 중앙정렬하는 기법 중 신기한 것을 발견하여 기록한다.

## 익숙했던 방법

{:.has--label}
```html
<div>
  <p>Paragraph</p>
</div>
```

{:.has--label}
```scss
p {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
```
흔히 사용되는 중앙정렬 기법이다.

## 새로 알게된 방법

{:.has--label}
```scss
div {
  position: relative;

  p {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
```
absolute의 모든 방향을 이용, 중앙에 맞춰주고 margin이 자동으로 계산되도록 해준다. 위의 transform 기법과 별 차이는 없어보이지만 언젠가 유용할 듯 싶어 기록함.

그나저나 IE만 아니면 flex를......

{:.has--label}
```css
p {
  backface-visibility: hidden;
}
```

만약 중앙정렬된 요소가 흐려보이는 현상이 발생하면 ```backface-visibility: hidden```{:.language-css} 선언으로 선명하게 보이도록 해준다. IE는 10까지 지원되고 Safari는 접두사를 붙여줘야 함.