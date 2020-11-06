---
layout: post
comments: true
title: "반쪽짜리 rowspan......"
summary: "반쪽짜리 rowspan이라니, 이게 뭔 소린가싶을 거다."
header:
  overlay_image: /assets/images/thumb/html_thumb01.jpg
  overlay_filter: 0.4
date: 2019-11-06 22:12
categories:
    - 퍼블노트
tags:
    - rowspan
    - table
    - html
home_first_letter: false
post_first_letter: false
---
rowspan이 애매하게 걸쳐 있는 테이블 디자인.

<table>
    <tbody>
        <tr>
            <td rowspan="2">2</td>
            <td rowspan="3">3</td>
        </tr>
        <tr>
            <td rowspan="6">6</td>
        </tr>
        <tr>
            <td rowspan="2">2</td>
        </tr>
        <tr>
            <td rowspan="3">3</td>
        </tr>
        <tr>
            <td rowspan="2">2</td>
        </tr>
    </tbody>
</table>

얼마전 회사에서 이런 테이블을 코딩해야 하는 상황이었는데, 구글링[^1]으로 예제 코드를 찾는 데 성공!했으나..  
다른 이유로 적용하지 않았지만, 앞으로 유용하게 써먹을 수 있을 것 같아서 기록함.

참고로 각 td의 숫자는 해당 td의 rowspan 수치임.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="pooLGve" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="half rowspan">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/pooLGve">
  half rowspan</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 기타

[2019.11.06] 아이폰 사파리에서 본문의 테이블과 코드펜의 테이블 rowspan이 깨지는 현상 발견

[^1]: [1] 검색 키워드 : half rowspan, rowspan 1.5