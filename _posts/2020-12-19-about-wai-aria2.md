---
layout: post
comments: true
title: "WAI-ARIA에 대한 고찰 : 2탄"
subtitle: "aria-expanded와 role='presentation'에 대해서"
date: 2020-12-19 13:08
categories:
    - 퍼블노트
tags:
    - HTML
    - 웹 접근성
    - WAI-ARIA
post_dropcap: false
---

지난 [1탄](/2020/11/15/about-wai-aria/)에 이어서 이번에는 ```aria-expanded```{:.language-html} 속성과 ```role='presentation'```{:.language-html} 속성값에 대해 풀어볼 것이다.

## aria-expanded 속성으로 초기부터 축소된 상태임을 알려주어야 하는가?

코드로 풀어보자면

```html
<button type="button" id="btn" aria-controls="list" aria-expanded="false">목록 펼쳐보기</button>

<ul aria-labelledby="btn" id="list">
    <li>목록 item</li>
    <li>목록 item</li>
</ul>
```

위와 같이 목록을 toggle할 수 있는 목록 펼쳐보기 버튼을 제공할 경우, aria-expanded 속성의 초기값으로 false를 선언해서 목록이 축소된 상태임을 미리 알려주어야 하는가? 이게 궁금함.. 사용자 입장에선 목록을 펼쳐본 적이 없는데 축소된 상태라는 정보를 들어야 하는 상황이고, 작성자 입장에선 사용자가 목록이 toggle 가능한 상태임을 인식할 수 있게 코드를 작성한 것이다.

**축소된 상태임을 미리 제공하지 않은 경우**

1. 사용자가 목록을 펼쳐보려고 버튼을 눌러 &ldquo;목록 펼쳐보기 버튼 확장됨&rdquo;이라는 음성안내를 제공받아서 자연스럽게 목록으로 focus가 향한다.
2. 목록을 다 읽은 후 다시 버튼을 눌러 목록을 닫고, &ldquo;목록 펼쳐보기 버튼 축소됨&rdquo; 음성안내를 제공받는다.

**축소된 상태임을 미리 제공한 경우**

1. 사용자가 버튼에 접근 시, 축소된 상태임을 미리 안내받는다. 목록을 펼쳐본 적이 없는데 언제 축소가 됐다는 건지 혼란스러워한다.
2. 어쨌든 목록을 펼쳐보려는 게 목적이므로 버튼을 누른다.

---

계속 생각하다가 한 가지 중요한 것을 놓치고 있었음을 알았다.

```html
<button type="button" id="btn" aria-controls="list">목록</button>
```

button 요소의 텍스트 콘텐츠로 &ldquo;펼쳐보기/펼치기/열기&rdquo;와 같은 정보를 제공하지 않으면 사용자가 해당 버튼을 눌렀을 때 toggle 가능한 목록과 상호작용을 하는 상태임을 알 수 없는 것임. 따라서 선택지는 다음과 같다.

1. 사용자가 인지할 수 있는 정보를 button 요소의 텍스트 콘텐츠로 제공하면 초기부터 축소된 상태임을 알려주지 않아도 될 것이다.
2. 인지 가능한 텍스트 콘텐츠 정보를 제공하지 않은 경우, 초기부터 축소된 상태임을 인지할 수 있게끔 해준다.

## role='presentation' 속성값, 올바르게 적용해보자

사실 당연한 이야기지만 WAI-ARIA 사용 이전에 올바른 마크업이 먼저이고, ARIA는 최후의 대안으로 고려해야 한다. 그 중에서도 role 속성은 최후의 대안으로 선택하기 괜찮은 속성인데, ```role='presentation'```{:.language-html} 속성값을 사용했을 때 느꼈던 점을 풀어보려 한다.

다음과 같이 <mark>ul > li</mark> 구조에서 하나의 li 요소만 있다고 가정했을 때

```html
<ul>
    <li>list</li>
</ul>
```

ul/ol 요소는 목록, 즉 여러 개의 요소를 묶는 역할에 의미가 있는 요소이므로, 한 개뿐인 li는 목록의 의미가 있다고 볼 수 있을까?

아니라고 생각해서 ```role='presentation'```{:.language-html} 속성으로 li 요소가 가진 의미를 제거했는데,

```html
<ul>
    <li role="presentation">list</li>
</ul>
```

이 또한 올바른 ARIA 사용 예시라고 볼 수 있을까? 생각해보면 처음부터 <mark>ul > li</mark> 구조를 잡지 않는게 최선이나 개발 상의 이유로 해당 구조가 강제되는 경우가 있을 수 있다. 아무튼 위 마크업의 보조기기 음성안내 결과는 &ldquo;목록 항목수 1개&rdquo;이다. ul/ol 요소에는 기본값으로 <mark>role='list'</mark> 속성값이 적용되어 있고, 해당 속성값을 가진 요소의 자식 요소는 모두 목록으로 인식되기 때문이다.

목록의 의미를 원천적으로 제거하려면 ul과 li 모두 해당 속성값을 선언해야 한다. 근데 굳이 이렇게까지 구성할 필요는 없음.. 그렇다면 어떻게 올바르게 적용할 수 있을까? 아래 예시는 탭 UI의 마크업을 구성할 때 흔하게 사용되는 예시이다.

```html
<ul role="tablist">
    <li role="presentation">
        <button type="button" role="tab">tab01</button>
    </li>
    <li role="presentation">
        <button type="button" role="tab">tab02</button>
    </li>
</ul>
```

button 요소에 tab 역할을 부여하고, 사이에 있는 li 요소의 의미를 제거, 상위 ul 요소에 탭 목록을 묶어주는 컨테이너 역할을 부여하였다. 결론부터 말하면 사용자의 인식에는 문제가 없으나 명백히 잘못된 마크업이다. 목록의 의미를 원천적으로 제거했으므로 ul/ol의 의미가 없게 되었고, 애초에 목록을 ul/ol 요소로 구성해야 한다는 고정관념이 어디서부터 시작된 건지..

```html
<div role="tablist">
    <button type="button" role="tab">tab01</button>
    <button type="button" role="tab">tab02</button>
</div>
```

훨씬 깔끔한 마크업이라고 볼 수 있다.

### 참고 링크

- [aria-expanded state](https://w3c.github.io/aria/#aria-expanded){:target="_blank"} - Accessible Rich Internet Applications (WAI-ARIA) 1.2
- [presentation role](https://w3c.github.io/aria/#presentation){:target="_blank"} - Accessible Rich Internet Applications (WAI-ARIA) 1.2
- [확장 상태](https://github.com/lezhin/accessibility/blob/master/aria/README.md#aria-expanded){:target="_blank"} - 레진 WAI-ARIA 가이드라인
- [의미 없음](https://github.com/lezhin/accessibility/blob/master/aria/README.md#none){:target="_blank"} - 레진 WAI-ARIA 가이드라인
- [li](https://developer.mozilla.org/ko/docs/Web/HTML/Element/li){:target="_blank"} - MDN