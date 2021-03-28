---
layout: post
comments: true
title: "Programmers SQL 문제풀이 1"
subtitle: "SELECT Level 1 여러 기준으로 정렬하기"
date: 2021-03-20 21:24
categories:
    - 취미
tags:
    - sql
    - algorithm
    - programmers
post_dropcap: false
home_dropcap: false
---

심심풀이 겸 자기개발용으로 Programmers SQL 테스트를 풀어보았다.

## 문제 설명

![문제 설명](https://cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/post/programmers-sql-59404_img01.png)

## 나의 풀이

MySQL과 Oracle로 풀 수 있게 구성되어 있는데, 해당 테스트는 MySQL과 Oracle 모두 정답이 똑같음.

```sql
SELECT ANIMAL_ID, NAME, DATETIME
FROM ANIMAL_INS
ORDER BY NAME, DATETIME DESC
```

처음에는 "이름이 같은 경우"라는 말을 좀 어렵게 생각해서 ```WHERE NAME = NAME```{:.language-sql} 같은 말도 안되는 쿼리도 작성했었음.. 그냥 날짜 컬럼을 역순으로 정렬하면 끝인 것을..