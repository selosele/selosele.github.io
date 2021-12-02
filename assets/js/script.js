"use strict";window.navigator.userAgent.toLowerCase().indexOf("trident")>-1&&(document.documentElement.className+=" only-ie",document.getElementById("ie-alert").removeAttribute("aria-hidden")),navigator.userAgent.indexOf("MSIE")>=0&&(document.documentElement.className+=" lte-ie10",document.getElementById("ie-version-txt").innerHTML="IE 브라우저 10 버전 이하를 <strong>지원하지 않습니다.</strong>"),window.addEventListener("scroll",(function(){if(document.querySelector(".layout--post")){var e=document.body.scrollHeight-window.innerHeight,t=window.pageYOffset/e*100;document.getElementById("scroll-indicator").style.width=t+"%"}})),function(){var e=document.documentElement,t=document.querySelector(".nav__darkmode-toggle");t.addEventListener("click",(function(t){var n=t.currentTarget,r=n.querySelector(".sr-only");e.classList.toggle("is-darkmode"),n.classList.toggle("nav__darkmode-toggle--active"),e.classList.contains("is-darkmode")?(localStorage.setItem("darkmode","Y"),r.textContent="라이트모드"):(localStorage.setItem("darkmode","N"),r.textContent="다크모드")})),document.addEventListener("DOMContentLoaded",(function(){"Y"===localStorage.getItem("darkmode")&&(e.classList.add("is-darkmode"),t.classList.add("nav__darkmode-toggle--active"),t.querySelector(".sr-only").textContent="라이트모드")}))}(),function(){var e=document.documentElement,t=document.body,n=document.getElementById("side-menu"),r=document.getElementById("primary-nav"),a=document.querySelectorAll("#skip-links, #ie-alert, #masthead, #content, #mastfoot"),i=document.querySelector(".nav__menu-open"),o=r.querySelector(".menu__close"),c=r.querySelectorAll("button, input, [href], [tabindex]:not([tabindex='-1'])"),s=c.length&&c[0],l=c.length&&c[c.length-1],d=r.querySelectorAll("a[href^='/category-list/#']"),u=0;function h(){document.removeEventListener("keydown",v),o.blur(),o.setAttribute("aria-expanded","false"),i.setAttribute("aria-expanded","false"),i.focus(),n.setAttribute("aria-hidden","true"),r.classList.remove("menu__layer--animate"),e.classList.remove("layer-opened");for(var c=0;c<a.length;c++)a[c].removeAttribute("aria-hidden");setTimeout((function(){n.classList.remove("side-menu--active")}),300),t.style.top="",window.scrollTo(0,u)}function v(e){var t=e.key;!n.classList.contains("side-menu--active")||"Escape"!==t&&"Esc"!==t||h()}i.addEventListener("click",(function(i){u=window.pageYOffset,e.classList.add("layer-opened"),t.style.top=-u+"px",i.currentTarget.setAttribute("aria-expanded","true"),o.setAttribute("aria-expanded","true"),n.setAttribute("aria-hidden","false"),n.classList.add("side-menu--active"),setTimeout((function(){r.classList.add("menu__layer--animate")}),150);for(var c=0;c<a.length;c++)a[c].setAttribute("aria-hidden","true");s.focus(),s.addEventListener("keydown",(function(e){e.shiftKey&&"Tab"===e.key&&(e.preventDefault(),l.focus())})),l.addEventListener("keydown",(function(e){e.shiftKey||"Tab"!==e.key||(e.preventDefault(),s.focus())})),document.addEventListener("keydown",v)})),o.addEventListener("click",h),n.addEventListener("click",(function(e){e.target===e.currentTarget&&h()}));for(var m=0;m<d.length;m++)document.querySelector(".layout--categories")&&d[m].addEventListener("click",h);r.addEventListener("touchstart",(function(e){var t=(e.touches||e.originalEvent.touches)[0];g=t.clientX,p=t.clientY})),r.addEventListener("touchmove",(function(e){if(!g||!p)return;var t=e.touches[0].clientX,n=e.touches[0].clientY,r=g-t,a=p-n;Math.abs(r)>Math.abs(a)&&r<0&&h();g=null,p=null}));var g=null,p=null}(),function(){var e=document.querySelector(".page__content");if(e){for(var t=e.querySelectorAll("h2, h3, h4, h5, h6"),n=0;n<t.length;n++){var r=t[n],a=r.id,i=r.textContent,o=document.createElement("a");a?o.href="#"+a:(r.id=i.replace(/ /g,"-"),o.href="#"+i.replace(/ /g,"-")),o.title=i.replace(/-/g," "),o.classList.add("page__header-link"),r.insertBefore(o,r.firstChild)}var c=document.querySelector(".toc-wrapper");if(c){var s=e.querySelectorAll(".page__header-link"),l=function(e,t){e.querySelector("[href='"+decodeURI(t.hash)+"']").scrollIntoView(!0)};for(n=0;n<s.length;n++)s[n].addEventListener("click",(function(){l(c,this)}));location.hash&&l(c,location)}}}(),function(){var e,t=document.querySelectorAll("abbr[title]");if(t.length)for(var n=0;n<t.length;n++){(r=t[n]).addEventListener("click",c),r.addEventListener("keydown",s)}document.addEventListener("click",d),document.addEventListener("touchstart",d);for(n=0;n<t.length;n++){var r=t[n],a=document.createElement("span"),i="tooltip"+n+"-"+encodeURI(r.title).replace(/ /g,"0").replace(/%/g,"1");r.setAttribute("aria-describedby",i),r.setAttribute("tabindex",0),a.hidden=!0,a.setAttribute("role","tooltip"),a.id=i,a.textContent=r.title,a.classList.add("abbr__tooltip"),r.appendChild(a)}var o=document.querySelectorAll(".abbr__tooltip");function c(t){if(t.target===t.currentTarget||"Enter"===t.key){var n=(e=t.currentTarget).querySelector(".abbr__tooltip");n.classList.contains("abbr__tooltip--active")?l(n):(n.hidden=!1,n.setAttribute("tabindex",0),n.classList.add("abbr__tooltip--active"))}}function s(e){"Enter"===e.key&&c(e)}function l(t){t.hidden=!0,t.setAttribute("tabindex",-1),t.classList.remove("abbr__tooltip--active"),e.focus()}function d(e){for(var t=0;t<o.length;t++){var n=o[t];"ABBR"!==e.target.tagName&&!e.target.classList.contains("abbr__tooltip")&&n.classList.contains("abbr__tooltip--active")&&l(n)}}if(o.length)for(n=0;n<o.length;n++)o[n].addEventListener("click",(function(){l(this)}))}(),function(){var e=document.querySelector(".page__content");if(e){var t=e.querySelectorAll("div.highlighter-rouge");Array.prototype.forEach.call(t,(function(e){var t=document.createElement("div");t.classList.add("highlight__util-wrapper"),e.insertBefore(t,e.firstChild);var n=e.className.replace(/language-|highlighter-rouge/g,""),r=e.querySelector(".highlight__util-wrapper");if("plaintext "!==n){var a=document.createElement("span");a.textContent=n,a.classList.add("highlight__language"),r.insertBefore(a,r.firstChild)}var i=document.createElement("button");if(i.textContent="복사",i.classList.add("highlight__copy-button"),r.appendChild(i),e.querySelector(".highlight__copy-button").addEventListener("click",(function(t){try{var n=t.currentTarget,r=n.parentElement.parentElement,a=e.querySelector(".lineno")?r.querySelector(".rouge-code > pre"):r.querySelector("pre.highlight"),i=document.createElement("textarea");i.setAttribute("readonly",!0),i.setAttribute("contenteditable",!0),i.classList.add("sr-only"),i.value=a.textContent,n.parentElement.appendChild(i),i.select();var o=document.createRange();o.selectNodeContents(i);var c=window.getSelection();c.removeAllRanges(),c.addRange(o),i.setSelectionRange(0,i.value.length),document.execCommand("copy"),n.textContent="복사됨"}catch(e){alert("복사에 실패했습니다.")}finally{n.parentElement.removeChild(i),n.focus()}})),e.hasAttribute("data-line")&&e.querySelector(".lineno")){var o=e.querySelector(".lineno"),c=e.getAttribute("data-line").split("-")[0],s=e.getAttribute("data-line").split("-")[1];o===c||o.querySelector("span")||(o.innerHTML=o.innerHTML.replace(c,"<span id=code-line"+c+">"+c+"</span>")),o!==s&&(o.innerHTML=o.innerHTML.replace(s,"<span id=code-line"+s+">"+s+"</span>"));var l=document.createElement("span"),d=e.querySelectorAll("[id='code-line"+c+"']")[0],u=d.nextElementSibling,h=e.querySelector("pre.highlight");l.setAttribute("aria-hidden","true"),l.classList.add("highlight__bg"),h.insertBefore(l,h.firstChild);var v=function(t,n){var r=t.offsetTop;if(l.style.top=r+13+"px",s){var a=n.offsetTop-r+parseInt(getComputedStyle(n,null).lineHeight);e.querySelector(".highlight__bg").style.height=a+"px"}};v(d,u),window.addEventListener("resize",(function(){v(d,u)}))}}))}}(),function(){var e=function(e){var t=e.currentTarget,n=document.querySelector("[aria-labelledby="+t.id+"]");n.classList.contains("archive__list--active")?(n.classList.remove("archive__list--active"),n.hidden=!0,n.setAttribute("tabindex",-1),t.classList.remove("archive__btn--active"),t.setAttribute("aria-expanded","false"),sessionStorage.removeItem("curArchiveId",t.id)):(n.classList.add("archive__list--active"),n.hidden=!1,n.setAttribute("tabindex",0),t.classList.add("archive__btn--active"),t.setAttribute("aria-expanded","true"),sessionStorage.setItem("curArchiveId",t.id))},t=document.querySelectorAll(".archive__btn");if(t.length){for(var n=0;n<t.length;n++)t[n].addEventListener("click",e);if(!document.documentElement.classList.contains("only-ie")&&sessionStorage.getItem("curArchiveId"))document.querySelector("#"+sessionStorage.getItem("curArchiveId")).dispatchEvent(new Event("click")),sessionStorage.removeItem("curArchiveId")}}(),function(){var e=document.getElementById("search-content");if(e){var t,n,r=document.documentElement,a=document.body,i=document.querySelector(".nav__search-open"),o=document.querySelector(".search__close"),c=document.querySelectorAll("#skip-links, #masthead, #content, #mastfoot, #side-menu"),s=e.querySelectorAll("button, input, [href], [tabindex]:not([tabindex='-1'])"),l=s.length&&s[0],d=s.length&&s[s.length-1],u=document.getElementById("search-results"),h=document.getElementById("search-layer"),v=document.getElementById("search-title"),m=document.getElementById("search-input"),g=e.querySelector(".search__count-wrapper"),p=g.querySelector(".search__word"),f=g.querySelector(".search__count"),y=document.querySelector(".search__link-wrapper"),_=0;i.addEventListener("click",(function(){n=!0,_=window.pageYOffset,r.classList.add("layer-opened"),a.style.top=-_+"px",i.setAttribute("aria-expanded","true"),o.setAttribute("aria-expanded","true");for(var t=0;t<c.length;t++)c[t].setAttribute("aria-hidden","true");e.classList.add("search-content--active"),e.setAttribute("aria-hidden","false"),e.addEventListener("click",(function(e){e.target===e.currentTarget&&b()})),setTimeout((function(){m.focus(),m.addEventListener("keyup",L),m.addEventListener("input",L),m.addEventListener("focus",L)})),l.addEventListener("keydown",(function(e){e.shiftKey&&"Tab"===e.key&&(e.preventDefault(),d.focus())})),d.addEventListener("keydown",(function(e){e.shiftKey||"Tab"!==e.key||(e.preventDefault(),l.focus())})),document.addEventListener("keydown",E);var s=document.querySelector(".search__to-input");h.addEventListener("scroll",(function(){this.scrollTop>=document.getElementById("search-results").offsetTop?s.classList.add("search__to-input--active"):s.classList.remove("search__to-input--active")})),s.addEventListener("click",(function(e){e.preventDefault(),m.focus(),h.scrollTo({top:0})}))})),o.addEventListener("click",b)}function L(){var e=m.value;if(e){t=!1,n=!1,v.classList.contains("sr-only")||v.classList.add("sr-only"),g.classList.contains("search__count-wrapper--active")||g.classList.add("search__count-wrapper--active"),y&&!y.classList.contains("search__link-wrapper--active")&&y.classList.add("search__link-wrapper--active");for(var r=0,a=u.querySelectorAll("a");r<a.length;r++){var i=a[r],o=i.innerHTML.match(new RegExp(e.replace(/(?=[()? [])/g,"\\"),"i"));i===o||i.querySelector(".search__results__match")||(i.innerHTML=i.innerHTML.replace(new RegExp(o,"g"),'<span class="search__results__match">'+o+"</span>"))}}else t=!0,n=!0,v.classList.remove("sr-only"),y&&y.classList.remove("search__link-wrapper--active");var c=u.querySelectorAll(".search__results__item");c.length?(m.setAttribute("aria-expanded","true"),p.textContent='"'+e+'"',f.textContent=c.length):(m.setAttribute("aria-expanded","false"),g.classList.remove("search__count-wrapper--active"))}function b(){document.removeEventListener("keydown",E),r.classList.remove("layer-opened"),e.classList.remove("search-content--active"),e.setAttribute("aria-hidden","true"),o.setAttribute("aria-expanded","false");for(var t=0;t<c.length;t++){var n=c[t];!0!==n.getAttribute("aria-hidden")&&n.removeAttribute("aria-hidden")}i.setAttribute("aria-expanded","false"),i.focus(),a.style.top="",window.scrollTo(0,_)}function E(e){var r=e.key;if("Escape"===r||"Esc"===r){for(var a=0,i=u.querySelectorAll("a");a<i.length;a++)i[a]===document.activeElement&&m.focus();if(n||t||m!==document.activeElement)b();else for(m.value="",g.classList.remove("search__count-wrapper--active"),y&&y.classList.remove("search__link-wrapper--active");u.firstChild;)u.removeChild(u.firstChild)}}}();