---
layout: post
comments: true
title: "왜 IE에서 word-break: keep-all 미적용 문제가 발생하는가..."
subtitle: "해답은 어디에"
header:
  overlay_image: /assets/images/thumb/ie_thumb01.jpg
  overlay_filter: 0.4
  image_link: https://pixabay.com/ko/illustrations/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EC%9B%B9-www-%EC%BB%B4%ED%93%A8%ED%84%B0-773273/
  image_author: geralt
date: 2020-03-30 22:02
categories:
    - 퍼블노트
tags:
    - css
---

오늘 실무에서 엄청난 멘붕을 겪었는데, <mark>word-break: keep-all</mark> 선언이 IE 모든 버전에서 정상적으로 적용되지 않는 문제..  
검색을 해보니 <mark>word-break: break-all</mark> IE 미적용 관련 글을 쉽게 찾아볼 수 있었으나 keep-all 문제는 찾아볼 수 없었다(는 핑계고 그냥 검색능력 부족 탓인듯). 결국 선임에게 물어본 결과 그냥 break-all 쓰는 걸로..

대체 원인이 무엇일까? 버그라고 보기엔 IE 모든 버전을 지원하는 속성이므로 내가 애초부터 CSS를 잘못 작성했을 수도 있고.. 해답은 어디에 있단말인가......

## 코드

<script async src="//jsfiddle.net/dmitry762/psgk8hcf/12/embed/html,css,result/"></script>

해당 문제를 그대로 구현해보았다. codepen만 쓰다가 IE 테스트를 위해 오랜만에 JSfiddle로 작성하였음.

### 조건

* 3단 중첩 구조의 마크업. 위 코드는 div &gt; p &gt; span
* div는 <mark>display: table</mark> 속성 적용, p는 <mark>display: table-cell</mark>, span은 매우 긴 텍스트를 담고 있고, 두 줄까지만 보이게 스타일링을 해주었으며 <mark>word-break: keep-all</mark> 선언으로 단어 단위 줄 바꿈이 일어나게 하였음.

그리고 span에 inline-block 선언을 해주었으나 선임께서 너비를 정의해주거나 block 선언을 해야 한다고 알려주심..

## 결론
우선 IE에서 텍스트에 띄어쓰기를 넣을 경우 줄 바꿈이 발생하는데, 크롬에선 띄어쓰기 없이도 잘만 줄 바꿈된다. 그렇다고 띄어쓰기를 해결책으로 삼을 수는 없으니..

white-space 속성을 이용한 줄 바꿈 발생도 통하지 않는다. 다른 속성을 사용하는 걸로 타협을 했지만, 또 이런 상황에 처할 수 있기 때문에 반드시 짚고 넘어가야 하는 문제임은 틀림없다.

## 해결책 알아내다 [2020.10.06]

최근 실무에서도 같은 문제로 골이 아프던 중 방법을 알아냈다.

```css
span {
    word-break: keep-all;
    word-wrap: break-word;
}
```

<mark>word-wrap: break-word</mark> 속성으로 단어 단위 강제 줄 바꿈을 해주는 것이다. 주의할 점은 아래와 같음.

---

1. <mark>word-break</mark> 속성은 텍스트가 컨테이너를 넘칠 때 &ldquo;어떻게&rdquo; 줄 바꿈을 할지 결정하는 속성이고, <mark>word-wrap</mark> 속성은 마찬가지로 넘칠 때 &ldquo;단어 단위로&rdquo; 줄 바꿈을 해주는 속성이라는 점에서 차이가 있다.
2. 이 속성만 사용하는 게 아니라 <mark>word-break: keep-all</mark> 속성과 같이 써주는 것임. <mark>word-break: keep-all</mark>을 먼저 써주자.

```css
body {
    word-wrap: break-word;
}

/* word-break: keep-all 속성은 전역에 선언하지 않고 해당하는 요소에 선언하는 게 나은 것 같다. */
```

모든 요소에 일일이 선언하려면 복잡해지니 body 같은 요소에 한 번만 선언해줘서 상속을 받도록 하는 게 좋을 듯.