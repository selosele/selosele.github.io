---
layout: page
title: About me
class: page__content about
---

의식의 흐름대로 쓴 글을 올리는 그냥 그런 웹 퍼블리셔의 블로그입니다.

## 주요 관심사에 대한 포스트

{% assign primary_post = site.posts | where: "primary_post", "true" %}

{% for post in primary_post %}
- [{{ post.title }}]({{ post.url }}){:rel="permalink"} <span class="archive__list__date">{{ post.date | date: "%Y년 %m월 %d일" }}</span>
{% endfor %}

## 구독

[RSS](/{{ site.atom_feed.path }})를 이용하여 이 블로그의 내용을 구독할 수 있습니다.