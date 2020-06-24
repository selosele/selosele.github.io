---
layout: post
comments: true
title: "Eclipse 작업 창이 망가졌을 때"
excerpt: "레이아웃을 초기화해주자"
header:
  overlay_image: /assets/images/thumb/eclipse_thumb01.png
  overlay_filter: 0.3
date: 2020-02-23 13:52
categories:
    - jsp
tags:
    - jsp
---
회사에서 Eclipse를 사용할 일이 생겨서 개인적으로 연습하기 위해 JDK, Tomcat, Eclipse를 설치하였다.

<figure class="rsp-img type2 zoom auto-alt align--center">
  <img src="/assets/images/post/eclipse-layout_img01.png" alt="">
  <figcaption>아무것도 건들지 않은 초기 상태의 화면. 왼쪽 Project Explorer의 first_jsp, hello는 내가 임의로 만든 것이니 무시하셈</figcaption>
</figure>

Eclipse 설치 후 이것저것 막 건들다가 다음과 같은 상황에 봉착하게 되었는데...

<figure class="rsp-img type2 zoom auto-alt align--center">
  <img src="/assets/images/post/eclipse-layout_img02.png" alt="">
  <figcaption>엄청난 멘붕과 함께 프로그램 삭제를 고민하게 된다.</figcaption>
</figure>

작업 창이 망가져버린 것이다. 이것저것 눌러봐도 안되고 종료 후 다시 실행해보아도 마찬가지이다. 그래서 구글링 고고씽~~

구글신께서 말씀하시길 상단 Windows &rarr; Perspective &rarr; Reset Perspective를 눌러 레이아웃을 초기화해주면 된다. 단순한 것이지만 그냥 까먹을 것 같아서 기록해둠.... 자 이제 본격적으로 JSP 작업환경 셋팅을..