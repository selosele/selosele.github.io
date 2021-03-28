"use strict";

// IE 체크
(function(el) {
    // 11 ~ 9
    if (window.navigator.userAgent.toLowerCase().indexOf("trident") > -1) {
        el.className += " only-ie";
        document.getElementById("ie-alert").removeAttribute("aria-hidden");
    }

    // 10 이하
    if (navigator.userAgent.indexOf("MSIE") >= 0) {
        el.className += " lte-ie10";
        document.getElementById("ie-version-txt").innerHTML = "IE 브라우저 10 버전 이하를 <strong>지원하지 않습니다.</strong>";
    }
})(document.documentElement);

// 이미지 에러 처리
document.addEventListener('DOMContentLoaded', function() {
    var imgList = document.querySelectorAll('img');
    if (imgList.length) {
        for (var i = 0; i < imgList.length; i++) {
            imgList[i].addEventListener('error', function() {
                this.parentElement.classList.add('has-error-img');
            });
        }
    }
});

// 메인 메뉴
(function() {
    var masterRoot = document.documentElement,
        menuWrapper = document.getElementById("side-menu"),
        layer = document.getElementById("primary-nav"),
        outerList = document.querySelectorAll("#skip-links, #ie-alert, #masthead, #content, #mastfoot"),
        openBtn = document.querySelector(".nav__menu-open"),
        closeBtn = layer.querySelector(".menu__close"),
        tabbableList = layer.querySelectorAll("button, input, [href], [tabindex]:not([tabindex='-1'])"),
        tabbableListFirst = tabbableList.length && tabbableList[0],
        tabbableListLast = tabbableList.length && tabbableList[tabbableList.length - 1],
        categoryAncList = layer.querySelectorAll("a[href^='/category-list/#']");

    function handlerCloseClick() {
        document.removeEventListener("keydown", handlerCloseKeydown);
        closeBtn.blur();
        closeBtn.setAttribute("aria-expanded", "false");
        openBtn.setAttribute("aria-expanded", "false");
        openBtn.focus();
        menuWrapper.setAttribute("aria-hidden", "true");
        layer.classList.remove("menu__layer--animate");
        masterRoot.classList.remove("layer-opened");

        for (var i = 0; i < outerList.length; i++) {
            outerList[i].removeAttribute("aria-hidden");
        }

        setTimeout(function() {
            menuWrapper.classList.remove("side-menu--active");
        }, 400);
    }

    function handlerCloseKeydown(event) {
        var keyType = event.key;

        if (menuWrapper.classList.contains("side-menu--active") && (keyType === "Escape" || keyType === "Esc")) {
            handlerCloseClick();
        }
    }

    function handlerOpenClick(event) {
        event.currentTarget.setAttribute("aria-expanded", "true");
        closeBtn.setAttribute("aria-expanded", "true");
        menuWrapper.setAttribute("aria-hidden", "false");
        menuWrapper.classList.add("side-menu--active");
        masterRoot.classList.add("layer-opened");

        setTimeout(function() {
            layer.classList.add("menu__layer--animate");
        });
        
        for (var i = 0; i < outerList.length; i++) {
            outerList[i].setAttribute("aria-hidden", "true");
        }

        tabbableListFirst.focus();
        tabbableListFirst.addEventListener("keydown", function(event) {
            if (event.shiftKey && event.key === "Tab") {
                event.preventDefault();
                tabbableListLast.focus();
            }
        });

        tabbableListLast.addEventListener("keydown", function(event) {
            if (!event.shiftKey && event.key === "Tab") {
                event.preventDefault();
                tabbableListFirst.focus();
            }
        });

        document.addEventListener("keydown", handlerCloseKeydown);
    }

    openBtn.addEventListener("click", handlerOpenClick);
    closeBtn.addEventListener("click", handlerCloseClick);
    menuWrapper.addEventListener("click", function(event) {
        if (event.target === event.currentTarget) handlerCloseClick();
    });

    for (var i = 0; i < categoryAncList.length; i++) {
        if (document.querySelector(".layout--categories")) {
            categoryAncList[i].addEventListener("click", handlerCloseClick);
        }
    }
})();

// scroll indicator UI
window.addEventListener("scroll", function() {
    if (!document.querySelector(".layout--post")) return;

    var window_height = document.body.scrollHeight - window.innerHeight,
        scroll_value = ((window.pageYOffset) / window_height) * 100;

    document.getElementById("scroll-indicator").style.width = scroll_value + "%";
});

