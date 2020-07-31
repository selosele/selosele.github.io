/* ==========================================================================
   재사용 가능한 함수 모음
   ========================================================================== */

// anchor href와 현재 url 일치할경우 aria-current="page" 속성 추가
function anchorSetAriaCurrent(anchorNode) {
    if (!anchorNode) return;

    for (var i = 0; i < anchorNode.length; i++) {
        if (anchorNode[i].getAttribute("href") === location.href) {
            anchorNode[i].setAttribute("aria-current", "page");
        }
    }
}

// inline 요소 여백 제거
function removeWhiteSpace(elem) {
    $(elem).contents().filter(function() {
        if (this.nodeType === 3) return (!/\S/.test(this.nodeValue));
    }).remove();
}

// 이미지 정렬
function alignImg(elem) {
    if (!elem) return;

    for (var i = 0; i < elem.length; i++) {
        var img_w = elem[i].clientWidth,
            img_h = elem[i].clientHeight;

        if (img_w > img_h) {
            elem[i].classList.remove("image--vertical");
            elem[i].classList.add("image--horizontal");
        } else {
            elem[i].classList.remove("image--horizontal");
            elem[i].classList.add("image--vertical");
        }
    }
}