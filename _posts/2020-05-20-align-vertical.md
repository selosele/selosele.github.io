---
layout: post
comments: true
title: "position: absolute 모든 방향을 이용한 중앙정렬 기법"
subtitle: "신기한 방법인듯"
header:
  overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.4
date: 2020-05-20 22:51
categories:
    - 퍼블노트
tags:
    - CSS
home_dropcap: false
post_dropcap: false
---

요소를 중앙정렬하는 기법 중 신기한 것을 발견하여 기록한다.

## 익숙했던 방법

```html
<div>
    <p>Paragraph</p>
</div>
```

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

그나저나 IE만 아니면 flex를...