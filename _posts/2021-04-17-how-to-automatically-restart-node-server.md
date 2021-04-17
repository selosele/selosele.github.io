---
layout: post
comments: true
title: "Node.js 서버를 자동으로 재시작하는 방법"
subtitle: "supervisor라는 모듈을 사용하면 됨"
header:
    overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/nodejs_thumb01.jpg
    overlay_filter: 0.4
    image_link: https://pixabay.com/ko/vectors/%EB%85%B8%EB%93%9C-js-%EB%A1%9C%EA%B3%A0-nodejs-736399/
    image_author: CopyrightFreePictures
date: 2021-04-17 14:41
categories:
    - 퍼블노트
tags:
    - Node.js
post_dropcap: false
home_dropcap: false
---

최근 개인적으로 Node.js 서버를 사용하는 일이 많아졌는데, 생각치도 못했던 불편함이 나님을 괴롭히고 있었다. 그거슨 바로, 소스 파일이 수정될 때마다 수동으로 서버를 재시작해줘야 한다는 것..

```
npm start
```

Package.json 파일에 scripts를 등록했다면 저 한줄이면 되지만(물론 수동 재시작이고 불편한 건 똑같지만) 그게 아닐뿐만 아니라 파일명도 길다면.. 매우 불편한 일이 아닐 수 없다. 그래서 관련 모듈이 있나 찾아보았는데, ```supervisor```라는 모듈을 설치, 테스트해보았고 굉장히 만족스러웠다.

## 사용법

모듈 설치 후 ```supervisor 파일명.js``` 명령어를 실행하면 추후 소스파일이 수정될 때마다 자동으로 서버를 재시작해준다. 혹시 저 명령어가 안되면 다음과 같이 Package.json 파일에 scripts를 등록해주면 된다.

```javascript
"scripts": {
  "start": "supervisor 파일명.js"
},
```

소스파일 수정 후 저장을 누르면

```
crashing child
Starting child process with 'node 파일명.js'
```

위의 코드가 터미널에 출력되며 매우 빠른 속도로 서버가 재시작된다. 실무(개인적으로 사용하는 express 서버)에도 적용을 해야되겠음.
