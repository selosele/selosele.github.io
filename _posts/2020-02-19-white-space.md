---
layout: post
comments: true
title: "Javascript를 이용하여 inline 요소의 공백 제거하기"
header:
  overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/js_thumb01.jpg
  overlay_filter: 0.4
  image_position-y: 57%
  image_link: https://pixabay.com/ko/photos/%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8-%EC%BD%94%EB%93%9C-4523100/
  image_author: Alltechbuzz
date: 2020-02-19 00:06
categories:
    - 퍼블노트
tags:
    - JavaScript
---

inline 요소가 가지는 자연스러운 공백을 제거하는 방법이라고 하면 대부분 inline 요소에 margin-left 음수값을 주거나,  
부모 요소에 ```font-size: 0```{:.language-css}, 태그 줄 바꿈 삭제 등의 방법이 주로 사용되고 있고, 이 방법들로 인해 발생하는 리스크는 고려되지 않은 채 받아들여지고 있는 현실이다.

inline 요소에 margin-left 음수값을 주는 방식은 font-family/font-size가 바뀔 때마다 공백의 크기도 달라지므로 적절한 방법이 아니며, 부모 요소에 ```font-size: 0```{:.language-css} 선언은 아무 부작용 없이 적용되어야 하는 부모 요소가 반드시 필요해지면서 마크업/CSS가 복잡해지며, 특히 상대적인 폰트 단위인 em 사용이 불가능해진다. 일단 margin-left 방식보다는 낫지만 예측 불가능한 변수가 도사리고 있다는 점에서 개인적으로 사용하지 않는 방법이다.

태그 줄 바꿈 삭제는 협업 프로세스에서 사용하기에 적절한 방법은 아니라고 본다.

## 그렇다면 적절한 방법은 무엇인가?

결국 Javascript를 이용하는 방법을 검색해보았다.

### 공백값을 구한 후, 값만큼 margin-left 음수값을 대입하는 방법

```html
<ul class="remvWS">
  <li>111</li>
  <li>222</li>
  <li>333</li>
</ul>
```

```scss
.remvWS {
  > li {
    display: inline-block;
    font-size: 16px;
    background: #fddbdb;
  }
}
```

```javascript
(function($, listObj) {
  listObj = $(listObj).nextAll();

    for (var i = -1; r = listObj[++i], l = listObj[++i];) {
        var n = l.getBoundingClientRect().left - r.getBoundingClientRect().right;
        r = l;
        listObj.css("margin-left", -n);
    }
})(jQuery, ".remvWS > *");
```

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="PoqzJzN" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="PoqzJzN">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/PoqzJzN">
  PoqzJzN</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

적용하려는 요소의 부모 요소에 특정 클래스를 부여하였으나, 일일이 클래스를 붙일 수는 없으니 display 속성이 inline/inline-block인 요소에 접근하는 방식이 옳을 것 같다는 생각이 뒤늦게 들었다.

그러나 &ldquo;공백&rdquo;을 제거해야지 간격 조절은 의미 없다고 갑자기 생각이 들어서.. 내가 만들어놓고도 별로 사용하고싶은 생각이 안 드는 방법이다. JS로 스타일을 건드리므로 지옥의 유지보수가 될 것이라는 점도..

### 정규표현식 활용하여 공백문자 제거

공백문자를 정규표현식으로 찾을 수 있을 거라는 생각이 갑자기 들었고, 열심히 구글링 중... margin-left 음수값을 이용하는 방법보다 합리적이라는 생각이 들어서 반드시 완성하겠다고 다짐을 했... 미루지 말자~

20/02/25, 어느 정도 만들었음.

- [참고 링크 1](https://stackoverflow.com/questions/27749507/removing-inline-block-whitespace-using-javascript-and-or-jquery){:target="_blank"}
- [참고 링크 2](http://jsfiddle.net/davidThomas/wygnD/3/){:target="_blank"}

```javascript
(function($, elem) {
  $(elem).contents().filter(function() {
    return (this.nodeType === 3 && !/\S/.test(this.nodeValue));
  }).remove();
})(jQuery, "*");
```

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="JjdRpEe" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="JjdRpEe">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/JjdRpEe">
  JjdRpEe</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

노드의 타입이 텍스트인 노드와 공백이 포함된 노드를 반환한다.  
결과적으로 태그 줄 바꿈 삭제 기법을 사용한 것과 다를 게 없지만, 분명히 다른 점이 있다.

로컬 HTML에서 태그 들여쓰기 준수해서 작업 후 함수 호출해주면 태그 줄 바꿈이 삭제되는 것이므로,  
유지보수 작업 시에는 HTML 긁어다가 prettify 해주는 사이트나 에디터별 정렬 기능 또는 확장 프로그램을 돌리면 그만인 것..

단점은 자식 요소로 순수 텍스트 노드가 들어가지 못한다. 더 좋은 방법을 찾아볼 것이지만 개인 블로그에 사용하기에는 괜찮은 것으로 판단되서 블로그 JS에 적용하였음.