---
layout: post
comments: true
title: "CSS 모듈화의 중요성"
summary: "모듈화는 CSS 중복을 제거하고 클래스의 재사용성을 높이는 데 중점을 둔다."
header:
  overlay_image: /assets/images/thumb/css_thumb01.jpg
  overlay_filter: 0.5
date: 2019-10-30 22:12
categories:
    - 퍼블노트
tags:
    - cascading-rules
    - css
---
모듈화는 CSS 중복을 제거하고 클래스의 재사용성을 높이는 데 중점을 둔다. 레이아웃을 짤 때 다음과 같은 코드를 쓴다고 가정해봅시다.

{:.has-label}
```css
#header .layout { max-width: 1400px; margin: 0 auto; }
#section1 .layout { max-width: 1400px; margin: 0 auto; }
#section2 .layout { max-width: 1400px; margin: 0 auto; }
#footer .layout { max-width: 1400px; margin: 0 auto; }
```
보기만해도 반응형 작업과 추후 유지보수의 지옥길이 열린 것만 같은 느낌.

{:.has-label}
```css
.layout { max-width: 1400px; margin: 0 auto; }
```
위와 같은 방식으로 자주 사용되는 스타일을 클래스화, 공통 CSS 파일에서 관리한다.

{:.has-label}
```css
.mt20 { margin-top: 20px !important; }
.w20 { width: 20% !important; }
.w50 { width: 50% !important; }
.w100 { width: 100% !important; }
```
지나친 모듈화는 유지보수를 힘들게 한다. 값을 변경해야 할시 클래스를 사용한 모든 페이지에 들어가서 수정해줘야하는 지옥을 맛보게 된다. 나는 mt_standard 이런식으로 고유 이름을 붙여주는 방식을 사용하고 있음(실무말고 블로그 CSS). 근데 숫자 붙이는 방식이 틀렸다는 건 아니고, 뭐가 옳다 틀리다는 없다고 봄. 어쨌든 캐스케이딩 원칙에 맞게 스타일링을 하면 위와 같은 코드는 쓸 일이 없지만 가끔 꼭 필요한 때가 있는데,

* 한 페이지의 모든 제목태그 상하단 간격을 다르게 줘야 하는 경우
* 테이블에 왼쪽 정렬된 수십개의 일부 td를 중앙 정렬해야 하는 경우

등등..

{:.has-label}
```css
.clearfix:after { display: block; clear: both; content: "";}
```
가장 흔히 볼 수 있고 우리도 모르는 사이에 사용하고 있는 코드.

이런 모듈화에 익숙해지면 CSS 전처리기 <abbr title="syntactically awesome style sheets">SCSS</abbr>를 이용해 더 간편하게 작업할 수 있음.