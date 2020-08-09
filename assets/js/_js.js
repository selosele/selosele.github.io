/* ==========================================================================
   _function.js에서 작성한 함수 호출/재사용 불가능한 함수 모음
   ========================================================================== */

// IE 10 이하 체크
if (navigator.userAgent.indexOf("MSIE") >= 0) document.documentElement.classList.add("only-ie");

// anchor href와 현재 url 일치할경우 aria-current="page" 속성 추가
anchorSetAriaCurrent(document.querySelectorAll("a:not(.site-title)"));

// 이미지 정렬
alignImg(document.querySelectorAll(".author__avatar img, .theme--type2 .site-title__author-image img"));

// inline 요소 여백 제거
removeWhiteSpace(document.querySelectorAll(".archive__item, .page__item-wrapper, .page__image-container, .page__share, .keyword-wrapper"));

// 검색 input enter키로 submit 방지
document.querySelector(".search-content__inner-wrap form").addEventListener("keydown", function(evt) {
    if (evt.key === "Enter") evt.preventDefault();
});

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

// code highlight 초점이동 및 title 기입
(function() {

    var pageElement = document.getElementById("page-content");
    if (pageElement) {
        var preCodeElement = pageElement.querySelectorAll("pre.highlight");
        
        for (var i = 0; i < preCodeElement.length; i++) {
            var preCodeParentElement = preCodeElement[i].parentElement.parentElement;
            preCodeElement[i].setAttribute("tabindex", "0");

            if (preCodeParentElement.classList.contains("has--label")) {
                preCodeElement[i].setAttribute("title", preCodeParentElement.className.replace(/language-|has--label |highlighter-rouge/g, "") + "코드");
            }
        }
    }
})();

