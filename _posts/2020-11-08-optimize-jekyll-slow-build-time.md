---
layout: post
comments: true
title: "Jekyll의 빌드 시간을 최적화하는 방법"
subtitle:
header:
  image_link: https://pixabay.com/ko/photos/%EC%84%A0%EC%85%8B-%EC%96%91%EA%B7%80%EB%B9%84-%EB%B0%B1%EB%9D%BC%EC%9D%B4%ED%8A%B8-%EA%BD%83-174276/
  image_author: danigeza
date: 2020-11-08 21:39
categories:
    - 퍼블노트
tags:
    - Jekyll
post_dropcap: false
---

알 사람들은 알겠지만, Jekyll은 매우 느린 것으로 유명하다. 내 블로그 기준으로 빌드 한 번하는 데 10초가 걸린 적도 있음..

```
Regenerating: 1 file(s) changed at 2020-11-08 22:23:03
            _posts/2020-11-08-optimize-jekyll-slow-build-time.md
Jekyll Feed: Generating feed for posts
            ...done in 2.2593816 seconds.
```

현재 포스팅하면서 빌드 시간을 측정해보았는데, 평균 1.7초 ~ 3초쯤 된다. 어떻게 이럴 수 있단 말인가.. 그래서 참다참다 빌드 최적화 방법을 검색해서 테스트해봤는데, 매우 만족스러웠으며 그 방법을 소개해보겠다.

## Jekyll의 빌드 매커니즘

놀랍게도 수정된 포스트만 빌드 대상이 아니라 모든 포스트가 빌드 대상이다. 그래서 포스트가 많을 수록 빌드 시간도 오래 걸릴 수 밖에 없음. 그러고보니 라이벌(?) <abbr title="Static Site Generator">SSG</abbr>인 Hugo의 모토가 **세계에서 제일 빠른 프레임워크**[^1]인 것을 보면 왜 Hugo가 유명한지 알 수 있는 부분이기도 함.. 그렇다고 Hugo로 갈아타고싶은 마음은 없음..

이제 최적화 방법을 알아봅시다.

## incremental: true 옵션을 사용한다.

```config.yml``` 파일의 ```incremental``` 옵션에 true를 지정해주면 수정된 파일만 빌드가 된다고 한다. 측정해보니 약 4초 정도 줄어들어 평균 1~1.5초 정도로 매우 빨라졌음.

## 애초에 하나의 포스트만 빌드되도록 해준다.

다른 방법으로, 빌드 명령어 뒤에 <mark>--help</mark>를 붙이면 사용 가능한 옵션 목록을 볼 수 있다.

1. ```bundle exec jekyll serve --help```{:.language-ruby} 명령어 실행
2. 여러 개의 옵션 중 <mark>--limit_posts</mark> 옵션을 찾을 수 있다.
3. 설명을 읽어보면 parse &amp; publish할 포스트의 개수를 제한한다고 나와 있다.
4. ```bundle exec jekyll serve --limit_posts 1```{:.language-ruby}, 즉 하나의 포스트만 빌드되도록 명령어를 실행해주면 된다.

```
Regenerating: 1 file(s) changed at 2020-11-08 22:23:03
            _posts/2020-11-08-optimize-jekyll-slow-build-time.md
Jekyll Feed: Generating feed for posts
            ...done in 0.3573721 seconds.
```

평균 0.3 ~ 0.5초로 매우 빨라진 빌드 시간을 볼 수 있다.

근데 나머지 포스트는 어떻게 접근하느냐? 제일 최신의 포스트 하나만 빌드되므로 나머지 포스트들은 접근할 수 없다. 어차피 포스팅을 하고 있는데 나머지 포스트도 수정을 해야 할 일이 거의 없긴 하다.

## 참고 링크
- [Jekyll Build Performance - Part I](https://www.sauru.so/blog/jekyll-build-performance-part1/){:target="_blank"}
- [jekyll 속도 올리기](https://jeongukjae.github.io/posts/1jekyll-%EC%86%8D%EB%8F%84-%EC%98%AC%EB%A6%AC%EA%B8%B0/){:target="_blank"}
- [Jekyll 블로그 빌드속도 개선하기](https://yangeok.github.io/blog/2019/05/21/jekyll-caching.html){:target="_blank"}

[^1]: [1] [The world's fastest framework for building websites](https://gohugo.io/){:target="_blank"}