// 페이지 헤더 타이틀 링크
(function() {
    var postRoot = document.getElementById("page-content");
    if (postRoot) {
        // 헤더 타이틀 링크 생성
        var h_list = postRoot.querySelectorAll("h2, h3, h4, h5, h6");

        for (var i = 0; i < h_list.length; i++) {
            var h = h_list[i],
                h_id = h.id,
                h_txt = h.textContent,
                h_anc = document.createElement("a");

            if (h_id) {
                h_anc.href = "#" + h_id;
            } else {
                h.id = h_txt.replace(/ /g, "-");
                h_anc.href = "#" + h_txt.replace(/ /g, "-");
            }

            h_anc.title = h_txt.replace(/-/g, " ");
            h_anc.classList.add("page__header-link");
            h.insertBefore(h_anc, h.firstChild);
        }

        // 헤더 타이틀 링크 클릭(또는 새로고침) 시 hash값과 매칭되는 목차 anchor로 스크롤
        var toc = document.querySelector(".toc-wrapper");
        if (toc) {
            var h_linkList = postRoot.querySelectorAll(".page__header-link");

            var scrolltoTocAnchor = function(parentEl, selfEl) {
                parentEl.querySelector("[href='"+decodeURI(selfEl.hash)+"']").scrollIntoView(true);
            };

            for (var i = 0; i < h_linkList.length; i++) {
                h_linkList[i].addEventListener("click", function() {
                    scrolltoTocAnchor(toc, this);
                });
            }

            if (location.hash) scrolltoTocAnchor(toc, location);
        }
    }
})();

// abbr 태그 - 툴팁 생성
(function() {
    var abbrList = document.querySelectorAll("abbr[title]"), abbrList_current;
    if (abbrList.length) {
        for (var i = 0; i < abbrList.length; i++) {
            var abbr = abbrList[i];
            abbr.addEventListener("click", handlerClick);
            abbr.addEventListener("keydown", handlerKeydown);
        }
    }

    document.addEventListener("click", handlerWindowClickClose);
    document.addEventListener("touchstart", handlerWindowClickClose);

    for (var i = 0; i < abbrList.length; i++) {
        var abbr = abbrList[i],
            _span = document.createElement("span"),
            _title = "tooltip"+i+"-" + encodeURI(abbr.title).replace(/ /g, "0").replace(/%/g, "1");

        abbr.setAttribute("aria-describedby", _title);
        abbr.setAttribute("tabindex", 0);

        _span.hidden = true;
        _span.setAttribute("role", "tooltip");
        _span.id = _title;
        _span.textContent = abbr.title;
        _span.classList.add("abbr__tooltip");
        abbr.appendChild(_span);
    }

    var tooltipList = document.querySelectorAll(".abbr__tooltip");
    
    function handlerClick(event) {
        if ((event.target === event.currentTarget) || event.key === "Enter") {
            abbrList_current = event.currentTarget;
            
            var tooltip = abbrList_current.querySelector(".abbr__tooltip");

            if (!tooltip.classList.contains("abbr__tooltip--active")) {
                tooltip.hidden = false;
                tooltip.setAttribute("tabindex", 0);
                tooltip.classList.add("abbr__tooltip--active");
            } else {
                handlerClickClose(tooltip);
            }
        }
    }

    function handlerKeydown(event) {
        if (event.key === "Enter") handlerClick(event);
    }

    function handlerClickClose(el) {
        el.hidden = true;
        el.setAttribute("tabindex", -1);
        el.classList.remove("abbr__tooltip--active");
        abbrList_current.focus();
    }

    function handlerWindowClickClose(event) {
        for (var i = 0; i < tooltipList.length; i++) {
            var tooltip = tooltipList[i];
            if (event.target.tagName !== "ABBR" && !event.target.classList.contains("abbr__tooltip") && tooltip.classList.contains("abbr__tooltip--active")) {
                handlerClickClose(tooltip);
            }
        }
    }

    if (tooltipList.length) {
        for (var i = 0; i < tooltipList.length; i++) {
            tooltipList[i].addEventListener("click", function() {
                handlerClickClose(this);
            });
        }
    }
})();

