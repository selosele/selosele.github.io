---
layout: post
comments: true
title: "yml 파일 내에서 Liquid 코드 사용 삽질기"
subtitle:
date: 2021-01-10 13:10
categories:
    - 퍼블노트
tags:
    - liquid
post_dropcap: false
---

블로그 테마를 수정하던 중, yml 파일 내에서 Liquid 코드를 사용해야 하는 상황을 만나게 되었다.

{% raw %}
```html
<a href="https://twitter.com/intent/tweet?{% if site.twitter.username %}via={{ site.twitter.username | url_encode }}&{% endif %}text={{ page.title | url_encode }}%20{{ page.url | absolute_url | url_encode }}" class="page__share__btn--twitter">Twitter</a>

<a href="https://www.facebook.com/sharer/sharer.php?u={{ page.url | absolute_url | url_encode }}" class="page__share__btn--facebook">Facebook</a>

<a href="https://www.linkedin.com/shareArticle?mini=true&url={{ page.url | absolute_url | url_encode }}" class="page__share__btn--linkedin">LinkedIn</a>
```
{% endraw %}

위 코드는 내 블로그 포스트 화면 아래에 있는 공유하기 링크 영역에 대한 HTML 코드임. a 요소들은 하드코딩으로 들어간 똑같은 Liquid 코드를 가지고 있는 상황인데, 저런 중복 코드를 개선해보려고 yml 파일에 데이터를 넣은 다음, Liquid로 반복문을 돌려서 a 요소를 뿌려주는 로직을 구상, 실행에 옮겨 보았음.

{% raw %}
```yml
sns:
  - link: https://twitter.com/intent/tweet?{% if site.twitter.username %}via={{ site.twitter.username | url_encode }}&{% endif %}text={{ page.title | url_encode }}%20{{ page.url | absolute_url | url_encode }}
    label: "Twitter"
  - link: https://www.facebook.com/sharer/sharer.php?u={{ page.url | absolute_url | url_encode }}
    label: "Facebook"
  - link: https://www.linkedin.com/shareArticle?mini=true&url={{ page.url | absolute_url | url_encode }}
    label: "LinkedIn"
```
{% endraw %}

{% raw %}
```html
{% for link in site.sns %}
<a href="{{ link.url }}" class="page__share__btn--{{ link.label }}">{{ link.label }}</a>
{% endfor %}
```
{% endraw %}

된 줄 알았지만 아니다.. 우선 yml 파일 안에서는 Liquid 코드가 인식되지 않는다. 즉 위 코드의 출력 결과는 Liquid 코드가 그대로 출력되는 것임.. ```link.label```{:language-html}은 순수 문자열을 담고 있으므로 정상 출력된다.

## 찾아본 방법

검색을 해보니 [비슷한 상황에 직면한 이가 올린 질문](https://stackoverflow.com/questions/14487110/include-jekyll-liquid-template-data-in-a-yaml-variable){:target="_blank"}이 있었다. 어느 답변자가 [자신이 만든 Ruby 플러그인](https://github.com/gemfarmer/jekyll-liquify){:target="_blank"} 사용을 권했는데, 다운로드 후 적용을 해봤다.

```ruby
module LiquidFilter
  def liquify(input)
    Liquid::Template.parse(input).render(@context)
  end
end

Liquid::Template.register_filter(LiquidFilter)
```

Ruby로 쓰여 있어서 무슨 말인지 모르겠으나 yml 파일 내에서도 Liquid 코드가 인식될 수 있게 해주는 Jekyll Liquify라는 플러그인이라고 한다.

{% raw %}
```html
{% for link in site.sns %}
<a href="{{ link.url | liquify }}" class="page__share__btn--{{ link.label }}">{{ link.label }}</a>
{% endfor %}
```
{% endraw %}

```liquify```로 해당 플러그인을 사용하여 Liquid 코드를 변환해준다.

## 결과

로컬에서 정상 작동을 확인했으나, 실서버에서는 적용되지 않은 듯 Liquid 코드가 그대로 출력되는 것을 확인했다. 중요한 것 하나를 잊고 있었는데, Github pages는 Jekyll 플러그인 빌드를 허용하지 않는다는 사실.. 몇 번을 생각하는 거지만 처음부터 Netlify를 썼어야 했다..

## 대안

굳이 하드코딩으로 넣어도 되는 것이긴 한데, 코드 중복에 대한 강박관념(?) 같은 게 있어서 머리를 좀 굴려봤다. 우선 href 속성값에 들어가는 url은 하드코딩으로 넣고, 클래스를 Liquid 변수에 담아서 a 요소에 넣는 로직을 적용해봤음.

{% raw %}
```html
{% capture commonClass %}
    page__share__btn--
{% endcapture %}

{% capture commonAttribute %}
    title="{{ site.data.ui-text[site.locale].target_blank }}" 
    rel="noopener noreferrer nofollow" 
    onclick="window.open(this.href, 'window', 'left=20, top=20, width=500, height=500, toolbar=1, resizable=0'); return false;"
{% endcapture %}

<a href="" class="{{ commonClass }}twitter" {{ commonAttribute }}>Twitter</a>

<a href="" class="{{ commonClass }}facebook" {{ commonAttribute }}>Facebook</a>

<a href="" class="{{ commonClass }}linkedin" {{ commonAttribute }}>LinkedIn</a>
```
{% endraw %}

url은 너무 길어서 예시에서 생략했고, 처음에 들었던 예시에서 다 쓰면 너무 길어져서 생략했던 title, rel, onclick 속성도 예시에 넣었음. title 속성값에는 yml 파일에서 불러오는 "새창"이라는 텍스트가 들어가고, rel 속성값은 보안 관련 유명한 사항이니 설명 패스, onclick 이벤트에는 해당 a 요소의 url을 윈도우 팝업으로 여는 핸들러가 들어간다. 이렇게 해서 정상 적용되었고, 오늘의 삽질은 여기까지.. -_-