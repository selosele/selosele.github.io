---
layout: post
comments: true
title: "레이어팝업 닫기버튼의 논리적 순서상 위치, 어느 곳이 바람직한가?"
subtitle:
header:
    overlay_image: /assets/images/thumb/html_thumb01.jpg
    overlay_filter: 0.4
    image_link: https://pixabay.com/ko/illustrations/html5-html-%ED%8C%8C%EC%9D%BC-%ED%98%95%EC%8B%9D-386614/
    image_author: geralt
date: 2020-11-23 21:14
categories:
    - 퍼블노트
tags:
    - html
    - web-accessibility
post_dropcap: false
primary_post: true
---

누구나 제목과 같은 의문을 가져본 적이 있을지도 모른다. 말 그대로 어느 곳이 바람직한 위치인가? 먼저 예시를 보자.

<p class="codepen" data-height="265" data-theme-id="default" data-default-tab="html,result" data-user="selucky" data-slug-hash="vYGOgZB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Tabbable element keyboard event pure JS">
  <span>See the Pen <a href="https://codepen.io/selucky/pen/vYGOgZB">
  Tabbable element keyboard event pure JS</a> by sel (<a href="https://codepen.io/selucky">@selucky</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

JS는 [일전에 초점 이동을 레이어팝업 내에서만 돌게 하려고 짰었던 JS](/2020/08/09/vanila-js-modal-keyboard-event/)이고 본문과 관계없으니 무시해도 됨.  
위 예시에서 닫기버튼은 레이어팝업의 최상단에 위치해 있다. 개인적인 생각으로 논리적인 구조에 맞게 구성해야 된다고 생각해서 저렇게 짠 것이고, 현재까지도 유효하다고 생각한다.

반대로, 닫기버튼이 최하단에 있어야 된다 가정하고 퍼블리싱을 할 시, 닫기버튼을 position: absolute로 상단 구석에 띄우는 방법이 사용된다.

그래서 글을 좀 찾아봤는데, 나름 괜찮은 것들을 발견할 수 있었다. 내용 요약을 해보자면,

**1. 마지막에 위치하는 게 바람직하다.**

> 마크업 상 레이어 팝업의 제일 마지막에 배치하시는 것이 바람직합니다.
>
> 이것은 키보드 사용자 혹은 스크린리더 사용자가 레이어 팝업을 이용할 때 불편함이 없도록 하기 위함인데요. 레이어 팝업을 탐색할 때 가장 마지막 탭이 닫기 버튼에 있으면 레이어 팝업 내의 콘텐츠를 모두 확인한 후 닫기 버튼에 도달하게 되고 이 때 레이어 팝업을 닫으면 콘텐츠를 확인하지 못하는 경우를 방지할 수 있고 닫기 버튼을 찾으러 콘텐츠를 다시 거슬러 올라갈 필요가 없다는 장점이 있기 때문입니다.
> 
> <cite><a href="https://www.wah.or.kr:444/Participation/consultingView.asp?cType=&seq=7687&page=200?cType=&FindTxt=&cMail=" target="_blank">출처</a></cite>

사용자가 팝업 내의 콘텐츠를 모두 읽은 후 닫기 버튼을 찾으러 콘텐츠를 닫시 거슬러 올라가는 게 불편할 수 있다는 입장에서 쓰인 글이다.

> 최근 심사기준과 제 경험상으로 말씀드리면, 마지막에 위치해있는게 더 적합할 거 같네요.  
내가 한 행위에 대한 결과값으로 봐야 하지 않나 싶습니다. 결국 팝업이 떴다는 건 이미 팝업을 실행시키는 버튼에서, 레이어팝업으로 실행 &lt;&lt; 타이틀을 제공했을거고, 그 행위에 대한 결과값을 팝업으로 받았는데, 다음 내용이 팝업에 대한 내용 전달이 아닌, 팝업닫기에 위치해있으면 결과값에 대한 혼동이 있을 수 있습니다.
> 
> 그리고 팝업이 떴을 경우 포커스는 그 해당 레이어 안에서만 루핑이 되어야 하기 때문에, 1번 컨텐츠에 도달했다고 해도 Shift + Tab으로 마지막 탭으로도 이동을 할 수 있습니다.
> 
결국 첫번째 컨텐츠에서 바로 닫기로 이동도 가능하다라는 말이 되는셈이죠. 결국 초점은 팝업을 닫는 닫기버튼으로 다시 이동하는 불편함이 있냐 없냐가 아니라 유저의 행위에 대한 답변제공이 먼저고, 그 이후 닫기에 대한 기능에 접근이 가능한가 아닌가를 봐야 하지않나 생각이 듭니다.
> 
> <cite><a href="https://cafe.naver.com/hacosa/252854" target="_blank">출처</a></cite>

이 글의 핵심은, 사용자는 내가 한 행위에 대한 결과로서 팝업 내 콘텐츠를 먼저 읽을 수 있으며, 팝업 내 첫 번째 콘텐츠에서 Shift + Tab 키로 마지막에 있는 닫기버튼으로 초점 이동이 가능해야 하므로, 버튼을 찾아 아래로 거슬러 내려가야 하는 불편함은 의미없다는 게 핵심이다.

근데 팝업 내 콘텐츠를 탐색 중 닫기버튼으로 가려고 Tab키나 Shift + Tab 키를 몇 번이나 눌러야 할지 예측할 수 없다는 게 내 생각이다. 콘텐츠 양이 얼마나 될지 알 수 없기 때문이다. 그래서 대안이 필요한데, 조금 있다가 이야기해보겠다.

사실 어디에 위치해 있든 내가 말하는 대안이 제공되지 않으면 불편할 수 밖에 없다.

**2. 어디에 위치하든 상관없다.**

> 무조건 닫기버튼부터 나오게 하면 된다는 이야기가 아닙니다. 레이어 팝업이 뜨는 시점의 포커스 바로 그 다음이 되어야 합니다. 정답은 단 하나가 아닙니다. 눈의 흐름과 키보드의 흐름이 동일하게 진행되면 됩니다. 그걸 우선적으로 염두하시기 바랍니다.
> 
> <cite><a href="https://www.wah.or.kr:444/Participation/consultingView.asp?cType=TC&seq=5074&page=1?cType=TC&FindTxt=&cMail=" target="_blank">출처</a></cite>

&ldquo;레이어 팝업이 뜨는 시점의 포커스 바로 그 다음이 되어야 한다&rdquo;는 부분이 조금 난해하지만(내가 이해를 못하는 것일 확률이 90%..) 정답은 없으며, 눈의 흐름과 키보드의 흐름이 동일하게 진행되는 것을 염두에 둬야 한다는 게 핵심이다.

내가 동의하는 글이기도 한데, 눈의 흐름과 키보드의 흐름이 동일하게 진행되어야 한다는 게, 즉 논리적인 흐름에 맞게 구성해야 함을 나타낸다고 볼 수 있다. 그렇다고 무조건 최상단에 둬야 된다고 생각하는 건 아니며 모두에게 충족될 수 있는 대안이 제공되면 어디에 위치해 있든 상관없다고 생각한다.

---

어느 글을 봐도 어디에 위치해야 한다고 딱 잘라 말하는 이들은 볼 수 없었다.  
사실 최상단에 있는 버튼을 찾으러 콘텐츠를 거슬러 올라가야 하는 불편함이나, 최하단에 있는 버튼을 찾으러 거슬러 내려가야 하는 불편함이나 서로 같다.

그렇다면 어디에 위치해 있든 모두에게 불편하지 않은 환경을 제공하려면 어떻게 해야 하는가? 아까 말했던 대안에 대해 풀어보자면,

## 대안

키보드 단축키를 이용한 레이어팝업 닫기 기능을 제공하면 모두에게 충족될 수 있는 환경이 만들어질 것이다. Esc키가 가장 바람직하다고 보는데, 뭔가를 닫을 때 Esc키를 누르는 게 일반적이기 때문임.

해당 기능이 제공되면, 최상단으로 버튼을 찾아 거슬러 올라갈 필요도 없고, 실수로 팝업을 열어서 최하단으로 버튼을 찾아 거슬러 내려갈 필요도 없다.

뭐든 딱 잘라서 이게 옳다 저건 틀렸다를 논하는 것보단 대안을 찾는 게 중요하다고 본다.

---

**참고 링크**

* [레이어팝업 닫기버튼 논리적 위치](https://www.wah.or.kr:444/Participation/consultingView.asp?cType=&seq=7687&page=200?cType=&FindTxt=&cMail=){:target="_blank"} - 웹 접근성 연구소
* [레이어팝업 닫기 버튼 논리적구조위치](https://www.wah.or.kr:444/Participation/consultingView.asp?cType=TC&seq=5074&page=1?cType=TC&FindTxt=&cMail=){:target="_blank"} - 웹 접근성 연구소
* [접근성 닫기버튼 위치(마크업 순서) 질문드립니다.](https://cafe.naver.com/hacosa/252854){:target="_blank"} - 하드코딩하는 사람들
* ["더" 접근 가능한 Modal Window(Dialog)](https://mulder21c.github.io/modal-dialog/#%EB%8D%94-%EC%A0%91%EA%B7%BC-%EA%B0%80%EB%8A%A5%ED%95%9C-modal-window){:target="_blank"}