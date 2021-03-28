---
layout: post
comments: true
title: "Jekyll 테마 퍼블리싱 및 적용 완료"
subtitle:
header:
  overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/blog_thumb01.jpg
  overlay_filter: 0.4
  image_link: https://pixabay.com/ko/photos/%EB%B8%94%EB%A1%9C%EA%B7%B8-%EC%9D%B8%ED%84%B0%EB%84%B7-%EC%9B%B9-%EA%B8%B0%EC%88%A0-2355684/
  image_author: Wokandapix
date: 2020-06-24 22:58
categories:
    - 퍼블노트
    - 개인 프로젝트
tags:
    - jekyll
post_dropcap: false
column: true
---

[두 달 전부터 시작한](/2020/04/11/making-jekyll-theme/) Jekyll 테마 퍼블리싱을 마무리하고 현재 저장소에 적용을 완료하였다.

## 직접 만든 계기

자유로운 영혼인 나님에게 워드프레스, 티스토리, Velog 같은 유명한 블로그 서비스는 그닥 성에 차지 않았고, 때마침 커스터마이징이 자유로운 정적 사이트 생성기를 알게 되었으며 유명한 Jekyll 테마인 minimal-mistakes를 사용하게 되었었다. 마크업, CSS, JS를 입맛에 맞게 커스터마이징하며 즐겁게(?) 사용했지만 내가 원하는대로 제어하기엔 한계가 있었던 건 사실이다. 결국 뇌 어딘가 구석에 처박혀 있는 테마를 직접 만들겠다는 생각을 현실화하기로 마음먹고 도전하게 되었음.

## 무엇에 관심을 두고 만들었는지

일단 퍼블리싱 완료 후 배포는 하지만 나 혼자만 쓰려고 만드는 것이므로, 즉 Jekyll 테마 목록에 올리지는 않는 거라서 사용자 커스터마이징이 자유롭지는 않은 편이다. 나름 내세울만한 자랑거리(?)는 다음과 같다.

* Semantic markup
* CSS/JS 구조와 표현의 분리
* BEM 방법론

semantic 마크업에 대해서는 **고정관념에서 탈피**하는 것을 제일 중요하게 생각하고 작업하였다. 로고는 h1 요소여야 한다는 고정관념부터 시작해서 목록은 무조건 ul > li 구조가 맞다는 고정관념도 마찬가지.

두 번째, CSS/JS 구조와 표현의 분리를 최대한 지향하였다. 어쩔 수 없는 경우를 제외하곤 불필요한 Internal/Inline style이나 Inline Javascript는 고려조차 하지 않았다.

또한 평소에 관심만 갖고 있던 BEM 방법론을 학습, 적용하여 규칙적인 클래스 네이밍을 설계했다고 생각한다. 단순히 hyphen, underscore만 나열하거나 camelcase를 사용한다고 해서 끝나는 게 아니다. 클래스 네이밍도 HTML 구조 설계처럼 의미가 있고 규칙이 있다.