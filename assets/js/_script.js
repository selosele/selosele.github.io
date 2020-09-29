// IE 11 ~ 9 체크
(function() {
    if (window.navigator.userAgent.toLowerCase().indexOf("trident") > -1) {
        document.documentElement.className += " only-ie";
    }
})();

// IE 10 이하 체크
(function() {
    if (navigator.userAgent.indexOf("MSIE") >= 0) {
        document.documentElement.className += " lte-ie10";
        document.getElementById("ie-alert").removeAttribute("aria-hidden");
    }
})();

// 검색 input enter키로 submit 방지
(function() {
    document.querySelector(".search-content__inner-wrap form").addEventListener("keydown", function(evt) {
        if (evt.key === "Enter") evt.preventDefault();
    });
})();

// 메인 메뉴
(function() {
    var menuWrapper = document.getElementById("side-menu"),
        menuLayer = document.getElementById("primary-nav"),
        menuOuterEL = document.querySelectorAll("#skip-links, .masthead, #content, #mastfoot"),
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
    },
    handlerClick = function(evt) {
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
        var preCodeElement = postRoot.querySelectorAll("pre.highlight");
        
        for (var i = 0; i < preCodeElement.length; i++) {
            var preCodeParentElement = preCodeElement[i].parentElement.parentElement;

            if (preCodeParentElement.classList.contains("has-label")) {
                preCodeElement[i].setAttribute("title", preCodeParentElement.className.replace(/language-|has-label |highlighter-rouge/g, "") + "코드");
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
                window.open(this.href, 'window', 'left=20, top=20, width=500, height=500, toolbar=1, resizable=0');
            });
        }
    }
})();

// post archive 아코디언
(function() {
    var handlerClick = function(evt) {
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
    },
    archiveBtnElement = document.querySelectorAll(".archive__btn");
    if (archiveBtnElement) {
        for (var i = 0; i < archiveBtnElement.length; i++) {
            archiveBtnElement[i].addEventListener("click", handlerClick);
        }
    }
})();

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
        if (evt.altKey && evt.key === "1") { // alt + 1키 : 포스트 요소 중 마지막으로 초점 잡혔던 요소(이하 focusedLast)에서 목차로 초점 이동
            $(".toc--fixed nav").focus().on("keydown", function(evt) {
                if (evt.altKey && evt.key === "1") { // alt + 1키 : focusedLast로 초점 이동
                    tocTabbleFocusedLast.focus();
                }
            });
        }
    });

    if ($(".toc--fixed").length) {
        $(document).on("keydown.toc_keydown", function(evt) {
            if ((evt.altKey && evt.key === "1") && !tocTabbleNode.is(":focus")) { // alt + 1키 : 포스트에서 목차로 초점 이동
                if (!$(".toc--fixed").is(":focus")) $(".toc--fixed nav").focus();
            }
    
            if ((evt.altKey && evt.key === "2") && $(".toc-wrapper").hasClass("toc--fixed")) { // alt + 2키 : 활성화된 목차 링크로 초점 이동
                $(".toc--active").focus();
            }
        });
    }
});

// 검색 레이어
$(function() {
    var openBtn = $(".nav__search-open"),
        closeBtn = $(".search__close"),
        layer = $(".search-content"),
        outerEL = $("body").children().not(layer.add("script, #ie-alert, #side-menu, #scroll-indicator")),
        tabbale = layer.find("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),
        tabbaleFirst = tabbale.first(),
        tabbaleLast = tabbale.last(),
        sForm = layer.find("form"),
        sLabel = sForm.find("label"),
        sInput = $("#search-input"), sInputVal, sInputValNotChanged,
        
        layerClose = function() {
            $(document).off("keydown.search_keydown");
            $("body").removeClass("overflow-hidden");
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
        $("body").addClass("overflow-hidden");
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
                            var sInputText = this.value;

                            if (sInputText) {
                                sInputVal = false;
                                sInputValNotChanged = false;
                                if (!sLabel.hasClass("visually-hidden")) sLabel.addClass("visually-hidden");

                                $("#results li a:contains('"+sInputText+"')").html(function(_, html) {
                                    if (!$(this).children(".results__item__match").length) {
                                        return html.replace(sInputText, '<span class="results__item__match">'+sInputText+'</span>');
                                    }
                                });
                            } else {
                                sInputVal = true;
                                sInputValNotChanged = true;
                                sLabel.removeClass("visually-hidden");
                            }

                            if ($("#results li").length) {
                                sInput.attr("aria-expanded", "true");
                            } else {
                                sInput.attr("aria-expanded", "false");
                            }
                    })
                    .on("keydown", function(evt) {
                        switch (evt.key) {
                            case "ArrowDown":
                            case "Down":
                                if ($("#results li").length) {
                                    evt.preventDefault();
                                    $("#results li:first a").focus();
                                }
                                break;
                        }
                    });
                }
            });
        });

        tabbaleFirst.on("keydown", function(evt) {
            if (evt.shiftKey && evt.key === "Tab") {
                evt.preventDefault();
                tabbaleLast.focus();
            }
        });

        tabbaleLast.on("keydown", function(evt) {
            if (!evt.shiftKey && evt.key === "Tab") {
                evt.preventDefault();
                tabbaleFirst.focus();
            }
        });

        $(document).on("keydown.searchResult_keydown", "#results li a", function(evt) {
            // if (evt.defaultPrevented) return;

            var _t = $(evt.currentTarget),
                _t_list = _t.parent("li"),
                list = $("#results li");

            switch (evt.key) {
                case "ArrowUp":
                case "Up":
                    !_t_list.prev().length ? list.last().children("a").focus() : _t_list.prev().children("a").focus();
                    evt.stopPropagation();
                    break;
                
                case "ArrowDown":
                case "Down":
                    !_t_list.next().length ? list.first().children("a").focus() : _t_list.next().children("a").focus();
                    evt.stopPropagation();
                    break;
            }
        });

        if (layer.css("display") === "block") {
            $(document).on("keydown.search_keydown", function(evt) {
                var keyType = evt.key;

                if (keyType === "Escape" || keyType === "Esc") {
                    $("#results li a").is(":focus") && sInput.focus();
                    // sInputValNotChanged || !sInput.is(":focus") || sInputVal ? layerClose() : sForm[0].reset();
                    
                    if (!sInputValNotChanged || sInput.is(":focus")) {
                        if (sInputVal) {
                            layerClose();
                        } else {
                            if (!sInput.is(":focus")) {
                                layerClose();
                            } else {
                                sForm[0].reset();
                                $("#results").empty();
                            }
                        }
                    } else {
                        layerClose();
                    }
                }
            });
        }
        closeBtn.on("click", layerClose);
    });
});