// IE 10 이하 경고 레이어팝업
$(function() {

    var IEalertElem = $(".ie-alert");
    if (IEalertElem) {
        var rootElem = $("html"),
            alertOuterElem = $("body").children().not(IEalertElem.add("script")),
            alertTabbaleElem = IEalertElem.find("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
            alertTabbaleElemFirst = alertTabbaleElem.first(),
            alertTabbaleElemLast = alertTabbaleElem.last();

        if (rootElem.hasClass("only-ie") && !sessionStorage.getItem("ie-alert-chkbox-checked")) {
            IEalertElem.css("display", "block").attr("aria-hidden", "false");
            alertOuterElem.attr("aria-hidden", "true");
            alertTabbaleElemFirst.length && alertTabbaleElemFirst.focus();
        }

        alertTabbaleElemFirst.keydown(function(evt) {
            var keyType = evt.keyCode || evt.which;
            if (evt.shiftKey && keyType === 9) {
                evt.preventDefault();
                alertTabbaleElemLast.focus();
            }
        });

        alertTabbaleElemLast.keydown(function(evt) {
            var keyType = evt.keyCode || evt.which;
            if (!evt.shiftKey && keyType === 9) {
                evt.preventDefault();
                alertTabbaleElemFirst.focus();
            }
        });

        var IEalertChkbox = $("#alert-checkbox"),
            closeIEalert = function() {
            if (!IEalertElem.css("display") === "block") return;

            if (!sessionStorage.getItem("ie-alert-chkbox-checked")) {
                if (IEalertChkbox.is(":checked")) {
                    sessionStorage.setItem("ie-alert-chkbox-checked", true);
                    IEalertElem.css("display", "none").attr("aria-hidden", "true");
                    alertOuterElem.removeAttr("aria-hidden");
                    rootElem.off("keydown.alert_keydown");
                } else {
                    alert("현재 사용 중인 브라우저에서는 블로그 이용이 원활하지 않을 수 있습니다. \n더 나은 사용자 경험을 위하여 최신 브라우저로 접속하십시오.");
                    IEalertElem.css("display", "none").attr("aria-hidden", "true");
                    alertOuterElem.removeAttr("aria-hidden");
                    rootElem.off("keydown.alert_keydown");
                }
            } else {
                IEalertElem.css("display", "none").attr("aria-hidden", "true");
                alertOuterElem.removeAttr("aria-hidden");
                rootElem.off("keydown.alert_keydown");
            }
        };

        rootElem.on("keydown.alert_keydown", function(evt) {
            if ((evt.keyCode || evt.which) === 27) closeIEalert();
        });

        $(".ie-alert__btn--close").click(closeIEalert);
    }
});

$(function() {

    // 포스트 페이지 heading link
    $(".page__content").find(":header:not(.toc__title)").each(function() {
        var t_id = $(this).attr("id"),
            t_txt = $(this).text();

        if (t_id) {
            var t_anc = document.createElement("a");

            t_anc.classList.add("heading-link");
            t_anc.href = "#" + t_id;
            t_anc.title = t_txt.replace(/-/g, " ");
            $(this).prepend(t_anc);
        }
    });

    // 페이지 맨 위로 이동 버튼
    $("[class*='btn--top']").click(function() {
        $("html, body").stop().animate({
            scrollTop: 0
        }, 500);
    });
});

// post archive 목록 펼쳐보기
$(function() {

    var archiveBtnElement = $(".archive__btn"),
        archiveListElement = $(".archive__list");

    archiveBtnElement.click(function() {
        var archiveListMatchElement = $("[aria-labelledby='"+$(this).attr("id")+"']");

        if (archiveListMatchElement.css("display") !== "block") {
            archiveListElement
                .removeAttr("style")
                .attr("tabindex", "-1");
                
            archiveListMatchElement
                .css("display", "block")
                .attr("tabindex", "0")
                .stop()
                    .animate({"opacity": "1"}, 300);

            $(this)
                .attr("aria-expanded", "true")
                .siblings(".archive__btn")
                    .attr("aria-expanded", "false");

        } else {
            archiveListElement
                .removeAttr("style")
                .attr("tabindex", "-1");

            archiveBtnElement
                .attr("aria-expanded", "false");
        }
    });
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
                !t_anchor.hasClass("toc--active") && t_anchor.addClass("toc--active");
            }
        });
    });

    $(".toc-wrapper li a").click(function() {
        $("html, body")
            .stop()
            .animate({
                scrollTop: $("#" + $(this).attr("href").replace("#", "")).offset().top
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

    tocTabbleNode.keydown(function() {
        return tocTabbleFocusedLast = $(this);

    }).keydown(function(evt) {
        if (evt.altKey && (evt.keyCode || evt.which) === 192) { // alt + ~키 : 포스트 요소 중 마지막으로 초점 잡혔던 요소(이하 focusedLast)에서 목차로 초점 이동
            $(".toc--fixed").focus().keydown(function(evt) {
                if (evt.altKey && (evt.keyCode || evt.which) === 192) { // alt + ~키 : focusedLast로 초점 이동
                    tocTabbleFocusedLast.focus();
                }
            });
        }
    });

    if ($(".toc--fixed").length) {
        $(document).keydown(function(evt) {
            var keyType = evt.keyCode || evt.which;
    
            if (evt.altKey && keyType === 192 && !tocTabbleNode.is(":focus")) { // alt + ~키 : 포스트에서 목차로 초점 이동
                if (!$(".toc--fixed").is(":focus")) $(".toc--fixed").focus();
            }
    
            if (evt.altKey && keyType === 49 && $(".toc-wrapper").hasClass("toc--fixed")) { // alt + 1키 : 활성화된 목차 링크로 초점 이동
                $(".toc--active").focus();
            }
        });
    }
});

// abbr
$(function() {

    function tooltipCreate(evt) {
        var targetElement = $(evt.currentTarget),
            tooltipElement = targetElement.find(".abbr__tooltip");

        if (!tooltipElement.length) {
            targetElement
                .addClass("tooltip--visible")
                .attr("tabindex", "0")
                .append("<span class='abbr__tooltip'>" + targetElement.attr('title') + "</span>")
                .find("span")
                    .attr({
                        "tabindex": "0",
                        "role": "tooltip",
                        "id": targetElement.attr("aria-describedby")
                });

        } else {
            targetElement.removeClass("tooltip--visible");
            tooltipElement.remove();
        }
    }

    var abbrElement = $("abbr[title]");

    if ($(window).outerWidth() <= 1200) {
        abbrElement.on("click", tooltipCreate);
    }

    $(window).resize(function() {
        if ($(window).outerWidth() <= 1200) {
            abbrElement.on("click", tooltipCreate);
        } else {
            $("abbr[title]").removeAttr("tabindex");
            $(".abbr__tooltip").remove();
            abbrElement.off("click");
        }
    });
});

$(function() {

    // 메인 메뉴
    var nav = $(".site-nav"),
        menu = $(".side-menu"),
        menuOuterEL = $("body").children().not(menu.add("script")),
        menuELlayer = menu.find(".menu__layer"),
        menuELopen = nav.find(".nav__menu-open"),
        menuELclose = menu.find(".menu__btn--close"),
        menuELtabble = menu.find("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
        menuELtabbleFirst = menuELtabble.first(),
        menuELtabbleLast = menuELtabble.last(),
        menuELFocusedLast, nowScrollPos,
        menuCurrentPage = menu.find("a[href='"+window.location.pathname+"']");

    menuELopen.click(function() {
        // $("body")
        //     .css("top", - $(window).scrollTop() + "px")
        //     .addClass("scroll--off")
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
        $("body").addClass("overflow--hidden");
        menuELclose.attr("aria-expanded", "true");
        menuOuterEL.attr("aria-hidden", "true");
        if (!menuCurrentPage.is("[aria-current]")) {
            menuCurrentPage.attr("aria-current", "page");
            menuCurrentPage.parent("li").addClass("menu__menuitem--current-page");
        }

        setTimeout(function() {
            menuELlayer.stop().animate({"right": "0"}, 400);
        });
        
        menuELtabble.focusin(function() {
            menuELFocusedLast = $(this);
        });

        menuELFocusedLast ? menuELFocusedLast.focus() : menuELtabbleFirst.focus().on("keydown", function(evt) {
            if (evt.shiftKey && (evt.keyCode || evt.which) === 9) {
                evt.preventDefault();
                menuELtabbleLast.focus();
            }
        });

        menuELtabbleLast.keydown(function(evt) {
            if (!evt.shiftKey && (evt.keyCode || evt.which) === 9) {
                evt.preventDefault();
                menuELtabbleFirst.focus();
            }
        });

        menuELclose.click(menuClose);

        if (menu.css("display") === "block") {
            $(document).keydown(function(evt) {
                if ((evt.keyCode || evt.which) === 27) { // Esc 키 : 메뉴 닫기
                    menuClose();
                }
            });
        }

        $("a[href*='/category-list/#']").click(function() {
            if ($("body").hasClass("layout--categories") || $("body").hasClass("layout--tags")) {
                menuClose();
            }
        });
    });

    function menuClose() {
        // $("body")
        //     .removeClass("scroll--off")
        //     .css("top", "")
        //     .off("scroll touchmove mousewheel");
        // if (!$("body").hasClass("scroll--off")) {
        //     $(window).scrollTop(nowScrollPos);
        // }
        menuELclose.add(menuELopen).attr("aria-expanded", "false");
        $("body").removeClass("overflow--hidden");
        menuOuterEL.removeAttr("aria-hidden");
        menuELlayer.stop().animate({"right": "-100%"}, 400);

        setTimeout(function() {
            menu.add(menuELlayer).removeAttr("style");
        }, 400);

        menu.attr("aria-hidden", "true");
        !$(location.hash).is(":focus") && menuELopen.focus();
    }
});

// 검색 레이어
$(function() {

    var openBtn = $(".nav__search-open"),
        closeBtn = $(".search__btn--close"),
        layer = $(".search-content"),
        outerEL = $("body").children().not(layer.add("script, .side-menu")),
        tabbale = layer.find("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
        tabbaleFirst = tabbale.first(),
        tabbaleLast = tabbale.last(),
        sForm = layer.find("form"),
        sLabel = sForm.find("label"),
        sInput = layer.find("input[type='search']"), sInputVal, sInputValNotChanged;

    function layerClose() {
        $("body").removeClass("overflow--hidden");
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

    openBtn.click(function() {
        sInputValNotChanged = true;

        $(this).add(closeBtn).attr("aria-expanded", "true");
        $("body").addClass("overflow--hidden");
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
                                !sLabel.hasClass("visually-hidden") && sLabel.addClass("visually-hidden");
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

        tabbaleFirst.keydown(function(evt) {
            if (evt.shiftKey && (evt.keyCode || evt.which) === 9) {
                evt.preventDefault();
                tabbaleLast.focus();
            }
        });

        tabbaleLast.keydown(function(evt) {
            if (!evt.shiftKey && (evt.keyCode || evt.which) === 9) {
                evt.preventDefault();
                tabbaleFirst.focus();
            }
        });

        if (layer.css("display") === "block") {
            $(document).keydown(function(evt) {
                if ((evt.keyCode || evt.which) === 27) { // Esc 키 : form reset/레이어 닫기
                    sInputValNotChanged || !sInput.is(":focus") || sInputVal ? layerClose() : sForm[0].reset();
                }
            });
        }
        
        closeBtn.click(layerClose);
    });
});

// 탭
$(function() {

    var tabWrapper = $(".tab-wrapper");
    if (!tabWrapper) return;

    function handleClickEvent(evt) {
        evt.stopPropagation();

        var actTab = evt.target,
            actPanel = $("#" + actTab.getAttribute("aria-controls"));

        activateTab(actTab, actPanel);
    }

    function handleKeydownEvent(evt) {
        evt.stopPropagation();

        var thisTab = $(evt.target),
            actPanel = $("#" + thisTab.attr("aria-controls")),
            tabbleEL = actPanel.find("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])");

        switch(evt.keyCode || evt.which) {
            case 37:
                if (thisTab.is(":first-child")) {
                    thisTab.siblings(":last").focus();
                } else {
                    thisTab.prev().focus();
                }
                break;

            case 39:
                if (thisTab.is(":last-child")) {
                    thisTab.siblings(":first").focus();
                } else {
                    thisTab.next().focus();
                }
                break;

            case 13:
            case 32:
                evt.preventDefault();
                activateTab(thisTab, actPanel);
                break;

            case 36:
                evt.preventDefault();
                thisTab.is(":focus") && thisTab.siblings(":first").focus();
                break;

            case 35:
                evt.preventDefault();
                thisTab.is(":focus") && thisTab.siblings(":last").focus();
                break;
        }

        var tabbleELfocusedLast;
        tabbleEL.keydown(function(evt) {
            tabbleELfocusedLast = $(this);

            if (evt.ctrlKey && !thisTab.is(":focus")) thisTab.focus().keydown(function(evt) {
                evt.ctrlKey && tabbleELfocusedLast.focus();
            });
        });
    }

    function activateTab(tab, panel) {
        if (!tab || !panel) return;

        $(tab)
            .addClass("tab--active")
            .attr({
                "tabindex": "0",
                "aria-selected": "true"
            })
            .focus()
            .siblings()
                .removeClass("tab--active")
                .attr({
                    "tabindex": "-1",
                    "aria-selected": false
                });

        $(panel)
            .addClass("tabpanel--active")
            .attr({
                "tabindex": "0"
            })
            .prop({
                "hidden": "false"
            })
            .siblings(".tabpanel")
                .removeClass("tabpanel--active")
                .attr({
                    "tabindex": "-1"
                })
                .prop({
                    "hidden": true
                });
    }

    $(".tablist__tab:first-child")
        .addClass("tab--active")
        .attr({
            "tabindex": "0",
            "aria-selected": "true"
        });

    tabWrapper
        .find(".tabpanel:first")
            .addClass("tabpanel--active")
            .attr({
                "tabindex": "0"
            })
            .prop({
                "hidden": false
            });

    tabWrapper.on("click", ".tablist__tab", handleClickEvent);
    tabWrapper.on("keydown", ".tablist__tab", handleKeydownEvent);
});