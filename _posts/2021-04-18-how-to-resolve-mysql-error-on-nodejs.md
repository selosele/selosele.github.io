---
redirect_from: /2021/04/18/how-to-resolve-error-mysql-on-nodejs/
layout: post
comments: true
title: "Node.js에서 MySQL 연동 오류 해결"
header:
    overlay_image: //cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/thumb/nodejs_thumb01.jpg
    overlay_filter: 0.4
    image_link: https://pixabay.com/ko/vectors/%EB%85%B8%EB%93%9C-js-%EB%A1%9C%EA%B3%A0-nodejs-736399/
    image_author: CopyrightFreePictures
date: 2021-04-18 17:59
categories:
    - 퍼블노트
tags:
    - Node.js
    - MySQL
post_dropcap: false
home_dropcap: false
---

최근 SQL 학습을 위해 Node.js에 MySQL을 연동하던 중 오류가 발생하였다. 테이블의 모든 컬럼을 조회하기 위해 작성한 아래 js 파일을 실행한 결과

```javascript
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'mydb',
  port: '13306',
});

connection.connect();

connection.query('SELECT * FROM mydb', (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
```

다음과 같은 에러메시지가 터미널에 출력된다.

```
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

검색을 해보니 비밀번호 설정 문제라는 의견이 있었고, 혹시 Node.js와 MySQL을 연동하려 설치한 MySQL 계정의 비밀번호와 일전에 세팅해둔 apmsetup의 MySQL 비밀번호가 충돌이 나서 그런건가 싶었다. 애초에 apmsetup을 세팅했는데 MySQL을 또 설치한 바보 같은 나님 같으니.. 너무 오래되서 까먹고 있었나보다.

```
ALTER USER '[username]'@'[host]' IDENTIFIED WITH mysql_native_password BY '[password]';
flush privileges;
```

위 명령어를 실행해도 안되서 아래 절차를 실행, 해결을 하였다.

1. MySQL installer 실행
2. MySQL Server - Reconfigure 클릭
3. Authentication Method &rarr; Use Legacy.. 체크

## 오류의 원인

원인을 요약하자면, MySQL 8부터 기본 인증 프로토콜이 기존의 **mysql_native_password**에서 **caching_sha2_password**로 변경되었고, 기존의 방식을 지원하지 않게 되서 발생한 문제라고 한다. 자세한 내용은 맨 하단에 기재해둔 링크의 아티클을 참고하면 된다.

## 참고

- [Node.js에서 MySQL 연동 실패 해결 (MySQL 8)](https://calvinjmkim.tistory.com/53){:target="_blank"}
