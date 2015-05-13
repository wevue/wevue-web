/*!
* jQuery Cycle2; ver: 20121219
* http://jquery.malsup.com/cycle2/
* Copyright (c) 2012 M. Alsup; Dual licensed: MIT/GPL
*/
(function(a){function c(){window.console&&console.log&&console.log("[cycle2] "+Array.prototype.join.call(arguments," "))}function d(a){return(a||"").toLowerCase()}"use strict";var b="20121219";a.fn.cycle=function(b){var e;return this.length===0&&!a.isReady?(e={s:this.selector,c:this.context},c("requeuing slideshow (dom not ready)"),a(function(){a(e.s,e.c).cycle(b)}),this):this.each(function(){var e,f,g,h,i=a(this);if(i.data("cycle.opts"))return;if(i.data("cycle-log")===!1||b&&b.log===!1||f&&f.log===!1)c=a.noop;c("--c2 init--"),e=i.data();for(var j in e)e.hasOwnProperty(j)&&/^cycle[A-Z]+/.test(j)&&(h=e[j],g=j.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,d),c(g+":",h,"("+typeof h+")"),e[g]=h);f=a.extend({},a.fn.cycle.defaults,e,b||{}),f.timeoutId=0,f.paused=f.paused||!1,f.container=i,f._maxZ=f.maxZ,f.API=a.extend({_container:i},a.fn.cycle.API),f.API.log=c,f.API.trigger=function(a,b){return f.container.trigger(a,b),f.API},i.data("cycle.opts",f),i.data("cycle.API",f.API),f.API.trigger("cycle-bootstrap",[f,f.API]),f.API.addInitialSlides(),f.API.preInitSlideshow(),f.slides.length&&f.API.initSlideshow()})},a.fn.cycle.API={opts:function(){return this._container.data("cycle.opts")},addInitialSlides:function(){var b=this.opts(),c=b.slides;b.slideCount=0,b.slides=a(),c=c.jquery?c:b.container.find(c),b.random&&c.sort(function(){return Math.random()-.5}),b.API.add(c)},preInitSlideshow:function(){var b=this.opts();b.API.trigger("cycle-pre-initialize",[b]);var c=a.fn.cycle.transitions[b.fx];c&&a.isFunction(c.preInit)&&c.preInit(b),b._preInitialized=!0},postInitSlideshow:function(){var b=this.opts();b.API.trigger("cycle-post-initialize",[b]);var c=a.fn.cycle.transitions[b.fx];c&&a.isFunction(c.postInit)&&c.postInit(b)},initSlideshow:function(){var b=this.opts(),c=b.container;b.API.calcFirstSlide(),b.container.css("position")=="static"&&b.container.css("position","relative"),a(b.slides[b.currSlide]).css("opacity",1).show(),b.API.stackSlides(b.slides[b.currSlide],b.slides[b.nextSlide],!b.reverse),b.pauseOnHover&&(b.pauseOnHover!==!0&&(c=a(b.pauseOnHover)),c.hover(function(){b.hoverPaused=!0,b.paused||b.API.trigger("cycle-paused",[b])},function(){b.hoverPaused=!1,b.paused||b.API.trigger("cycle-resumed",[b])})),b.timeout&&(b.timeoutId=setTimeout(function(){b.API.prepareTx(!1,!b.reverse)},b.timeout+b.delay)),b._initialized=!0,b.API.updateView(!0),b.container.on("cycle-paused cycle-resumed",function(a){b.container[a.type==="cycle-paused"?"addClass":"removeClass"]("cycle-paused")}),b.API.trigger("cycle-initialized",[b]),b.API.postInitSlideshow()},add:function(b,c){var d=this.opts(),e=d.slideCount,f=!1,g;a(b).each(function(b){var e,f=a(this);c?d.container.prepend(f):d.container.append(f),d.slideCount++,e=d.API.buildSlideOpts(f),c?d.slides=a(f).add(d.slides):d.slides=d.slides.add(f),d.API.initSlide(e,f,--d._maxZ),f.data("cycle.opts",e),d.API.trigger("cycle-slide-added",[d,e,f])}),d.API.updateView(!0),f=d._preInitialized&&e<2&&d.slideCount>=1,f&&(d._initialized?d.timeout&&(g=d.slides.length,d.nextSlide=d.reverse?g-1:1):d.API.initSlideshow())},calcFirstSlide:function(){var a=this.opts(),b;b=parseInt(a.startingSlide||0,10);if(b>=a.slides.length||b<0)b=0;a.currSlide=b,a.reverse?(a.nextSlide=b-1,a.nextSlide<0&&(a.nextSlide=a.slides.length-1)):(a.nextSlide=b+1,a.nextSlide==a.slides.length&&(a.nextSlide=0))},calcNextSlide:function(){var a=this.opts(),b;a.reverse?(b=a.nextSlide-1<0,a.nextSlide=b?a.slideCount-1:a.nextSlide-1,a.currSlide=b?0:a.nextSlide+1):(b=a.nextSlide+1==a.slides.length,a.nextSlide=b?0:a.nextSlide+1,a.currSlide=b?a.slides.length-1:a.nextSlide-1)},calcTx:function(b,d){var e=b,f;return d&&e.manualFx&&(f=a.fn.cycle.transitions[e.manualFx]),f||(f=a.fn.cycle.transitions[e.fx]),f||(f=a.fn.cycle.transitions.fade,c('Transition "'+e.fx+'" not found.  Using fade.')),f},prepareTx:function(a,b){var c=this.opts(),d,e,f,g,h;if(c.slideCount<2){c.timeoutId=0;return}a&&(c.API.stopTransition(),c.busy=!1,clearTimeout(c.timeoutId),c.timeoutId=0);if(c.busy)return;if(c.timeoutId===0&&!a)return;e=c.slides[c.currSlide],f=c.slides[c.nextSlide],g=c.API.getSlideOpts(c.nextSlide),h=c.API.calcTx(g,a),c._tx=h,a&&g.manualSpeed!==undefined&&(g.speed=g.manualSpeed),c.nextSlide!=c.currSlide&&(a||!c.paused&&!c.hoverPaused&&c.timeout)?(c.API.trigger("cycle-before",[g,e,f,b]),h.before&&h.before(g,e,f,b),d=function(){c.busy=!1,h.after&&h.after(g,e,f,b),c.API.trigger("cycle-after",[g,e,f,b]),c.API.queueTransition(g),c.API.updateView(!0)},c.busy=!0,h.transition?h.transition(g,e,f,b,d):c.API.doTransition(g,e,f,b,d),c.API.calcNextSlide(),c.updateView<0&&c.API.updateView()):c.API.queueTransition(g)},doTransition:function(b,c,d,e,f){var g=b,h=a(c),i=a(d),j=function(){i.animate(g.animIn||{opacity:1},g.speed,g.easeIn||g.easing,f)};i.css(g.cssBefore||{}),h.animate(g.animOut||{},g.speed,g.easeOut||g.easing,function(){h.css(g.cssAfter||{}),g.sync||j()}),g.sync&&j()},queueTransition:function(a){var b=this.opts();if(b.nextSlide===0&&--b.loop===0){b.API.log("terminating; loop=0"),b.timeout=0,b.API.trigger("cycle-finished",[b]),b.nextSlide=b.currSlide;return}a.timeout&&(b.timeoutId=setTimeout(function(){b.API.prepareTx(!1,!b.reverse)},a.timeout))},stopTransition:function(){var a=this.opts();a.slides.filter(":animated").length&&(a.slides.stop(!1,!0),a.API.trigger("cycle-transition-stopped",[a])),a._tx&&a._tx.stopTransition&&a._tx.stopTransition(a)},advanceSlide:function(a){var b=this.opts();return clearTimeout(b.timeoutId),b.timeoutId=0,b.nextSlide=b.currSlide+a,b.nextSlide<0?b.nextSlide=b.slides.length-1:b.nextSlide>=b.slides.length&&(b.nextSlide=0),b.API.prepareTx(!0,a>=0),!1},buildSlideOpts:function(b){var e=this.opts(),f,g,h=b.data()||{};for(var i in h)h.hasOwnProperty(i)&&/^cycle[A-Z]+/.test(i)&&(f=h[i],g=i.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,d),c("["+(e.slideCount-1)+"]",g+":",f,"("+typeof f+")"),h[g]=f);h=a.extend({},a.fn.cycle.defaults,e,h),h.slideNum=e.slideCount;try{delete h.API,delete h.slideCount,delete h.currSlide,delete h.nextSlide,delete h.slides}catch(j){}return h},getSlideOpts:function(b){var c=this.opts();b===undefined&&(b=c.currSlide);var d=c.slides[b],e=a(d).data("cycle.opts");return a.extend({},c,e)},initSlide:function(b,c,d){var e=this.opts();c.css(b.slideCss||{}),d>0&&c.css("zIndex",d),isNaN(b.speed)&&(b.speed=a.fx.speeds[b.speed]||a.fx.speeds._default),b.sync||(b.speed=b.speed/2),c.addClass(e.slideClass)},updateView:function(a){var b=this.opts();if(!b._initialized)return;var c=b.API.getSlideOpts(),d=b.slides[b.currSlide];b.slideActiveClass&&b.slides.removeClass(b.slideActiveClass).eq(b.currSlide).addClass(b.slideActiveClass),a&&b.hideNonActive&&b.slides.filter(":not(."+b.slideActiveClass+")").hide(),b.API.trigger("cycle-update-view",[b,c,d])},getComponent:function(b){var c=this.opts(),d=c[b];return typeof d=="string"?/^\s*\>/.test(d)?c.container.find(d):a(d):d.jquery?d:a(d)},stackSlides:function(b,c,d){var e=this.opts();b||(b=e.slides[e.currSlide],c=e.slides[e.nextSlide],d=!e.reverse),a(b).css("zIndex",e.maxZ);var f,g=e.maxZ-2,h=e.slideCount;if(d){for(f=e.currSlide+1;f<h;f++)a(e.slides[f]).css("zIndex",g--);for(f=0;f<e.currSlide;f++)a(e.slides[f]).css("zIndex",g--)}else{for(f=e.currSlide-1;f>=0;f--)a(e.slides[f]).css("zIndex",g--);for(f=h-1;f>e.currSlide;f--)a(e.slides[f]).css("zIndex",g--)}a(c).css("zIndex",e.maxZ-1)},getSlideIndex:function(a){return this.opts().slides.index(a)}},a.fn.cycle.log=c,a.fn.cycle.version=function(){return"Cycle2: "+b},a.fn.cycle.transitions={custom:{},none:{before:function(a,b,c,d){a.API.stackSlides(c,b,d),a.cssBefore={opacity:1,display:"block"}}},fade:{before:function(b,c,d,e){var f=b.API.getSlideOpts(b.nextSlide).slideCss||{};b.API.stackSlides(c,d,e),b.cssBefore=a.extend(f,{opacity:0,display:"block"}),b.animIn={opacity:1},b.animOut={opacity:0}}},fadeout:{before:function(b,c,d,e){var f=b.API.getSlideOpts(b.nextSlide).slideCss||{};b.API.stackSlides(c,d,e),b.cssBefore=a.extend(f,{opacity:1,display:"block"}),b.animOut={opacity:0}}},scrollHorz:{before:function(a,b,c,d){a.API.stackSlides(b,c,d);var e=a.container.css("overflow","hidden").width();a.cssBefore={left:d?e:-e,top:0,opacity:1,display:"block"},a.cssAfter={zIndex:a._maxZ-2,left:0},a.animIn={left:0},a.animOut={left:d?-e:e}}}},a.fn.cycle.defaults={allowWrap:!0,autoSelector:".cycle-slideshow[data-cycle-auto-init!=false]",delay:0,easing:null,fx:"fade",hideNonActive:!0,loop:0,manualFx:undefined,manualSpeed:undefined,maxZ:100,pauseOnHover:!1,reverse:!1,slideActiveClass:"cycle-slide-active",slideClass:"cycle-slide",slideCss:{position:"absolute",top:0,left:0},slides:"> img",speed:500,startingSlide:0,sync:!0,timeout:4e3,updateView:-1},a(document).ready(function(){a(a.fn.cycle.defaults.autoSelector).cycle()})})(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{autoHeight:0}),a(document).on("cycle-initialized",function(b,c){function h(){c.container.height(c.container.width()/g)}var d=c.autoHeight,e=-1,f,g;d==="calc"||a.type(d)=="number"&&d>=0?(d==="calc"?c.slides.each(function(b){var c=a(this).height();c>e&&(e=c,d=b)}):d>=c.slides.length&&(d=0),f=a(c.slides[d]).clone(),f.removeAttr("id").find("[id]").removeAttr("id"),f.removeAttr("name").find("[name]").removeAttr("name"),f.css({position:"static",visibility:"hidden",display:"block"}).prependTo(c.container).removeClass().addClass("cycle-sentinel cycle-slide"),f.find("*").css("visibility","hidden"),c._sentinel=f):a.type(d)=="string"&&/\d+\:\d+/.test(d)&&(g=d.match(/(\d+)\:(\d+)/),g=g[1]/g[2],a(window).on("resize",h),c._autoHeightOnResize=h,setTimeout(function(){a(window).triggerHandler("resize")},15))}),a(document).on("cycle-destroyed",function(b,c){c._sentinel&&c._sentinel.remove(),c._autoHeightOnResize&&a(window).off("resize",c._autoHeightOnResize)})}(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{caption:"> .cycle-caption",captionTemplate:"{{slideNum}} / {{slideCount}}",overlay:"> .cycle-overlay",overlayTemplate:"<div>{{title}}</div><div>{{desc}}</div>"}),a(document).on("cycle-update-view",function(b,c,d,e){var f;a.each(["caption","overlay"],function(){var a=this,b=d[a+"Template"],f=c.API.getComponent(a);f.length&&b?(f.html(c.API.tmpl(b,d,c,e)),f.show()):f.hide()})}),a(document).on("cycle-destroyed",function(b,c){var d;a.each(["caption","overlay"],function(){var a=this,b=c[a+"Template"];c[a]&&b&&(d=c.API.getComponent("caption"),d.empty())})})}(jQuery),function(a){"use strict";var b=a.fn.cycle;a.fn.cycle=function(c){var d,e,f,g=a.makeArray(arguments);return a.type(c)=="number"?this.cycle("goto",c):a.type(c)=="string"?this.each(function(){var h;d=c,f=a(this).data("cycle.opts");if(f===undefined){b.log('slideshow must be initialized before sending commands; "'+d+'" ignored');return}d=d=="goto"?"jump":d,e=f.API[d];if(a.isFunction(e))return h=a.makeArray(g),h.shift(),e.apply(f.API,h);b.log("unknown command: ",d)}):b.apply(this,arguments)},a.extend(a.fn.cycle,b),a.extend(b.API,{next:function(){var a=this.opts(),b=a.reverse?-1:1;if(a.allowWrap===!1&&a.currSlide+b>=a.slideCount)return;a.API.advanceSlide(b),a.API.trigger("cycle-next",[a]).log("cycle-next")},prev:function(){var a=this.opts(),b=a.reverse?1:-1;if(a.allowWrap===!1&&a.currSlide+b<0)return;a.API.advanceSlide(b),a.API.trigger("cycle-prev",[a]).log("cycle-prev")},destroy:function(){var a=this.opts();clearTimeout(a.timeoutId),a.timeoutId=0,a.API.stop(),a.API.trigger("cycle-destroyed",[a]).log("cycle-destroyed"),a.container.removeData("cycle.opts")},jump:function(a){var b,c=this.opts(),d=parseInt(a,10);if(isNaN(d)||d<0||d>=c.slides.length){c.API.log("goto: invalid slide index: "+d);return}if(d==c.currSlide){c.API.log("goto: skipping, already on slide",d);return}c.nextSlide=d,clearTimeout(c.timeoutId),c.timeoutId=0,c.API.log("goto: ",d," (zero-index)"),b=c.currSlide<c.nextSlide,c.API.prepareTx(!0,b)},stop:function(){var b=this.opts(),c=b.container;clearTimeout(b.timeoutId),b.timeoutId=0,b.API.stopTransition(),b.pauseOnHover&&(b.pauseOnHover!==!0&&(c=a(b.pauseOnHover)),c.off("mouseenter mouseleave")),b.API.trigger("cycle-stopped",[b]).log("cycle-stopped")},pause:function(){var a=this.opts();a.paused=!0,a.API.trigger("cycle-paused",[a]).log("cycle-paused")},resume:function(){var a=this.opts();a.paused=!1,a.API.trigger("cycle-resumed",[a]).log("cycle-resumed")},reinit:function(){var a=this.opts();a.API.destroy(),a.container.cycle()},remove:function(b){var c=this.opts(),d,e,f=[],g=1;for(var h=0;h<c.slides.length;h++)d=c.slides[h],h==b?e=d:(f.push(d),a(d).data("cycle.opts").slideNum=g,g++);e&&(c.slides=a(f),c.slideCount--,a(e).remove(),b==c.currSlide&&c.API.advanceSlide(1),c.API.trigger("cycle-slide-removed",[c,b,e]).log("cycle-slide-removed"),c.API.updateView())}}),a(document).on("click.cycle","[data-cycle-cmd]",function(b){b.preventDefault();var c=a(this),d=c.data("cycle-cmd"),e=c.data("cycle-context")||".cycle-slideshow";a(e).cycle(d,c.data("cycle-arg"))})}(jQuery),function(a){function b(b,c){var d;if(b._hashFence){b._hashFence=!1;return}d=window.location.hash.substring(1),b.slides.each(function(e){if(a(this).data("cycle-hash")==d)return c===!0?b.startingSlide=e:(b.nextSlide=e,b.API.prepareTx(!0,!1)),!1})}"use strict",a(document).on("cycle-pre-initialize",function(c,d){b(d,!0),d._onHashChange=function(){b(d,!1)},a(window).on("hashchange",d._onHashChange)}),a(document).on("cycle-update-view",function(a,b,c){c.hash&&(b._hashFence=!0,window.location.hash=c.hash)}),a(document).on("cycle-destroyed",function(b,c){c._onHashChange&&a(window).off("hashchange",c._onHashChange)})}(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{loader:!1}),a(document).on("cycle-bootstrap",function(b,c){function e(b,e){function h(b){var h;c.loader=="wait"?(f.push(b),g===0&&(f.sort(i),d.apply(c.API,[f,e]),c.container.removeClass("cycle-loading"))):(h=a(c.slides[c.currSlide]),d.apply(c.API,[b,e]),h.show(),c.container.removeClass("cycle-loading"))}function i(a,b){return a.data("index")-b.data("index")}var f=[];b=a(b);var g=b.length;b.hide().appendTo("body").each(function(b){function l(){--i===0&&(--g,h(j))}var i=0,j=a(this),k=j.is("img")?j:j.find("img");j.data("index",b),k=k.filter(":not(.cycle-loader-ignore)");if(!k.length){--g,f.push(j);return}i=k.length,k.each(function(){this.complete?l():a(this).load(function(){l()}).error(function(){--i===0&&(c.API.log("slide skipped; img not loaded:",this.src),--g===0&&c.loader=="wait"&&d.apply(c.API,[f,e]))})})}),g&&c.container.addClass("cycle-loading")}var d;if(!c.loader)return;d=c.API.add,c.API.add=e})}(jQuery),function(a){function b(b,c,d){var e,f=b.API.getComponent("pager");f.each(function(){var f=a(this);if(c.pagerTemplate){var g=b.API.tmpl(c.pagerTemplate,c,b,d[0]);e=a(g).appendTo(f)}else e=f.children().eq(b.slideCount-1);e.on(b.pagerEvent,function(a){a.preventDefault(),b.API.page(f,a.currentTarget)})})}function c(a,b){var c=this.opts(),d=a.children().index(b),e=d,f=c.currSlide<e;if(c.currSlide==e)return;c.nextSlide=e,c.API.prepareTx(!0,f),c.API.trigger("cycle-pager-activated",[c,a,b])}"use strict",a.extend(a.fn.cycle.defaults,{pager:"> .cycle-pager",pagerActiveClass:"cycle-pager-active",pagerEvent:"click.cycle",pagerTemplate:"<span>&bull;</span>"}),a(document).on("cycle-bootstrap",function(a,c,d){d.buildPagerLink=b}),a(document).on("cycle-slide-added",function(a,b,d,e){b.pager&&(b.API.buildPagerLink(b,d,e),b.API.page=c)}),a(document).on("cycle-slide-removed",function(b,c,d,e){if(c.pager){var f=c.API.getComponent("pager");f.each(function(){var b=a(this);a(b.children()[d]).remove()})}}),a(document).on("cycle-update-view",function(b,c,d){var e;c.pager&&(e=c.API.getComponent("pager"),e.each(function(){a(this).children().removeClass(c.pagerActiveClass).eq(c.currSlide).addClass(c.pagerActiveClass)}))}),a(document).on("cycle-destroyed",function(a,b){var c;b.pager&&b.pagerTemplate&&(c=b.API.getComponent("pager"),c.empty())})}(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{next:"> .cycle-next",nextEvent:"click.cycle",disabledClass:"disabled",prev:"> .cycle-prev",prevEvent:"click.cycle",swipe:!1}),a(document).on("cycle-initialized",function(a,b){b.API.getComponent("next").off(b.nextEvent).on(b.nextEvent,function(a){a.preventDefault(),b.API.next()}),b.API.getComponent("prev").off(b.prevEvent).on(b.prevEvent,function(a){a.preventDefault(),b.API.prev()});if(b.swipe){var c=b.swipeVert?"swipeUp.cycle":"swipeLeft.cycle swipeleft.cycle",d=b.swipeVert?"swipeDown.cycle":"swipeRight.cycle swiperight.cycle";b.container.on(c,function(a){b.API.next()}),b.container.on(d,function(){b.API.prev()})}}),a(document).on("cycle-update-view",function(a,b,c,d){if(b.allowWrap)return;var e=b.disabledClass,f=b.API.getComponent("next"),g=b.API.getComponent("prev"),h=b._prevBoundry||0,i=b._nextBoundry||b.slideCount-1;b.currSlide==i?f.addClass(e).prop("disabled",!0):f.removeClass(e).prop("disabled",!1),b.currSlide===h?g.addClass(e).prop("disabled",!0):g.removeClass(e).prop("disabled",!1)}),a(document).on("cycle-destroyed",function(b,c){a(c.next).off(c.nextEvent),a(c.prev).off(c.prevEvent),c.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")})}(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{progressive:!1}),a(document).on("cycle-pre-initialize",function(b,c){if(!c.progressive)return;var d=c.API,e=d.next,f=d.prev,g=d.prepareTx,h,i=a.type(c.progressive);if(i=="array")h=c.progressive;else if(a.isFunction(c.progressive))h=c.progressive(c);else if(i=="string"){h=a(c.progressive).html();if(!a.trim(h))return;try{h=a.parseJSON(h)}catch(j){d.log("error parsing progressive slides",j);return}}g&&(d.prepareTx=function(a,b){var d,e;if(a||h.length===0){g.apply(c.API,[a,b]);return}b&&c.currSlide==c.slideCount-1?(e=h[0],h=h.slice(1),c.container.one("cycle-slide-added",function(a,b){b.API.advanceSlide(1)}),c.API.add(e)):!b&&c.currSlide===0?(d=h.length-1,e=h[d],h=h.slice(0,d),c.container.one("cycle-slide-added",function(a,b){b.currSlide=1,b.API.advanceSlide(-1)}),c.API.add(e,!0)):g.apply(c.API,[a,b])}),e&&(d.next=function(){var a=this.opts();if(h.length&&a.currSlide==a.slideCount-1){var b=h[0];h=h.slice(1),a.container.one("cycle-slide-added",function(a,b){e.apply(b.API),b.container.removeClass("cycle-loading")}),a.container.addClass("cycle-loading"),a.API.add(b)}else e.apply(a.API)}),f&&(d.prev=function(){var a=this.opts();if(h.length&&a.currSlide===0){var b=h.length-1,c=h[b];h=h.slice(0,b),a.container.one("cycle-slide-added",function(a,b){b.currSlide=1,b.API.advanceSlide(-1),b.container.removeClass("cycle-loading")}),a.container.addClass("cycle-loading"),a.API.add(c,!0)}else f.apply(a.API)})})}(jQuery),function(a){"use strict",a.extend(a.fn.cycle.defaults,{tmplRegex:"{{((.)?.*?)}}"}),a.extend(a.fn.cycle.API,{tmpl:function(b,c){var d=new RegExp(c.tmplRegex||a.fn.cycle.defaults.tmplRegex,"g"),e=a.makeArray(arguments);return e.shift(),b.replace(d,function(b,c){var d,f,g,h,i=c.split(".");for(d=0;d<e.length;d++){g=e[d];if(i.length>1){h=g;for(f=0;f<i.length;f++)g=h,h=h[i[f]]||c}else h=g[c];if(a.isFunction(h))return h.apply(g,e);if(h!==undefined&&h!==null&&h!=c)return h}return c})}})}(jQuery);
