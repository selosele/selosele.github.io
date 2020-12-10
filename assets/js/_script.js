"use strict";

// IE 체크
(function(r) {
    // 11 ~ 9
    if (window.navigator.userAgent.toLowerCase().indexOf("trident") > -1) {
        r.className += " only-ie";
        document.getElementById("ie-alert").removeAttribute("aria-hidden");
    }

    // 10 이하
    if (navigator.userAgent.indexOf("MSIE") >= 0) {
        r.className += " lte-ie10";
        document.getElementById("ie-version-txt").innerHTML = "IE 브라우저 10 버전 이하를 <strong>지원하지 않습니다.</strong>";
    }
})(document.documentElement);

// 메인 메뉴
(function() {
    var rootElement = document.documentElement,
        menuWrapper = document.getElementById("side-menu"),
        menuLayer = document.getElementById("primary-nav"),
        menuOuterList = document.querySelectorAll("#skip-links, #ie-alert, #masthead, #content, #mastfoot"),
        menuELopen = document.querySelector(".nav__menu-open"),
        menuELclose = menuLayer.querySelector(".menu__close"),
        menuTabbableList = menuLayer.querySelectorAll("button, input, [href], [tabindex]:not([tabindex='-1'])"),
        menuTabbableListFirst = menuTabbableList.length && menuTabbableList[0],
        menuTabbableListLast = menuTabbableList.length && menuTabbableList[menuTabbableList.length - 1], menuELFocusedLast,
        menuELcategoryAnc = menuLayer.querySelectorAll("a[href^='/category-list/#']");

    function handlerCloseClick() {
        document.removeEventListener("keydown", handlerCloseKeydown);
        menuELclose.blur();
        menuELclose.setAttribute("aria-expanded", "false");
        menuELopen.setAttribute("aria-expanded", "false");
        menuELopen.focus();
        menuWrapper.setAttribute("aria-hidden", "true");
        menuLayer.classList.remove("menu__layer--animate");
        rootElement.classList.remove("layer-opened");

        for (var i = 0; i < menuOuterList.length; i++) {
            menuOuterList[i].removeAttribute("aria-hidden");
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
        menuELclose.setAttribute("aria-expanded", "true");
        menuWrapper.setAttribute("aria-hidden", "false");
        menuWrapper.classList.add("side-menu--active");
        rootElement.classList.add("layer-opened");

        setTimeout(function() {
            menuLayer.classList.add("menu__layer--animate");
        });
        
        for (var i = 0; i < menuOuterList.length; i++) {
            menuOuterList[i].setAttribute("aria-hidden", "true");
        }

        for (var i = 0; i < menuTabbableList.length; i++) {
            menuTabbableList[i].addEventListener("focus", function(event) {
                menuELFocusedLast = event.currentTarget;
            });
        }

        if (menuELFocusedLast) {
            menuELFocusedLast.focus();
        } else {
            menuTabbableListFirst.focus();
            menuTabbableListFirst.addEventListener("keydown", function(event) {
                if (event.shiftKey && event.key === "Tab") {
                    event.preventDefault();
                    menuTabbableListLast.focus();
                }
            });
        }

        menuTabbableListLast.addEventListener("keydown", function(event) {
            if (!event.shiftKey && event.key === "Tab") {
                event.preventDefault();
                menuTabbableListFirst.focus();
            }
        });

        document.addEventListener("keydown", handlerCloseKeydown);
    }

    menuELopen.addEventListener("click", handlerOpenClick);
    menuELclose.addEventListener("click", handlerCloseClick);
    menuWrapper.addEventListener("click", function(event) {
        if (event.target === event.currentTarget) handlerCloseClick();
    });

    for (var i = 0; i < menuELcategoryAnc.length; i++) {
        if (document.querySelector(".layout--categories") || document.querySelector(".layout--tags")) {
            menuELcategoryAnc[i].addEventListener("click", handlerCloseClick);
        }
    }
})();

// scroll indicator
(function() {
    function activateScrollIndicator() {
        if (!document.querySelector(".layout--post")) return;

        var window_height = document.body.scrollHeight - window.innerHeight,
            scroll_val = ((window.pageYOffset) / window_height) * 100;

        document.getElementById("scroll-indicator").style.width = scroll_val + "%";
    }

    window.addEventListener("scroll", activateScrollIndicator);
})();

// page header link
(function() {
    var postRoot = document.getElementById("page-content");
    if (postRoot) {
        var h = postRoot.querySelectorAll("h2:not(.toc__title), h3, h4, h5, h6");

        for (var i = 0; i < h.length; i++) {
            var h_id = h[i].id,
                h_txt = h[i].textContent,
                h_anc = document.createElement("a");

            if (h_id) {
                h_anc.href = "#" + h_id;
            } else {
                h[i].id = h_txt.replace(/ /g, "-");
                h_anc.href = "#" + h_txt.replace(/ /g, "-");
            }

            h_anc.title = h_txt.replace(/-/g, " ");
            h_anc.classList.add("page__header-link");
            h[i].insertBefore(h_anc, h[i].firstChild);
        }
    }
})();

// abbr tooltip 생성 및 handler
(function() {
    var abbrList = document.querySelectorAll("abbr[title]");
    if (abbrList.length) {
        for (var i = 0; i < abbrList.length; i++) {
            abbrList[i].addEventListener("click", handlerClick);
            abbrList[i].addEventListener("keydown", handlerKeydown);
        }
    }

    Array.prototype.forEach.call(abbrList, function(t) {
        var t_span = document.createElement("span"),
            t_title = "tooltip-" + encodeURI(t.title).replace(/ |%/g, "1");

        t.setAttribute("aria-describedby", t_title);
        t.setAttribute("tabindex", "0");

        t_span.hidden = true;
        t_span.setAttribute("role", "tooltip");
        t_span.id = t_title;
        t_span.textContent = t.title;
        t_span.classList.add("abbr__tooltip");
        t.appendChild(t_span);
    });
    
    function handlerClick(event) {
        if ((event.target === event.currentTarget) || event.key === "Enter") {
            var tooltipEL = event.currentTarget.querySelector(".abbr__tooltip");

            if (!tooltipEL.classList.contains("abbr__tooltip--active")) {
                tooltipEL.hidden = false;
                tooltipEL.setAttribute("tabindex", "0");
                tooltipEL.classList.add("abbr__tooltip--active");
            } else {
                tooltipEL.hidden = true;
                tooltipEL.setAttribute("tabindex", "-1");
                tooltipEL.classList.remove("abbr__tooltip--active");
            }
        }
    }

    function handlerKeydown(event) {
        if (event.key === "Enter") handlerClick(event);
    }
})();

// code highlight title 기입 및 코드 복사, line 강조
(function() {
    var postRoot = document.getElementById("page-content");
    if (postRoot) {
        var preCodeBoxList = postRoot.querySelectorAll("div.highlighter-rouge");

        Array.prototype.forEach.call(preCodeBoxList, function(t) {
            // title
            var t_div = document.createElement("div");

            t_div.classList.add("highlight__util-wrapper");
            t.insertBefore(t_div, t.firstChild);

            var t_lang = t.className.replace(/language-|highlighter-rouge/g, ""),
                t_utilWrapper = t.querySelector(".highlight__util-wrapper");

            if (t_lang !== "plaintext ") {
                var t_span = document.createElement("span");

                t_span.textContent = t_lang;
                t_span.classList.add("highlight__language");
                t_utilWrapper.insertBefore(t_span, t_utilWrapper.firstChild);
            }

            // 코드 복사
            var t_btn = document.createElement("button");

            t_btn.textContent = "복사";
            t_btn.classList.add("highlight__copy-button");
            t_utilWrapper.appendChild(t_btn);

            var t_copyBtn = t.querySelector(".highlight__copy-button"), copyState;
            var copyCode = function(event) {
                try {
                    var t_codeInner = event.currentTarget.parentElement.parentElement,
                        t_code = t.querySelector(".lineno") ? t_codeInner.querySelector(".rouge-code > pre") : t_codeInner.querySelector("pre.highlight"),
                        t_valEL = document.createElement("textarea");

                    t_valEL.setAttribute("readonly", true);
                    t_valEL.setAttribute('contenteditable', true);
                    t_valEL.classList.add("sr-only--fixed");
                    t_valEL.value = t_code.textContent;

                    event.currentTarget.parentElement.appendChild(t_valEL);

                    t_valEL.select();

                    var t_range = document.createRange();
                    t_range.selectNodeContents(t_valEL);

                    var t_selection = window.getSelection();
                    t_selection.removeAllRanges();
                    t_selection.addRange(t_range);

                    t_valEL.setSelectionRange(0, t_valEL.value.length);
                    copyState = document.execCommand("copy");
                    event.currentTarget.textContent = "복사됨";
                } catch(error) {
                    copyState = null;
                    alert("복사에 실패했습니다.\n" + error);
                } finally {
                    event.currentTarget.parentElement.removeChild(t_valEL);
                }
            };

            t_copyBtn.addEventListener("click", copyCode);

            // line
            if (t.hasAttribute("data-line") && t.querySelector(".lineno")) {
                var preCodeLineBox = t.querySelector(".lineno"),
                    preCodeLine = t.getAttribute("data-line").split("-")[0],
                    preCodeLineLast = t.getAttribute("data-line").split("-")[1];

                if ((preCodeLineBox !== preCodeLine) && !preCodeLineBox.querySelector("span")) {
                    preCodeLineBox.innerHTML = preCodeLineBox.innerHTML.replace(preCodeLine, '<span id="'+"code-line"+preCodeLine+'">'+preCodeLine+'</span>');
                }

                if (preCodeLineBox !== preCodeLineLast) {
                    preCodeLineBox.innerHTML = preCodeLineBox.innerHTML.replace(preCodeLineLast, '<span id="'+"code-line"+preCodeLineLast+'">'+preCodeLineLast+'</span>');
                }

                var preCodeBG = document.createElement("span"),
                    preCodeSpanList = t.querySelectorAll("[id='"+"code-line"+preCodeLine+"']"),
                    preCodeSpanFirst = preCodeSpanList[0],
                    preCodeSpanLast = preCodeSpanFirst.nextElementSibling,
                    preCodeInner = t.querySelector("pre.highlight");

                preCodeBG.setAttribute("aria-hidden", "true");
                preCodeBG.classList.add("highlight__bg");
                preCodeInner.insertBefore(preCodeBG, preCodeInner.firstChild);
                
                var setBGval = function(firstNum, lastNum) {
                    var firstPos = firstNum.offsetTop;

                    preCodeBG.style.top = firstPos + 13 + "px";

                    if (preCodeLineLast) {
                        var lastPos = lastNum.offsetTop,
                            resultHeight = (lastPos - firstPos) + parseInt(getComputedStyle(lastNum, null).lineHeight);
                            
                        t.querySelector(".highlight__bg").style.height = resultHeight + "px";
                    }
                };
                setBGval(preCodeSpanFirst, preCodeSpanLast);

                window.addEventListener("resize", function() {
                    setBGval(preCodeSpanFirst, preCodeSpanLast);
                });
            }
        });
    }
})();

// page share link
(function() {
    var shareElement = document.getElementById("page-share");
    if (shareElement) {
        var shareAncList = shareElement.querySelectorAll("a");

        for (var i = 0; i < shareAncList.length; i++) {
            shareAncList[i].addEventListener("click", function(event) {
                event.preventDefault();
                window.open(event.currentTarget.href, 'window', 'left=20, top=20, width=500, height=500, toolbar=1, resizable=0');
            });
        }
    }
})();

// post archive 아코디언
(function() {
    var handlerClick = function(event) {
        var t = event.currentTarget,
            t_matchEL = document.querySelector("[aria-labelledby='"+t.id+"']");

        if (t_matchEL.classList.contains("archive__list--active")) {
            t_matchEL.classList.remove("archive__list--active");
            t_matchEL.hidden = true;
            t_matchEL.setAttribute("tabindex", "-1");
            t.classList.remove("archive__btn--active");
            t.setAttribute("aria-expanded", "false");
        } else {
            t_matchEL.classList.add("archive__list--active");
            t_matchEL.hidden = false;
            t_matchEL.setAttribute("tabindex", "0");
            t.classList.add("archive__btn--active");
            t.setAttribute("aria-expanded", "true");
        }
    },
    btnList = document.querySelectorAll(".archive__btn");

    if (btnList.length) {
        for (var i = 0; i < btnList.length; i++) {
            btnList[i].addEventListener("click", handlerClick);
        }
    }
})();

// 검색 레이어
(function() {
    var rootElement = document.documentElement,
        openBtn = document.querySelector(".nav__search-open"),
        closeBtn = document.querySelector(".search__close"),
        layer = document.getElementById("search-content"),
        outerList = document.querySelectorAll("#skip-links, #masthead, #content, #mastfoot, #side-menu"),
        tabbableList = layer.querySelectorAll("button, input, [href], [tabindex]:not([tabindex='-1'])"),
        tabbableListFirst = tabbableList.length && tabbableList[0],
        tabbableListLast = tabbableList.length && tabbableList[tabbableList.length - 1],
        sResult = document.getElementById("search-results"),
        sLabel = document.getElementById("search-title"),
        sInput = document.getElementById("search-input"), sInputVal, sInputValNotChanged;

        function handlerInputKeydown() {
            var sInputText = sInput.value;

            if (sInputText) {
                sInputVal = false;
                sInputValNotChanged = false;
                if (!sLabel.classList.contains("sr-only")) sLabel.classList.add("sr-only");

                var sResultAncList = sResult.querySelectorAll("a");

                for (var i = 0; i < sResultAncList.length; i++) {
                    if ((sResultAncList[i] !== sInputText) && !sResultAncList[i].querySelector(".search__results__match")) {
                        sResultAncList[i].innerHTML = sResultAncList[i].innerHTML.replace(sInputText, '<span class="search__results__match">'+sInputText+'</span>');
                    }
                }
            } else {
                sInputVal = true;
                sInputValNotChanged = true;
                sLabel.classList.remove("sr-only");
            }

            if (sResult.querySelectorAll("li").length) {
                sInput.setAttribute("aria-expanded", "true");
            } else {
                sInput.setAttribute("aria-expanded", "false");
            }
        }

        function handlerCloseClick() {
            document.removeEventListener("keydown", handlerCloseKeydown);
            rootElement.classList.remove("layer-opened");
            closeBtn.setAttribute("aria-expanded", "false");
            layer.classList.remove("search-content--animate");

            setTimeout(function() {
                layer.classList.remove("search-content--active");

                for (var i = 0; i < outerList.length; i++) {
                    outerList[i].getAttribute("aria-hidden") !== true && outerList[i].removeAttribute("aria-hidden");
                }

                layer.setAttribute("aria-hidden", "true");
            }, 200);

            openBtn.setAttribute("aria-expanded", "false");
            openBtn.focus();
        }

        function handlerCloseKeydown(event) {
            var keyType = event.key;

            if (keyType === "Escape" || keyType === "Esc") {
                var sResultAncList = sResult.querySelectorAll("a");

                for (var i = 0; i < sResultAncList.length; i++) {
                    sResultAncList[i] === document.activeElement && sInput.focus();
                }
                
                if (!sInputValNotChanged && sInput === document.activeElement) {
                    if (sInputVal) {
                        handlerCloseClick();
                    } else {
                        if (sInput !== document.activeElement) {
                            handlerCloseClick();
                        } else {
                            sInput.value = "";

                            while (sResult.firstChild) {
                                sResult.removeChild(sResult.firstChild);
                            }
                            // !sInput.value && handlerCloseClick();
                        }
                    }
                } else {
                    handlerCloseClick();
                }
            }
        }

        function handlerClick(event) {
            var t = event.currentTarget;

            sInputValNotChanged = true;

            t.setAttribute("aria-expanded", "true");
            closeBtn.setAttribute("aria-expanded", "true");
            rootElement.classList.add("layer-opened");

            for (var i = 0; i < outerList.length; i++) {
                outerList[i].setAttribute("aria-hidden", "true");
            }

            layer.classList.add("search-content--active");
            layer.setAttribute("aria-hidden", "false");
            layer.addEventListener("click", function(event) {
                event.target === event.currentTarget && handlerCloseClick();
            });

            setTimeout(function() {
                layer.classList.add("search-content--animate");
                sInput.focus();
                sInput.addEventListener("propertychange", handlerInputKeydown);
                sInput.addEventListener("change", handlerInputKeydown);
                sInput.addEventListener("keyup", handlerInputKeydown);
                sInput.addEventListener("paste", handlerInputKeydown);
                sInput.addEventListener("input", handlerInputKeydown);
                sInput.addEventListener("focus", handlerInputKeydown);
            });

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

        openBtn.addEventListener("click", handlerClick);
        closeBtn.addEventListener("click", handlerCloseClick);
})();