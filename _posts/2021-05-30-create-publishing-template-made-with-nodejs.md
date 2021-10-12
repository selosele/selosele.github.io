---
redirect_from: /2021/05/30/epilogue-of-create-publishing-nodejs-template/
layout: post
comments: true
title: "Node.js로 제작한 퍼블리싱 작업 템플릿 실무 적용 후기"
header:
    overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/nodejs_thumb01.jpg
    overlay_filter: 0.4
    image_link: https://pixabay.com/ko/vectors/%EB%85%B8%EB%93%9C-js-%EB%A1%9C%EA%B3%A0-nodejs-736399/
    image_author: CopyrightFreePictures
date: 2021-05-30 14:11
categories:
    - 퍼블노트
tags:
    - Node.js
post_dropcap: false
---

실무에서 서브페이지 내용을 퍼블리싱할 때, 공통으로 들어가는 header/footer 등이 include된 작업 템플릿을 Node.js(Express)로 제작, 실무에 적용한 후기를 포스팅한다.

## 템플릿 구조

우선 공통 레이아웃을 담당하는 ```subLayout.html```을 아래와 같이 구성하였다. 서브페이지 내용이 들어갈 영역을 비워놓아야 한다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  ...
</head>
<body>
  <header>header</header>

  <div id="view">
    <!-- 서브페이지 내용 -->
    
    <!-- //서브페이지 내용 -->
  </div>

  <footer>footer</footer>
</body>
</html>
```

그리고 서브페이지 내용이 들어갈 html 파일(예 : sub0101.html)을 만든다.

```html
<p>내용 내용 내용...</p>
```

내가 구성한 로직은 ```sub0101.html``` 파일을 열면 해당 파일의 내용을 ```subLayout.html``` 파일의 ```<div id="view"></div>``` 영역에 넣고, 그 결과물을 브라우저에 출력하는 구조임.

## Express 로직

다음은 서브페이지 내용 출력을 담당하는 ```subPageController.js```이다. 보면 알겠지만, include가 아니라 크롤링을 응용한 것임. 위에서는 쉬운(?) 설명을 위해 include라고 말했지만 사용 편의를 위해 크롤링을 적용하였음.

```javascript
// 환경변수 불러오기
const serverConfig = require('../server_config');

const _ROOT = process.env.SUB_PAGE_ROOT;
const _HTML_PATH = process.env.SUB_PAGE_HTML_PATH;
const _VIEW = process.env.SUB_PAGE_VIEW;

// 모듈 불러오기
const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const url = require('url');
const req = require('request');
const cheerio = require('cheerio');

renderHTMLfile('*.html', `../${_ROOT}`, _HTML_PATH, _VIEW);

function renderHTMLfile(to, ctx, layout, view){ // 라우터 path, 서브페이지 ROOT 경로, 서브레이아웃 HTML 경로, 서브페이지 VIEW container
  router.get(to, (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
  
    let pathname = url.parse(request.url).pathname;
    let HTMLfile = decodeURI(pathname.substring(pathname.lastIndexOf('/')).replace('/', '')); // 현재 열고 있는 HTML 파일명을 가져온다.
  
    new Promise((resolve, reject) => { // 콜백 Hell 탈출을 위해 Promise를 학습, 적용해봤다. 근데 Promise Hell도 가독성 문제가 있다. 다음에는 async/await를 적용해봐야겠음.
      fs.readFile(path.resolve(__dirname, `${ctx}/${layout}/${HTMLfile}`), 'utf8', (error1, data) => {
        if (error1) {
          return response.end('파일을 찾을 수 없습니다.', 'utf-8');
        }
        resolve(data);
      });
    })
    .then((resolvedData) => {
      req({
        url: `http://${serverConfig.$_HOST}:${serverConfig.$_PORT}/${layout}/subLayout.html`,
        method: 'GET',
      }, (err, res, body) => {
        const a = cheerio.load(body, {
          decodeEntities: false
        });
        const b = a.load(a.root().html(), {
          decodeEntities: false // HTML entities 코드를 자동으로 decoding하지 않도록 설정
        });
        
        b(view).html('\n' + resolvedData + '\n');
  
        const renderedHTML = '<!DOCTYPE html>\n' + a.html(a(b(view).parents('html')));
        const encodedEntitiesHTML = renderedHTML // HTML entities 코드를 이스케이핑해준다. 꺾쇠(< >)는 <div> 이런 태그에 들어가는 것까지 이스케이핑되므로 제외
          .replace(/·/g, '&middot;')
          .replace(/←/g, '&larr;')
          .replace(/↑/g, '&uarr;')
          .replace(/→/g, '&rarr;')
          .replace(/↓/g, '&darr;');
  
        // 서브레이아웃 + 콘텐츠 합친 파일을 특정 폴더(output)에 저장 (내 로컬에 저장된 합쳐진 파일을 공유폴더에 수동으로 옮겨 팀원들과 공유)
        fs.writeFile(path.resolve(__dirname, `${ctx}/${layout}/output/${HTMLfile}`), encodedEntitiesHTML, 'utf8', (error2) => {
          if (error2) throw error2;
        });
          
        // 브라우저에 콘텐츠 출력
        response.end(renderedHTML, 'utf-8');
      });
    })
    .catch((e) => {
      throw e;
    });
  });
}

module.exports = router;
```

환경변수를 설정한 ```.env``` 파일의 내용은 아래와 같다.

```
HOST=localhost
PORT=9999
SUB_PAGE_ROOT="projectA"
SUB_PAGE_HTML_PATH="foo/bar"
SUB_PAGE_VIEW="#view"
```

예를 들어, ```http://localhost:port/sub0101.html```에 접속 시 서브레이아웃과 서브페이지 내용이 합쳐진 결과물이 브라우저에 출력된다.

## 후기

반복되는 레이아웃을 include 처리를 하지 않은 채 서브페이지 내용을 작업하다보니 불편함을 느끼기 일쑤였고, 결국 Node.js로 그럭저럭 쓸만한(?) 물건을 만들어서 실무에 테스트해보는 데까지 2달은 걸렸던 것 같다.. 특유의 귀차니즘과 바쁜 생활까지 겹쳐서 2달.. 게으름을 극복했으면 1달이면 마무리했을 수 있을 것 같았다.

현재 진행 중인 프로젝트에 적용했고, 작업이 굉장히 간편해졌다. 지속적으로 코드 품질을 개선해나갈 예정이고, 후기도 업데이트할 것이다.
