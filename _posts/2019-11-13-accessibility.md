---
comments: true
title: "우리가 무의식적으로 즐겨 쓰는, 접근성에 위배되는 코딩 방식들"
excerpt: "웹 접근성을 준수합시다."
header:
  overlay_image: /assets/images/thumb/accessibility_thumb01.png
  overlay_filter: 0.3
categories:
    - web-accessibility
tags:
    - web-accessibility
    - html
    - css
toc: true
toc_sticky: true
---
우리가 무의식적으로 즐겨 쓰는, 접근성에 위배되는 코딩 방식들이 있음. 매우 위험한 방식이니 반드시 짚고 넘어갑시다.

{:.h2}
## 클릭 영역 실종
결론부터 말하자면 클릭 영역은 display 속성과 너비/높이가 명시되어야 한다.. 클릭될 영역을 a태그로 감싸놨지만 정작 a태그의 영역은 잡아놓지 않는데, 마우스 커서를 올렸을 때 어디가 클릭 영역인지 알 수 없게 되고, 특히 IE에서 클릭 이벤트가 발생하지 않는다. 로고와 메인 비주얼 슬라이드에서 자주 발견되는듯.

또한 Tab키로 초점을 맞추었을 때 영역만큼만 초점이 잡히기 때문에, 초점이 잡히지 않거나 영역 사이즈를 잘못 잡아놓은 경우 초점이 그 사이즈만큼만 잡히게 되어 사용자 입장에서 혼돈을 불러일으키게 된다. 예제 코드를 보면 이해될 것임.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="css,result" data-user="selucky" data-slug-hash="eYYLXrV" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="eYYLXrV">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/eYYLXrV">
  eYYLXrV</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

{:.h2}
## font-size: 0
IR 기법으로서 자주 사용되는 속성인데, 예시로 로고를 background-image로 넣고 숨김 텍스트를 <code>font-size: 0</code>으로 처리. PC 스크린리더에서는 읽히지만 아이폰 전용 스크린리더인 보이스오버에서는 읽히지 않고 넘어간다.

또한 inline formatting context가 가지는 공백을 제거하기 위해 부모에 <code>font-size: 0</code>을 주고 다시 자식에 원래 font-size를 주는 경우. 일단 보이스오버에서 테스트 결과 읽히는 것으로 판단되지만 안전을 위해 가급적이면 사용하지 말자. 나는 margin 음수값을 사용하는데, <code>font-size: 16px</code> 기준으로 약 4px만큼의 여백이 생기니 <code>margin-left: -4px</code>을 주면 깔끔해짐. 솔직히 구글에 인라인블록 공백이라고 검색만 해도 여러가지 방법이 나오는데. 지금까지 써왔으니까, 편하니까 등등의 이유로 접근성을 위배하지맙시다~

근데 자바스크립트로 공백값을 구해서 margin-left에 값을 대입하는 함수를 만들면 되지 않을까 라는 생각이 2020년 2월 13일 뇌리를 스쳤다..... 솔직히 <code>font-size</code>가 줄어들 때마다 margin 음수값을 변경해줘야 하니 반응형 작업이 고될 것이기에, 반드시 이런 스크립트가 필요한 것이다. 연구해봐야겠음.

2020/02/19, <a href="/2020/02/19/white-space/" class="bu-link2">연구 시작~</a>