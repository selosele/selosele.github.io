---
layout: post
comments: true
title: "Programmers SQL 문제풀이 3"
subtitle: "SUM, MAX, MIN Level 2 중복 제거하기"
date: 2021-04-01 23:18
categories:
    - 취미
tags:
    - SQL
    - Algorithm
    - programmers
post_dropcap: false
home_dropcap: false
---

## 문제 설명

![문제 설명](//cdn.jsdelivr.net/gh/selosele/selosele.github.io/assets/images/post/programmers-sql-59408_img01.png)

## 나의 풀이

아래는 처음 시도했었던 방법이다.

```sql
SELECT DISTINCT COUNT(NAME)
FROM ANIMAL_INS
WHERE NAME NOT IN('NULL')
```

오답이라길래 계속 검색해봤는데

```sql
SELECT COUNT(DISTINCT NAME) AS COUNT
```

잘못된 ```DISTINCT```{:.language-sql}절 사용 문제였다 -_- 그리고 선택 사항이지만, ```AS```{:.language-sql}절을 사용하여 문제 설명의 컬럼명까지 일치하게 해주면 좋음.

```sql
WHERE NAME IS NOT NULL
```

채점 후 타인의 풀이를 찾아보니 ```IN```{:.language-sql}절 대신 ```IS NULL```{:.language-sql}절을 사용한 풀이도 제법 있었다. 전자는 배열 형식으로서 여러 값을 포함할 수 있고, 후자는 그 반대일뿐만 아니라 애초에 비어 있는 값을 찾기 위함이라고 한다.