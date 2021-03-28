---
layout: post
comments: true
title: "Programmers SQL 문제풀이 2"
subtitle: "SELECT Level 1 상위 n개 레코드"
date: 2021-03-20 23:26
categories:
    - 취미
tags:
    - sql
    - algorithm
    - programmers
post_dropcap: false
home_dropcap: false
---

## 문제 설명

![문제 설명](//cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/post/programmers-sql-59405_img01.png)

## 나의 풀이

MySQL로 먼저 풀어봄.

```sql
SELECT NAME
FROM ANIMAL_INS
ORDER BY DATETIME
LIMIT 1
```

가장 오래된 날짜를 구하려고 역시 삽질 전문가답게 "SQL 날짜 비교법" 어쩌고 저쩌고 같은 키워드로 검색을 했었음.. 어렵게 생각할 필요 없이, 날짜 컬럼 순으로 정렬한다음 원하는 개수 만큼 가져오면 끝이다.

MySQL에선 간단하게 ```LIMIT```{:.language-sql}절을 이용하면 그만이지만 Oracle(12버전 이하)에는 그런 거 없다. Oracle로 실행하는 법을 검색해서 풀어본 결과는 다음과 같다.

```sql
SELECT *
FROM (
  SELECT NAME
  FROM ANIMAL_INS
  ORDER BY DATETIME
)
WHERE ROWNUM = 1
```

Oracle에서 ```SELECT```{:.language-sql}절이 실행되면 ```ROW```{:.language-sql} 한 개당 자동으로 1개의 번호가 생성되며, ```ROWNUM```{:.language-sql}이라고 하는 자동생성번호의 필드명을 사용해서 MySQL의 ```LIMIT```절과 비슷한 쿼리를 흉내낼 수 있다고 한다.

이로써 SELECT 파트의 모든 테스트를 풀었음~