"use strict";

// IE 체크
(function() {
    var rootElement = document.documentElement;

    // 11 ~ 9
    if (window.navigator.userAgent.toLowerCase().indexOf("trident") > -1) {
        rootElement.className += " only-ie";
        document.getElementById("ie-alert").removeAttribute("aria-hidden");
    }

    // 10 이하
    if (navigator.userAgent.indexOf("MSIE") >= 0) {
        rootElement.className += " lte-ie10";
        document.getElementById("ie-version-txt").innerHTML = "IE 브라우저 10 버전 이하를 <strong>지원하지 않습니다.</strong>";
    }
})();

// 메인 메뉴
(function() {
    var rootElement = document.documentElement,
        menuWrapper = document.getElementById("side-menu"),
        menuLayer = document.getElementById("primary-nav"),
        menuOuterList = document.querySelectorAll("#skip-links, #ie-alert, #masthead, #content, #mastfoot"),
        menuELopen = document.querySelector(".nav__menu-open"),
        menuELclose = menuLayer.querySelector(".menu__close"),
        menuTabbableList = menuLayer.querySelectorAll("button, input, [href], [tabindex]:not([tabindex='-1'])"),
        menuTabbableListFirst = menuTabbableList[0],
        menuTabbableListLast = menuTabbableList[menuTabbableList.length - 1], menuELFocusedLast,
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

    function handlerCloseKeydown(evt) {
        var keyType = evt.key;

        if (menuWrapper.classList.contains("side-menu--active") && (keyType === "Escape" || keyType === "Esc")) {
            handlerCloseClick();
        }
    }

    function handlerOpenClick(evt) {
        evt.currentTarget.setAttribute("aria-expanded", "true");
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
            menuTabbableList[i].addEventListener("focus", function(evt) {
                menuELFocusedLast = evt.currentTarget;
            });
        }

        if (menuELFocusedLast) {
            menuELFocusedLast.focus();
        } else {
            menuTabbableListFirst.focus();
            menuTabbableListFirst.addEventListener("keydown", function(evt) {
                if (evt.shiftKey && evt.key === "Tab") {
                    evt.preventDefault();
                    menuTabbableListLast.focus();
                }
            });
        }

        menuTabbableListLast.addEventListener("keydown", function(evt) {
            if (!evt.shiftKey && evt.key === "Tab") {
                evt.preventDefault();
                menuTabbableListFirst.focus();
            }
        });

        document.addEventListener("keydown", handlerCloseKeydown);
    }

    menuELopen.addEventListener("click", handlerOpenClick);
    menuELclose.addEventListener("click", handlerCloseClick);
    menuWrapper.addEventListener("click", function(evt) {
        if (evt.target === evt.currentTarget) handlerCloseClick();
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

    Array.prototype.slice.call(abbrList).forEach(function(t) {
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
    
    function handlerClick(evt) {
        if ((evt.target === evt.currentTarget) || evt.key === "Enter") {
            var tooltipEL = evt.currentTarget.querySelector(".abbr__tooltip");

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

    function handlerKeydown(evt) {
        if (evt.key === "Enter") handlerClick(evt);
    }
})();

// code highlight title 기입 및 line 강조, 코드 복사
(function() {
    var postRoot = document.getElementById("page-content");
    if (postRoot) {
        var preCodeBoxList = postRoot.querySelectorAll("div.highlighter-rouge");

        Array.prototype.slice.call(preCodeBoxList).forEach(function(t) {
            // title
            if (t.classList.contains("has-label")) {
                t.setAttribute("title", t.className.replace(/language-|has-label |highlighter-rouge/g, "") + "코드");
            }

            // line
            if (t.hasAttribute("data-line")) {
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

                    preCodeBG.style.top = firstPos + 4 + "px";

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

            // 코드 복사
            var t_btn = document.createElement("button");

            t_btn.textContent = "복사";
            t_btn.classList.add("highlight__copy-button");
            t.insertBefore(t_btn, t.firstChild);

            var t_copyBtn = t.querySelector(".highlight__copy-button");
            var copyCode = function(evt) {
                try {
                    var t_codeInner = evt.currentTarget.parentElement,
                        t_code = t_codeInner.querySelector(".rouge-code");

                    if (!t_codeInner.querySelector("textarea")) {
                        var t_valEL = document.createElement("textarea");

                        t_valEL.classList.add("sr-only");
                        document.body.appendChild(t_valEL);
                    }

                    t_valEL.value = t_code.textContent;
                    t_valEL.select();
                    document.execCommand("copy");
                    document.body.removeChild(t_valEL);
                    evt.currentTarget.textContent = "복사됨";
                } catch(err) {
                    alert("복사에 실패했습니다.");
                }
            },
            showCopyButton = function() {
                if (!t_btn.classList.contains("highlight__copy-button--visible")) {
                    t_btn.classList.add("highlight__copy-button--visible");
                }
            },
            hideCopyButton = function() {
                if (t_btn.classList.contains("highlight__copy-button--visible")) {
                    t_btn.classList.remove("highlight__copy-button--visible");
                }
            },
            toggleCopyButton = function() {
                t_btn.classList.toggle("highlight__copy-button--visible");
            };

            t_copyBtn.addEventListener("click", copyCode);

            if ("onmouseover" in document.documentElement === true) t.addEventListener("mouseover", showCopyButton);
            if ("onmouseout" in document.documentElement === true) t.addEventListener("mouseout", hideCopyButton);
            if ("ontouchstart" in document.documentElement === true) {
                t.addEventListener("touchstart", toggleCopyButton);
            } else {
                t.addEventListener("click", toggleCopyButton);
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
            shareAncList[i].addEventListener("click", function(evt) {
                evt.preventDefault();
                window.open(evt.currentTarget.href, 'window', 'left=20, top=20, width=500, height=500, toolbar=1, resizable=0');
            });
        }
    }
})();

// post archive 아코디언
(function() {
    var handlerClick = function(evt) {
        var t = evt.currentTarget,
            t_matchEL = document.querySelector("[aria-labelledby='"+t.id+"']");

        if (t_matchEL.classList.contains("archive__list--active")) {
            t_matchEL.classList.remove("archive__list--active");
            t_matchEL.setAttribute("hidden", true);
            t_matchEL.setAttribute("tabindex", "-1");
            t.setAttribute("aria-expanded", "false");
        } else {
            t_matchEL.classList.add("archive__list--active");
            t_matchEL.setAttribute("hidden", false);
            t_matchEL.setAttribute("tabindex", "0");
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

// 포스트 목차
(function() {
    function handlerScroll() {
        var pageRoot = document.getElementById("page-content"),
            toc = document.getElementById("toc");

        if (pageRoot && toc) {
            var tocHeadingList = pageRoot.querySelectorAll("h2:not(.toc__title), h3, h4, h5, h6");

            Array.prototype.slice.call(tocHeadingList).forEach(function(h) {
                if (window.pageYOffset >= (h.offsetTop - 1)) {
                    var t_id = h.id,
                        tocAncList = toc.querySelectorAll("li a"),
                        t_anchor = toc.querySelector("li a[href='#"+t_id+"']");
    
                    for (var i = 0; i < tocAncList.length; i++) {
                        if (tocAncList[i].classList.contains("toc--active")) tocAncList[i].classList.remove("toc--active");
                    }

                    if (!t_anchor.classList.contains("toc--active")) t_anchor.classList.add("toc--active");
                }
            });
        }
    }
    window.addEventListener("scroll", handlerScroll);
})();

// 검색 레이어
(function() {
    var rootElement = document.documentElement,
        openBtn = document.querySelector(".nav__search-open"),
        closeBtn = document.querySelector(".search__close"),
        layer = document.getElementById("search-content"),
        outerList = document.querySelectorAll("#skip-links, #masthead, #content, #mastfoot, #side-menu"),
        tabbableList = layer.querySelectorAll("button, input, [href], [tabindex]:not([tabindex='-1'])"),
        tabbableListFirst = tabbableList[0],
        tabbableListLast = tabbableList[tabbableList.length - 1],
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

        function handlerInputKeydown2(evt) {
            var sResultLiList = sResult.querySelectorAll("li");
            if (!sResultLiList.length) return;

            switch (evt.key) {
                case "ArrowDown":
                case "Down":
                    if (sResultLiList.length) {
                        evt.preventDefault();
                        sResultLiList[0].querySelector("a").focus();
                    }
                    break;
            }
        }

        function handlerResultKeydown(evt) {
            if (evt.target.tagName === "A") {
                var t = evt.target,
                    t_list = t.parentElement,
                    list = sResult.querySelectorAll("li"),
                    listFirst = list[0],
                    listLast = list[list.length - 1],
                    listPrev = t_list.previousElementSibling,
                    listNext = t_list.nextElementSibling;

                switch (evt.key) {
                    case "ArrowUp":
                    case "Up":
                        if (!listPrev) {
                            listLast.querySelector("a").focus();
                        } else {
                            listPrev.querySelector("a").focus();
                        }

                        evt.stopPropagation();
                        break;
                    
                    case "ArrowDown":
                    case "Down":
                        if (!listNext) {
                            listFirst.querySelector("a").focus();
                        } else {
                            listNext.querySelector("a").focus();
                        }

                        evt.stopPropagation();
                        break;
                }
            }
        }

        function handlerCloseClick() {
            document.removeEventListener("keydown", handlerCloseKeydown);
            document.removeEventListener("keydown", handlerResultKeydown);
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

        function handlerCloseKeydown(evt) {
            var keyType = evt.key;

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

        function handlerClick(evt) {
            var t = evt.currentTarget;

            sInputValNotChanged = true;

            t.setAttribute("aria-expanded", "true");
            closeBtn.setAttribute("aria-expanded", "true");
            rootElement.classList.add("layer-opened");

            for (var i = 0; i < outerList.length; i++) {
                outerList[i].setAttribute("aria-hidden", "true");
            }

            layer.classList.add("search-content--active");
            layer.setAttribute("aria-hidden", "false");
            layer.addEventListener("click", function(evt) {
                evt.target === evt.currentTarget && handlerCloseClick();
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
                sInput.addEventListener("keydown", handlerInputKeydown2);
            });

            tabbableListFirst.addEventListener("keydown", function(evt) {
                if (evt.shiftKey && evt.key === "Tab") {
                    evt.preventDefault();
                    tabbableListLast.focus();
                }
            });
    
            tabbableListLast.addEventListener("keydown", function(evt) {
                if (!evt.shiftKey && evt.key === "Tab") {
                    evt.preventDefault();
                    tabbableListFirst.focus();
                }
            });

            document.addEventListener("keydown", handlerCloseKeydown);
            document.addEventListener("keydown", handlerResultKeydown);
        }

        openBtn.addEventListener("click", handlerClick);
        closeBtn.addEventListener("click", handlerCloseClick);
})();