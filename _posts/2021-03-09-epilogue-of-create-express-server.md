---
layout: post
comments: true
title: "업무용 express 서버 구축기"
header:
    overlay_image: https://cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/nodejs_thumb01.jpg
    overlay_filter: 0.4
    image_link: https://pixabay.com/ko/vectors/%EB%85%B8%EB%93%9C-js-%EB%A1%9C%EA%B3%A0-nodejs-736399/
    image_author: CopyrightFreePictures
date: 2021-03-09 22:12
categories:
    - 퍼블노트
tags:
    - node.js
primary_post: true
---

최근 업무에 활용하기 위해 Node.js의 웹 프레임워크인 express로 개인용 로컬 서버를 구축하였다. 평소 팀 단위 작업을 공용 네트워크에서 진행 중이었는데, 공용 네트워크 특성 상 속도 저하 이슈가 좀 불편했고, 무엇보다 웹 접근성 검사를 위한 OpenWAX 같은 도구나 HTML/CSS Validation은 유효한 URL이 있어야 실행할 수 있기 때문에 로컬 웹서버의 필요성을 느끼고 삽질에 도전해보았다. 한 2주 간의 작업을 거쳐 나름 쓸만한(?) 물건을 만들어내서 업무에 활용 중이고, 괜찮은 퍼포먼스를 내주고 있어서 뿌듯함.

## 코드

Node.js나 각종 모듈 설치법은 간단하므로 생략하겠음. 루트 디렉토리에 ```.env``` 파일 생성 후 환경변수값을 아래와 같이 구성해주었고,

```
PORT=9999
HTML="foo.html"
```

```server.js``` 파일을 작성하였다. 작성 과정을 쓰자면 너무 길어지니 생략.. 하지만 계속 코드 품질을 개선하고 있으니 이제부터 그 과정을 기록하는 차원에서 포스트를 수정할 것임.

```javascript
// 모듈 불러오기
require("dotenv").config(); // .env 파일의 환경변수값 사용을 위한 모듈
const express = require("express");
const server = express();
const querystring = require("querystring");
const path = require("path");

// 기본 설정
const DOCUMENT_ROOT = "\\\\192.168.**.**\\folder\\"; // 공용 네트워크의 특정 폴더를 루트로 설정
const PROJECT_DIR = querystring.unescape(path.resolve(DOCUMENT_ROOT, "html\\")); // 한글 포함된 폴더명을 querystring 모듈로 처리

// 포트 설정
server.set("port", process.env.PORT || 3000);
const MY_PORT = server.get("port");

// 정적 파일 불러오기
const MY_HTML = process.env.HTML || "index.html";
server.use(express.static(DOCUMENT_ROOT));

// 라우팅 정의
server.get(PROJECT_DIR, (req, res, next) => {
  res.sendFile(path.resolve(PROJECT_DIR, './', MY_HTML));
});

// 서버 실행
server.listen(MY_PORT, () => {
  console.log(`http://localhost:${MY_PORT}에서 서버 실행 중..`); // 결과 : http://localhost:9999에서 서버 실행 중..
});
```

포트값을 처음에는 변수에 할당해놓고 사용했었는데, 위와 같이 환경변수 설정을 통해 불러오는 게 효율적인 방식인 것 같다. 환경변수 설정 파일에는 포트, 라우팅 경로 접속 시 실행할 HTML 파일 등을 정의해놓으면 ```server.js``` 파일을 수정하는 것보다 훨씬 편함.

그리고 시간을 많이 잡아먹었던 부분은

1. 폴더명에 한글이 포함되어 있을 경우 핸들링하는 방법
2. 정적 파일 로드 시 ```index.html``` 파일이 기본으로 읽히게 되어 있어서 다른 파일이 읽히게 처리하는 법

## 후기

상기한 OpenWax는 당연히 구동되고, HTML/CSS Validation도 작동된다!

근데 Validation은 크롬 확장 프로그램 Web Developer 사용 시에만 작동하는 듯하다. Validation에서 ```localhost:port```는 유효한 URL로 인정되지 않으니 Web Developer의 Validate local HTML/CSS(파일의 소스 복붙을 자동으로 해주는 기능)을 사용하면 된다. 사실 HTML/CSS 파일의 소스를 일일이 복붙해서 진단을 수행할 수도 있지만(서버 구축 전에는 그렇게 작업했었고) 로컬 웹서버에 붙으면 그렇게 할 필요가 없다.

업무 효율적인 측면에서는, OpenWax랑 Validation을 매우 편하게 쓸 수 있고, 공용 네트워크 접속으로 인한 속도 저하 문제 또한 발생하지 않아서 업무 효율이 많이 상승한 것 같다고 느낀다. 한 며칠을 express 서버에서 작업해보니 공용 네트워크로 돌아간다는 건 생각도 못 할 일이 되었음.. 앞으로 모든 작업을 express 서버에서 진행할 계획이다.

물론 저렇게 서버를 구현해놨다고 해서 끝이 아니고, Node.js와 express 전반을 계속 학습하며 코드 품질을 개선하는 것도 중요하다.