---
layout: post
comments: true
title: "React 학습과 삽질기(feat. Gatsby)"
subtitle:
header:
    overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/react_thumb01.png
    overlay_filter: 0.4
    image_link: https://en.wikipedia.org/wiki/React_(web_framework)#/media/File:React-icon.svg
    image_author: Facebook
date: 2021-02-12 22:23
categories:
    - 퍼블노트
tags:
    - react
    - gatsby
post_dropcap: false
---

요즘 Gatsby 블로그 테마 제작에 빠져서 React를 학습하며 삽질 중이다.. 본 포스팅은 React, Gatsby를 다루면서 습득한 지식을 선별해서 기록하기 위한 목적이며 내용은 상시 업데이트할 것임.

## 함수형 컴포넌트에서 props 받아올 때 가독성 이슈

예를 들어 아래 ```MyLink```{:.language-javascript}라는 함수형 컴포넌트에는 2개의 props 값인 ```path```와 ```children```이 있다.

```javascript
const MyLink = ({ path, children }) => (<a href={path}>{children}</a>)
```

props 값이 1~2개면 상관없지만 그 이상으로 많아지면 코드가 길어져서 파악하기 힘들 수 있으므로

```javascript
const MyLink = props => (<a href={props.path}>{props.children}</a>)
```

매개변수 props 하나만 받아와서 사용하는 게 훨씬 깔끔해 보인다.

## a 요소 대신 Gatsby에서 제공하는 Link 컴포넌트를 사용하자

페이지 외부로 이동하는 링크가 아닌 페이지 내부에서 이동되는 링크의 경우 ```a```{:.language-html} 요소로 마크업하는 것보단, Gatsby에서 제공하는 ```Link``` 컴포넌트를 사용하는 게 훨씬 낫다. 작업하면서 참고한 많은 스타터 테마에 Link 컴포넌트가 사용된 건 다 이유가 있는 법이었다. 예제를 살펴보자.

```javascript
import React from 'react'

const MyLink = props => (<a href={props.path}>{props.children}</a>)
const Page = () => {
    return <MyLink path="/">link</MyLink>
}

export default Page
```

a 요소로 구성할 경우 이동하는 페이지가 바뀔 때마다 전부 로딩한다. React의 SPA 방식과 거리가 있어 보임. 다음과 같이 Gatsby의 Link 컴포넌트를 사용해보자.

{:data-line="2"}
```javascript
import React from 'react'
import { Link } from 'gatsby'

const MyLink = props => (<Link to={props.path}>{props.children}</Link>)
const Page = () => {
    return <MyLink path="/">link</MyLink>
}

export default Page
```

Link 컴포넌트는 페이지 내부에서 이동할 때 미리 로딩하므로 훨씬 편리하다. 사용하려면 gatsby 모듈로부터 컴포넌트를 import하고 a 요소 대신 Link로 써주면 된다. a 요소의 href 속성은 to로 바꿔줘야 한다.

```html
<a href="/" aria-current="page">link</a>
```

렌더링된 결과로, to 값과 현재 페이지 URL이 동일하면 보조기기에서 현재 페이지임을 알려주는 ```aria-current="page"```{:language-html} 속성도 기본으로 추가해준다. a 요소로 구성하면 저걸 위해 복잡한 작업을 해야 됐을 걸 생각하니.. 매우 큰 이점이다. 단, 페이지 외부로 이동하는 링크는 a 요소로 구성해도 상관없을 듯.

**참고**

- [Gatsby Link API](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/){:target="_blank"} - Gatsby docs
- [[Gatsby] Anchor Tag 대신 Link Component](https://coding-groot.tistory.com/83){:target="_blank"}