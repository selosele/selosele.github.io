---
layout: post
comments: true
title: "최근 학습과 일상에 대한 끄적끄적"
summary:
header:
  overlay_image: /assets/images/thumb/autumn_thumb01.jpg
  overlay_filter: 0.4
  image_position-y: 56%
  image_link: https://www.freepik.com/free-photo/cozy-autumn-still-life-with-cup-tea_10489106.htm
  image_author: pvproductions
date: 2020-10-09 13:02
categories:
    - 퍼블노트
    - 일상노트
tags:
    - javascript
---

가을이다.  
요즘은 기술학습 빈도가 좀 줄었지만 아예 손을 놓은 건 아니고 그냥저냥 생각날 때마다 진행하고 있음-_- 학습도 학습이지만 간만에 일상 이야기를 좀 써보려고 한다. 물론 그전에 습득한 걸 잊지 않기 위한 기록부터 하고...

## if (array.length > 0)와 if (array.length)은 반환 결과가 같다.

우선 예제를 만들어보았다.

{:.has-label}
```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

{:.has-label}
```javascript
const el = document.querySelectorAll("li");

if (el.length > 0) console.log(true) // true
if (el.length) console.log(true) // true
```

애초에 배열의 길이는 0부터 시작하므로 &ldquo;0보다 클 경우&rdquo;라는 조건은 의미가 없다.  
나는 막연히 0보다 클 경우라는 조건을 작성해왔었는데, (내 관점에서) 더 간결하고 읽기 쉬운 코드를 알게 되었다.

물론 두 조건 모두 반환 결과는 동일하고, 코드의 가독성에 차이가 있을 뿐이라서 어느 방식이 무조건 옳다고 할 수 없다.

### 참고 링크

* [Array.length](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/length){:target="_blank"} - MDN
* [array.length vs. array.length > 0](https://stackoverflow.com/questions/32911424/array-length-vs-array-length-0){:target="_blank"} - Stack Overflow

---

## 요즘 일상

두 달째 파견 근무를 나와 있는데, 할 얘기가 많다-_-  
파견 간다고 하니깐 새로운 환경에 대한 막연한 기대감부터 가졌었고, 매우 설렌 상태로 파견지에 도착했다. 다음 날 대가를 톡톡히 치루었는데, 갑작스런 심한 급체로 병가를 내버렸음...

새로운 환경을 마주하면 적응하느라 긴장부터 하는 습관이 있다는 것을 깨달았다. 불필요한 긴장감이나 예민함은 건강문제로 이어질 수 있으니 조심하자... 현 회사 입사하자마자 다음날 급체 + 야근으로 받았던 스트레스를 생각하면...후... 그러고보니 며칠 있으면 입사 1년이 되는데 데자뷰인가 싶기도...

---

본사가 너무 그립다.  
보안 프로젝트라 이것저것 제약당하는 게 많고 완전체 클라이언트란 무엇인가를 몸소 체험하고 있으며, 무엇보다 주변에 혼밥을 할 곳이 별로 없다... 본사 주변은 혼밥러를 위한 천국(?)이 많았던 것 같음.

정말로 만족하고 있는 장점이라면 더 가까워진 출퇴근 시간. 10분 차이지만 환승 없이 다이렉트로 가니깐 너무 편함ㅋ  
이야기는 더 많지만 여기서 중단하고 나머지는 올해 회고 포스트에 풀어보려고 한다.