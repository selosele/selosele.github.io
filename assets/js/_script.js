// 화면 전체 스크롤바 너비 구하기
var getScrollbarWidth = function() {
    var scrollBar_w = window.innerWidth - document.documentElement.offsetWidth;
    
    while (scrollBar_w) {
        return scrollBar_w + "px";
    }
};

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

// scroll indicator
var activateScrollIndicator = function() {
    if (document.getElementById("page-content")) {
        var window_height = document.body.scrollHeight - window.innerHeight,
            scroll_val = ((window.pageYOffset) / window_height) * 100;

        document.querySelector(".scroll-indicator").style.width = scroll_val + "%";
    }
};

// abbr tooltip 생성 및 handler
var appendTooltip = function() {
    var abbr = document.querySelectorAll("abbr[title]");
    if (!abbr) return;

    for (var i = 0; i < abbr.length; i++) {
        var abbrSpan = document.createElement("span"),
            abbr_title = "tooltip-" + encodeURI(abbr[i].title).replace(/ |%/g, "1");

        abbr[i].setAttribute("tabindex", "0");
        abbr[i].setAttribute("aria-describedby", abbr_title);
        abbrSpan.hidden = true;
        abbrSpan.setAttribute("role", "tooltip");
        abbrSpan.id = abbr_title;
        abbrSpan.textContent = abbr[i].title;
        abbrSpan.classList.add("abbr__tooltip");
        abbr[i].appendChild(abbrSpan);
    }
};

var handlerTooltipClick = function(evt) {
    if (evt.target !== evt.currentTarget) return;

    var abbrTooltip = evt.currentTarget.querySelector(".abbr__tooltip");

    if (!abbrTooltip.classList.contains("abbr__tooltip--active")) {
        abbrTooltip.hidden = false;
        abbrTooltip.setAttribute("tabindex", "0");
        abbrTooltip.classList.add("abbr__tooltip--active");
    } else {
        abbrTooltip.hidden = true;
        abbrTooltip.setAttribute("tabindex", "-1");
        abbrTooltip.classList.remove("abbr__tooltip--active");
    }
};

var handlerTooltipKeydown = function(evt) {
    if ((evt.keyCode || evt.which) === 13) handlerTooltipClick(evt);
};

// post archive 아코디언
var handlerArchiveClick = function(evt) {
    var _t = evt.currentTarget,
        archiveListMatchElement = document.querySelector("[aria-labelledby='"+_t.id+"']");

    if (archiveListMatchElement.classList.contains("archive__list--active")) {
        archiveListMatchElement.classList.remove("archive__list--active");
        archiveListMatchElement.setAttribute("hidden", false);
        archiveListMatchElement.setAttribute("tabindex", "-1");
        _t.setAttribute("aria-expanded", "false");
    } else {
        archiveListMatchElement.classList.add("archive__list--active");
        archiveListMatchElement.setAttribute("hidden", true);
        archiveListMatchElement.setAttribute("tabindex", "0");
        _t.setAttribute("aria-expanded", "true");
    }
};

anchorSetAriaCurrent(document.querySelectorAll("a:not(.site-title)"));

alignImg(document.querySelectorAll(".author__avatar img, .theme-type2 .site-title__author-image img"));

appendTooltip();

// 검색 input enter키로 submit 방지
(function() {
    document.querySelector(".search-content__inner-wrap form").addEventListener("keydown", function(evt) {
        if ((evt.keyCode || evt.which) === 13) evt.preventDefault();
    });
})();

// IE 11 ~ 9 체크
(function() {
    if (window.navigator.userAgent.toLowerCase().indexOf("trident") > -1) document.documentElement.classList.add("only-ie");
})();

// IE 10 이하 체크
(function() {
    if (navigator.userAgent.indexOf("MSIE") >= 0) document.documentElement.classList.add("lte-ie10");
})();

// heading link
(function() {
    var pageRoot = document.getElementById("page-content");
    if (pageRoot) {
        var h = pageRoot.querySelectorAll("h2:not(.toc__title), h3, h4, h5, h6");

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

// scroll indicator event 등록
(function() {
    window.addEventListener("scroll", activateScrollIndicator);
})();

// abbr event 등록
(function() {
    var abbr = document.querySelectorAll("abbr[title]");
    if (!abbr) return;

    for (var i = 0; i < abbr.length; i++) {
        abbr[i].addEventListener("click", handlerTooltipClick);
        abbr[i].addEventListener("keydown", handlerTooltipKeydown);
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
                window.open(this.href, 'window', 'left=20, top=20, width=500, height=500, toolbar=1, resizable=0');
            });
        }
    }
})();

