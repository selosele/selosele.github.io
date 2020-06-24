---
layout: post
comments: true
title: "Javascript를 이용하여 inline 요소의 공백 제거하기"
excerpt: ""
header:
  overlay_image: /assets/images/thumb/js_thumb02.png
  overlay_filter: 0.3
date: 2020-02-19 00:06
categories:
    - javascript
tags:
    - javascript
    - jquery
---
inline formatting context가 가지는 자연스러운 공백을 제거하는 방법이라고 하면 대부분 <code>margin-left: -4px</code>, 부모 요소에 <code>font-size: 0</code>이나 태그 줄바꿈 삭제 등의 방법이 주로 사용되고 있고, 이 방법들로 인해 발생하는 리스크는 고려되지 않은 채 받아들여지고 있는 현실이다.

<code>margin-left: -4px</code>은 <code>font-family/font-size</code>가 바뀔 때마다 공백의 크기 또한 달라지므로 적절한 방법이 아니며, 부모 요소에 <code>font-size: 0</code> 선언은 아무 부작용 없이 적용되어야 하는 부모 요소가 반드시 필요해지고, 이 과정에서 마크업/CSS가 복잡해지며 특히 상대적인 폰트 단위인 em 사용이 불가능해진다. 일단 <code>margin-left: -4px</code>보다는 낫지만 예측 불가능한 변수가 도사리고 있다는 점에서 개인적으로 사용하지 않는 방법이다.

태그 줄바꿈 삭제는 협업 프로세스에서 사용하기에 적절한 방법은 아니라고 본다.

## 그렇다면 적절한 방법은 무엇인가?
결국 Javascript를 이용하는 방법 연구에 착수하였다.

### 공백값을 구한 후, 값만큼 <code>margin-left</code> 음수값을 대입하는 방법
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
function whiteSpaceMargin(listObj) {
    listObj = $(listObj).nextAll();
    for (var i = -1; r = listObj[++i], l = listObj[++i];) {
        var n = l.getBoundingClientRect().left - r.getBoundingClientRect().right;
        r = l;
        console.log(n);
        listObj.css("margin-left", -n);
    }
}
whiteSpaceMargin(".remvWS > *");
```

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="PoqzJzN" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="PoqzJzN">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/PoqzJzN">
  PoqzJzN</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<hr>

적용하고자 하는 요소의 부모 요소에 특정 클래스를 부여하였으나, 일일이 클래스를 붙일 수는 없으니 <code>display</code> 속성이 <code>inline/inline-block</code>인 요소에 접근하는 방식이 옳을 것 같다는 생각이 뒤늦게 들었다.

그러나 &ldquo;공백&rdquo;을 제거해야지 간격 조절은 의미 없다고 갑자기 생각이 들어서.. 내가 만들어놓고도 별로 사용하고싶은 생각이 안 드는 방법이다.

### 정규표현식 활용하여 공백문자 제거
공백문자를 정규표현식으로 찾을 수 있을 거라는 생각이 갑자기 들었고, 열심히 구글링 중... <code>margin-left</code> 음수값을 이용하는 방법보다 합리적이라는 생각이 들었는지라 반드시 완성하겠다고 다짐을 했... 미루지 말자~

20/02/25, 어느 정도 만들었음. <a href="https://stackoverflow.com/questions/27749507/removing-inline-block-whitespace-using-javascript-and-or-jquery" title="새창열림" target="_blank" class="bu-link2">참고 링크 1</a>, <a href="http://jsfiddle.net/davidThomas/wygnD/3/" title="새창열림" target="_blank" class="bu-link2">참고 링크 2</a>

```javascript
function removeWhiteSpace() {
  var except = $("button, span");
  $("*").not(except).contents().filter(function() {
    return (this.nodeType === 3 && !/\S/.test(this.nodeValue));
  }).remove();
  return this;
}
removeWhiteSpace();
```

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="js,result" data-user="selucky" data-slug-hash="JjdRpEe" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="JjdRpEe">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/JjdRpEe">
  JjdRpEe</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<hr>

노드의 타입이 텍스트인 노드와 공백이 포함된 노드를 반환한다. 모든 요소에 적용되지 않게 하고자 제외하고 싶은 요소를 필터링해주어야 하는데 막히고 있당