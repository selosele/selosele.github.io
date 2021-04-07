---
layout: post
comments: true
title: "Programmers SQL 문제풀이 4"
subtitle: "GROUP BY Level 2 입양 시각 구하기(1)"
date: 2021-04-07 22:13
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

![문제 설명](//cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/post/programmers-sql-59412_img01.png)

## 나의 풀이

MySQL로 먼저 풀어봤음.

```sql
SELECT HOUR(DATETIME) AS HOUR, COUNT(DATETIME) AS COUNT
FROM ANIMAL_OUTS
WHERE HOUR(DATETIME) BETWEEN 9 AND 20
GROUP BY HOUR(DATETIME)
ORDER BY HOUR(DATETIME)
```

타인의 풀이를 찾아보니 좀 더 간결하게 쓸 수 있는 방법이 있어서 다음과 같이 수정해봄.

```sql
SELECT HOUR, COUNT(*) AS COUNT
FROM (
    SELECT HOUR(DATETIME) AS HOUR
    FROM ANIMAL_OUTS
) A
WHERE HOUR BETWEEN 9 AND 20
GROUP BY HOUR
ORDER BY HOUR
```

서브쿼리라는 것에 대해 알게 되었는데, 하나의 SQL문 안에 포함된 또 다른 SQL문을 말하는 것이라고 한다.

서브쿼리를 이용해서 중복되는 ```HOUR```{:.language-sql} 함수를 한 번만 쓸 수 있다. 서브쿼리의 별칭(Alias)이 없으면 에러가 나서 임의로 별칭을 ```A```라고 지정해줬음. Oracle은 ```HOUR```{:.language-sql} 함수 대신 ```TO_CHAR```{:.language-sql} 함수를 이용, ```TO_CHAR(컬럼명, 'HH24')``` 과 같은 방식으로 쓰면 됨.