// code highlight title 기입
(function() {
    var pageRoot = document.getElementById("page-content");
    if (pageRoot) {
        var preCodeElement = pageRoot.querySelectorAll("pre.highlight");
        
        for (var i = 0; i < preCodeElement.length; i++) {
            var preCodeParentElement = preCodeElement[i].parentElement.parentElement;

            if (preCodeParentElement.classList.contains("has-label")) {
                preCodeElement[i].setAttribute("title", preCodeParentElement.className.replace(/language-|has-label |highlighter-rouge/g, "") + "코드");
            }
        }
    }
})();

// post archive 아코디언 event 등록
(function() {
    var archiveBtnElement = document.querySelectorAll(".archive__btn");
    if (!archiveBtnElement) return;

    for (var i = 0; i < archiveBtnElement.length; i++) {
        archiveBtnElement[i].addEventListener("click", handlerArchiveClick);
    }
})();

// IE 10 이하 경고 레이어팝업
$(function() {
    var IEalertElem = $(".ie-alert");
    if (IEalertElem) {
        var rootElem = $("html"),
            alertOuterElem = $("body").children().not(IEalertElem.add(".search-content, .side-menu, script, .scroll-indicator")),
            alertTabbaleElem = IEalertElem.find("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
            alertTabbaleElemFirst = alertTabbaleElem.first(),
            alertTabbaleElemLast = alertTabbaleElem.last();

        if (rootElem.hasClass("lte-ie10") && !sessionStorage.getItem("ie-alert-chkbox-checked")) {
            $("body").addClass("overflow-hidden");
            IEalertElem.css("display", "block").attr("aria-hidden", "false");
            alertOuterElem.attr("aria-hidden", "true");
            alertTabbaleElem.length && alertTabbaleElemFirst.focus();
        }

        alertTabbaleElemFirst.on("keydown", function(evt) {
            if (evt.shiftKey && (evt.keyCode || evt.which) === 9) {
                evt.preventDefault();
                alertTabbaleElemLast.focus();
            }
        });

        alertTabbaleElemLast.on("keydown", function(evt) {
            if (!evt.shiftKey && (evt.keyCode || evt.which) === 9) {
                evt.preventDefault();
                alertTabbaleElemFirst.focus();
            }
        });

        var IEalertChkbox = $("#alert-checkbox"),
            closeIEalert = function() {
            if (IEalertElem.css("display") === "block" && !sessionStorage.getItem("ie-alert-chkbox-checked")) {
                if (IEalertChkbox.is(":checked")) {
                    sessionStorage.setItem("ie-alert-chkbox-checked", true);
                } else {
                    alert("현재 사용 중인 브라우저에서는 블로그 이용이 원활하지 않습니다. \n더 나은 사용자 경험을 위하여 최신 브라우저로 접속하십시오.");
                }
                $("body").removeClass("overflow-hidden");
                IEalertElem.css("display", "none").attr("aria-hidden", "true");
                alertTabbaleElem.blur();
                alertOuterElem.removeAttr("aria-hidden");
                $(document).off("keydown.alert_keydown");
            }
        };

        $(document).on("keydown.alert_keydown", function(evt) {
            if ((evt.keyCode || evt.which) === 27) closeIEalert();
        });

        $(".ie-alert__close").click(closeIEalert);
    }
});

// 포스트 목차
$(function() {
    $(window).scroll(function() {
        var tocELheadings = $(".page__content").find(":header:not(.toc__title)");
        if (!tocELheadings) return;

        tocELheadings.each(function() {
            if ($(window).scrollTop() >= $(this).offset().top - 1) {
                var t_id = $(this).attr("id"),
                    t_anchor = $(".toc-wrapper li a[href='#"+t_id+"']"),
                    tocELanchor = $(".toc-wrapper li a");

                tocELanchor.hasClass("toc--active") && tocELanchor.removeClass("toc--active");
                t_anchor.hasClass("toc--active") || t_anchor.addClass("toc--active");
            }
        });
    });

    $(".toc-wrapper li a").on("click", function(evt) {
        $("html, body")
            .stop()
            .animate({
                scrollTop: $("#" + evt.currentTarget.getAttribute("href").replace("#", "")).offset().top
            }, 300);
    });

    function activatePostToc(main) {
        if (!main.length || $(window).outerWidth() <= 1200) return;
        if ($(".toc-wrapper").length) $(main).addClass("content--has-toc");
    }

    function deactivatePostToc(main) {
        $(main).removeClass("content--has-toc");
    }

    function initPostToc() {
        var mainEL = $(".content-wrapper");
        $(window).outerWidth() > 1200 ? activatePostToc(mainEL) : deactivatePostToc(mainEL);
    }

    initPostToc();
    $(window).resize(initPostToc);
});

// 포스트 목차 키보드 이벤트
$(function() {
    var tocTabble = $("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
        tocTabbleNode = $(".content-wrapper").find(tocTabble).not(".toc-wrapper, .toc-wrapper *"),
        tocTabbleFocusedLast;

    tocTabbleNode.on("keydown", function() {
        return tocTabbleFocusedLast = $(this);

    }).on("keydown", function(evt) {
        if (evt.altKey && (evt.keyCode || evt.which) === 192) { // alt + ~키 : 포스트 요소 중 마지막으로 초점 잡혔던 요소(이하 focusedLast)에서 목차로 초점 이동
            $(".toc--fixed nav").focus().on("keydown", function(evt) {
                if (evt.altKey && (evt.keyCode || evt.which) === 192) { // alt + ~키 : focusedLast로 초점 이동
                    tocTabbleFocusedLast.focus();
                }
            });
        }
    });

    if ($(".toc--fixed").length) {
        $(document).on("keydown.toc_keydown", function(evt) {
            var keyType = evt.keyCode || evt.which;
    
            if (evt.altKey && keyType === 192 && !tocTabbleNode.is(":focus")) { // alt + ~키 : 포스트에서 목차로 초점 이동
                if (!$(".toc--fixed").is(":focus")) $(".toc--fixed nav").focus();
            }
    
            if (evt.altKey && keyType === 49 && $(".toc-wrapper").hasClass("toc--fixed")) { // alt + 1키 : 활성화된 목차 링크로 초점 이동
                $(".toc--active").focus();
            }
        });
    }
});

// 메인 메뉴
$(function() {
    var nav = $(".site-nav"),
        menu = $(".side-menu"),
        menuOuterEL = $("body").children().not(menu.add(".ie-alert, .search-content, script, .scroll-indicator")),
        menuELlayer = menu.find(".menu__layer"),
        menuELopen = nav.find(".nav__menu-open"),
        menuELclose = menu.find(".menu__close"),
        menuELtabble = menu.find("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
        menuELtabbleFirst = menuELtabble.first(),
        menuELtabbleLast = menuELtabble.last(),
        menuELFocusedLast, nowScrollPos,
        menuClose = function() {
            // $("body")
            //     .removeClass("scroll-disabled")
            //     .css("top", "")
            //     .off("scroll touchmove mousewheel");
            // if (!$("body").hasClass("scroll-disabled")) {
            //     $(window).scrollTop(nowScrollPos);
            // }
            $(document).off("keydown.menu_keydown");
            menuELclose.add(menuELopen).attr("aria-expanded", "false");
            $("body").css("padding-right", "").removeClass("overflow-hidden");
            menuOuterEL.removeAttr("aria-hidden");
            menuELlayer.stop().animate({"right": "-100%"}, 400);

            setTimeout(function() {
                menu.add(menuELlayer).removeAttr("style");
            }, 400);

            menu.attr("aria-hidden", "true");
            if (!$(location.hash).is(":focus")) menuELopen.focus();
        }

    menuELopen.on("click", function() {
        // $("body")
        //     .css("top", - $(window).scrollTop() + "px")
        //     .addClass("scroll-disabled")
        //     .on("scroll touchmove mousewheel", function(evt){
        //         evt.preventDefault();
        // });
        // nowScrollPos = $("body").css("top").replace("px", "");
        menu
            .attr("aria-hidden", "false")
            .css("display", "block")
            .on("click", function(evt) {
                evt.target === evt.currentTarget && menuClose();
            });
        $(this).attr("aria-expanded", "true");
        $("body").css("padding-right", getScrollbarWidth()).addClass("overflow-hidden");
        menuELclose.attr("aria-expanded", "true");
        menuOuterEL.attr("aria-hidden", "true");

        setTimeout(function() {
            menuELlayer.stop().animate({"right": "0"}, 400);
        });
        
        menuELtabble.on("focusin", function() {
            menuELFocusedLast = $(this);
        });

        menuELFocusedLast ? menuELFocusedLast.focus() : menuELtabbleFirst.focus().on("keydown", function(evt) {
            if (evt.shiftKey && (evt.keyCode || evt.which) === 9) {
                evt.preventDefault();
                menuELtabbleLast.focus();
            }
        });

        menuELtabbleLast.on("keydown", function(evt) {
            if (!evt.shiftKey && (evt.keyCode || evt.which) === 9) {
                evt.preventDefault();
                menuELtabbleFirst.focus();
            }
        });

        menuELclose.on("click", menuClose);

        if (menu.css("display") === "block") {
            $(document).on("keydown.menu_keydown", function(evt) {
                if ((evt.keyCode || evt.which) === 27) menuClose();
            });
        }

        $("a[href*='/category-list/#']").on("click", function() {
            if ($(".layout--categories").length || $(".layout--tags").length) menuClose();
        });
    });
});

// 검색 레이어
$(function() {
    var openBtn = $(".nav__search-open"),
        closeBtn = $(".search__close"),
        layer = $(".search-content"),
        outerEL = $("body").children().not(layer.add("script, .ie-alert, .side-menu, .scroll-indicator")),
        tabbale = layer.find("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
        tabbaleFirst = tabbale.first(),
        tabbaleLast = tabbale.last(),
        sForm = layer.find("form"),
        sLabel = sForm.find("label"),
        sInput = layer.find("input[type='search']"), sInputVal, sInputValNotChanged,
        
        layerClose = function() {
            $(document).off("keydown.search_keydown");
            $("body").css("padding-right", "").removeClass("overflow-hidden");
            closeBtn.attr("aria-expanded", "false");
            layer.stop().animate({"opacity": "0"}, {
                duration: 200,
                complete: function() {
                    layer.removeAttr("style");
                }
            });

            setTimeout(function() {
                outerEL.attr("aria-hidden") !== true && outerEL.removeAttr("aria-hidden");
                layer.attr("aria-hidden", "true");
            }, 200);
            openBtn.attr("aria-expanded", "false").focus();
        }

    openBtn.on("click", function() {
        sInputValNotChanged = true;

        $(this).add(closeBtn).attr("aria-expanded", "true");
        $("body").css("padding-right", getScrollbarWidth()).addClass("overflow-hidden");
        outerEL.attr("aria-hidden", "true");
        layer
            .css("display", "block")
            .attr("aria-hidden", "false")
            .click(function(evt) {
                evt.target === evt.currentTarget && layerClose();
            });

        setTimeout(function() {
            layer.stop().animate({"opacity": "1"}, {
                duration: 200,
                complete: function() {
                    sInput
                        .focus()
                        .on("propertychange change keyup paste input focus", function() {
                            if (sInput.val().length) {
                                sInputVal = false;
                                sInputValNotChanged = false;
                                if (!sLabel.hasClass("visually-hidden")) sLabel.addClass("visually-hidden");
                                anchorSetAriaCurrent(document.getElementById("search-layer").querySelectorAll(".archive__item-title a"));
                            } else {
                                sInputVal = true;
                                sInputValNotChanged = true;
                                sLabel.removeClass("visually-hidden");
                            }
                    });
                }
            });
        });

        tabbaleFirst.on("keydown", function(evt) {
            if (evt.shiftKey && (evt.keyCode || evt.which) === 9) {
                evt.preventDefault();
                tabbaleLast.focus();
            }
        });

        tabbaleLast.on("keydown", function(evt) {
            if (!evt.shiftKey && (evt.keyCode || evt.which) === 9) {
                evt.preventDefault();
                tabbaleFirst.focus();
            }
        });

        if (layer.css("display") === "block") {
            $(document).on("keydown.search_keydown", function(evt) {
                if ((evt.keyCode || evt.which) === 27) {
                    sInputValNotChanged || !sInput.is(":focus") || sInputVal ? layerClose() : sForm[0].reset();
                }
            });
        }
        closeBtn.on("click", layerClose);
    });
});