// code highlight - 타이틀 정보 생성, 코드 복사 버튼 생성, 특정 line 강조
(function() {
    var postRoot = document.getElementById("page-content");
    if (postRoot) {
        var btnCodeWrapperList = postRoot.querySelectorAll("div.highlighter-rouge");

        Array.prototype.forEach.call(btnCodeWrapperList, function(codeWrapper) {
            // 타이틀 정보 생성
            var _div = document.createElement("div");

            _div.classList.add("highlight__util-wrapper");
            codeWrapper.insertBefore(_div, codeWrapper.firstChild);

            var _lang = codeWrapper.className.replace(/language-|highlighter-rouge/g, ""),
                utilWrapper = codeWrapper.querySelector(".highlight__util-wrapper");

            if (_lang !== "plaintext ") {
                var _span = document.createElement("span");

                _span.textContent = _lang;
                _span.classList.add("highlight__language");
                utilWrapper.insertBefore(_span, utilWrapper.firstChild);
            }

            // 코드 복사 버튼 생성
            var _btn = document.createElement("button");

            _btn.textContent = "복사";
            _btn.classList.add("highlight__copy-button");
            utilWrapper.appendChild(_btn);

            var copyBtn = codeWrapper.querySelector(".highlight__copy-button");
            copyBtn.addEventListener("click", function(event) {
                try {
                    var btn = event.currentTarget,
                        btnCodeWrapper = btn.parentElement.parentElement,
                        codeInner = codeWrapper.querySelector(".lineno") ? btnCodeWrapper.querySelector(".rouge-code > pre") : btnCodeWrapper.querySelector("pre.highlight"),
                        _textarea = document.createElement("textarea");

                    _textarea.setAttribute("readonly", true);
                    _textarea.setAttribute('contenteditable', true);
                    _textarea.classList.add("sr-only");
                    _textarea.value = codeInner.textContent;

                    btn.parentElement.appendChild(_textarea);

                    _textarea.select();

                    var _range = document.createRange();
                    _range.selectNodeContents(_textarea);

                    var _selection = window.getSelection();
                    _selection.removeAllRanges();
                    _selection.addRange(_range);

                    _textarea.setSelectionRange(0, _textarea.value.length);
                    document.execCommand("copy");
                    btn.textContent = "복사됨";
                } catch(error) {
                    alert("복사에 실패했습니다.");
                } finally {
                    btn.parentElement.removeChild(_textarea);
                    btn.focus();
                }
            });

            // 특정 line 강조
            if (codeWrapper.hasAttribute("data-line") && codeWrapper.querySelector(".lineno")) {
                var numbers = codeWrapper.querySelector(".lineno"),
                    _line = codeWrapper.getAttribute("data-line").split("-")[0],
                    _lineLast = codeWrapper.getAttribute("data-line").split("-")[1];

                if ((numbers !== _line) && !numbers.querySelector("span")) {
                    numbers.innerHTML = numbers.innerHTML.replace(_line, '<span id='+"code-line"+_line+'>'+_line+'</span>');
                }

                if (numbers !== _lineLast) {
                    numbers.innerHTML = numbers.innerHTML.replace(_lineLast, '<span id='+"code-line"+_lineLast+'>'+_lineLast+'</span>');
                }

                var _bg = document.createElement("span"),
                    numList = codeWrapper.querySelectorAll("[id='"+"code-line"+_line+"']"),
                    numFirst = numList[0],
                    numLast = numFirst.nextElementSibling,
                    codeInner = codeWrapper.querySelector("pre.highlight");

                _bg.setAttribute("aria-hidden", "true");
                _bg.classList.add("highlight__bg");
                codeInner.insertBefore(_bg, codeInner.firstChild);
                
                var setBgPos = function(firstNum, lastNum) {
                    var firstPos = firstNum.offsetTop;

                    _bg.style.top = firstPos + 13 + "px";

                    if (_lineLast) {
                        var lastPos = lastNum.offsetTop,
                            resultHeight = (lastPos - firstPos) + parseInt(getComputedStyle(lastNum, null).lineHeight);
                            
                        codeWrapper.querySelector(".highlight__bg").style.height = resultHeight + "px";
                    }
                };
                setBgPos(numFirst, numLast);

                window.addEventListener("resize", function() {
                    setBgPos(numFirst, numLast);
                });
            }
        });
    }
})();

// 포스트 archive 아코디언
(function() {
    var handlerClick = function(event) {
        var btn = event.currentTarget,
            accordion = document.querySelector("[aria-labelledby="+btn.id+"]");

        if (accordion.classList.contains("archive__list--active")) {
            accordion.classList.remove("archive__list--active");
            accordion.hidden = true;
            accordion.setAttribute("tabindex", -1);
            btn.classList.remove("archive__btn--active");
            btn.setAttribute("aria-expanded", "false");
        } else {
            accordion.classList.add("archive__list--active");
            accordion.hidden = false;
            accordion.setAttribute("tabindex", 0);
            btn.classList.add("archive__btn--active");
            btn.setAttribute("aria-expanded", "true");
        }
    },
    btnList = document.querySelectorAll(".archive__btn");

    if (btnList.length) {
        for (var i = 0; i < btnList.length; i++) {
            btnList[i].addEventListener("click", handlerClick);
        }
    }
})();