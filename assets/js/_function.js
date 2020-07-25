/* ==========================================================================
   재사용 가능한 함수 모음
   ========================================================================== */

/* 일반 함수 */
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

// 빈 요소 제거
function emptyElemRemove(elem) {
    removeWhiteSpace(elem);
    
    $(elem).each(function() {
        if ($(this).is(":empty")) $(this).remove();
    });
}

/* jQuery custom 함수 */
(function($) {

    // 한글 체크
    $.fn.checkKor = function(cls) {
        return this.each(function() {
            var kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
            if (!kor.test($(this).text())) $(this).addClass(cls);
        });
    }

    // 이미지 정렬
    $.fn.alignImg = function() {
        return this.each(function() {
            var img = $(this).find("img"),
                imgW = img.width(),
                imgH = img.height();

            if (imgW > imgH) {
                img.removeClass("image--vertical").addClass("image--horizontal");
            } else {
                img.removeClass("image--horizontal").addClass("image--vertical");
            }
        });
    }
    
})($);