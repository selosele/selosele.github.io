---
layout: post
comments: true
title: "sub-pixel rendering 이슈에 대응하는 최선의 방법은 무엇인가"
excerpt: "현재로서 완벽한 방법은 존재하지 않는다."
header:
  overlay_image: /assets/images/thumb/ie_thumb01.jpg
  overlay_filter: 0.3
  image_link: https://pixabay.com/ko/illustrations/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EC%9B%B9-www-%EC%BB%B4%ED%93%A8%ED%84%B0-773273/
  image_author: geralt
date: 2020-02-16 22:58
categories:
    - 퍼블노트
tags:
    - css
---
CSS에서 sub-pixel rendering 현상이란, 브라우저가 요소의 사이즈를 소수점 단위까지 렌더링하게 되어 결과적으로 요소가 흐려보이는 현상으로, webkit 계열 브라우저에서 발생한다. 예시로 요소를 중앙 정렬하는 방법 중 많이 사용되는 방법 중 하나로, ```position: absolute; top: 50%; left: 50%```{:.language-css} 및 ```transform: translate(-50%, -50%)```{:.language-css}를 선언했는데 요소의 너비/높이 중 하나라도 홀수이면 요소가 흐려져보이는 것.

대응책으로 디자인 시안과 어긋나더라도 짝수로 맞추거나 중앙 정렬이 가능한 다른 방법을 쓰는 쪽이 선호되는 추세이다. 개인적으로 IE 8까지도 어느 정도의 안전장치를 두고 작업해야 하므로 transform을 이용한 중앙 정렬은 하지 않는 편이다.

하지만 수 년이 지난 후에도 지금처럼 IE 8 대응을 하고 있을리가 없을 것이고, 보다 최신 기법이 유행할 것이라고 전망하여 장기적인 전략을 세우고자 &ldquo;transform 및 소수점을 사용하면서도 sub-pixel rendering 이슈를 피해갈 수 있는 방법&rdquo;을 고민해보았다. 무엇보다도 중앙 정렬에 transform이야말로 가장 유동적이며 합리적이라고 생각하기 때문이다. 근데 내가 해답을 찾기 전에 브라우저 제조사에서 bug fix를 하는 날이 더 빨리 찾아오거나, CSS4에서 깔끔한 방법을 내놓을 수도.....

각설하고, 실험을 해봅시다.

## 코드

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="qBdZmJb" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="qBdZmJb">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/qBdZmJb">
  qBdZmJb</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### 조건(양쪽 모두에 해당)

1. ```transform: translate(-50%, -50%)```{:.language-css}를 이용한 중앙 정렬 적용.
2. 중앙 정렬된 요소의 부모 사이즈는 홀수(수치도 동일).
3. 중앙 정렬된 요소의 사이즈는 홀수(수치도 동일).

첫 번째 코드는 sub-pixel rendering이 발생하지 않았고 두 번째는 발생하였다.

우선 양쪽 모두 중앙 정렬된 요소의 부모 사이즈는 203px, 203px이고, 자식은 201px, 201px이다. 이 조건에서 ```transform: translate(-50%, -50%)```{:.language-css}를 선언하면 201 / 2 = 100.5(소수점)만큼 위치하니 흐릿하게 보일 수 밖에. 그렇다면 0.5px만큼 이동해야 위치가 맞을 것이고 sub-pixel rendering 이슈 또한 발생하지 않을 것임. 첫 번째 코드에 해답(?)이 있다.

### 순서

1. ```top: calc(50% - 0.5px); left: calc(50% - 0.5px)```{:.language-css}, 즉 50%에서 0.5px을 뺀 값만큼 위치.
2. ```transform: translate(-50%, -50%) translate(0.5px, 0.5px)```{:.language-css}, 다시 0.5px만큼 이동. translate 값에 calc 함수를 사용하여 calc(-50% + 0.5px)로도 쓸 수 있지만, IE에서 지원하지 않으므로 풀어써주자.

참 쉽죠?

IE 9까지 커버된다. 근데 부모 요소의 사이즈가 짝수일 경우 통하지 않는 듯. 즉 부모, 자식 모두 홀수 사이즈일 경우 유효. 현재로선 첫 번째 코드가 최선인 듯하다.