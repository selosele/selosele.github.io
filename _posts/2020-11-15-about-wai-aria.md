---
layout: post
comments: true
title: "WAI-ARIA에 대한 고찰 : 1탄"
subtitle: "aria-label과 aria-labelledby에 대해서"
header:
    overlay_image: /assets/images/thumb/accessibility_thumb01.jpg
    overlay_filter: 0.4
    image_position-y: 17%
    image_link: https://pixabay.com/ko/vectors/%EB%AF%B8%EB%94%94%EC%96%B4-%EB%93%A4%EC%96%B4-%EC%B0%B8%EC%A1%B0-%ED%86%A0%ED%81%AC-2288459/
    image_author: succo
date: 2020-11-15 15:22
categories:
    - 퍼블노트
tags:
    - html
    - WAI-ARIA
---

블로그 퍼블리싱을 진행/수정하면서 WAI-ARIA를 많이 사용했었는데, 일부 잘못 알고 있어서 틀리게 사용했었던 것들을 풀어보면서 나름의 고찰(?)을 해보려고 한다.

## aria-label은 텍스트 콘텐츠와 공존하지 않는다.

예시를 들어보겠음.

```html
<button type="button" aria-label="닫기">
    <span aria-hidden="true">X</span>
</button>
```

닫기 버튼에 대한 시각적인 텍스트를 <mark>aria-hidden</mark> 속성으로 접근성 API에서 노출 안되게 한다음, <mark>aria-label</mark> 속성으로 적절한 레이블을 제공했으니 문제 없을 거다..는 잘못된 생각이었다.

```html
<button type="button" aria-label="닫기">X</button>
```

올바른 마크업 예시로, aria-label은 요소의 텍스트 콘텐츠를 대체하므로 X 라는 텍스트 콘텐츠는 무시된다. 보조 기기에서 읽게되는 위 button 요소의 이름은 &ldquo;닫기 버튼&rdquo;이 된다.

---

또 하나, 내가 잘못 사용했었던 예시를 들어보겠음.

```html
<a href="">나님의 일상 카테고리 <span aria-label="포스트 개수">(10)</span></a>
```

보조 기기가 낭독할 때 &ldquo;나님의 일상 카테고리 포스트 개수&rdquo;로 읽어준다. 올바른 레이블을 제공하려면 다음과 같은 방법을 적용할 수 있다.

```html
<a href="">나님의 일상 카테고리 <span title="포스트 개수">(10)</span></a>

또는

<a href="">나님의 일상 카테고리 <span class="sr-only">포스트 개수</span>(10)</a>
```

title 속성이나 숨김 텍스트를 이용한 기법을 고려해볼 수 있겠다.

## heading 요소는 부모 section/article 요소를 자동으로 참조하지 않는다.

```html
<section>
    <h2>제목</h2>
    <p>내용</p>
</section>
```

위와 같은 마크업을 보조 기기가 읽을 때, &ldquo;제목 영역&rdquo;이라고 읽어줄 거라고 생각했었다.

section 요소에 <mark>role="region"</mark>, article 요소에는 <mark>role="article"</mark> 속성이 기본값으로 적용되어 있긴 하나, 그렇다고 해서 heading 요소가 부모 section/article 요소를 자동으로 참조하지는 않는다.

```html
<section aria-labelledby="title">
    <h2 id="title">제목</h2>
    <p>내용</p> <!-- 설명을 참조할 땐 aria-describedby 속성을 사용할 수 있으며, 나중에 다뤄보겠음. -->
</section>
```

<mark>aria-labelledby</mark> 속성으로 요소와 요소 간 연결을 해주어야 내가 바라던 결과가 나오게 된다. 스크린리더 NVDA 기준으로 웹페이지 상 랜드마크 영역으로 이동하는 D 키를 누르면, 쉽게 테스트해볼 수 있음.

```html
<section aria-labelledby="title">
    <h2 id="title">제목 1</h2>
    <h2>제목 2</h2>
    <h2>제목 3</h2>
</section>
```

해당 속성을 사용하면 좋은 예시 또 하나,  

브라우저가 접근 가능한 이름을 계산할 때, 가장 높은 우선 순위를 가지게 해주는 이점을 이용해서, 여러 제목이 존재할 때 사용해주면 보조 기기 사용자에게 좋은 퍼포먼스를 가져다 줄 수 있다.

### 참고 링크

* [WAI-ARIA 작성 방법 1.2 - aria-label](https://mulder21c.github.io/aria-practices/#naming_with_aria-label){:target="_blank"}
* [WAI-ARIA 작성 방법 1.2 - aria-labelledby](https://mulder21c.github.io/aria-practices/#naming_with_aria-labelledby){:target="_blank"}
* [Google Developers - ARIA 레이블과 관계](https://developers.google.com/web/fundamentals/accessibility/semantics-aria/aria-labels-and-relationships?hl=ko){:target="_blank"}