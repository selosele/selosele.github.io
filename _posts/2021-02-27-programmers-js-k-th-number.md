---
layout: post
comments: true
title: "Programmers 알고리즘 문제풀이 - 정렬 Level 1 K번째수"
header:
    overlay_image: /assets/images/thumb/js_thumb01.jpg
    overlay_filter: 0.4
    image_position-y: 57%
    image_link: https://pixabay.com/ko/photos/%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8-%EC%BD%94%EB%93%9C-4523100/
    image_author: Alltechbuzz
date: 2021-02-27 22:51
categories:
    - 퍼블노트
tags:
    - javascript
    - algorithm
    - programmers
post_dropcap: false
---

Javascript 알고리즘 문제를 풀어보고 싶어서 Programmers 코딩테스트에 도전.. 역시 나 답게(?) 몇 시간의 삽질 끝에 답을 구했다.

## 문제 설명

![문제 설명](/assets/images/post/programmers-js-k-th-number_img01.png)

## 나의 풀이

처음에는 ```array```의 길이만큼 for문을 돌리고 또 ```commands```의 길이만큼 반복하는 중첩 for문을 돌려서 slice, sort 함수를 사용하는 쪽으로 해결하려 했었고, 당연히 삽질만 반복할 뿐이었다. 결국 for문 없이 ```forEach``` 함수로 해결.. 다른 것보다 ```sort``` 함수에 대해 더 알아보고 이해되었던 문제 풀이였다고 느낀다.

```javascript
function solution(array, commands) {
    let answer = [];
    
    commands.forEach(a => {
        const arr = array.slice(a[0] - 1, a[1]).sort((a, b) => a - b);
        answer.push(arr[a[2] - 1]);
    });
    
    return answer;
}
solution([1, 5, 2, 6, 3, 7, 4], [[2, 5, 3], [4, 4, 1], [1, 7, 3]]);
```

결과 채점 후 타인의 풀이를 보니 나는 그동안 뭐 했나 싶을 정도...