/* ==========================================================================
   재사용 가능한 함수 모음
   ========================================================================== */

// anchor href와 현재 url 일치할경우 aria-current="page" 속성 추가
var anchorSetAriaCurrent = function(anchorNode) {
    if (!anchorNode) return;

    for (var i = 0; i < anchorNode.length; i++) {
        if (anchorNode[i].getAttribute("href") === location.href) {
            anchorNode[i].setAttribute("aria-current", "page");
        }
    }
};

// 이미지 정렬
var alignImg = function(elem) {
    if (!elem) return;

    for (var i = 0; i < elem.length; i++) {
        var img_w = elem[i].getBoundingClientRect().width,
            img_h = elem[i].getBoundingClientRect().height;

        if (img_w > img_h) {
            elem[i].classList.remove("image--vertical");
            elem[i].classList.add("image--horizontal");
        } else {
            elem[i].classList.remove("image--horizontal");
            elem[i].classList.add("image--vertical");
        }
    }
};

// inline 요소 여백 제거
var removeWhiteSpace = function(elem) {
    if (!elem) return;

    $(elem).contents().filter(function() {
        if (this.nodeType === 3) return (!/\S/.test(this.nodeValue));
    }).remove();
};