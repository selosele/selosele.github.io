!function(){var e=document.documentElement;window.navigator.userAgent.toLowerCase().indexOf("trident")>-1&&(e.className+=" only-ie",document.getElementById("ie-alert").removeAttribute("aria-hidden")),navigator.userAgent.indexOf("MSIE")>=0&&(e.className+=" lte-ie10",document.getElementById("ie-version-txt").innerHTML="IE 브라우저 10 버전 이하를 <strong>지원하지 않습니다.</strong>")}(),function(){var e,t=document.documentElement,n=document.getElementById("side-menu"),a=document.getElementById("primary-nav"),r=document.querySelectorAll("#skip-links, #ie-alert, #masthead, #content, #mastfoot"),i=document.querySelector(".nav__menu-open"),o=a.querySelector(".menu__close"),c=a.querySelectorAll("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),s=c[0],l=c[c.length-1],d=a.querySelectorAll("a[href*='/category-list/#']");function u(){document.removeEventListener("keydown",f),o.blur(),o.setAttribute("aria-expanded","false"),i.setAttribute("aria-expanded","false"),i.focus(),n.setAttribute("aria-hidden","true"),a.classList.remove("menu__layer--animate"),t.classList.remove("layer-opened");for(var e=0;e<r.length;e++)r[e].removeAttribute("aria-hidden");setTimeout((function(){n.classList.remove("side-menu--active")}),400)}function f(e){var t=e.key;!n.classList.contains("side-menu--active")||"Escape"!==t&&"Esc"!==t||u()}i.addEventListener("click",(function(i){i.currentTarget.setAttribute("aria-expanded","true"),o.setAttribute("aria-expanded","true"),n.setAttribute("aria-hidden","false"),n.classList.add("side-menu--active"),t.classList.add("layer-opened"),setTimeout((function(){a.classList.add("menu__layer--animate")}));for(var d=0;d<r.length;d++)r[d].setAttribute("aria-hidden","true");for(d=0;d<c.length;d++)c[d].addEventListener("focusin",(function(t){e=t.currentTarget}));e?e.focus():(s.focus(),s.addEventListener("keydown",(function(e){e.shiftKey&&"Tab"===e.key&&(e.preventDefault(),l.focus())}))),l.addEventListener("keydown",(function(e){e.shiftKey||"Tab"!==e.key||(e.preventDefault(),s.focus())})),document.addEventListener("keydown",f)})),o.addEventListener("click",u),n.addEventListener("click",(function(e){e.target===e.currentTarget&&u()}));for(var v=0;v<d.length;v++)(t.classList.contains("layout--categories")||t.classList.contains("layout--tags"))&&d[v].addEventListener("click",u)}(),window.addEventListener("scroll",(function(){if(document.documentElement.classList.contains("layout--post")){var e=document.body.scrollHeight-window.innerHeight,t=window.pageYOffset/e*100;document.getElementById("scroll-indicator").style.width=t+"%"}})),function(){var e=document.getElementById("page-content");if(e)for(var t=e.querySelectorAll("h2:not(.toc__title), h3, h4, h5, h6"),n=0;n<t.length;n++){var a=t[n].id,r=t[n].textContent,i=document.createElement("a");a?i.href="#"+a:(t[n].id=r.replace(/ /g,"-"),i.href="#"+r.replace(/ /g,"-")),i.title=r.replace(/-/g," "),i.classList.add("page__header-link"),t[n].insertBefore(i,t[n].firstChild)}}(),function(){var e=document.querySelectorAll("abbr[title]");if(e.length)for(var t=0;t<e.length;t++)e[t].addEventListener("click",n),e[t].addEventListener("keydown",a);function n(e){if(e.target===e.currentTarget||"Enter"===e.key){var t=e.currentTarget.querySelector(".abbr__tooltip");t.classList.contains("abbr__tooltip--active")?(t.hidden=!0,t.setAttribute("tabindex","-1"),t.classList.remove("abbr__tooltip--active")):(t.hidden=!1,t.setAttribute("tabindex","0"),t.classList.add("abbr__tooltip--active"))}}function a(e){"Enter"===e.key&&n(e)}Array.prototype.slice.call(e).forEach((function(e){var t=document.createElement("span"),n="tooltip-"+encodeURI(e.title).replace(/ |%/g,"1");e.setAttribute("tabindex","0"),e.setAttribute("aria-describedby",n),t.hidden=!0,t.setAttribute("role","tooltip"),t.id=n,t.textContent=e.title,t.classList.add("abbr__tooltip"),e.appendChild(t)}))}(),function(){var e=document.getElementById("page-content");if(e)for(var t=e.querySelectorAll("pre.highlight"),n=0;n<t.length;n++){var a=t[n].parentElement.parentElement;a.classList.contains("has-label")&&t[n].setAttribute("title",a.className.replace(/language-|has-label |highlighter-rouge/g,"")+"코드")}}(),function(){var e=document.getElementById("page-share");if(e)for(var t=e.querySelectorAll("a"),n=0;n<t.length;n++)t[n].addEventListener("click",(function(e){e.preventDefault(),window.open(e.currentTarget.href,"window","left=20, top=20, width=500, height=500, toolbar=1, resizable=0")}))}(),function(){var e=function(e){var t=e.currentTarget,n=document.querySelector("[aria-labelledby='"+t.id+"']");n.classList.contains("archive__list--active")?(n.classList.remove("archive__list--active"),n.setAttribute("hidden",!0),n.setAttribute("tabindex","-1"),t.setAttribute("aria-expanded","false")):(n.classList.add("archive__list--active"),n.setAttribute("hidden",!1),n.setAttribute("tabindex","0"),t.setAttribute("aria-expanded","true"))},t=document.querySelectorAll(".archive__btn");if(t.length)for(var n=0;n<t.length;n++)t[n].addEventListener("click",e)}(),window.addEventListener("scroll",(function(){var e=document.getElementById("page-content"),t=document.getElementById("toc");if(e&&t){var n=e.querySelectorAll("h2:not(.toc__title), h3, h4, h5, h6");Array.prototype.slice.call(n).forEach((function(e){if(window.pageYOffset>=e.offsetTop-1)for(var n=e.id,a=t.querySelector("li a[href='#"+n+"']"),r=t.querySelectorAll("li a"),i=0;i<r.length;i++)r[i].classList.contains("toc--active")&&r[i].classList.remove("toc--active"),a.classList.contains("toc--active")||a.classList.add("toc--active")}))}})),function(){var e=document.getElementById("page-content"),t=document.getElementById("toc");if(e&&t){var n,a=e.querySelectorAll("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])");function r(e){if(e.altKey&&"1"===e.key){var a=document.querySelector(".toc--fixed > nav");a.focus(),a.addEventListener("keydown",(function(e){e.altKey&&"1"===e.key&&n&&(e.stopPropagation(),n.focus())}))}e.altKey&&"2"===e.key&&t.classList.contains("toc--fixed")&&document.querySelector(".toc--active").focus()}Array.prototype.slice.call(a).forEach((function(e){e.addEventListener("keydown",(function(e){e.currentTarget!==document.querySelector("#toc > nav")&&(e.stopPropagation(),(n=e.currentTarget).addEventListener("keydown",r))}))})),t.classList.contains("toc--fixed")&&document.addEventListener("keydown",r)}}(),function(){var e,t,n=document.documentElement,a=document.querySelector(".nav__search-open"),r=document.querySelector(".search__close"),i=document.getElementById("search-content"),o=document.querySelectorAll("#skip-links, #masthead, #content, #mastfoot, #side-menu"),c=i.querySelectorAll("button, input:not([type='hidden']), select, textarea, [href], [tabindex]:not([tabindex='-1'])"),s=c[0],l=c[c.length-1],d=document.getElementById("search-results"),u=document.getElementById("search-title"),f=document.getElementById("search-input");function v(){var n=f.value;if(n){e=!1,t=!1,u.classList.contains("sr-only")||u.classList.add("sr-only");for(var a=d.querySelectorAll("a"),r=0;r<a.length;r++)a[r]===n||a[r].querySelector(".search__results__match")||(a[r].innerHTML=a[r].innerHTML.replace(n,'<span class="search__results__match">'+n+"</span>"))}else e=!0,t=!0,u.classList.remove("sr-only");d.querySelectorAll("li").length?f.setAttribute("aria-expanded","true"):f.setAttribute("aria-expanded","false")}function m(e){var t=d.querySelectorAll("li");switch(e.key){case"ArrowDown":case"Down":t.length&&(e.preventDefault(),t[0].querySelector("a").focus())}}function y(e){if("A"===e.target.tagName){var t=e.target.parentElement,n=d.querySelectorAll("li"),a=n[0],r=n[n.length-1],i=t.previousElementSibling,o=t.nextElementSibling;switch(e.key){case"ArrowUp":case"Up":i?i.querySelector("a").focus():r.querySelector("a").focus(),e.stopPropagation();break;case"ArrowDown":case"Down":o?o.querySelector("a").focus():a.querySelector("a").focus(),e.stopPropagation()}}}function h(){document.removeEventListener("keydown",g),document.removeEventListener("keydown",y),n.classList.remove("layer-opened"),r.setAttribute("aria-expanded","false"),i.classList.remove("search-content--animate"),setTimeout((function(){i.classList.remove("search-content--active");for(var e=0;e<o.length;e++)!0!==o[e].getAttribute("aria-hidden")&&o[e].removeAttribute("aria-hidden");i.setAttribute("aria-hidden","true")}),200),a.setAttribute("aria-expanded","false"),a.focus()}function g(n){var a=n.key;if("Escape"===a||"Esc"===a){for(var r=d.querySelectorAll("a"),i=0;i<r.length;i++)r[i]===document.activeElement&&f.focus();if(t||f!==document.activeElement)h();else if(e)h();else if(f!==document.activeElement)h();else for(f.value="";d.firstChild;)d.removeChild(d.firstChild)}}a.addEventListener("click",(function(e){var a=e.currentTarget;t=!0,a.setAttribute("aria-expanded","true"),r.setAttribute("aria-expanded","true"),n.classList.add("layer-opened");for(var c=0;c<o.length;c++)o[c].setAttribute("aria-hidden","true");i.classList.add("search-content--active"),i.setAttribute("aria-hidden","false"),i.addEventListener("click",(function(e){e.target===e.currentTarget&&h()})),setTimeout((function(){i.classList.add("search-content--animate"),f.focus(),f.addEventListener("propertychange",v),f.addEventListener("change",v),f.addEventListener("keyup",v),f.addEventListener("paste",v),f.addEventListener("input",v),f.addEventListener("focus",v),f.addEventListener("keydown",m)})),s.addEventListener("keydown",(function(e){e.shiftKey&&"Tab"===e.key&&(e.preventDefault(),l.focus())})),l.addEventListener("keydown",(function(e){e.shiftKey||"Tab"!==e.key||(e.preventDefault(),s.focus())})),document.addEventListener("keydown",g),document.addEventListener("keydown",y)})),r.addEventListener("click",h)}();