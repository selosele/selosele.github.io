---
layout: post
comments: true
title: "Jekyll은 기본적으로 favicon을 지원한다."
excerpt: "놀라운(?) 사실"
header:
  overlay_image: 
  overlay_filter: 0.5
date: 2020-07-09 21:38
categories:
    - life
tags:
    - jekyll
---

어느 날 우연히 블로그에 접속해서 console창을 띄우자 뜬 에러...

{% include image.html url='/assets/images/post/jekyll-favicon_img01.jpg' description='favicon을 찾을 수가 없다니?' alt='' %}

난 애초에 favicon 이미지를 넣은 적이 없고 favicon을 불러오는 html도 만든 적이 없으며, 대체 어디서 favicon 이미지를 불러오는 것인지 모든 html 파일을 뒤져보아도 찾을 수가 없었다. 하지만 정답은 늘 가까운 곳에 있는 법..... 아이고 머리야

Jekyll은 기본적으로 favicon을 지원한다고 한다. 루트경로에 favicon 이미지 파일을 넣어놓으면 알아서 인식을 하고 불러와 준다고.. 실험 결과 알 수 있었다. 즉, 나는 favicon 파일을 넣지 않았으니 이미지를 못 찾아서 저런 에러를 뱉는 것임.

간단한(?) 문제이지만 같은 삽질을 반복하지 않기 위해 기록해둔다.