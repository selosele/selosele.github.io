---
published: false
layout: post
comments: true
title: "React 학습과 삽질기"
subtitle:
header:
    overlay_image: /assets/images/thumb/react_thumb01.png
    overlay_filter: 0.4
    image_link: https://en.wikipedia.org/wiki/React_(web_framework)#/media/File:React-icon.svg
    image_author: Facebook
date: 2021-01-26 23:00
categories:
    - 퍼블노트
tags:
    - react
    - gatsby
post_dropcap: false
---

작성 예정

## 함수형 컴포넌트에서 props 받아올 때 가독성 이슈

예를 들어 다음 코드에는 2개의 props 값인 ```to```와 ```children```이 있다.

```javascript
const Link = ({ to, children }) => (<a href={to}>{children}</a>)
```

props 값이 많아지면 코드가 길어져서 파악하기 힘들 수 있으므로

```javascript
const Link = props => (<a href={props.to}>{props.children}</a>)}
```

매개변수 props 하나만 받아와서 사용하는 게 훨씬 깔끔해 보인다.