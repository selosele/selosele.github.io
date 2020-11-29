---
layout: post
comments: true
title: "br 요소를 남발하지 말자"
subtitle:
header:
    overlay_image: /assets/images/thumb/br_thumb01.jpg
    overlay_filter: 0.4
date: 2020-11-24 22:48
categories:
    - 퍼블노트
tags:
    - html
post_dropcap: false
---

줄바꿈을 위해 사용되는 ```<br>```{:language-html} 요소. 디자인을 맞추려고 br 요소를 알맞게 배치했다해서 다 된 게 아니다.. 웹 접근성 퍼포먼스 면에서 좋지 못하기 때문임. 이제야 알게 되서 자괴감(?)이..

```html
OO그룹<br>
since 2019. 10.<br>
Seoul<br>
Korea
```

적절한 사용 예시이다. 스크린리더에서 문장을 읽어 내려가다가 br 요소를 만나면 음성안내를 끊어주며, 사용자는 &darr; 키로 다음 문장으로 넘어갈 수 있다.

```html
오랜만의 연차날 오늘 나는 집에서<br> 뒹굴뒹굴하는 중이다.
```

스크린리더는 &ldquo;오랜만의 연차날 오늘 나는 집에서&rdquo;까지 읽어주고, 사용자는 당황하게 된다. 한 문장으로 읽혀야 될 게 이런식으로 끊어 읽히면 좋을리가 없다. 다음은 br 요소를 사용한 것 중 최악의 사례를 예시로 만들어보았다.

```html
사용<br>
안내
```

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="mdrbyaK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="mdrbyaK">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/mdrbyaK">
  mdrbyaK</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

&ldquo;사용안내&rdquo;는 무엇을 어떻게 사용하면 되는지 설명한 내용에 대한 label 역할을 하는 단락인데, &ldquo;사용&rdquo;까지만 읽히면 뭘 뜻하는지 어떻게 알 수 있을까?

## 대안

```html
사용<span class="br">안내</span>
```

```css
.br {
    display: block;
}
```

줄바꿈이 필요한 부분을 inline 요소로 감싸고 display: block으로 떨어뜨리는 게 나은 것 같다.  
디자인상 줄바꿈이 되어 있다고, 또는 너무 읽기 힘든 문장을 줄바꿈해주려고 br 요소를 사용하는 것은 조금 생각을 해봐야 될 일이다. 웹 접근성 마크 획득에 문제 없으니까 써도 된다는 건 좀 위험한 생각인듯싶다.

**참고 링크**

* [&lt;br&gt;: 줄바꿈 요소](https://developer.mozilla.org/ko/docs/Web/HTML/Element/br){:target="_blank"} - MDN
* [그룹화 관련 요소](https://seulbinim.github.io/WSA/grouping.html#p-%EC%9A%94%EC%86%8C){:target="_blank"} - 웹접근성과 웹표준