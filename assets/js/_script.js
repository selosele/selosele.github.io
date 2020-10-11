// IE 체크
(function() {
    // 11 ~ 9
    if (window.navigator.userAgent.toLowerCase().indexOf("trident") > -1) {
        document.documentElement.className += " only-ie";
        document.getElementById("ie-alert").removeAttribute("aria-hidden");
    }

    // IE 10 이하
    if (navigator.userAgent.indexOf("MSIE") >= 0) {
        document.documentElement.className += " lte-ie10";
        document.getElementById("ie-version-txt").innerHTML = "IE 브라우저 10 버전 이하를 <strong>지원하지 않습니다.</strong>";
    }
})();

// 메인 메뉴
(function() {
    var rootElement = document.documentElement,
        menuWrapper = document.getElementById("side-menu"),
        menuLayer = document.getElementById("primary-nav"),
        menuOuterEL = document.querySelectorAll("#skip-links, #ie-alert, #masthead, #content, #mastfoot"),
        menuELopen = document.querySelector(".nav__menu-open"),
        menuELclose = menuLayer.querySelector(".menu__close"),
        menuELtabble = menuLayer.querySelectorAll("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
        menuELtabbleFirst = menuELtabble[0],
        menuELtabbleLast = menuELtabble[menuELtabble.length - 1], menuELFocusedLast,
        menuELcategoryAnc = menuLayer.querySelectorAll("a[href*='/category-list/#']");

    function handlerCloseClick() {
        document.removeEventListener("keydown", handlerCloseKeydown);
        menuELclose.blur();
        menuELclose.setAttribute("aria-expanded", "false");
        menuELopen.setAttribute("aria-expanded", "false");
        menuELopen.focus();
        menuWrapper.setAttribute("aria-hidden", "true");
        menuLayer.classList.remove("menu__layer--animate");
        document.body.classList.remove("overflow-hidden");

        for (var i = 0; i < menuOuterEL.length; i++) {
            menuOuterEL[i].removeAttribute("aria-hidden");
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
        document.body.classList.add("overflow-hidden");

        setTimeout(function() {
            menuLayer.classList.add("menu__layer--animate");
        });
        
        for (var i = 0; i < menuOuterEL.length; i++) {
            menuOuterEL[i].setAttribute("aria-hidden", "true");
        }

        for (var i = 0; i < menuELtabble.length; i++) {
            menuELtabble[i].addEventListener("focusin", function(evt) {
                menuELFocusedLast = evt.currentTarget;
            });
        }

        if (menuELFocusedLast) {
            menuELFocusedLast.focus();
        } else {
            menuELtabbleFirst.focus();
            menuELtabbleFirst.addEventListener("keydown", function(evt) {
                if (evt.shiftKey && evt.key === "Tab") {
                    evt.preventDefault();
                    menuELtabbleLast.focus();
                }
            });
        }

        menuELtabbleLast.addEventListener("keydown", function(evt) {
            if (!evt.shiftKey && evt.key === "Tab") {
                evt.preventDefault();
                menuELtabbleFirst.focus();
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
        if (rootElement.classList.contains("layout--categories") || rootElement.classList.contains("layout--tags")) {
            menuELcategoryAnc[i].addEventListener("click", handlerCloseClick);
        }
    }
})();

// scroll indicator
(function() {
    function activateScrollIndicator() {
        if (!document.documentElement.classList.contains("layout--post")) return;

        var window_height = document.body.scrollHeight - window.innerHeight,
            scroll_val = ((window.pageYOffset) / window_height) * 100;

        document.getElementById("scroll-indicator").style.width = scroll_val + "%";
    }

    window.addEventListener("scroll", activateScrollIndicator);
})();

// heading link
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
            h_anc.classList.add("heading-link");
            h[i].insertBefore(h_anc, h[i].firstChild);
        }
    }
})();

// abbr tooltip 생성 및 handler
(function() {
    var appendTooltip = function() {
        var abbr = document.querySelectorAll("abbr[title]");
        if (!abbr) return;

        Array.prototype.slice.call(abbr).forEach(function(abbrEL) {
            var abbrSpan = document.createElement("span"),
                abbr_title = "tooltip-" + encodeURI(abbrEL.title).replace(/ |%/g, "1");

            abbrEL.setAttribute("tabindex", "0");
            abbrEL.setAttribute("aria-describedby", abbr_title);

            abbrSpan.hidden = true;
            abbrSpan.setAttribute("role", "tooltip");
            abbrSpan.id = abbr_title;
            abbrSpan.textContent = abbrEL.title;
            abbrSpan.classList.add("abbr__tooltip");
            abbrEL.appendChild(abbrSpan);
        });
    },
    handlerClick = function(evt) {
        if (evt.target !== evt.currentTarget) return;

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
    },
    handlerKeydown = function(evt) {
        if (evt.key === "Enter") handlerClick(evt);
    };

    appendTooltip();

    var abbr = document.querySelectorAll("abbr[title]");
    if (abbr) {
        for (var i = 0; i < abbr.length; i++) {
            abbr[i].addEventListener("click", handlerClick);
            abbr[i].addEventListener("keydown", handlerKeydown);
        }
    }
})();

// code highlight title 기입
(function() {
    var postRoot = document.getElementById("page-content");
    if (postRoot) {
        var preCodeEL = postRoot.querySelectorAll("pre.highlight");
        
        for (var i = 0; i < preCodeEL.length; i++) {
            var preCodeParentEL = preCodeEL[i].parentElement.parentElement;

            if (preCodeParentEL.classList.contains("has-label")) {
                preCodeEL[i].setAttribute("title", preCodeParentEL.className.replace(/language-|has-label |highlighter-rouge/g, "") + "코드");
            }
        }
    }
})();

// page share link
(function() {
    var shareElement = document.getElementById("page-share");
    if (shareElement) {
        var shareELbtn = shareElement.querySelectorAll("a");

        for (var i = 0; i < shareELbtn.length; i++) {
            shareELbtn[i].addEventListener("click", function(evt) {
                evt.preventDefault();
                window.open(evt.currentTarget.href, 'window', 'left=20, top=20, width=500, height=500, toolbar=1, resizable=0');
            });
        }
    }
})();

// post archive 아코디언
(function() {
    var handlerClick = function(evt) {
        var _t = evt.currentTarget,
            _t_matchEL = document.querySelector("[aria-labelledby='"+_t.id+"']");

        if (_t_matchEL.classList.contains("archive__list--active")) {
            _t_matchEL.classList.remove("archive__list--active");
            _t_matchEL.setAttribute("hidden", false);
            _t_matchEL.setAttribute("tabindex", "-1");
            _t.setAttribute("aria-expanded", "false");
        } else {
            _t_matchEL.classList.add("archive__list--active");
            _t_matchEL.setAttribute("hidden", true);
            _t_matchEL.setAttribute("tabindex", "0");
            _t.setAttribute("aria-expanded", "true");
        }
    },
    btnEL = document.querySelectorAll(".archive__btn");
    if (btnEL) {
        for (var i = 0; i < btnEL.length; i++) {
            btnEL[i].addEventListener("click", handlerClick);
        }
    }
})();

// 포스트 목차
(function() {
    var handlerScroll = function() {
        var pageRoot = document.getElementById("page-content"),
            toc = document.getElementById("toc");

        if (pageRoot && toc) {
            var tocELheadings = pageRoot.querySelectorAll("h2:not(.toc__title), h3, h4, h5, h6");

            Array.prototype.slice.call(tocELheadings).forEach(function(h) {
                if (window.pageYOffset >= (h.offsetTop - 1)) {
                    var t_id = h.id,
                        t_anchor = toc.querySelector("li a[href='#"+t_id+"']"),
                        tocELanchor = toc.querySelectorAll("li a");
    
                    for (var i = 0; i < tocELanchor.length; i++) {
                        if (tocELanchor[i].classList.contains("toc--active")) tocELanchor[i].classList.remove("toc--active");
                        if (!t_anchor.classList.contains("toc--active")) t_anchor.classList.add("toc--active");
                    }
                }
            });
        }
    },
    activateToc = function(main) {
        if (!main || window.innerWidth <= 1200) return;
        if (document.getElementById("toc")) main.classList.add("content--has-toc");
    },
    deactivateToc = function(main) {
        if (!main) return;
        main.classList.remove("content--has-toc");
    },
    initToc = function() {
        var mainEL = document.getElementById("content");
        window.innerWidth > 1200 ? activateToc(mainEL) : deactivateToc(mainEL);
    };

    initToc();
    window.addEventListener("resize", initToc);
    window.addEventListener("scroll", handlerScroll);
})();

// 포스트 목차 키보드 이벤트
(function() {
    var postRoot = document.getElementById("page-content"),
        toc = document.getElementById("toc");

    if (postRoot && toc) {
        var tocTabbleNode = postRoot.querySelectorAll("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
            tocTabbleFocusedLast;

        Array.prototype.slice.call(tocTabbleNode).forEach(function(t) {
            t.addEventListener("keydown", function(evt) {
                if (evt.currentTarget === document.querySelector("nav[aria-labelledby='toc-title']")) return;

                evt.stopPropagation();
                tocTabbleFocusedLast = evt.currentTarget;
                tocTabbleFocusedLast.addEventListener("keydown", handlerKeydown);
            });
        });

        function handlerKeydown(evt) {
            if (evt.altKey && evt.key === "1") {
                var fixedToc = document.querySelector(".toc--fixed > nav");

                fixedToc.focus();
                fixedToc.addEventListener("keydown", function(evt) {
                    if ((evt.altKey && evt.key === "1") && tocTabbleFocusedLast) {
                        evt.stopPropagation();
                        tocTabbleFocusedLast.focus();
                    }
                });
            }

            if (evt.altKey && evt.key === "2" && (toc.classList.contains("toc--fixed"))) {
                document.querySelector(".toc--active").focus();
            }
        }

        if (toc.classList.contains("toc--fixed")) {
            document.addEventListener("keydown", handlerKeydown);
        }
    }
})();

// 검색 레이어
(function() {
    var openBtn = document.querySelector(".nav__search-open"),
        closeBtn = document.querySelector(".search__close"),
        layer = document.getElementById("search-content"),
        outerEL = document.querySelectorAll("#skip-links, #masthead, #content, #mastfoot, #side-menu"),
        tabbale = layer.querySelectorAll("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
        tabbaleFirst = tabbale[0],
        tabbaleLast = tabbale[tabbale.length - 1],
        sResult = document.getElementById("search-results"),
        sLabel = document.getElementById("search-title"),
        sInput = document.getElementById("search-input"), sInputVal, sInputValNotChanged;

        function handlerInputKeydown() {
            var sInputText = sInput.value;

            if (sInputText) {
                sInputVal = false;
                sInputValNotChanged = false;
                if (!sLabel.classList.contains("visually-hidden")) sLabel.classList.add("visually-hidden");

                var sResultAnc = sResult.querySelectorAll("a");

                for (var i = 0; i < sResultAnc.length; i++) {
                    if ((sResultAnc[i] !== sInputText) && !sResultAnc[i].querySelector(".search__results__match")) {
                        sResultAnc[i].innerHTML = sResultAnc[i].innerHTML.replace(sInputText, '<span class="search__results__match">'+sInputText+'</span>');
                    }
                }
            } else {
                sInputVal = true;
                sInputValNotChanged = true;
                sLabel.classList.remove("visually-hidden");
            }

            if (sResult.querySelectorAll("li").length) {
                sInput.setAttribute("aria-expanded", "true");
            } else {
                sInput.setAttribute("aria-expanded", "false");
            }
        }

        function handlerInputKeydown2(evt) {
            var _li = sResult.querySelectorAll("li");

            switch (evt.key) {
                case "ArrowDown":
                case "Down":
                    if (_li.length) {
                        evt.preventDefault();
                        _li[0].querySelector("a").focus();
                    }
                    break;
            }
        }

        function handlerResultKeydown(evt) {
            if (evt.target.tagName === "A") {
                var _t = evt.target,
                    _t_list = _t.parentElement,
                    list = sResult.querySelectorAll("li"),
                    listFirst = list[0],
                    listLast = list[list.length - 1],
                    listPrev = _t_list.previousElementSibling,
                    listNext = _t_list.nextElementSibling;

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
            document.body.classList.remove("overflow-hidden");
            closeBtn.setAttribute("aria-expanded", "false");
            layer.classList.remove("search-content--animate");

            setTimeout(function() {
                layer.classList.remove("search-content--active");

                for (var i = 0; i < outerEL.length; i++) {
                    outerEL[i].getAttribute("aria-hidden") !== true && outerEL[i].removeAttribute("aria-hidden");
                }

                layer.setAttribute("aria-hidden", "true");
            }, 200);

            openBtn.setAttribute("aria-expanded", "false");
            openBtn.focus();
        }

        function handlerCloseKeydown(evt) {
            var keyType = evt.key;

            if (keyType === "Escape" || keyType === "Esc") {
                var sResultAnc = sResult.querySelectorAll("a");

                for (var i = 0; i < sResultAnc.length; i++) {
                    sResultAnc[i] === document.activeElement && sInput.focus();
                }
                
                if (!sInputValNotChanged || sInput === document.activeElement) {
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
            var _t = evt.currentTarget;

            sInputValNotChanged = true;

            _t.setAttribute("aria-expanded", "true");
            closeBtn.setAttribute("aria-expanded", "true");
            document.body.classList.add("overflow-hidden");

            for (var i = 0; i < outerEL.length; i++) {
                outerEL[i].setAttribute("aria-hidden", "true");
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

            tabbaleFirst.addEventListener("keydown", function(evt) {
                if (evt.shiftKey && evt.key === "Tab") {
                    evt.preventDefault();
                    tabbaleLast.focus();
                }
            });
    
            tabbaleLast.addEventListener("keydown", function(evt) {
                if (!evt.shiftKey && evt.key === "Tab") {
                    evt.preventDefault();
                    tabbaleFirst.focus();
                }
            });

            document.addEventListener("keydown", handlerCloseKeydown);
            document.addEventListener("keydown", handlerResultKeydown);
        }

        openBtn.addEventListener("click", handlerClick);
        closeBtn.addEventListener("click", handlerCloseClick);
})();