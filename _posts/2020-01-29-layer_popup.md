---
layout: post
comments: true
title: "레이어팝업에 접근성을 불어넣다"
excerpt: "접근성이 충분히 보장된 레이어팝업"
header:
  overlay_image: /assets/images/thumb/default_thumb04.png
  overlay_filter: 0.3
date: 2020-01-29 22:14
categories:
    - javascript
    - web-accessibility
    - ui
tags:
    - javascript
    - jquery
    - web-accessibility
    - ui
---
블로그에 사용할 레이어팝업을 만들면서, 웹 접근성이 충분히 보장되도록 작업을 하였다. 궁금하다면 <a href="/styleguide" class="bu-link2">스타일가이드 페이지</a>에 있는 레이어팝업을 테스트해볼 수 있음.

코드는 다음과 같다.

## HTML
```html
<!-- 레이어 열기 버튼 -->
<button type="button" class="open_lp" aria-controls="lp1">open</button>

<!-- 레이어 팝업 -->
<div class="layer_pop" id="lp1" role="dialog" aria-modal="true" aria-labelledby="lpTit_example">
  <div class="inner">
    <h2 id="lpTit_example">레이어 타이틀</h2>
    <p>내용</p>
  </div>
</div>
```
role이나 aria- 로 시작하는 속성들에 대해선 wai-aria를 찾아보길 권하며, 마크업에 대한 설명은 딱히 적지 않을 것임. 이 글을 보고 있는 이들 대부분은 많이 알고 있을 것이라 생각하므로(나만 이렇게 생각하나)..

## Javascript
```javascript
$(".open_lp").on("click", function() {
    var op = $(this);
    var lp = $("#" + $(this).attr("aria-controls"));
    var lpObj = lp.children(".inner");
    var lpObjTabbable = lpObj.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
    var lpObjTabbableFirst = lpObjTabbable.first();
    var lpObjTabbableLast = lpObjTabbable.last();
    var lpOuterObjHidden = $(".skip-links, .masthead, .initial-content, .search-content, .page__footer");
    var all = $(".masthead, .page__footer").add(lp);
    var tabDisable;
    var nowScrollPos = $(window).scrollTop(); // 현재 스크롤 위치
    $("body").css("top", - nowScrollPos).addClass("scrollOff").on("scroll touchmove mousewheel", function(event){
        event.preventDefault(); // iOS 레이어 열린 상태에서 body 스크롤되는 문제 fix
    });

    function lpClose() { // 레이어 닫기 함수
        $("body").removeClass("scrollOff").css("top", "").off("scroll touchmove mousewheel");
        $(window).scrollTop(nowScrollPos); // 레이어 닫은 후 화면 최상단으로 이동 방지
        if (tabDisable === true) lpObj.attr("tabindex", "-1");
        all.removeClass("on");
        lpOuterObjHidden.removeAttr("aria-hidden");
        op.focus(); // 레이어 닫은 후 원래 있던 곳으로 초점 이동
    }

    $(this).blur();
    all.addClass("on");        
    lpOuterObjHidden.attr("aria-hidden", "true"); // 레이어 바깥 영역을 스크린리더가 읽지 않게
    lpObjTabbable.length > 0 ? lpObjTabbableFirst.focus().on("keydown", function(event) { 
        // 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
        var k = event.keyCode || event.which;
        if (event.shiftKey && k === 9) {
            // Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
            event.preventDefault();
            lpObjTabbableLast.focus();
        }
    }) : lpObj.attr("tabindex", "0").focus().on("keydown", function(event){
        var k = event.keyCode || event.which;
        tabDisable = true;
        if (k === 9) event.preventDefault();
        // Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
    });
    lpObjTabbableLast.on("keydown", function(event) {
        var k = event.keyCode || event.which;
        if (!event.shiftKey && k === 9) {
            // Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
            event.preventDefault();
            lpObjTabbableFirst.focus();
        }
    });
    lp.on("click", function(event){
        if (event.target !== event.currentTarget) return; {
            // 반투명 배경 클릭 시 레이어 닫기
            lpClose();
        }
    });
    $(window).on("keydown", function(event) {
        var k = event.keyCode || event.which;
        switch (k) {
        case 27:
            // Esc키 : 레이어 닫기
            if (lp.hasClass("on")) {
                lpClose();
            }
            break;
        }
    });
});
```
<div class="cont-box type1 mt--standard">
  <h3 class="cont-box__tit">주요 기능</h3>
  <ol class="bu-list--num type2 mt--standard">
    <li><em class="num">1</em>레이어가 열리면 레이어 바깥 영역(최상단 헤더, 메인콘텐츠, 최하단 푸터 등)을 스크린리더가 읽지 않게 처리</li>
    <li><em class="num">2</em>레이어가 열리면 초점을 받을 수 있는 요소 중 첫번째 요소로 초점 이동
        <ol>
            <li><em class="num">1</em>요소가 없을 경우 타겟 레이어(레이어의 container)로 초점 이동 및 레이어 밖으로 초점 이동이 가지 않게 처리.</li>
        </ol>
    </li>
    <li><em class="num">3</em>초점 받을 수 있는 첫번째 요소에서 Shift + Tab키 누르면 마지막 요소로 초점 이동</li>
    <li><em class="num">4</em>초점 받을 수 있는 마지막 요소에서 Tab키 누르면 첫번째 요소로 초점 이동. 즉 초점 이동이 레이어 내부에서만 돌게 처리.</li>
    <li><em class="num">5</em>검은 반투명 배경 클릭 시 레이어 닫기</li>
    <li><em class="num">6</em>Esc키 클릭 시 레이어 닫기</li>
  </ol>
</div>

레이어가 열리면 초점을 받을 수 있는 첫번째 요소가 초점을 받는 게 개인적으로 맞다고 본다. 타겟 레이어가 먼저 초점을 받아야 한다고 한때 생각했었는데, 타겟 레이어에 초점이 잡혀서 레이어에 진입했다는 걸 시각적으로 알려줄 수 있다는 것이다. 이렇게 구현했었으나, 초점을 받을 수 있는 첫번째 요소에 초점 이동이 되게 하여 사용자로 하여금 더 수월하게 레이어 내부 콘텐츠를 탐색할 수 있게끔 하는 게 맞다고 생각을 바꿔먹고 다시 작업하였음.