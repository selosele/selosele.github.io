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
        if (elem[i].getBoundingClientRect().width > elem[i].getBoundingClientRect().height) {
            elem[i].classList.add("image--horizontal");
        } else {
            elem[i].classList.add("image--vertical");
        }
    }
};

// inline 요소 여백 제거
var removeWhiteSpace = function(parentElem) {
    if (!parentElem) return;

    for (var i = 0; i < parentElem.length; i++) {
        Array.prototype.slice.call(parentElem[i].childNodes).forEach(function(childElem) {
            if (childElem.nodeType === 3) parentElem[i].removeChild(childElem);
        });
    }
};