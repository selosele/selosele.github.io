---
layout: post
comments: true
title: "Node.js로 간단한 웹서버 띄워보기"
subtitle: "심심해서 시도해봤음"
header:
    overlay_image: /assets/images/thumb/nodejs_thumb01.jpg
    overlay_filter: 0.4
    image_link: https://pixabay.com/ko/vectors/%EB%85%B8%EB%93%9C-js-%EB%A1%9C%EA%B3%A0-nodejs-736399/
    image_author: CopyrightFreePictures
date: 2020-11-23 14:31
categories:
    - 퍼블노트
tags:
    - node.js
---

실무에서 간단한 로컬 웹서버를 하나 띄울 수 있으면 좋겠다는 생각을 했었다. 로컬 html 파일에서 작업하는 것과 웹서버에 붙어서 작업하는 것의 차이가 조금 크기 때문이고, 무엇보다 Openwax 같은 웹 접근성 진단 도구를 이용한 테스트를 로컬 html 파일에선 불가능하므로..  

찾아보니 vscode의 live server를 이용하면 간편하게 웹서버 하나 띄울 수 있다고 나와서 시도를 해봤는데, 내가 뭘 잘못 설정한 건지 불러온 파일이 다 깨지고 난리가 나서.. 마침 Node.js로 가능하다고 하길래 live server는 나중으로 미뤄두고 한 번 도전해봤음.

## 설치법 작성에 앞서

우선 Node.js를 학습한 게 아니라 간단한 개념 정도만 훑고서 시도한 것을 풀어 쓴 거라 잘 아는 사람이 보면 좀 이상해보일 수도 있음..

## How to

### Node.js 설치

Node.js를 설치하자.  
[공식 홈페이지](https://nodejs.org/ko/){:target="_blank"}로 들어가면 LTS 버전과 최신 버전으로 나뉘어 있는데, 전자는 장기적으로 안정된 지원이 보장되고 후자는 업데이트가 자주 일어나서 안정적이지 않을 수 있다고 한다. LTS 버전을 다운받는 게 좋음.

설치가 잘 됐는지 확인하려면 터미널을 열고

```
node -v
```

를 입력해주면 Node.js의 버전을 확인할 수 있다(현재 기준 10. 16. 3).

### index.js 작성

index.js 파일을 만들고 아래와 같이 작성해준다.

```javascript
const http = require('http');

http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello World');
}).listen(3000);
```

Node.js는 http 모듈을 내장하고 있어서 아파치와 같은 별도의 웹서버가 필요없다고 한다.

작성 후 index.js가 위치한 폴더에서 ```node index.js```를 실행하고 &ldquo;http://localhost:3000&rdquo;로 접속하면 Hello World가 출력되는 것을 확인할 수 있다. 다른 포트로 접속하려면 listen 함수의 인자를 원하는 값으로 설정해주자.

### 정적 파일 불러오기

다 된줄 알았는데, 외부 CSS/JS 파일이 읽히지 않는다.  
Node.js는 기본적으로 정적 파일을 읽을 수 없다고 하는데, 이를 위해선 Express라는 Node.js의 프레임워크를 사용해야 한다.

---

우선 프로젝트 폴더에서 ```npm init``` 명령으로 package.json 파일을 생성해준다. npm은 Node.js와 함께 설치되므로 걱정안해도 됨

```
npm install express
```

그 후 위 명령으로 express를 설치해주고, index.js의 내용을 아래의 것으로 교체해준다.

{:data-line="11"}
```javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
    next();
});

app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/index.html"); // index.html 파일을 실행하겠다는 뜻
});

app.listen(PORT, () => {
    console.log(`Listen : ${PORT}`);
});
```

예를 들어 public 폴더 안에 CSS/JS 파일이 위치해 있다면, 정적 파일이 위치할 경로가 public 폴더라는 뜻이다. 보통 public으로 많이들 짓는다길래 따라해봤음.

마지막 줄에 console.log(Listen : ${PORT}) 이 부분은 ```node index.js``` 명령으로 서버를 실행 시, 터미널에 뜨는 내용이다.  

```
my_path>node index.js
Listen : 3000
```

이런 식으로 최상단 PORT 변수에 할당한 포트값이 뜬다. 이제 &ldquo;http://localhost:3000&rdquo;로 접속하면 정적 파일이 잘 불러와진 것을 볼 수 있다.

**참고 링크**

* [네트워크 애플리케이션을 위한 자바스크립트 런타임 환경](https://poiemaweb.com/nodejs-basics){:target="_blank"}
* [express & static파일 폴더 설정](https://velog.io/@hwang-eunji/nodejs-6-express-static%ED%8C%8C%EC%9D%BC-%ED%8F%B4%EB%8D%94-%EC%84%A4%EC%A0%95){:target="_blank"}
* [[NodeJS] Node.js로 웹 서버 만들기 2 - 서버에서 파일 받기](https://ebbnflow.tistory.com/209?category=745851){:target="_blank"}
* [NodeJS 정적파일 읽는 방법, 웹페이지, 이미지, CSS 파일 읽는 방법](https://mainia.tistory.com/5707){:target="_blank"}
* [Express-정적파일을 서비스 하는 법](https://wayhome25.github.io/nodejs/2017/02/18/nodejs-08-express-static/){:target="_blank"}

## 마지막으로

개발 실무자들이 보면 이런 생각을 할 수도 있다.

&ldquo;겨우 웹서버 하나 띄우려고 Node.js를 설치해서 삽질을 한다?&rdquo;  
&ldquo;Node.js를 학습할 것도 아니면서 무슨 소용이 있나?&rdquo;

어떻게 보면 맞는 말이긴 하나, 결국 언젠가 쓸모가 있는 법이므로 다 의미 있다고 생각함.. 이건 쓸모가 있고 저건 쓸모가 없다고 생각하면 빠르게 변화하는 기술 트렌드에서 도태되기 십상이다. 내 블로그 JS를 npm으로 빌드하는 환경을 구성하고 작업을 했었는데, 덕분에 이렇게 필요할 때 조금이나마 이해가 잘 되는 듯한 생각이 든다.

무엇이든 수박 겉핥기 식으로 학습해놓고 기록이라도 해놓으면 언젠가 필요해졌을 때 누구보다 빠르게 적용할 수 있을 거라고 생각한다. 이 포스트도 개념을 잘못 파악한 부분이 좀 있겠지만 나중에 지식이 바로 잡혔을 때 수정하면 될 것임..