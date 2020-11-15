---
layout: post
comments: true
title: "liquid) where filter를 사용하여 해당 값을 가진 객체만 포함하는 배열 만들기"
subtitle:
header:
  overlay_image:
  image_link: https://pixabay.com/ko/photos/%EC%84%A0%EC%85%8B-%EC%96%91%EA%B7%80%EB%B9%84-%EB%B0%B1%EB%9D%BC%EC%9D%B4%ED%8A%B8-%EA%BD%83-174276/
  image_author: danigeza
date: 2020-06-15 21:40
categories:
    - 퍼블노트
tags:
    - liquid
---

최근 블로그 테마 작업 중, 특정 변수값을 가진 포스트를 목록 형태로 뿌려주고 싶어서  
기초적인 for 반복문을 사용해보았으나 잘 안되어서 포기... 가 아니고 여기서 포기할 나님이 아니었으니...  
결국 해결했는데, 처음 시도했었던 방법과 비교해보겠음.

## 처음 시도했었던 방법
{% raw %}
{:.has-label}
```html
<ul>
  {% for post in site.posts limit:5 %}
    {% if post.important %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
    {% endif %}
  {% endfor %}
</ul>
```
{% endraw %}

모든 포스트(총 50개) 중 important 변수값이 true인 포스트(총 8개)를 li > a 구조로서 뿌려줄 것이고,  
개수는 5개로 제한하기 위해 limit 반복문을 사용하였다. 결론부터 말하면 근본부터 틀려먹은 방법이라고 할 수 있다. 왜냐?

{% raw %}
{:.has-label}
```liquid
[1, 2, 3, 4, 5, 6, 7, 8]
```
{% endraw %}

이런 배열이 있다고 가정하고, 해당 값을 가진 객체가 1, 2, 3, 6, 7 이라면? 결과값은 1, 2, 3이다.  
반복 횟수를 5번으로 제한했으니까 순서대로 1, 2, 3 까지만 표출되는 것... 이 간단한 논리를 이해 못해서 일요일을 기나긴 삽질과 함께 하였음.

## 올바른 방법
{% raw %}
{:.has-label}
```liquid
{% assign important_post_arr = site.posts | where: "important", "true" %}
```
{% endraw %}

임의로 선언한 important_post_arr 변수에 모든 포스트 중 important 변수값이 true인 포스트를 포함하는 배열을 만들어준다.  
where filter를 써서 값을 가진 객체를 찾을 수 있음. 그렇다. 애초에 배열을 만들어놓고 시작해야지 반복문부터 돌리고서 해당 값을 가진 포스트를 찾으려고 하면 안되는 것.

{% raw %}
{:.has-label}
```html
<ul>
  {% for post in important_post_arr limit:5 %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ul>

<!-- 5개 이상일 시 더보기 링크 표출 -->
{% if important_post_arr.size > 5 %}
  <a href="#">more</a>
{% endif %}
```
{% endraw %}

해당 값을 가진 객체만 있는 배열에서 반복 횟수를 5번으로 제한해준다. 결과값은 1, 2, 3, 6, 7.