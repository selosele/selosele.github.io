---
layout: page
title: About me
class: page__content about
---

의식의 흐름대로 쓴 글을 올리는 어느 웹 퍼블리셔의 블로그입니다.

## 개인정보

{% assign infos = "구분, 내용" %}
{% assign infoArr = infos | split: ", " %}
{% assign infoArrToString = infoArr | join: ", " %}

<table class="info__tbl">
  <caption class="sr-only2">개인정보 - {{ infoArrToString }} 정보 제공.</caption>
  <thead>
    <tr>
      {% for info in infoArr %}
        <th scope="col">{{ info }}</th>
      {% endfor %}
    </tr>
  </thead>
  <tbody>
    {% for link in site.author.links %}
      <tr>
        {% if link.label and link.url and link.title %}
          <th scope="row">{{ link.label }}</th>
          <td class="align--left">
            {% capture commonAttr %}
              {% if link.url contains '://' %} target="_blank" title="{{ site.data.ui-text[site.locale].target_blank }}" rel="noopener noreferrer nofollow"{% endif %}
            {% endcapture %}

            <a href="{{ link.url }}"{{ commonAttr }}>{{ link.title }}</a>
          </td>
        {% endif %}
      </tr>
    {% endfor %}
  </tbody>
</table>

## 주요 관심사에 대한 포스트

{% assign primary_post = site.posts | where: "primary_post", "true" %}

{% for post in primary_post %}
- [{{ post.title }}]({{ post.url }}){:rel="permalink"} <span class="archive__list__date">{{ post.date | date: "%Y년 %m월 %d일" }}</span>
{% endfor %}

## 구독

[RSS](/{{ site.atom_feed.path }})를 이용하여 이 블로그의 내용을 구독할 수 있습니다.